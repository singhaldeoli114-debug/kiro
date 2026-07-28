"""
Targeted OCR text repair.

Two error classes dominate the analysis of professionally set type, and both are
narrow enough to correct safely:

1. Ligature loss. Faces such as Poppins and Plus Jakarta Sans substitute an
   'fi'/'fl' ligature, and the OCR engine reads the single glyph as a bare 'f'.
   "confidence" becomes "confdence", "refined" becomes "refned". The repair only
   ever inserts 'i' or 'l' immediately after an 'f' (or 'ff'), and only when the
   result is a dictionary word. Nothing else is touched.

2. Run-together words. Detection boxes occasionally swallow a word gap, giving
   "delivereffortless". The repair splits a token only when both halves are
   dictionary words of reasonable length.

Both rules are deliberately conservative: a repair is applied only when it
produces real words, so an unusual brand name or slogan is left alone rather
than being "corrected" into something the design does not say. Every change is
recorded so it can be audited.
"""

from __future__ import annotations

import re

_SPELL = None
_FREQ = None


def _spell():
    global _SPELL, _FREQ
    if _SPELL is None:
        from spellchecker import SpellChecker

        _SPELL = SpellChecker()
        _FREQ = _SPELL.word_frequency
    return _SPELL


def _known(w: str) -> bool:
    s = _spell()
    lw = w.lower()
    return lw in s and len(lw) >= 2


def _freq(w: str) -> int:
    """Frequency weight for a word, never zero for a known word.

    Scaling usage frequency into an integer rounds rare-but-real words such as
    "effortless" down to 0. A zero was then treated as "not a word" and the
    segmenter discarded the correct single-word reading in favour of
    "effort"+"less". Known words are therefore floored at 1.
    """
    s = _spell()
    lw = w.lower()
    raw = 0
    try:
        raw = int(s.word_frequency[lw])
    except Exception:
        raw = 0
    if raw <= 0:
        try:
            raw = int(round(s.word_usage_frequency(lw) * 1_000_000_000))
        except Exception:
            raw = 0
    if raw <= 0 and _known(lw):
        raw = 1
    return raw


def _match_case(src: str, out: str) -> str:
    """Re-apply the casing pattern of the original token."""
    if src.isupper():
        return out.upper()
    if src[:1].isupper():
        return out[:1].upper() + out[1:]
    return out


def repair_ligature(token: str) -> tuple[str, str | None]:
    """Insert a ligature character lost by OCR. Returns (token, note)."""
    core = re.sub(r"[^A-Za-z]", "", token)
    if len(core) < 3 or _known(core):
        return token, None
    lower = core.lower()
    if "f" not in lower:
        return token, None

    best, best_f = None, -1
    for m in re.finditer(r"f+", lower):
        pos = m.end()  # insert after the f-run (covers fi, fl, ffi, ffl)
        for ch in ("i", "l"):
            cand = lower[:pos] + ch + lower[pos:]
            if _known(cand):
                f = _freq(cand)
                if f > best_f:
                    best, best_f = cand, f
    if not best:
        return token, None

    fixed = _match_case(core, best)
    # Splice the corrected core back into the original token, preserving
    # surrounding punctuation such as a trailing comma.
    prefix = re.match(r"^[^A-Za-z]*", token).group(0)
    suffix = re.search(r"[^A-Za-z]*$", token).group(0)
    return prefix + fixed + suffix, f"ligature insertion: '{core}' -> '{fixed}'"


_SHORT_OK = {"a", "i", "an", "at", "be", "by", "do", "go", "he", "in", "is", "it",
             "me", "my", "no", "of", "on", "or", "so", "to", "up", "us", "we",
             "the", "and", "for", "you", "our", "new", "now", "all", "get",
             "off", "buy", "top", "big", "sale", "with", "your", "this", "that"}


