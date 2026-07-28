"""Validate the complete 200-template analysis deliverable.

This is a release gate, not a renderer test. It checks that every analysis is
structurally complete, internally consistent, backed by real assets, honest
about approximations, and free of secrets.

Exit 0: all required checks passed (warnings may remain for genuine source
limitations such as an unavailable font family).
Exit 1: at least one release-blocking failure.
"""

from __future__ import annotations

import glob
import hashlib
import json
import math
import os
import re
import sys
from collections import Counter
from pathlib import Path

from PIL import Image, ImageStat
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "analysis"
EXPECTED = 345
SEMANTIC = {
    "background", "surface", "textPrimary", "textSecondary",
    "accent", "accentSecondary", "overlay", "onAccent",
}

errors: list[str] = []
warnings: list[str] = []
stats = Counter()
font_hashes: set[str] = set()


def err(msg: str) -> None:
    errors.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def load(path: Path):
    try:
        return json.loads(path.read_text())
    except Exception as e:
        err(f"invalid JSON: {path.relative_to(ROOT)} — {e}")
        return None


def finite(v) -> bool:
    return isinstance(v, (int, float)) and math.isfinite(float(v))


def sampled_background_colours(a: dict) -> list[tuple[int, int, int]]:
    """Reference colours that can legitimately fill a text-removed background."""
    colours = a.get("colours") or {}
    semantic = colours.get("semantic") or {}
    out: list[tuple[int, int, int]] = []

    for name in ("background", "surface"):
        rgb = (semantic.get(name) or {}).get("rgb")
        if isinstance(rgb, list) and len(rgb) >= 3 and all(finite(v) for v in rgb[:3]):
            out.append(tuple(int(v) for v in rgb[:3]))

    palette = colours.get("palette") or []
    if palette:
        rgb = (palette[0] or {}).get("rgb")
        if isinstance(rgb, list) and len(rgb) >= 3 and all(finite(v) for v in rgb[:3]):
            out.append(tuple(int(v) for v in rgb[:3]))

    for value in (semantic.get("_cornerSamples") or {}).values():
        if isinstance(value, str) and re.fullmatch(r"#[0-9a-fA-F]{6}", value):
            out.append(tuple(int(value[i:i + 2], 16) for i in (1, 3, 5)))
    return out


def validate_image(path: Path, expected_size: tuple[int, int], label: str,
                   allow_flat: bool = False,
                   flat_reference_colours: list[tuple[int, int, int]] | None = None) -> None:
    if not path.exists():
        err(f"missing {label}: {path.relative_to(ROOT)}")
        return
    try:
        with Image.open(path) as im:
            im.verify()
        with Image.open(path).convert("RGB") as im:
            if im.size != expected_size:
                err(f"wrong dimensions for {label}: {path.relative_to(ROOT)} "
                    f"is {im.size}, expected {expected_size}")
            st = ImageStat.Stat(im.resize((64, 64)))
            if max(st.stddev) < 1.0:
                if not allow_flat:
                    err(f"likely placeholder/blank image: {path.relative_to(ROOT)}")
                else:
                    mean = tuple(float(v) for v in st.mean[:3])
                    refs = flat_reference_colours or []
                    nearest = min(
                        (math.dist(mean, tuple(float(v) for v in ref)) for ref in refs),
                        default=math.inf,
                    )
                    # A flat approximation is legitimate when text removal
                    # exposes a genuinely flat design background. Require its
                    # colour to match a recorded semantic/palette/corner sample
                    # from the reference, rather than accepting any blank file.
                    if nearest > 18.0:
                        err(
                            f"flat approximate background does not match sampled "
                            f"reference colours: {path.relative_to(ROOT)} "
                            f"(nearest RGB distance {nearest:.1f})"
                        )
    except Exception as e:
        err(f"unreadable {label}: {path.relative_to(ROOT)} — {e}")


def validate_font(path: Path) -> None:
    if not path.exists():
        err(f"font listed but missing: {path.relative_to(ROOT)}")
        return
    try:
        tt = TTFont(path, lazy=True)
        if "name" not in tt or "cmap" not in tt:
            err(f"invalid font tables: {path.relative_to(ROOT)}")
        tt.close()
        font_hashes.add(hashlib.sha256(path.read_bytes()).hexdigest())
    except Exception as e:
        err(f"unreadable font: {path.relative_to(ROOT)} — {e}")


