"""
Template analysis engine.

Produces a structured analysis of a single 1080x1080 (or any size) design
reference image, combining:

  * OCR (RapidOCR / ONNX) for text content + text bounding boxes
  * Pixel analysis for ink bounding boxes, stroke weight and colour sampling
  * Font fitting against the family names Pixy declares for the template
  * Semantic colour extraction
  * Gradient / overlay detection
  * Focal point estimation

Scope: ANALYSIS AND ASSET COLLECTION ONLY. This module deliberately does not
emit HTML, CSS or any renderer manifest.
"""

from __future__ import annotations

import colorsys
import math
import re
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

# --------------------------------------------------------------------------
# OCR
# --------------------------------------------------------------------------

_OCR = None


def get_ocr():
    global _OCR
    if _OCR is None:
        from rapidocr_onnxruntime import RapidOCR

        _OCR = RapidOCR()
    return _OCR


def run_ocr(image_path: str) -> list[dict]:
    """Return OCR text blocks sorted top-to-bottom."""
    try:
        res, _ = get_ocr()(image_path)
    except Exception as e:
        return [{"_error": str(e)}]
    if not res:
        return []
    out = []
    for box, txt, conf in res:
        xs = [float(p[0]) for p in box]
        ys = [float(p[1]) for p in box]
        out.append(
            {
                "text": txt,
                "ocrConfidence": round(float(conf), 4),
                "ocrBox": {
                    "x": round(min(xs), 1),
                    "y": round(min(ys), 1),
                    "width": round(max(xs) - min(xs), 1),
                    "height": round(max(ys) - min(ys), 1),
                },
                "quad": [[round(float(p[0]), 1), round(float(p[1]), 1)] for p in box],
            }
        )
    out.sort(key=lambda b: (b["ocrBox"]["y"], b["ocrBox"]["x"]))
    return out


# --------------------------------------------------------------------------
# Pixel geometry helpers
# --------------------------------------------------------------------------


def ink_bbox(gray: np.ndarray, region: tuple[int, int, int, int], light_text: bool,
             thresh: int = 200) -> dict | None:
    """Tighten a region to the actual glyph ink bounding box.

    light_text: True when glyphs are lighter than their background.
    """
    x0, y0, x1, y1 = region
    h, w = gray.shape
    x0 = max(0, min(x0, w - 1))
    x1 = max(x0 + 1, min(x1, w))
    y0 = max(0, min(y0, h - 1))
    y1 = max(y0 + 1, min(y1, h))
    sub = gray[y0:y1, x0:x1]
    if sub.size == 0:
        return None
    mask = sub > thresh if light_text else sub < (255 - thresh)
    if mask.sum() < 8:
        # adaptive fallback: Otsu-ish split around region mean
        m = sub.mean()
        mask = sub > m + 25 if light_text else sub < m - 25
        if mask.sum() < 8:
            return None
    ys, xs = np.where(mask)
    return {
        "x": int(x0 + xs.min()),
        "y": int(y0 + ys.min()),
        "width": int(xs.max() - xs.min() + 1),
        "height": int(ys.max() - ys.min() + 1),
        "inkPixels": int(mask.sum()),
        "fillRatio": round(float(mask.sum()) / mask.size, 4),
    }


def stroke_stats(gray: np.ndarray, box: dict, light_text: bool,
                 thresh: int = 200, cap: int = 60) -> dict:
    """Median/mean horizontal run length of glyph ink = stroke thickness proxy."""
    x0, y0 = box["x"], box["y"]
    x1, y1 = x0 + box["width"], y0 + box["height"]
    sub = gray[y0:y1, x0:x1]
    mask = sub > thresh if light_text else sub < (255 - thresh)
    runs: list[int] = []
    for row in mask:
        run = 0
        for v in row:
            if v:
                run += 1
            elif run:
                runs.append(run)
                run = 0
        if run:
            runs.append(run)
    runs = [r for r in runs if 0 < r <= cap]
    if not runs:
        return {"medianStroke": None, "meanStroke": None, "runCount": 0}
    return {
        "medianStroke": float(np.median(runs)),
        "meanStroke": round(float(np.mean(runs)), 2),
        "runCount": len(runs),
    }