def _segment(lower: str) -> list[str] | None:
    """Split a space-less string into dictionary words by maximising likelihood.

    Dynamic programming over the string; each candidate word scores by log
    frequency so common words are preferred over improbable chains of fragments.
    A two-way split alone cannot recover "ExploretheCollection", which needs
    three words, so the full segmentation is solved instead.
    """
    import math

    n = len(lower)
    if n < 6 or n > 64:
        return None
    NEG = -1e9
    # A per-word penalty is essential: without it the segmenter prefers many
    # short common words over one correct long word, turning "effortless" into
    # "effort less". The penalty makes an extra word only worthwhile when it is
    # much better supported by frequency.
    # Word count is the primary criterion, frequency only a tiebreak. Tuning a
    # frequency penalty proved fragile: any value that preferred "effortless"
    # over "effort"+"less" also started splitting real words like "instagram".
    # Because log-frequency is bounded well below this constant, fewer words
    # always wins and frequency only chooses between segmentations of equal
    # length.
    WORD_PENALTY = 1000.0
    # Obscure dictionary entries must not qualify as split parts. "instagram" is
    # absent from the dictionary while "inst" and "agram" are both present as
    # rare entries, so without a frequency floor a real brand name gets split
    # into nonsense. Measured separation is wide: those rare entries score ~50
    # while genuine words start around 380.
    MIN_PART_FREQ = 250
    best = [NEG] * (n + 1)
    back: list[int] = [-1] * (n + 1)
    best[0] = 0.0
    for i in range(1, n + 1):
        for j in range(max(0, i - 20), i):
            w = lower[j:i]
            if len(w) < 2:
                continue
            if len(w) <= 3 and w not in _SHORT_OK:
                continue
            if not _known(w):
                continue
            f = _freq(w)
            if f < MIN_PART_FREQ:
                continue
            score = best[j] + math.log(f) - WORD_PENALTY
            if score > best[i]:
                best[i] = score
                back[i] = j
    if best[n] <= NEG / 2:
        return None
    parts, i = [], n
    while i > 0:
        j = back[i]
        if j < 0:
            return None
        parts.append(lower[j:i])
        i = j
    parts.reverse()
    return parts if len(parts) >= 2 else None


def _camel_parts(core: str) -> list[str] | None:
    """Split on internal capitals, e.g. 'LimitedTimeOffer'.

    An internal lowercase-to-uppercase transition is a deliberate authoring
    signal, so it is a more reliable boundary than any frequency model. Accepted
    only when every resulting part is a dictionary word.
    """
    if not re.search(r"[a-z][A-Z]", core):
        return None
    parts = re.findall(r"[A-Z]?[a-z]+|[A-Z]+(?![a-z])", core)
    if len(parts) < 2:
        return None
    if all(_known(p) and (len(p) >= 4 or p.lower() in _SHORT_OK) for p in parts):
        return parts
    return None


def repair_runtogether(token: str) -> tuple[str, str | None]:
    """Split a token that merged multiple words. Returns (token, note)."""
    core = re.sub(r"[^A-Za-z]", "", token)
    if len(core) < 7 or _known(core):
        return token, None

    camel = _camel_parts(core)
    if camel:
        out = " ".join(camel)
        prefix = re.match(r"^[^A-Za-z]*", token).group(0)
        suffix = re.search(r"[^A-Za-z]*$", token).group(0)
        return (prefix + out + suffix,
                f"split camelCase: '{core}' -> '{out}'")

    parts = _segment(core.lower())
    if not parts:
        return token, None

    # Re-apply the original casing pattern across the recovered words.
    if core.isupper():
        words = [p.upper() for p in parts]
    else:
        words, pos = [], 0
        for p in parts:
            src = core[pos:pos + len(p)]
            words.append(p[:1].upper() + p[1:] if src[:1].isupper() else p)
            pos += len(p)
    out = " ".join(words)
    prefix = re.match(r"^[^A-Za-z]*", token).group(0)
    suffix = re.search(r"[^A-Za-z]*$", token).group(0)
    return prefix + out + suffix, f"split run-together: '{core}' -> '{out}'"


def repair(text: str) -> tuple[str, list[str]]:
    """Apply both repairs across a line. Returns (text, notes)."""
    if not text or not text.strip():
        return text, []
    notes: list[str] = []
    out_tokens = []
    for tok in text.split(" "):
        if not tok:
            out_tokens.append(tok)
            continue
        t, n = repair_ligature(tok)
        if n:
            notes.append(n)
        t2, n2 = repair_runtogether(t)
        if n2:
            notes.append(n2)
            t = t2
        out_tokens.append(t)
    return " ".join(out_tokens), notes
