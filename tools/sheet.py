#!/usr/bin/env python3
"""Download candidate images and build a labelled contact sheet for review.

Usage: sheet.py OUT_PREFIX URL [URL ...]
Writes OUT_PREFIX-sheet.png plus OUT_PREFIX-<i>.jpg originals.
"""
import io
import sys
import urllib.request
from PIL import Image, ImageDraw

CELL = (340, 480)
COLS = 5
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) KiroAssetReview/1.0"}


def fetch(url: str) -> Image.Image:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return Image.open(io.BytesIO(resp.read())).convert("RGB")


def main() -> int:
    prefix, urls = sys.argv[1], sys.argv[2:]
    images = []
    for index, url in enumerate(urls):
        try:
            img = fetch(url if "?" in url else url + "?auto=compress&cs=tinysrgb&w=1400")
        except Exception as error:  # noqa: BLE001
            print(f"{index}: FAILED {url} ({error})")
            continue
        img.save(f"{prefix}-{index}.jpg", quality=88)
        print(f"{index}: {img.width}x{img.height} {url}")
        images.append((index, img))

    if not images:
        return 1

    rows = (len(images) + COLS - 1) // COLS
    sheet = Image.new("RGB", (CELL[0] * COLS, CELL[1] * rows), "#111")
    draw = ImageDraw.Draw(sheet)
    for slot, (index, img) in enumerate(images):
        thumb = img.copy()
        thumb.thumbnail(CELL)
        x = (slot % COLS) * CELL[0]
        y = (slot // COLS) * CELL[1]
        sheet.paste(thumb, (x + (CELL[0] - thumb.width) // 2, y + (CELL[1] - thumb.height) // 2))
        draw.rectangle([x + 4, y + 4, x + 44, y + 34], fill="#000")
        draw.text((x + 14, y + 12), str(index), fill="#fff")
    sheet.save(f"{prefix}-sheet.png")
    print(f"sheet: {prefix}-sheet.png")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