def estimate_slant(mask: np.ndarray, max_deg: int = 26) -> dict:
    """Estimate glyph slant in degrees by shear-variance maximisation.

    Vertical stems align into sharp column peaks only when the shear cancels the
    face's slant, so the angle maximising the variance of the column-ink
    projection is the glyph slant.

    A centre-of-mass comparison of top vs bottom ink is unreliable here because
    it is dominated by which letters happen to be wide at top or bottom rather
    than by any actual lean.
    """
    h, w = mask.shape
    if h < 10 or w < 10 or mask.sum() < 60:
        return {"angleDeg": 0.0, "style": "normal", "confidence": "low",
                "method": "insufficient ink"}

    pad = int(h * math.tan(math.radians(max_deg))) + 2
    padded = np.zeros((h, w + 2 * pad), bool)
    padded[:, pad:pad + w] = mask
    rows = np.arange(h)

    best_angle, best_score, scores = 0.0, -1.0, {}
    for deg in range(-max_deg, max_deg + 1):
        t = math.tan(math.radians(deg))
        # shear so that lower rows shift left when deg > 0 (undoing a right lean)
        shifts = np.rint((h - 1 - rows) * t).astype(int)
        sheared = np.zeros_like(padded)
        for y in range(h):
            sheared[y] = np.roll(padded[y], shifts[y])
        proj = sheared.sum(0).astype(np.float64)
        score = float((proj ** 2).sum())
        scores[deg] = score
        if score > best_score:
            best_score, best_angle = score, float(deg)

    base = scores.get(0, best_score) or 1.0
    gain = best_score / base if base else 1.0
    style = "italic" if best_angle >= 7 else "normal"
    if abs(best_angle) < 3 or gain < 1.02:
        style, best_angle = "normal", 0.0 if abs(best_angle) < 3 else best_angle
    conf = "high" if gain > 1.12 else "medium" if gain > 1.04 else "low"
    return {
        "angleDeg": round(best_angle, 2),
        "style": style,
        "confidence": conf,
        "shearGainOverUpright": round(gain, 4),
        "method": "shear-variance maximisation of column ink projection",
    }


def word_gaps(mask: np.ndarray) -> list[float]:
    """Return fractional x-positions (0..1) of inter-word gaps in a text line.

    A blank column run wider than a fraction of the ink height is treated as a
    word separator rather than normal letter spacing.
    """
    h, w = mask.shape
    if w < 10 or h < 4:
        return []
    cols = mask.any(0)
    min_gap = max(3, int(round(h * 0.26)))
    gaps, run, start = [], 0, 0
    for i, filled in enumerate(cols):
        if not filled:
            if run == 0:
                start = i
            run += 1
        else:
            if run >= min_gap and start > 0:
                gaps.append((start + run / 2.0) / w)
            run = 0
    return gaps


def insert_spaces(text: str, font_path: str, gaps: list[float],
                  axes: list[float] | None = None) -> str:
    """Re-insert spaces that OCR dropped, guided by measured word gaps.

    OCR frequently returns 'GOODBYEPROBLEMS.' for 'GOODBYE PROBLEMS.'. Feeding
    the unspaced string to the fitter distorts the advance-width solve, so the
    spaces are restored by mapping each measured gap onto the character index at
    the equivalent cumulative-advance fraction.
    """
    if not gaps or len(text.strip()) < 3:
        return text
    # If OCR already produced at least as many spaces as measured word gaps, its
    # spacing is trusted. Otherwise spaces are re-derived from scratch, which
    # also repairs partial drops such as "You'llfinally enjoy".
    if text.count(" ") >= len(gaps):
        return text
    text = re.sub(r"\s+", "", text)
    try:
        f = ImageFont.truetype(font_path, 100)
        if axes:
            try:
                f.set_variation_by_axes(axes)
            except Exception:
                pass
        widths = [f.getlength(c) for c in text]
    except Exception:
        widths = [1.0] * len(text)
    total = sum(widths) or 1.0
    cum, acc = [], 0.0
    for wd in widths:
        acc += wd
        cum.append(acc / total)

    idxs = []
    for g in gaps:
        best = min(range(len(cum)), key=lambda i: abs(cum[i] - g))
        if 0 < best + 1 < len(text):
            idxs.append(best + 1)
    out = text
    for i in sorted(set(idxs), reverse=True):
        out = out[:i] + " " + out[i:]
    return re.sub(r"\s{2,}", " ", out)