def validate_template(directory: Path, expected_number: int) -> None:
    rel = directory.relative_to(OUT).as_posix()
    number = f"{expected_number:03d}"
    if not directory.name.startswith(number + "-"):
        err(f"sequence mismatch: expected {number}, got {directory.name}")

    required = ["reference.png", "analysis.json", "ANALYSIS.md",
                "assets/background-approx.png"]
    for name in required:
        if not (directory / name).exists():
            err(f"{rel}: missing required file {name}")

    a = load(directory / "analysis.json")
    if not a:
        return
    stats["templates"] += 1

    source = a.get("source") or {}
    canvas = source.get("canvas") or {}
    W, H = canvas.get("width"), canvas.get("height")
    if source.get("templateNumber") != number:
        err(f"{rel}: source.templateNumber != {number}")
    if not source.get("designId") or not source.get("pixyName"):
        err(f"{rel}: incomplete source identity")
    if not (isinstance(W, int) and isinstance(H, int) and W > 0 and H > 0):
        err(f"{rel}: invalid canvas {canvas}")
        return
    if source.get("referenceFile") != "reference.png":
        err(f"{rel}: referenceFile must be reference.png")

    validate_image(directory / "reference.png", (W, H), "reference")
    validate_image(
        directory / "assets/background-approx.png",
        (W, H),
        "approximate background",
        allow_flat=True,
        flat_reference_colours=sampled_background_colours(a),
    )

    bg = a.get("backgroundApproximation") or {}
    if not bg.get("created"):
        err(f"{rel}: background approximation asset exists but metadata says not created")
    if "APPROXIMATE" not in str(bg.get("accuracy", "")).upper():
        err(f"{rel}: background approximation is not clearly labelled approximate")

    fonts = a.get("fonts")
    if not isinstance(fonts, list) or not fonts:
        err(f"{rel}: no Pixy font-family declarations recorded")
    else:
        resolved_any = False
        for f in fonts:
            if not f.get("family") or not f.get("declaredByPixy"):
                err(f"{rel}: invalid font declaration {f}")
            if f.get("resolved"):
                resolved_any = True
                if not f.get("licence") or not f.get("sourceUrl"):
                    err(f"{rel}: resolved font lacks licence/source: {f.get('family')}")
                if not f.get("localFiles"):
                    err(f"{rel}: resolved font has no local files: {f.get('family')}")
                for name in f.get("localFiles", []):
                    validate_font(directory / "assets/fonts" / name)
            else:
                stats["unresolvedFontDeclarations"] += 1
        if not resolved_any:
            err(f"{rel}: none of the declared font families resolved to a local file")

    semantic = ((a.get("colours") or {}).get("semantic") or {})
    missing_sem = sorted(SEMANTIC - set(semantic))
    if missing_sem:
        err(f"{rel}: semantic colour keys missing: {missing_sem}")
    for name in SEMANTIC:
        value = semantic.get(name)
        if value is not None:
            hx = value.get("hex") if isinstance(value, dict) else None
            if not isinstance(hx, str) or not re.fullmatch(r"#[0-9a-fA-F]{6}", hx):
                err(f"{rel}: invalid semantic colour {name}: {value}")

    media = a.get("media") or {}
    focal = media.get("focalPoint") or {}
    if not (finite(focal.get("x")) and finite(focal.get("y")) and
            0 <= focal["x"] <= 100 and 0 <= focal["y"] <= 100):
        err(f"{rel}: invalid focal point {focal}")

    elements = a.get("elements")
    if not isinstance(elements, list):
        err(f"{rel}: elements is not a list")
        return
    stats["elements"] += len(elements)
    for e in elements:
        eid = e.get("elementId", "?")
        box = e.get("boundingBox") or {}
        norm = e.get("boundingBoxNormalised") or {}
        vals = [box.get(k) for k in ("x", "y", "width", "height")]
        if not all(finite(v) for v in vals):
            err(f"{rel}/{eid}: invalid bounding box {box}")
            continue
        x, y, w, h = vals
        if w <= 0 or h <= 0 or x < -2 or y < -2 or x + w > W + 2 or y + h > H + 2:
            err(f"{rel}/{eid}: out-of-canvas bounding box {box} for {W}x{H}")
        expected_norm = {
            "xPct": x / W * 100, "yPct": y / H * 100,
            "widthPct": w / W * 100, "heightPct": h / H * 100,
        }
        for k, want in expected_norm.items():
            got = norm.get(k)
            if not finite(got) or abs(float(got) - want) > 0.06:
                err(f"{rel}/{eid}: inconsistent {k}: {got}, expected {want:.2f}")
        if not e.get("text") or not finite(e.get("ocrConfidence")):
            err(f"{rel}/{eid}: incomplete OCR record")

        typ = e.get("typography") or {}
        family = typ.get("fontFamilyIdentification") or {}
        if family.get("confidence") != "authoritative":
            err(f"{rel}/{eid}: font family not marked authoritative")
        conf = typ.get("confidence")
        allowed = {
            "high", "medium", "low", "very-low", "unresolved",
            "low-textUnreliable", "very-low-textUnreliable",
            "not-applicable-rasterText",
        }
        if conf not in allowed:
            err(f"{rel}/{eid}: invalid fit confidence {conf}")
        base = str(conf).replace("-textUnreliable", "")
        stats[f"confidence:{base}"] += 1

        model = (e.get("renderModel") or {}).get("model")
        if model not in {"solid-vector-text", "text-in-photograph"}:
            err(f"{rel}/{eid}: invalid/missing render model {model}")
        stats[f"render:{model}"] += 1
        if model == "text-in-photograph" and conf != "not-applicable-rasterText":
            err(f"{rel}/{eid}: raster text must be marked not applicable")

        if conf not in {"unresolved", "not-applicable-rasterText"}:
            for k in ("fontSizePx", "letterSpacingPx", "matchIou"):
                if not finite(typ.get(k)):
                    err(f"{rel}/{eid}: fitted text missing numeric {k}")
            iou = typ.get("matchIou")
            if finite(iou) and not 0 <= iou <= 1:
                err(f"{rel}/{eid}: IoU outside 0..1: {iou}")

    assets = a.get("assets") or {}
    for group in ("exact", "approximate", "missing"):
        if group not in assets or not isinstance(assets[group], list):
            err(f"{rel}: assets.{group} missing or invalid")
    for item in assets.get("approximate", []):
        if "APPROXIMATE" not in str(item.get("accuracy", "")).upper():
            err(f"{rel}: approximate asset not explicitly labelled: {item}")

    md = (directory / "ANALYSIS.md").read_text(errors="replace")
    if "analysis and asset collection only" not in md:
        err(f"{rel}: ANALYSIS.md lacks scope statement")
    if "Font family" not in md or "Geometry fit confidence" not in md:
        err(f"{rel}: ANALYSIS.md lacks required typography reporting")


