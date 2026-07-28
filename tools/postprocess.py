"""
Post-processing pass over completed analyses.

Two distinct things were being conflated under a single "confidence" label:

  1. Which font FAMILY a template uses. This is authoritative — Pixy's
     /templates endpoint declares it per template. It is not guessed.
  2. The fitted size / weight / width / tracking, recovered by rendering
     candidates and scoring them against the reference glyph ink.

Only (2) is uncertain, so the two are reported separately. The pass also
attributes low fit scores to their most likely cause, because a corrupted OCR
string ("confdence", "delivereffortless") produces a low score even when the
font family and size are correct.

Two alternative scoring metrics were trialled before settling here:
  * tracking/size refinement sweep — mean IoU gain of only +0.025, not worth it
  * height-normalised IoU with shift search — materially worse (-0.254 mean),
    because ink height depends on which ascenders and descenders a line happens
    to contain, so normalising by height misscales the candidate
The box-normalised IoU already in use was the best of the three.
"""

from __future__ import annotations

import glob
import json
import re
from pathlib import Path

import analyzer as AZ
from analyse_one import render_markdown

VOWELS = set("aeiouyAEIOUY")


def suspicious_text(text: str, ocr_conf: float) -> tuple[bool, list[str]]:
    """Flag OCR output that is likely corrupted."""
    reasons = []
    if ocr_conf < 0.93:
        reasons.append(f"low OCR confidence ({ocr_conf})")
    words = [w for w in re.split(r"\s+", text) if w]
    for w in words:
        core = re.sub(r"[^A-Za-z]", "", w)
        if len(core) >= 5 and not (set(core) & VOWELS):
            reasons.append(f"vowel-less token '{w}'")
            break
    # run-together words: a long token containing a lowercase->uppercase seam
    for w in words:
        if len(w) >= 14 and re.search(r"[a-z]{3}[A-Z]", w):
            reasons.append(f"possible run-together token '{w}'")
            break
    if len(words) == 1 and len(text) >= 16:
        reasons.append("single long token with no spaces")
    return (bool(reasons), reasons)


def classify(iou: float | None, text_ok: bool,
             render_model: str = "solid-vector-text") -> tuple[str, str]:
    """Return (label, interpretation) for a geometry fit score."""
    if render_model == "text-in-photograph":
        return "not-applicable-rasterText", (
            "this is text printed on a photographed object, not editable type, so a "
            "font fit is not meaningful and no font claim is made"
        )
    if iou is None:
        return "unresolved", "no viable candidate could be rendered"
    if iou >= 0.70:
        return "high", "fitted metrics closely reproduce the reference glyph ink"
    if iou >= 0.55:
        return "medium", "fitted metrics reproduce the reference well; minor drift"
    if iou >= 0.40:
        return ("low-textUnreliable" if not text_ok else "low"), (
            "plausible but unverified; "
            + ("OCR text is suspect, so the score understates the fit"
               if not text_ok else "letterform drift across the line")
        )
    return ("very-low-textUnreliable" if not text_ok else "very-low"), (
        "not verified; "
        + ("driven by corrupted OCR text rather than a wrong family"
           if not text_ok else
           "commonly outlined/hollow type, an offset duplicate layer, overlapping "
           "copies of a word, or incomplete OCR capture")
    )


def process(path: Path) -> dict:
    a = json.loads(path.read_text())

    # Keep the required semantic colour schema complete. Overlay evidence was
    # already measured in effects.overlayGradient, so this pass can update old
    # analyses without rerunning OCR or font fitting.
    semantic = a.setdefault("colours", {}).setdefault("semantic", {})
    overlay = (a.get("effects") or {}).get("overlayGradient") or {}
    semantic["overlay"] = AZ.semantic_overlay(overlay)

    declared = [f["family"] for f in a.get("fonts", [])]
    resolved = [f["family"] for f in a.get("fonts", []) if f.get("resolved")]

    stats = {"high": 0, "medium": 0, "low": 0, "very-low": 0, "unresolved": 0,
             "not-applicable-rasterText": 0, "textUnreliable": 0}

    for e in a.get("elements", []):
        t = e.setdefault("typography", {})
        ok, reasons = suspicious_text(e.get("text", ""), e.get("ocrConfidence", 1.0))
        text_ok = not ok
        rm = (e.get("renderModel") or {}).get("model", "solid-vector-text")
        label, interp = classify(t.get("matchIou"), text_ok, rm)
        t["renderModel"] = rm

        t["fontFamilyIdentification"] = {
            "value": declared,
            "basis": "declared by the Pixy /templates API for this template",
            "confidence": "authoritative",
            "note": "the family is not inferred from pixels; only size, weight, "
                    "width and tracking are fitted",
        }
        t["geometryFitConfidence"] = {
            "label": label,
            "matchIou": t.get("matchIou"),
            "metric": "scale-normalised IoU between the fitted render and the "
                      "reference glyph ink",
            "interpretation": interp,
            "isLowerBound": True,
            "note": "a conservative similarity score; a mid-range value does not "
                    "imply the wrong family, and is frequently caused by OCR text "
                    "error or per-character placement in the source design",
        }
        t["textReliability"] = {
            "reliable": text_ok,
            "ocrConfidence": e.get("ocrConfidence"),
            "flags": reasons,
            "spacesRestored": e.get("textSpacesRestored"),
        }
        # keep the original flat key for compatibility, now unambiguous
        t["confidence"] = label

        base = label.replace("-textUnreliable", "")
        stats[base] = stats.get(base, 0) + 1
        if not text_ok:
            stats["textUnreliable"] += 1

    a["confidenceModel"] = {
        "fontFamily": {
            "declared": declared,
            "resolvedToFiles": resolved,
            "unresolved": [f for f in declared if f not in resolved],
            "confidence": "authoritative — supplied by the Pixy API, not inferred",
        },
        "fittedMetrics": {
            "what": ["fontSizePx", "letterSpacingPx", "variationAxes (weight/width)"],
            "how": "candidate renders scored by scale-normalised IoU against the "
                   "reference glyph ink",
            "distribution": stats,
            "caveat": "IoU is a conservative lower bound on fit quality. Alternative "
                      "metrics were trialled and performed worse; see BATCH-REPORT.md.",
        },
    }
    path.write_text(json.dumps(a, indent=2))
    path.with_name("ANALYSIS.md").write_text(render_markdown(a))
    return stats


def main() -> None:
    root = Path(__file__).resolve().parent.parent / "analysis"
    total: dict[str, int] = {}
    n = 0
    for p in sorted(glob.glob(str(root / "[0-9][0-9][0-9]-*" / "analysis.json"))):
        st = process(Path(p))
        for k, v in st.items():
            total[k] = total.get(k, 0) + v
        n += 1
    print(f"post-processed {n} analyses")
    for k, v in sorted(total.items(), key=lambda kv: -kv[1]):
        print(f"  {k:22s} {v}")


if __name__ == "__main__":
    main()