def otsu_threshold(sub: np.ndarray) -> int:
    """Classic Otsu threshold over an 8-bit patch."""
    hist = np.bincount(sub.reshape(-1), minlength=256).astype(np.float64)
    total = hist.sum()
    if total <= 0:
        return 128
    omega = np.cumsum(hist) / total
    mu = np.cumsum(hist * np.arange(256)) / total
    mu_t = mu[-1]
    denom = omega * (1.0 - omega)
    with np.errstate(divide="ignore", invalid="ignore"):
        sigma_b = (mu_t * omega - mu) ** 2 / denom
    sigma_b[~np.isfinite(sigma_b)] = -1.0
    return int(np.argmax(sigma_b))


def glyph_mask(sub_gray: np.ndarray) -> tuple[np.ndarray, bool, dict]:
    """Isolate glyph ink within a text patch.

    Returns (mask, is_light_text, diagnostics).

    Text ink is the minority pixel population inside a tight text box, so the
    patch is split with Otsu and whichever side covers less area is taken as the
    ink. Comparing a patch to its surrounding ring instead fails on light
    backgrounds: it can report light-on-dark for dark-on-light artwork, which
    inverts the mask and silently corrupts colour sampling and font matching.
    """
    if sub_gray.size == 0:
        return np.zeros((1, 1), bool), True, {"method": "empty"}

    t = otsu_threshold(sub_gray)
    hi = sub_gray > t
    lo = ~hi
    hi_n, lo_n = int(hi.sum()), int(lo.sum())

    if hi_n == 0 or lo_n == 0:
        med = float(np.median(sub_gray))
        mask = sub_gray > med
        return mask, True, {"method": "degenerate-split", "threshold": t}

    light = hi_n <= lo_n
    mask = hi if light else lo
    coverage = float(mask.sum()) / mask.size

    # A text box should be mostly background. If the chosen class dominates the
    # patch, the split is untrustworthy, so fall back to a percentile cut on the
    # same polarity.
    if coverage > 0.62:
        if light:
            mask = sub_gray >= np.percentile(sub_gray, 88)
        else:
            mask = sub_gray <= np.percentile(sub_gray, 12)
        method = "percentile-fallback"
    else:
        method = "otsu-minority"

    return mask, bool(light), {
        "method": method,
        "threshold": int(t),
        "inkCoverage": round(float(mask.sum()) / mask.size, 4),
        "highClassPixels": hi_n,
        "lowClassPixels": lo_n,
    }


def is_light_text(gray: np.ndarray, box: dict) -> bool:
    """Convenience wrapper: polarity of the text inside a box."""
    x0, y0 = max(0, int(box["x"])), max(0, int(box["y"]))
    x1 = min(gray.shape[1], int(box["x"] + box["width"]))
    y1 = min(gray.shape[0], int(box["y"] + box["height"]))
    if x1 <= x0 or y1 <= y0:
        return True
    _, light, _ = glyph_mask(gray[y0:y1, x0:x1])
    return light


# --------------------------------------------------------------------------
# Font fitting
# --------------------------------------------------------------------------


def _load_font(path: str, size: int, axes: list[float] | None):
    f = ImageFont.truetype(path, size)
    if axes:
        try:
            f.set_variation_by_axes(axes)
        except Exception:
            pass
    return f


_CMAP_CACHE: dict[str, set[int]] = {}