def validate_catalog(dirs: list[Path]) -> None:
    cat = load(OUT / "catalog.json")
    status = load(OUT / "STATUS.json")
    if not cat or not status:
        return
    if cat.get("totalTemplates") != EXPECTED or len(cat.get("templates", [])) != EXPECTED:
        err("catalog.json does not contain exactly 200 templates")
    if cat.get("completed") != EXPECTED or cat.get("failed") != 0:
        err("catalog.json completion counts are not 200/0")
    if status.get("state") != "complete":
        err(f"STATUS.json state is {status.get('state')}, expected complete")
    if len(status.get("completed", {})) != EXPECTED or status.get("failed"):
        err("STATUS.json completion counts are not 200/0")
    for t in cat.get("templates", []):
        if t.get("status") != "ok":
            err(f"catalog entry not ok: {t.get('templateNumber')}")
        for key in ("analysisJson", "analysisMarkdown", "referenceImage"):
            value = t.get(key)
            if not value or not (OUT / value).exists():
                err(f"catalog entry {t.get('templateNumber')} has broken {key}: {value}")


def secret_scan() -> None:
    # Catch token-shaped Pixy keys, not just the one that was previously exposed.
    token_re = re.compile(rb"cms[0-9a-z]{18,}")
    allowed = {ROOT / ".env"}
    for top in (OUT, ROOT / "tools"):
        for p in top.rglob("*"):
            if not p.is_file() or p in allowed or ".git" in p.parts:
                continue
            try:
                data = p.read_bytes()
            except Exception:
                continue
            if token_re.search(data):
                err(f"possible Pixy API key found in deliverable: {p.relative_to(ROOT)}")
    if (ROOT / ".env").exists():
        # This is allowed locally but must be ignored by Git.
        import subprocess
        r = subprocess.run(["git", "check-ignore", "-q", ".env"], cwd=ROOT)
        if r.returncode != 0:
            err(".env exists but is not ignored by Git")


def main() -> int:
    dirs = sorted(p for p in OUT.glob("[0-9][0-9][0-9]-*") if p.is_dir())
    if len(dirs) != EXPECTED:
        err(f"expected 200 template directories, found {len(dirs)}")
    for i, d in enumerate(dirs, 1):
        validate_template(d, i)
    validate_catalog(dirs)
    secret_scan()

    fittable = stats["elements"] - stats["confidence:not-applicable-rasterText"]
    verified = stats["confidence:high"] + stats["confidence:medium"]
    print("BATCH VALIDATION")
    print(f"  templates:              {stats['templates']}/{EXPECTED}")
    print(f"  text elements:          {stats['elements']}")
    print(f"  high + medium fits:     {verified}/{fittable} "
          f"({verified / fittable * 100 if fittable else 0:.1f}% of fittable)")
    print(f"  raster/non-editable:    {stats['confidence:not-applicable-rasterText']}")
    print(f"  unresolved fits:        {stats['confidence:unresolved']}")
    print(f"  unique font binaries:   {len(font_hashes)}")
    print(f"  unresolved font refs:   {stats['unresolvedFontDeclarations']}")
    print(f"  warnings:               {len(warnings)}")
    print(f"  errors:                 {len(errors)}")
    if warnings:
        print("\nWARNINGS")
        for w in warnings[:30]:
            print(f"  - {w}")
    if errors:
        print("\nERRORS")
        for e in errors[:100]:
            print(f"  - {e}")
        if len(errors) > 100:
            print(f"  ... and {len(errors) - 100} more")
        return 1
    print("\nPASS — all release-blocking checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
