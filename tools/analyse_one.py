"""
Analyse a single template into analysis/<NNN>-<slug>/.

Emits:
  reference.png                 the exact render Pixy serves
  analysis.json                 machine-readable analysis
  ANALYSIS.md                   human-readable report
  assets/fonts/*                exact font files when legally downloadable
  assets/images/…               collected source media
  assets/background-approx.png  optional, clearly-labelled inpainted background

Scope: analysis + asset collection only. No HTML/CSS/manifest output.
"""

from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

import analyzer as AZ
import text_repair as TR
from gfonts import FontCache

UA = {"User-Agent": "pixy-analyser"}


def slugify(name: str, maxlen: int = 48) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", (name or "untitled").lower()).strip("-")
    return (s[:maxlen].rstrip("-")) or "untitled"


def jsonable(o):
    """Convert numpy scalars/arrays to plain Python for JSON serialisation."""
    if isinstance(o, dict):
        return {k: jsonable(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return [jsonable(v) for v in o]
    if isinstance(o, np.ndarray):
        return jsonable(o.tolist())
    if isinstance(o, np.integer):
        return int(o)
    if isinstance(o, np.floating):
        return round(float(o), 6)
    if isinstance(o, np.bool_):
        return bool(o)
    return o


def download(url: str, dest: Path, retries: int = 3) -> bool:
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
            if len(data) < 512:
                return False
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return True
        except Exception:
            if attempt == retries - 1:
                return False
    return False


# --------------------------------------------------------------------------


def build_background_approx(img: Image.Image, text_boxes: list[dict],
                            dest: Path) -> dict:
    """Create a clearly-labelled approximate background with text removed.

    This is NOT the original asset. Pixy serves only a flattened render, so the
    text is painted into the pixels. This fills text areas from vertical
    neighbours. It is recorded as 'approximate' everywhere it appears.
    """
    if not text_boxes:
        return {"created": False, "reason": "no text regions detected"}

    rgba = img.convert("RGBA")
    arr = np.array(rgba)
    H, W = arr.shape[:2]

    mask = np.zeros((H, W), bool)
    for b in text_boxes:
        x0 = max(0, int(b["x"]) - 6)
        y0 = max(0, int(b["y"]) - 6)
        x1 = min(W, int(b["x"] + b["width"]) + 6)
        y1 = min(H, int(b["y"] + b["height"]) + 6)
        mask[y0:y1, x0:x1] = True

    if mask.sum() == 0:
        return {"created": False, "reason": "empty mask"}

    out = arr.copy()
    ys_any = np.where(mask.any(1))[0]
    y_lo, y_hi = int(ys_any.min()), int(ys_any.max())

    for x in range(W):
        col = mask[:, x]
        if not col.any():
            continue
        ys = np.where(col)[0]
        # contiguous spans
        splits = np.where(np.diff(ys) > 1)[0]
        spans = np.split(ys, splits + 1)
        for span in spans:
            a, b = int(span[0]), int(span[-1])
            above = arr[a - 1, x, :3] if a - 1 >= 0 else None
            below = arr[b + 1, x, :3] if b + 1 < H else None
            if above is not None and below is not None:
                n = b - a + 1
                for i in range(n):
                    t = (i + 1) / (n + 1)
                    out[a + i, x, :3] = (above * (1 - t) + below * t).astype(np.uint8)
            elif above is not None:
                out[a:b + 1, x, :3] = above
            elif below is not None:
                out[a:b + 1, x, :3] = below

    res = Image.fromarray(out)
    pad_lo, pad_hi = max(0, y_lo - 14), min(H, y_hi + 14)
    strip = res.crop((0, pad_lo, W, pad_hi)).filter(ImageFilter.GaussianBlur(2.5))
    res.paste(strip, (0, pad_lo))
    dest.parent.mkdir(parents=True, exist_ok=True)
    res.save(dest)
    return {
        "created": True,
        "path": str(dest.relative_to(dest.parent.parent.parent)),
        "accuracy": "APPROXIMATE — reconstructed, not the original asset",
        "method": "vertical neighbour interpolation over text spans + local blur",
        "maskedPixels": int(mask.sum()),
        "maskedShare": round(float(mask.sum()) / (H * W), 4),
    }


# --------------------------------------------------------------------------


def analyse(tpl: dict, index: int, out_root: Path, font_cache: FontCache,
            source_kind: str = "template") -> dict:
    """Analyse one template. Returns the analysis dict (also written to disk)."""
    num = f"{index:03d}"
    slug = slugify(tpl.get("name"))
    tdir = out_root / f"{num}-{slug}"
    (tdir / "assets" / "fonts").mkdir(parents=True, exist_ok=True)
    (tdir / "assets" / "images").mkdir(parents=True, exist_ok=True)

    assets_report = {"exact": [], "approximate": [], "missing": []}

    # ---- reference render -------------------------------------------------
    ref_path = tdir / "reference.png"
    thumb = tpl.get("thumbnail")
    got_ref = bool(thumb) and download(thumb, ref_path)
    if got_ref:
        assets_report["exact"].append(
            {"asset": "reference.png", "sourceUrl": thumb,
             "note": "flattened render served by Pixy CDN"}
        )
    else:
        assets_report["missing"].append(
            {"asset": "reference.png", "sourceUrl": thumb,
             "reason": "download failed or no thumbnail URL"}
        )
        return {
            "template": {"number": num, "name": tpl.get("name"), "designId": tpl.get("id")},
            "status": "failed",
            "error": "reference image unavailable",
            "assets": assets_report,
        }

    # extra page thumbnails, when the template is multi-page
    for i, purl in enumerate(tpl.get("pageThumbnails") or []):
        if isinstance(purl, str) and purl.startswith("http"):
            p = tdir / "assets" / "images" / f"page-{i + 1:02d}.png"
            if download(purl, p):
                assets_report["exact"].append(
                    {"asset": f"assets/images/page-{i + 1:02d}.png", "sourceUrl": purl}
                )

    img = Image.open(ref_path).convert("RGB")
    W, H = img.size
    rgb = np.array(img)
    gray = np.array(img.convert("L"))

    # ---- fonts ------------------------------------------------------------
    declared = tpl.get("fonts") or []
    font_entries, font_files = [], []
    for fam in declared:
        e = font_cache.resolve(fam)
        rel = []
        for f in e.get("files", []):
            dest = tdir / "assets" / "fonts" / f["file"]
            try:
                if not dest.exists():
                    dest.write_bytes(Path(f["path"]).read_bytes())
                rel.append(f["file"])
                assets_report["exact"].append(
                    {"asset": f"assets/fonts/{f['file']}", "sourceUrl": f.get("sourceUrl"),
                     "licence": e.get("licence")}
                )
            except Exception:
                pass
        font_entries.append({
            "family": fam,
            "declaredByPixy": True,
            "resolved": e.get("found", False),
            "licence": e.get("licence"),
            "sourceUrl": e.get("sourceUrl"),
            "localFiles": rel,
            "note": e.get("note"),
        })
        if e.get("found"):
            font_files.extend(e["files"])
        else:
            assets_report["missing"].append(
                {"asset": f"font:{fam}", "reason": e.get("note") or "unresolved"}
            )

    # ---- text elements ----------------------------------------------------
    ocr_blocks = AZ.run_ocr(str(ref_path))
    ocr_blocks = [b for b in ocr_blocks if "_error" not in b]

    text_elements, ink_boxes = [], []
    for zi, b in enumerate(ocr_blocks):
        ob = b["ocrBox"]
        # Padding is horizontal only. A vertical pad reaches into the line above
        # or below at normal paragraph leading, so their ascenders and descenders
        # land inside this box, inflate its height and misalign the whole
        # comparison. OCR box edges are already tight vertically, so there is
        # nothing to gain from padding that axis.
        pad_x, pad_y = 6, 1
        region = (int(ob["x"]) - pad_x, int(ob["y"]) - pad_y,
                  int(ob["x"] + ob["width"]) + pad_x, int(ob["y"] + ob["height"]) + pad_y)

        # Polarity comes from the border ring of the box, which is reliably
        # background. Deciding it from whichever pixel class is smaller inverts
        # the mask on large bold type, where the split is near 50/50.
        py0, py1 = max(0, region[1]), min(H, region[3])
        px0, px1 = max(0, region[0]), min(W, region[2])
        if py1 <= py0 or px1 <= px0:
            continue
        # A slightly taller strip is used for the polarity read only, so the ring
        # has genuine background in it, without widening the measured ink box.
        ry0, ry1 = max(0, region[1] - 5), min(H, region[3] + 5)
        light, pol_diag = AZ.decide_polarity(gray[ry0:ry1, px0:px1])

        ib = AZ.ink_bbox(gray, region, light)
        if ib is None:
            continue
        ink_boxes.append(ib)

        stroke = AZ.stroke_stats(gray, ib, light)

        sub_rgb = rgb[ib["y"]:ib["y"] + ib["height"], ib["x"]:ib["x"] + ib["width"]]
        sub_g = gray[ib["y"]:ib["y"] + ib["height"], ib["x"]:ib["x"] + ib["width"]]

        # The same mask drives colour sampling, slant, word gaps and font fitting
        # so those measurements cannot disagree about which pixels are ink.
        ref_mask, light, mask_diag = AZ.glyph_mask(sub_g, light=light)
        mask_diag["polarity"] = pol_diag
        col = (np.median(sub_rgb[ref_mask], axis=0) if ref_mask.sum()
               else np.median(sub_rgb.reshape(-1, 3), axis=0))

        # local background just outside the glyphs
        ring_y0, ring_y1 = max(0, ib["y"] - 12), min(H, ib["y"] + ib["height"] + 12)
        ring_x0, ring_x1 = max(0, ib["x"] - 12), min(W, ib["x"] + ib["width"] + 12)
        ring = rgb[ring_y0:ring_y1, ring_x0:ring_x1].reshape(-1, 3)
        bgc = np.median(ring, axis=0)

        slant = AZ.estimate_slant(ref_mask)
        render_model = AZ.classify_render_model(sub_g, ref_mask, slant["angleDeg"])

        # OCR drops spaces ("GOODBYEPROBLEMS."). Restore them from measured word
        # gaps so the advance-width solve in fit_font is not distorted.
        gaps = AZ.word_gaps(ref_mask)
        text_for_fit = b["text"]
        if font_files:
            text_for_fit = AZ.insert_spaces(
                b["text"], font_files[0]["path"], gaps,
                AZ.fvar_axes(font_files[0]["path"]) and None,
            )

        # Repair the two OCR error classes that dominate professionally set type:
        # ligature loss ("confdence") and run-together words
        # ("delivereffortless"). Both distort the font fit even when the family
        # and size are correct.
        text_for_fit, repair_notes = TR.repair(text_for_fit)

        fit = (
            AZ.fit_font(ref_mask, text_for_fit, ib["width"], font_files,
                        style=slant["style"])
            if font_files else None
        )

        el = {
            "elementId": f"text-{zi + 1}",
            "type": "text",
            "text": text_for_fit,
            "textRawOcr": b["text"],
            "textSpacesRestored": text_for_fit != b["text"],
            "wordGapCount": len(gaps),
            "textRepairs": repair_notes,
            "slant": slant,
            "renderModel": render_model,
            "maskDiagnostics": mask_diag,
            "ocrConfidence": b["ocrConfidence"],
            "zOrder": 100 + zi,
            "rotationDeg": 0,
            "boundingBox": {k: ib[k] for k in ("x", "y", "width", "height")},
            "boundingBoxNormalised": {
                "xPct": round(ib["x"] / W * 100, 2),
                "yPct": round(ib["y"] / H * 100, 2),
                "widthPct": round(ib["width"] / W * 100, 2),
                "heightPct": round(ib["height"] / H * 100, 2),
            },
            "inkBox": ib,
            "ocrBox": ob,
            "alignment": _alignment(ib, W),
            "strokeMetrics": stroke,
            "colour": {"hex": AZ.hexof(col), "rgb": [int(v) for v in col]},
            "localBackground": {"hex": AZ.hexof(bgc), "rgb": [int(v) for v in bgc]},
            "contrastRatioVsLocalBackground": AZ.contrast_ratio(col, bgc),
            "polarity": "light-on-dark" if light else "dark-on-light",
            "opacity": 1.0,
            "borderRadius": None,
            "typography": None,
        }
        if fit:
            el["typography"] = {
                "fontFamilyCandidates": declared,
                "matchedFontFile": fit["fontFile"],
                "variationAxes": fit["variationAxes"],
                "candidateLabel": fit["candidateLabel"],
                "fontSizePx": fit["fontSizePx"],
                "letterSpacingPx": fit["letterSpacingPx"],
                "letterSpacingEm": round(fit["letterSpacingPx"] / fit["fontSizePx"], 4)
                if fit["fontSizePx"] else None,
                "matchIou": fit["iou"],
                "confidence": fit["confidence"],
                "alternates": fit["alternates"],
                "fontStyle": slant["style"],
                "measuredSlantDeg": slant["angleDeg"],
                "textTransform": _transform(text_for_fit),
                "textAlign": _alignment(ib, W),
                "colour": AZ.hexof(col),
            }
        else:
            el["typography"] = {
                "fontFamilyCandidates": declared,
                "confidence": "unresolved",
                "note": "no font files available to fit against"
                        if not font_files else "fitting produced no viable candidate",
                "fontStyle": slant["style"],
                "measuredSlantDeg": slant["angleDeg"],
                "textTransform": _transform(text_for_fit),
                "textAlign": _alignment(ib, W),
                "colour": AZ.hexof(col),
            }
        el["_mask"] = ref_mask
        text_elements.append(el)

    # line grouping + neighbour spacing
    _attach_spacing(text_elements)
    _attach_line_groups(text_elements, W)
    _reconcile_blocks(text_elements, font_files)
    for e in text_elements:
        e.pop("_mask", None)

    # ---- colours ----------------------------------------------------------
    palette = AZ.kmeans_palette(rgb, k=6)
    semantic = AZ.semantic_colours(rgb, text_elements, palette)

    # ---- media / effects --------------------------------------------------
    overlay = AZ.detect_overlay(rgb)
    semantic["overlay"] = AZ.semantic_overlay(overlay)
    focal = AZ.focal_point(rgb)
    bleed = AZ.edge_bleed(rgb)

    text_area = sum(e["inkBox"]["width"] * e["inkBox"]["height"] for e in text_elements)
    media = {
        "boundingBox": {"x": 0, "y": 0, "width": W, "height": H},
        "boundingBoxNormalised": {"xPct": 0, "yPct": 0, "widthPct": 100, "heightPct": 100},
        "cropMode": "cover" if bleed["likelyFullBleed"] else "contain-or-framed",
        "focalPoint": focal,
        "subjectPosition": _subject_position(focal),
        "backgroundTreatment": _bg_treatment(palette, overlay, bleed),
        "edgeAnalysis": bleed,
        "textCoverageShare": round(text_area / (W * H), 4),
        "minimumRecommendedResolution": {"width": W, "height": H,
                                         "note": "match canvas 1:1 to avoid upscaling"},
        "masksOrCutouts": {
            "detected": None,
            "note": "cannot be determined from a flattened render",
        },
        "shadows": {
            "detected": None,
            "note": "photographic shading and layer shadows are indistinguishable "
                    "in a flattened render",
        },
    }

    effects = {
        "overlayGradient": overlay,
        "blur": {"detected": None, "note": "not separable from a flattened render"},
        "blendMode": {"detected": None, "note": "not recoverable from a flattened render"},
        "textureOrGrain": _grain(gray),
        "dropShadowOnText": _text_shadow(gray, text_elements),
    }

    # ---- background approximation ----------------------------------------
    bg_info = build_background_approx(
        img, [e["inkBox"] for e in text_elements],
        tdir / "assets" / "background-approx.png",
    )
    if bg_info.get("created"):
        assets_report["approximate"].append({
            "asset": "assets/background-approx.png",
            "accuracy": "APPROXIMATE — reconstructed by inpainting, NOT the original asset",
            "method": bg_info["method"],
        })
    assets_report["missing"].append({
        "asset": "original background photograph (unflattened layer)",
        "reason": "Pixy API exposes only a flattened render; no layer/asset endpoint exists",
    })

    # ---- variable recommendations ----------------------------------------
    variables = _recommend_variables(text_elements, semantic, media, declared)

    analysis = {
        "schemaVersion": "1.0",
        "scope": "analysis and asset collection only — no renderer manifest produced",
        "source": {
            "templateNumber": num,
            "pixyName": tpl.get("name"),
            "designId": tpl.get("id"),
            "sourceKind": source_kind,
            "sourceUrl": f"https://www.app.pixy.art/api/v1/{'templates' if source_kind == 'template' else 'designs'}",
            "thumbnailUrl": thumb,
            "category": tpl.get("category"),
            "orientation": tpl.get("orientation"),
            "pagesCount": tpl.get("pagesCount"),
            "availableFormats": tpl.get("formats"),
            "canvas": {"width": W, "height": H},
            "aspectRatio": _aspect(W, H),
            "referenceFile": "reference.png",
        },
        "fonts": font_entries,
        "elements": text_elements,
        "elementCoverage": {
            "textElementsDetected": len(text_elements),
            "nonTextElementsDetected": None,
            "note": "Non-text elements (shapes, logos, decorative marks) are not "
                    "individually segmented; a flattened render does not expose them. "
                    "Only text is isolated, via OCR plus ink-boundary analysis.",
        },
        "colours": {"semantic": semantic, "palette": palette},
        "media": media,
        "effects": effects,
        "backgroundApproximation": bg_info,
        "editableVariableRecommendations": variables,
        "assets": assets_report,
        "limitations": [
            "Pixy exposes no per-element/layer endpoint, so all geometry is derived "
            "from pixel analysis of the flattened render rather than read from design data.",
            "Font families are authoritative (declared by Pixy); size, weight and "
            "tracking are fitted and carry an IoU-based confidence score.",
            "Layer opacity, blend modes and true overlay alpha cannot be recovered "
            "from a flattened render.",
            "background-approx.png is reconstructed and must never be treated as exact.",
        ],
        "status": "ok",
    }

    analysis = jsonable(analysis)
    (tdir / "analysis.json").write_text(json.dumps(analysis, indent=2))
    (tdir / "ANALYSIS.md").write_text(render_markdown(analysis))
    return analysis


# --------------------------------------------------------------------------
# small derivations
# --------------------------------------------------------------------------


def _aspect(w: int, h: int) -> str:
    from math import gcd
    g = gcd(w, h) or 1
    return f"{w // g}:{h // g}"


def _alignment(box: dict, W: int) -> str:
    cx = box["x"] + box["width"] / 2
    off = cx - W / 2
    if abs(off) <= max(6, W * 0.012):
        return "center"
    return "left" if off < 0 else "right"


def _transform(text: str) -> str:
    letters = [c for c in text if c.isalpha()]
    if not letters:
        return "none"
    if all(c.isupper() for c in letters):
        return "uppercase"
    if all(c.islower() for c in letters):
        return "lowercase"
    return "none"


def _attach_spacing(els: list[dict]) -> None:
    els.sort(key=lambda e: (e["inkBox"]["y"], e["inkBox"]["x"]))
    for i, e in enumerate(els):
        b = e["inkBox"]
        prev = els[i - 1]["inkBox"] if i > 0 else None
        nxt = els[i + 1]["inkBox"] if i + 1 < len(els) else None
        e["spacing"] = {
            "gapToPreviousPx": (b["y"] - (prev["y"] + prev["height"])) if prev else None,
            "gapToNextPx": (nxt["y"] - (b["y"] + b["height"])) if nxt else None,
            "topToCanvasPx": b["y"],
            "baselineToCanvasBottomPx": None,
        }


def _attach_line_groups(els: list[dict], W: int) -> None:
    """Group vertically adjacent, similarly-sized text runs into blocks."""
    if not els:
        return
    groups, cur = [], [els[0]]
    for prev, e in zip(els, els[1:]):
        pb, cb = prev["inkBox"], e["inkBox"]
        gap = cb["y"] - (pb["y"] + pb["height"])

        # Cap heights must be close in both directions, otherwise a subheadline
        # gets absorbed into the headline block.
        hi, lo = max(cb["height"], pb["height"]), min(cb["height"], pb["height"])
        similar = lo > 0 and (hi / lo) <= 1.35

        # A shared edge indicates a wrapped paragraph rather than two blocks.
        same_left = abs(cb["x"] - pb["x"]) <= max(8, 0.05 * max(cb["width"], pb["width"]))
        same_right = abs((cb["x"] + cb["width"]) - (pb["x"] + pb["width"])) <= max(
            8, 0.05 * max(cb["width"], pb["width"]))
        same_centre = abs(
            (cb["x"] + cb["width"] / 2) - (pb["x"] + pb["width"] / 2)
        ) <= max(8, 0.04 * max(cb["width"], pb["width"]))
        aligned = same_left or same_right or same_centre

        # Body copy sits on a tight leading; allow a slightly looser gap when the
        # lines are clearly edge-aligned, which is how wrapped paragraphs read.
        limit = (1.15 if aligned else 0.62) * max(1, pb["height"])
        tight = gap is not None and -2 <= gap <= limit

        if similar and tight and (aligned or gap <= 0.62 * pb["height"]):
            cur.append(e)
        else:
            groups.append(cur)
            cur = [e]
    groups.append(cur)

    for gi, grp in enumerate(groups):
        tops = [g["inkBox"]["y"] for g in grp]
        lh = None
        if len(grp) > 1:
            lh = round(float(np.mean(np.diff(tops))), 1)
        for g in grp:
            g["textBlock"] = {
                "blockId": f"block-{gi + 1}",
                "lineIndex": grp.index(g) + 1,
                "lineCount": len(grp),
                "lineHeightPx": lh,
                "lineHeightRatio": (
                    round(lh / g["typography"]["fontSizePx"], 3)
                    if lh and (g.get("typography") or {}).get("fontSizePx") else None
                ),
                "blockRole": None,
            }
    # Assign roles by type size across blocks. The fitted font size is used in
    # preference to raw ink height, because ink height varies with ascenders and
    # descenders: a line containing 'p' or 'k' measures taller than an all-x-height
    # line set at the same size, which scrambles a height-only ranking.
    by_block: dict[str, list[dict]] = {}
    for e in els:
        by_block.setdefault(e["textBlock"]["blockId"], []).append(e)

    def block_size(items: list[dict]) -> float:
        sizes = [
            (x.get("typography") or {}).get("fontSizePx")
            for x in items
            if (x.get("typography") or {}).get("fontSizePx")
        ]
        if sizes:
            return float(max(sizes))
        return float(max(x["inkBox"]["height"] for x in items))

    ranked = sorted(by_block.items(), key=lambda kv: -block_size(kv[1]))

    # Roles are named by size relative to the largest type on the canvas, not by
    # rank position. Rank alone mislabels a design with one big headline and six
    # equally-sized paragraph blocks, which would consume "subheadline",
    # "supporting" and "detail" for what is plainly all body copy.
    if not ranked:
        return
    max_size = block_size(ranked[0][1]) or 1.0
    for bid, items in ranked:
        size = block_size(items)
        ratio = size / max_size if max_size else 0.0
        if ratio >= 0.85:
            role = "headline"
        elif ratio >= 0.55:
            role = "subheadline"
        elif ratio >= 0.34:
            role = "supporting"
        elif ratio >= 0.22:
            role = "body"
        else:
            role = "fine-print"
        for x in items:
            x["textBlock"]["blockRole"] = role
            x["textBlock"]["blockTypeSizePx"] = round(size, 1)
            x["textBlock"]["blockSizeRatioToLargest"] = round(ratio, 3)


def _reconcile_blocks(els: list[dict], font_files: list[dict]) -> None:
    """Force one shared font/size/tracking per multi-line text block.

    Applied only when the shared-setting solve is not materially worse than the
    per-line fits, so a genuinely mixed block is not flattened incorrectly.
    """
    if not font_files:
        return
    blocks: dict[str, list[dict]] = {}
    for e in els:
        bid = (e.get("textBlock") or {}).get("blockId")
        if bid:
            blocks.setdefault(bid, []).append(e)

    for bid, group in blocks.items():
        if len(group) < 2:
            continue
        if any(e.get("_mask") is None for e in group):
            continue
        style = group[0].get("slant", {}).get("style")
        lines = [{"text": e["text"], "mask": e["_mask"],
                  "targetWidth": e["inkBox"]["width"]} for e in group]
        shared = AZ.reconcile_block(lines, font_files, style=style)
        if not shared:
            continue

        per_line = [
            (e.get("typography") or {}).get("matchIou") or 0.0 for e in group
        ]
        mean_independent = float(np.mean(per_line)) if per_line else 0.0
        # Prefer the shared solve unless it loses meaningful accuracy.
        if shared["meanIou"] < mean_independent - 0.06:
            for e in group:
                e.setdefault("typography", {})["blockReconciliation"] = {
                    "applied": False,
                    "reason": "shared-setting solve was materially worse than per-line fits",
                    "sharedMeanIou": shared["meanIou"],
                    "perLineMeanIou": round(mean_independent, 4),
                }
            continue

        for i, e in enumerate(group):
            t = e.setdefault("typography", {})
            t.update({
                "matchedFontFile": shared["fontFile"],
                "variationAxes": shared["variationAxes"],
                "candidateLabel": shared["candidateLabel"],
                "fontSizePx": shared["fontSizePx"],
                "letterSpacingPx": shared["letterSpacingPx"],
                "letterSpacingEm": round(
                    shared["letterSpacingPx"] / shared["fontSizePx"], 4
                ) if shared["fontSizePx"] else None,
                "matchIou": shared["perLineIou"][i],
                "confidence": shared["confidence"],
                "alternates": shared["alternates"],
                "blockReconciliation": {
                    "applied": True,
                    "scope": f"shared across {len(group)} lines of {bid}",
                    "sharedMeanIou": shared["meanIou"],
                    "sharedMinIou": shared["minIou"],
                    "perLineMeanIouIndependent": round(mean_independent, 4),
                },
            })
            tb = e["textBlock"]
            if tb.get("lineHeightPx") and shared["fontSizePx"]:
                tb["lineHeightRatio"] = round(
                    tb["lineHeightPx"] / shared["fontSizePx"], 3
                )


def _subject_position(focal: dict) -> str:
    x, y = focal["x"], focal["y"]
    hor = "left" if x < 40 else "right" if x > 60 else "centre"
    ver = "upper" if y < 40 else "lower" if y > 60 else "middle"
    return f"{ver}-{hor}"


def _bg_treatment(palette: list[dict], overlay: dict, bleed: dict) -> str:
    if bleed["likelyFramed"]:
        return "flat colour or framed panel"
    top = palette[0] if palette else None
    if top and top["share"] > 0.72 and top["saturation"] < 0.16:
        return "flat / near-flat neutral background"
    if overlay["detected"]:
        return f"photographic or gradient background with {overlay['direction']} darkening"
    return "photographic or multi-tone background"


def _grain(gray: np.ndarray) -> dict:
    g = gray.astype(np.float32)
    hp = g - np.array(Image.fromarray(gray).filter(ImageFilter.GaussianBlur(2)), dtype=np.float32)
    noise = float(hp.std())
    return {
        "highFrequencyStdDev": round(noise, 2),
        "likelyTextured": bool(noise > 7.5),
        "note": "high-frequency energy proxy; photo detail and deliberate grain "
                "are not distinguishable",
    }


def _text_shadow(gray: np.ndarray, els: list[dict]) -> dict:
    """Look for a consistent dark halo just outside glyph ink."""
    if not els:
        return {"detected": None, "note": "no text elements"}
    scores = []
    H, W = gray.shape
    for e in els[:4]:
        b = e["inkBox"]
        y0, y1 = max(0, b["y"] - 10), min(H, b["y"] + b["height"] + 10)
        x0, x1 = max(0, b["x"] - 10), min(W, b["x"] + b["width"] + 10)
        ring = gray[y0:y1, x0:x1]
        inner = gray[b["y"]:b["y"] + b["height"], b["x"]:b["x"] + b["width"]]
        if ring.size and inner.size:
            scores.append(float(np.median(inner) - np.median(ring)))
    if not scores:
        return {"detected": None, "note": "insufficient sample"}
    return {
        "detected": None,
        "innerVsRingMedianDelta": round(float(np.mean(scores)), 1),
        "note": "a large positive delta on light text suggests either a shadow/scrim "
                "or naturally darker artwork behind the text; not separable here",
    }


def _recommend_variables(els: list[dict], semantic: dict, media: dict,
                         declared: list[str]) -> dict:
    text_vars = []
    for e in els:
        tb = e.get("textBlock") or {}
        role = tb.get("blockRole") or "text"
        line_count = tb.get("lineCount", 1) or 1
        line_index = tb.get("lineIndex", 1) or 1
        name = role if line_count == 1 else f"{role}_line{line_index}"
        text_vars.append({
            "suggestedName": name,
            "kind": "text",
            "currentValue": e["text"],
            "elementId": e["elementId"],
            "role": role,
            "lineIndex": line_index,
            "lineCount": line_count,
            "maxLengthObserved": len(e["text"]),
        })
    colour_vars = [
        {"suggestedName": k, "kind": "colour", "currentValue": v["hex"]}
        for k, v in semantic.items()
        if isinstance(v, dict) and not k.startswith("_") and v.get("hex")
    ]
    return {
        "text": text_vars,
        "images": [{
            "suggestedName": "heroImage",
            "kind": "image",
            "note": "full-bleed artwork" if media["edgeAnalysis"]["likelyFullBleed"]
                    else "framed/panelled artwork",
            "recommendedResolution": media["minimumRecommendedResolution"],
        }],
        "logo": [{
            "suggestedName": "brandLogo",
            "kind": "image",
            "detected": False,
            "note": "no logo element was isolated; a flattened render does not expose "
                    "logo layers. Treat as an optional slot to be confirmed manually.",
        }],
        "colours": colour_vars,
        "fonts": [{"suggestedName": "brandFont", "kind": "font",
                   "currentValue": declared[0] if declared else None,
                   "allDeclared": declared}],
        "visibilityToggles": [
            {"suggestedName": f"show_{(e.get('textBlock') or {}).get('blockRole') or 'text'}",
             "kind": "boolean", "targets": e["elementId"]}
            for e in els
        ],
        "focalPointControls": [
            {"suggestedName": "imageFocalX", "kind": "number",
             "currentValue": media["focalPoint"]["x"], "unit": "%"},
            {"suggestedName": "imageFocalY", "kind": "number",
             "currentValue": media["focalPoint"]["y"], "unit": "%"},
        ],
        "note": "Recommendations only. No manifest or renderer schema is produced.",
    }


# --------------------------------------------------------------------------
# Markdown report
# --------------------------------------------------------------------------


def render_markdown(a: dict) -> str:
    s = a["source"]
    L: list[str] = []
    L.append(f"# Template {s['templateNumber']} — {s['pixyName']}")
    L.append("")
    L.append("> Scope: **analysis and asset collection only**. No HTML, CSS or renderer "
             "manifest is produced here.")
    L.append("")

    L.append("## 1. Source")
    L.append("")
    L.append("| Field | Value |")
    L.append("|---|---|")
    L.append(f"| Template number | {s['templateNumber']} |")
    L.append(f"| Pixy name | {s['pixyName']} |")
    L.append(f"| Design ID | `{s['designId']}` |")
    L.append(f"| Source kind | {s['sourceKind']} |")
    L.append(f"| Thumbnail URL | {s['thumbnailUrl']} |")
    L.append(f"| Category | {s.get('category')} |")
    L.append(f"| Orientation | {s.get('orientation')} |")
    L.append(f"| Pages | {s.get('pagesCount')} |")
    L.append(f"| Canvas | {s['canvas']['width']} x {s['canvas']['height']} px |")
    L.append(f"| Aspect ratio | {s['aspectRatio']} |")
    L.append(f"| Reference file | `{s['referenceFile']}` |")
    L.append("")

    L.append("## 2. Fonts declared by Pixy")
    L.append("")
    if a["fonts"]:
        L.append("| Family | Resolved | Licence | Local files |")
        L.append("|---|---|---|---|")
        for f in a["fonts"]:
            files = ", ".join(f"`{x}`" for x in f["localFiles"]) or "—"
            L.append(f"| {f['family']} | {'yes' if f['resolved'] else 'NO'} | "
                     f"{f['licence'] or '—'} | {files} |")
    else:
        L.append("_No font families declared for this template._")
    L.append("")

    cm = a.get("confidenceModel")
    if cm:
        L.append("### How to read the confidence figures")
        L.append("")
        L.append("Two separate things are reported, and only the second is uncertain:")
        L.append("")
        L.append(f"- **Font family — {cm['fontFamily']['confidence']}.** "
                 f"Declared: {', '.join(cm['fontFamily']['declared']) or '—'}. "
                 "These are read from Pixy's API, not inferred from pixels.")
        if cm["fontFamily"]["unresolved"]:
            L.append(f"  - Not downloadable: {', '.join(cm['fontFamily']['unresolved'])}")
        L.append(f"- **Fitted metrics — estimated.** {', '.join(cm['fittedMetrics']['what'])}, "
                 f"recovered by {cm['fittedMetrics']['how']}.")
        L.append(f"  - {cm['fittedMetrics']['caveat']}")
        L.append("")
        L.append("A `very-low` fit score does **not** mean the declared font family is "
                 "wrong. It marks geometry that the solid-font fitter could not verify. "
                 "Common causes are outlined or curved text, duplicate shadow layers, "
                 "overlapping word copies, and incomplete OCR capture. Text printed on a "
                 "photographed object is labelled `not-applicable-rasterText` instead.")
        L.append("")

    L.append("## 3. Text elements")
    L.append("")
    if not a["elements"]:
        L.append("_No text detected._")
    for e in a["elements"]:
        b, tb = e["boundingBox"], e.get("textBlock") or {}
        t = e.get("typography") or {}
        L.append(f"### `{e['elementId']}` — {tb.get('blockRole', 'text')}")
        L.append("")
        L.append(f"**Text:** \"{e['text']}\"  (OCR confidence {e['ocrConfidence']})")
        L.append("")
        L.append("| Property | Value |")
        L.append("|---|---|")
        L.append(f"| Bounding box (px) | x={b['x']}, y={b['y']}, w={b['width']}, h={b['height']} |")
        n = e["boundingBoxNormalised"]
        L.append(f"| Normalised | x={n['xPct']}%, y={n['yPct']}%, w={n['widthPct']}%, h={n['heightPct']}% |")
        L.append(f"| Alignment | {e['alignment']} |")
        L.append(f"| z-order | {e['zOrder']} |")
        L.append(f"| Rotation | {e['rotationDeg']}° |")
        L.append(f"| Opacity | {e['opacity']} |")
        L.append(f"| Font file matched | `{t.get('matchedFontFile', '—')}` |")
        L.append(f"| Variation axes | {t.get('variationAxes')} |")
        L.append(f"| Font size | {t.get('fontSizePx', '—')} px |")
        L.append(f"| Letter-spacing | {t.get('letterSpacingPx', '—')} px "
                 f"({t.get('letterSpacingEm', '—')} em) |")
        L.append(f"| Line-height | {tb.get('lineHeightPx', '—')} px "
                 f"(ratio {tb.get('lineHeightRatio', '—')}) |")
        L.append(f"| Line | {tb.get('lineIndex', '—')} of {tb.get('lineCount', '—')} |")
        L.append(f"| Transform | {t.get('textTransform', '—')} |")
        L.append(f"| Colour | `{e['colour']['hex']}` |")
        L.append(f"| Polarity | {e['polarity']} |")
        L.append(f"| Contrast vs local bg | {e['contrastRatioVsLocalBackground']}:1 |")
        L.append(f"| Stroke (median/mean) | {e['strokeMetrics']['medianStroke']} / "
                 f"{e['strokeMetrics']['meanStroke']} px |")
        rm = e.get("renderModel") or {}
        L.append(f"| Render model | {rm.get('model', 'unclassified')} |")
        if rm.get("notes"):
            L.append(f"| Render-model note | {'; '.join(rm['notes'])} |")
        if e.get("textRepairs"):
            L.append(f"| OCR repairs (audited) | {'; '.join(e['textRepairs'])} |")
        L.append(f"| Font family (authoritative) | {', '.join(t.get('fontFamilyCandidates') or []) or '—'} |")
        L.append(f"| Match IoU | {t.get('matchIou', '—')} |")
        L.append(f"| **Geometry fit confidence** | **{t.get('confidence', '—')}** |")
        tr = t.get("textReliability") or {}
        if tr:
            L.append(f"| OCR text reliable | {tr.get('reliable')} "
                     f"{('— ' + '; '.join(tr.get('flags') or [])) if tr.get('flags') else ''} |")
        gf = t.get("geometryFitConfidence") or {}
        if gf.get("interpretation"):
            L.append(f"| Fit interpretation | {gf['interpretation']} |")
        sp = e.get("spacing") or {}
        L.append(f"| Gap to previous | {sp.get('gapToPreviousPx')} px |")
        L.append(f"| Gap to next | {sp.get('gapToNextPx')} px |")
        if t.get("alternates"):
            L.append("")
            L.append("Alternate font fits considered:")
            for alt in t["alternates"]:
                score = alt.get("iou", alt.get("meanIou"))
                L.append(f"- `{alt.get('fontFile')}` {alt.get('fontSizePx')}px "
                         f"track {alt.get('letterSpacingPx')}px — IoU {score}")
        L.append("")

    L.append("## 4. Colours (semantic)")
    L.append("")
    L.append("| Semantic name | Hex | Sampled at | Method |")
    L.append("|---|---|---|---|")
    for k in ("background", "surface", "textPrimary", "textSecondary",
              "accent", "accentSecondary", "overlay", "onAccent"):
        v = a["colours"]["semantic"].get(k)
        if isinstance(v, dict):
            L.append(f"| {k} | `{v['hex']}` | {v.get('sampledAt', '—')} | {v.get('method', '—')} |")
        else:
            L.append(f"| {k} | — | not identified | — |")
    L.append("")
    L.append("Full palette (k-means):")
    L.append("")
    L.append("| Hex | Share | Luminance | Saturation |")
    L.append("|---|---|---|---|")
    for c in a["colours"]["palette"]:
        L.append(f"| `{c['hex']}` | {c['share']} | {c['luminance']} | {c['saturation']} |")
    L.append("")

    m = a["media"]
    L.append("## 5. Media")
    L.append("")
    L.append("| Property | Value |")
    L.append("|---|---|")
    bb = m["boundingBox"]
    L.append(f"| Bounding box | x={bb['x']}, y={bb['y']}, w={bb['width']}, h={bb['height']} |")
    L.append(f"| Crop mode | {m['cropMode']} |")
    L.append(f"| Focal point | x={m['focalPoint']['x']}%, y={m['focalPoint']['y']}% "
             f"({m['focalPoint']['confidence']} confidence) |")
    L.append(f"| Subject position | {m['subjectPosition']} |")
    L.append(f"| Background treatment | {m['backgroundTreatment']} |")
    L.append(f"| Full bleed | {m['edgeAnalysis']['likelyFullBleed']} |")
    L.append(f"| Text coverage | {m['textCoverageShare']} |")
    L.append(f"| Min resolution | {m['minimumRecommendedResolution']['width']}x"
             f"{m['minimumRecommendedResolution']['height']} |")
    L.append(f"| Masks / cutouts | {m['masksOrCutouts']['note']} |")
    L.append(f"| Shadows | {m['shadows']['note']} |")
    L.append("")

    ov = a["effects"]["overlayGradient"]
    L.append("## 6. Effects")
    L.append("")
    L.append(f"- **Overlay detected:** {ov['detected']}")
    if ov["detected"]:
        L.append(f"- **Direction:** {ov['direction']}")
        L.append(f"- **Brightness range across axis:** {ov['brightnessRangeAcrossAxis']}")
        L.append("- **Estimated stops (black alpha):**")
        for st in ov["estimatedStops"]:
            L.append(f"  - {st['position']} -> alpha ~{st['estimatedBlackAlpha']}")
    L.append(f"- **Grain:** stdDev {a['effects']['textureOrGrain']['highFrequencyStdDev']}, "
             f"likely textured: {a['effects']['textureOrGrain']['likelyTextured']}")
    L.append(f"- **Blur:** {a['effects']['blur']['note']}")
    L.append(f"- **Blend mode:** {a['effects']['blendMode']['note']}")
    L.append(f"- **Text shadow:** {a['effects']['dropShadowOnText']['note']}")
    L.append("")

    v = a["editableVariableRecommendations"]
    L.append("## 7. Editable-variable recommendations")
    L.append("")
    L.append("_Recommendations only — no manifest is generated._")
    L.append("")
    L.append("| Suggested name | Kind | Current value |")
    L.append("|---|---|---|")
    for grp in ("text", "images", "logo", "colours", "fonts",
                "visibilityToggles", "focalPointControls"):
        for item in v.get(grp, []):
            cv = item.get("currentValue", item.get("note", "—"))
            cv = str(cv)
            if len(cv) > 60:
                cv = cv[:57] + "..."
            L.append(f"| `{item['suggestedName']}` | {item['kind']} | {cv} |")
    L.append("")

    L.append("## 8. Assets collected")
    L.append("")
    ar = a["assets"]
    L.append(f"**Exact ({len(ar['exact'])}):**")
    L.append("")
    for x in ar["exact"]:
        L.append(f"- `{x['asset']}` — {x.get('licence') or x.get('note') or 'exact source file'}")
    L.append("")
    L.append(f"**Approximate ({len(ar['approximate'])}):**")
    L.append("")
    for x in ar["approximate"]:
        L.append(f"- `{x['asset']}` — {x['accuracy']}")
    if not ar["approximate"]:
        L.append("- none")
    L.append("")
    L.append(f"**Missing ({len(ar['missing'])}):**")
    L.append("")
    for x in ar["missing"]:
        L.append(f"- `{x['asset']}` — {x['reason']}")
    L.append("")

    L.append("## 9. Limitations")
    L.append("")
    for lim in a["limitations"]:
        L.append(f"- {lim}")
    L.append("")
    return "\n".join(L)