def supported_ratio(text: str, path: str) -> float:
    """Fraction of non-space characters the font actually has glyphs for.

    Characters such as '→' are frequently absent from text faces. Rendering them
    yields blank or .notdef boxes, which drives the IoU to zero and makes a
    correct family look like a total mismatch.
    """
    if path not in _CMAP_CACHE:
        try:
            from fontTools.ttLib import TTFont

            tt = TTFont(path, lazy=True)
            cps: set[int] = set()
            for table in tt["cmap"].tables:
                cps.update(table.cmap.keys())
            tt.close()
            _CMAP_CACHE[path] = cps
        except Exception:
            _CMAP_CACHE[path] = set()
    cps = _CMAP_CACHE[path]
    if not cps:
        return 1.0
    chars = [c for c in text if not c.isspace()]
    if not chars:
        return 1.0
    return sum(1 for c in chars if ord(c) in cps) / len(chars)


def _render_mask(text: str, path: str, size: int, tracking: float,
                 axes: list[float] | None) -> np.ndarray | None:
    try:
        f = _load_font(path, size, axes)
    except Exception:
        return None
    pad = 60
    est = sum(f.getlength(c) for c in text) + tracking * max(0, len(text) - 1)
    W = int(est) + pad * 2
    H = int(size * 3) + pad
    if W <= 0 or W > 20000 or H <= 0:
        return None
    img = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(img)
    x = float(pad)
    for ch in text:
        d.text((x, pad / 2), ch, font=f, fill=255)
        x += f.getlength(ch) + tracking
    a = np.array(img) > 200
    if a.sum() < 4:
        return None
    ys, xs = np.where(a)
    return a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def _norm_iou(ref: np.ndarray, cand: np.ndarray) -> float:
    """IoU with candidate resampled to the reference ink box.

    Removes scale/size mismatch so the score reflects letterform + weight.
    """
    if ref.size == 0 or cand.size == 0:
        return 0.0
    ci = Image.fromarray((cand * 255).astype(np.uint8)).resize(
        (ref.shape[1], ref.shape[0]), Image.LANCZOS
    )
    C = np.array(ci) > 127
    union = (ref | C).sum()
    return float((ref & C).sum() / union) if union else 0.0


_FVAR_CACHE: dict[str, list[dict]] = {}


def fvar_axes(path: str) -> list[dict]:
    """Read the font's real fvar axis order.

    Critical: Pillow's set_variation_by_axes() takes values in the font's own
    fvar order, which is NOT necessarily the alphabetical order that appears in
    the Google Fonts filename. Archivo's filename is 'Archivo[wdth,wght].ttf'
    but its fvar order is (wght, wdth) — inferring from the filename silently
    swaps weight and width.
    """
    if path in _FVAR_CACHE:
        return _FVAR_CACHE[path]
    axes: list[dict] = []
    try:
        from fontTools.ttLib import TTFont

        tt = TTFont(path, lazy=True)
        if "fvar" in tt:
            for a in tt["fvar"].axes:
                axes.append(
                    {"tag": a.axisTag, "min": float(a.minValue),
                     "default": float(a.defaultValue), "max": float(a.maxValue)}
                )
        tt.close()
    except Exception:
        axes = []
    _FVAR_CACHE[path] = axes
    return axes


def _axis_candidates(font_files: list[dict],
                     style: str | None = None) -> list[tuple[str, list[float] | None, str]]:
    """Expand font files into (path, axes, label) candidates.

    style: 'normal' or 'italic' to restrict candidates; None means no filter.
    """
    out = []
    for f in font_files:
        p, name = f["path"], f["file"]
        f_italic = "italic" in name.lower() or f.get("style") == "italic"
        if style == "normal" and f_italic:
            continue
        if style == "italic" and not f_italic:
            continue

        axes = fvar_axes(p)
        if f["kind"] == "variable" and axes:
            weights = [300, 400, 500, 600, 700, 800, 900]
            widths = [75.0, 87.5, 100.0, 112.5]
            tags = [a["tag"] for a in axes]

            def clamp(ax, v):
                return max(ax["min"], min(ax["max"], v))

            combos: list[list[float]] = [[]]
            for ax in axes:
                nxt = []
                if ax["tag"] == "wght":
                    vals = sorted({clamp(ax, w) for w in weights})
                elif ax["tag"] == "wdth":
                    vals = sorted({clamp(ax, w) for w in widths})
                else:
                    vals = [ax["default"]]
                for base in combos:
                    for v in vals:
                        nxt.append(base + [v])
                combos = nxt
            for c in combos:
                label = name + " " + ",".join(f"{t}={v:g}" for t, v in zip(tags, c))
                out.append((p, c, label))
        else:
            out.append((p, None, name))
    return out


def reconcile_block(lines: list[dict], font_files: list[dict],
                    style: str | None = None) -> dict | None:
    """Find one shared (file, axes, size, tracking) for all lines of a block.

    Lines belonging to the same text block are almost always set with a single
    font, size and tracking in the source design. Fitting each line
    independently can return inconsistent settings (e.g. 77px at width 87.5 for
    one line and 67px at width 100 for the next). This re-solves the block under
    a shared-setting constraint and reports the mean IoU achieved.

    lines: [{"text": str, "mask": np.ndarray, "targetWidth": int}, ...]
    """
    lines = [l for l in lines if l.get("text", "").strip() and l.get("mask") is not None]
    if len(lines) < 2 or not font_files:
        return None

    cands = _axis_candidates(font_files, style=style) or _axis_candidates(font_files)
    anchor = max(lines, key=lambda l: l["mask"].sum())
    n_anchor = max(1, len(anchor["text"]) - 1)

    results = []
    for path, axes, label in cands[:400]:
        try:
            probe = _load_font(path, 100, axes)
            nat100 = sum(probe.getlength(c) for c in anchor["text"])
        except Exception:
            continue
        if nat100 <= 0:
            continue
        base = int(round(100 * anchor["targetWidth"] / nat100))
        for size in {max(6, base - 1), max(6, base), max(6, base + 1)}:
            try:
                f = _load_font(path, size, axes)
                nat = sum(f.getlength(c) for c in anchor["text"])
            except Exception:
                continue
            track = (anchor["targetWidth"] - nat) / n_anchor
            if not (-0.12 * size <= track <= 0.45 * size):
                continue
            ious, widths = [], []
            ok = True
            for l in lines:
                m = _render_mask(l["text"], path, size, track, axes)
                if m is None:
                    ok = False
                    break
                ious.append(_norm_iou(l["mask"], m))
                widths.append(int(m.shape[1]))
            if not ok or not ious:
                continue
            results.append({
                "meanIou": round(float(np.mean(ious)), 4),
                "minIou": round(float(np.min(ious)), 4),
                "perLineIou": [round(v, 4) for v in ious],
                "renderedWidths": widths,
                "targetWidths": [l["targetWidth"] for l in lines],
                "fontFile": Path(path).name,
                "fontPath": path,
                "variationAxes": axes,
                "candidateLabel": label,
                "fontSizePx": size,
                "letterSpacingPx": round(track, 2),
            })
    if not results:
        return None
    results.sort(key=lambda r: (-r["meanIou"], -r["minIou"]))
    best = results[0]
    top = best["meanIou"]
    best["confidence"] = (
        "high" if top >= 0.70 else "medium" if top >= 0.55 else "low" if top >= 0.40 else "very-low"
    )
    best["alternates"] = [
        {k: r[k] for k in ("meanIou", "fontFile", "fontSizePx", "letterSpacingPx", "candidateLabel")}
        for r in results[1:4]
    ]
    return best


def fit_font(ref_mask: np.ndarray, text: str, target_w: int,
             font_files: list[dict], max_candidates: int = 400,
             style: str | None = None) -> dict | None:
    """Find the best (file, axes, size, tracking) reproducing the reference ink.

    Strategy:
      1. Analytically solve the pixel size whose natural advance width is close
         to the measured ink width (cheap, uses getlength only).
      2. Derive the residual tracking needed to land exactly on target width.
      3. Score the top candidates with scale-normalised IoU.

    style restricts candidates to upright or italic faces, determined upstream by
    measuring the actual slant of the reference glyphs.
    """
    if not text.strip() or ref_mask.size == 0 or target_w <= 0:
        return None

    cands = _axis_candidates(font_files, style=style)
    if not cands:
        cands = _axis_candidates(font_files, style=None)
    cands = cands[:max_candidates]
    n_gaps = max(1, len(text) - 1)
    scored = []
    coverage: dict[str, float] = {}

    for path, axes, label in cands:
        if path not in coverage:
            coverage[path] = supported_ratio(text, path)
        # analytic size solve
        try:
            probe = _load_font(path, 100, axes)
            nat100 = sum(probe.getlength(c) for c in text)
        except Exception:
            continue
        if nat100 <= 0:
            continue
        size = int(round(100 * target_w / nat100))
        for s in {max(6, size - 1), max(6, size), max(6, size + 1)}:
            try:
                f = _load_font(path, s, axes)
                nat = sum(f.getlength(c) for c in text)
            except Exception:
                continue
            track = (target_w - nat) / n_gaps
            if not (-0.12 * s <= track <= 0.45 * s):
                continue
            scored.append((path, axes, label, s, round(track, 2)))

    if not scored:
        return None

    results = []
    for path, axes, label, s, track in scored:
        m = _render_mask(text, path, s, track, axes)
        if m is None:
            continue
        results.append(
            {
                "iou": round(_norm_iou(ref_mask, m), 4),
                "fontFile": Path(path).name,
                "fontPath": path,
                "variationAxes": axes,
                "candidateLabel": label,
                "fontSizePx": s,
                "letterSpacingPx": track,
                "glyphCoverage": round(coverage.get(path, 1.0), 3),
                "renderedInk": {"width": int(m.shape[1]), "height": int(m.shape[0])},
            }
        )
    if not results:
        return None
    # Rank by IoU but prefer faces that actually cover the characters, so a
    # missing glyph does not disqualify an otherwise correct family.
    results.sort(key=lambda r: -(r["iou"] * (0.55 + 0.45 * r["glyphCoverage"])))
    best = results[0]
    best["alternates"] = [
        {k: r[k] for k in ("iou", "fontFile", "fontSizePx", "letterSpacingPx", "candidateLabel")}
        for r in results[1:4]
    ]
    top = best["iou"]
    best["confidence"] = (
        "high" if top >= 0.70 else "medium" if top >= 0.55 else "low" if top >= 0.40 else "very-low"
    )
    return best


# --------------------------------------------------------------------------
# Colour analysis
# --------------------------------------------------------------------------


def hexof(rgb) -> str:
    r, g, b = (int(max(0, min(255, v))) for v in rgb[:3])
    return f"#{r:02x}{g:02x}{b:02x}"


def _lum(rgb) -> float:
    r, g, b = [v / 255 for v in rgb[:3]]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def _sat(rgb) -> float:
    r, g, b = [v / 255 for v in rgb[:3]]
    return colorsys.rgb_to_hsv(r, g, b)[1]


def contrast_ratio(a, b) -> float:
    la, lb = _lum(a), _lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return round((hi + 0.05) / (lo + 0.05), 2)


def kmeans_palette(rgb: np.ndarray, k: int = 6, iters: int = 14,
                   sample: int = 24000, seed: int = 7) -> list[dict]:
    """Small deterministic k-means over sampled pixels."""
    flat = rgb.reshape(-1, 3).astype(np.float32)
    if flat.shape[0] > sample:
        idx = np.linspace(0, flat.shape[0] - 1, sample).astype(int)
        flat = flat[idx]
    rs = np.random.RandomState(seed)
    cent = flat[rs.choice(flat.shape[0], k, replace=False)]
    labels = np.zeros(flat.shape[0], dtype=int)
    for _ in range(iters):
        d = ((flat[:, None, :] - cent[None, :, :]) ** 2).sum(-1)
        labels = d.argmin(1)
        for j in range(k):
            sel = flat[labels == j]
            if len(sel):
                cent[j] = sel.mean(0)
    out = []
    for j in range(k):
        n = int((labels == j).sum())
        if not n:
            continue
        c = cent[j]
        out.append(
            {
                "hex": hexof(c),
                "rgb": [int(v) for v in c],
                "share": round(n / len(flat), 4),
                "luminance": round(_lum(c), 4),
                "saturation": round(_sat(c), 4),
            }
        )
    out.sort(key=lambda c: -c["share"])
    return out


def semantic_colours(rgb: np.ndarray, text_elements: list[dict],
                     palette: list[dict]) -> dict:
    """Map observed colours onto the required semantic names.

    Names: background, surface, textPrimary, textSecondary,
           accent, accentSecondary, overlay, onAccent
    """
    H, W = rgb.shape[:2]
    out: dict[str, dict | None] = {}

    def rec(name, rgbv, where, how):
        out[name] = {
            "hex": hexof(rgbv),
            "rgb": [int(v) for v in rgbv[:3]],
            "sampledAt": where,
            "method": how,
        }

    # background: dominant low-saturation cluster, corroborated by corners
    corners = [
        ("topLeft", (8, 8)), ("topRight", (W - 9, 8)),
        ("bottomLeft", (8, H - 9)), ("bottomRight", (W - 9, H - 9)),
    ]
    corner_vals = {n: rgb[y, x] for n, (x, y) in corners}
    bg_cluster = min(palette, key=lambda c: (c["saturation"], -c["share"])) if palette else None
    med_corner = np.median(np.stack(list(corner_vals.values())), axis=0)
    if bg_cluster:
        rec("background", bg_cluster["rgb"], "dominant low-saturation cluster",
            "k-means dominant cluster")
    else:
        rec("background", med_corner, "corner median", "corner sampling")
    out["_cornerSamples"] = {n: hexof(v) for n, v in corner_vals.items()}

    # surface: second-largest cluster distinct from background
    if len(palette) > 1:
        bgrgb = np.array(out["background"]["rgb"], dtype=float)
        cand = [c for c in palette
                if np.linalg.norm(np.array(c["rgb"], dtype=float) - bgrgb) > 28]
        if cand:
            rec("surface", cand[0]["rgb"], "second distinct cluster",
                "k-means secondary cluster")
        else:
            out["surface"] = None
    else:
        out["surface"] = None

    # text colours from measured glyph ink
    txt = [t for t in text_elements if t.get("colour")]
    if txt:
        ordered = sorted(
            txt,
            key=lambda t: -(t.get("inkBox", {}).get("height", 0) or 0),
        )
        rec("textPrimary", ordered[0]["colour"]["rgb"],
            f"glyph ink of '{ordered[0].get('text', '')[:28]}'", "glyph ink median")
        sec = None
        for t in ordered[1:]:
            if np.linalg.norm(
                np.array(t["colour"]["rgb"], dtype=float)
                - np.array(ordered[0]["colour"]["rgb"], dtype=float)
            ) > 22:
                sec = t
                break
        if sec is None and len(ordered) > 1:
            sec = ordered[1]
        if sec:
            rec("textSecondary", sec["colour"]["rgb"],
                f"glyph ink of '{sec.get('text', '')[:28]}'", "glyph ink median")
        else:
            out["textSecondary"] = None
    else:
        out["textPrimary"] = None
        out["textSecondary"] = None

    # accents: most saturated meaningful clusters
    sat_ranked = [c for c in palette if c["saturation"] > 0.18 and c["share"] > 0.015]
    sat_ranked.sort(key=lambda c: -(c["saturation"] * math.sqrt(c["share"])))
    if sat_ranked:
        rec("accent", sat_ranked[0]["rgb"], "highest saturation-weighted cluster",
            "k-means + saturation ranking")
        if len(sat_ranked) > 1:
            rec("accentSecondary", sat_ranked[1]["rgb"],
                "second saturation-weighted cluster", "k-means + saturation ranking")
        else:
            out["accentSecondary"] = None
        # onAccent: whichever of white/black contrasts better with accent
        acc = out["accent"]["rgb"]
        white_c, black_c = contrast_ratio(acc, (255, 255, 255)), contrast_ratio(acc, (0, 0, 0))
        pick = (255, 255, 255) if white_c >= black_c else (0, 0, 0)
        out["onAccent"] = {
            "hex": hexof(pick),
            "rgb": list(pick),
            "sampledAt": "derived",
            "method": "max WCAG contrast against accent",
            "contrastRatio": max(white_c, black_c),
        }
    else:
        out["accent"] = None
        out["accentSecondary"] = None
        out["onAccent"] = None

    return out


# --------------------------------------------------------------------------
# Overlay / gradient detection
# --------------------------------------------------------------------------


def detect_overlay(rgb: np.ndarray, margin: int = 6) -> dict:
    """Estimate a vertical/horizontal darkening gradient over the artwork."""
    H, W = rgb.shape[:2]
    g = rgb.astype(np.float32).mean(2)
    rows = g[:, margin:W - margin].mean(1)
    cols = g[margin:H - margin, :].mean(0)

    def band(a, n=12):
        step = max(1, len(a) // n)
        return [round(float(a[i:i + step].mean()), 1) for i in range(0, len(a), step)][:n]

    row_band, col_band = band(rows), band(cols)
    v_range = float(rows.max() - rows.min())
    h_range = float(cols.max() - cols.min())

    if max(v_range, h_range) < 12:
        direction, strength = "none", 0.0
    elif v_range >= h_range:
        direction = "to bottom" if rows[:len(rows) // 3].mean() < rows[-len(rows) // 3:].mean() else "to top"
        strength = v_range
    else:
        direction = "to right" if cols[:len(cols) // 3].mean() < cols[-len(cols) // 3:].mean() else "to left"
        strength = h_range

    brightest = float(max(rows.max(), cols.max()))
    stops = []
    if direction != "none":
        seq = rows if direction in ("to bottom", "to top") else cols
        if direction in ("to top", "to left"):
            seq = seq[::-1]
        n = len(seq)
        for pct in (0, 25, 50, 75, 100):
            i = min(n - 1, int(n * pct / 100))
            window = seq[max(0, i - 4):i + 5]
            val = float(window.mean()) if len(window) else float(seq[i])
            alpha = max(0.0, min(1.0, 1.0 - (val / brightest))) if brightest > 0 else 0.0
            stops.append({"position": f"{pct}%", "estimatedBlackAlpha": round(alpha, 3)})

    return {
        "detected": direction != "none",
        "type": "linear-gradient" if direction != "none" else None,
        "direction": None if direction == "none" else direction,
        "brightnessRangeAcrossAxis": round(strength, 1),
        "verticalBrightnessBands": row_band,
        "horizontalBrightnessBands": col_band,
        "estimatedStops": stops,
        "note": (
            "Darkening estimated from image brightness only. It cannot be separated "
            "into 'photo shading' vs 'applied overlay layer' from a flattened render."
        ),
    }


def focal_point(rgb: np.ndarray) -> dict:
    """Estimate subject focus via local detail (gradient energy) centre of mass."""
    g = rgb.astype(np.float32).mean(2)
    gy, gx = np.gradient(g)
    energy = np.hypot(gx, gy)
    thr = np.percentile(energy, 88)
    m = energy >= thr
    H, W = g.shape
    if m.sum() < 40:
        return {"x": 50.0, "y": 50.0, "method": "fallback centre", "confidence": "low"}
    ys, xs = np.where(m)
    return {
        "x": round(float(xs.mean()) / W * 100, 1),
        "y": round(float(ys.mean()) / H * 100, 1),
        "method": "gradient-energy centre of mass (top 12% detail)",
        "confidence": "medium",
    }


def edge_bleed(rgb: np.ndarray) -> dict:
    """Whether artwork appears full-bleed vs framed by a flat border."""
    H, W = rgb.shape[:2]
    g = rgb.astype(np.float32).mean(2)
    res = {}
    for name, strip in (
        ("top", g[0:10, :]), ("bottom", g[H - 10:H, :]),
        ("left", g[:, 0:10]), ("right", g[:, W - 10:W]),
    ):
        res[name] = {
            "meanBrightness": round(float(strip.mean()), 1),
            "stdDev": round(float(strip.std()), 1),
            "flat": bool(strip.std() < 6),
        }
    flat_edges = sum(1 for v in res.values() if v["flat"])
    return {
        "edges": res,
        "flatEdgeCount": flat_edges,
        "likelyFullBleed": flat_edges <= 1,
        "likelyFramed": flat_edges >= 3,
    }
