#!/usr/bin/env python3
"""Build layered 2.5D scene assets from Pexels source photography.

Each chapter becomes three independently animatable layers:
  <scene>-sky   : far depth plane (defocused, lifted, desaturated)
  <scene>-mid   : primary subject plate (graded hero photograph)
  <scene>-front : near depth plane with alpha falloff for real occlusion

Output is portrait WebP/PNG sized for mobile-first full-bleed staging.
"""
from __future__ import annotations

import io
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

OUT = Path("/projects/sandbox/kiro/mobile-first-2-5d-mvp/public/scenes")
CACHE = Path("/projects/sandbox/kiro/.assetwork/src")
PORTRAIT = (1080, 1920)
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) KiroAssetBuild/1.0"}


def source(photo_id: int, width: int = 2000) -> Image.Image:
    CACHE.mkdir(parents=True, exist_ok=True)
    cached = CACHE / f"{photo_id}-{width}.jpg"
    if not cached.exists():
        url = (
            f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
            f"?auto=compress&cs=tinysrgb&w={width}"
        )
        request = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(request, timeout=90) as response:
            cached.write_bytes(response.read())
    return Image.open(io.BytesIO(cached.read_bytes())).convert("RGB")


def fill(image: Image.Image, size: tuple[int, int], focus: float = 0.5) -> Image.Image:
    """Cover-crop to size, biasing the vertical crop window toward `focus`."""
    target = size[0] / size[1]
    ratio = image.width / image.height
    if ratio > target:
        width = int(image.height * target)
        left = int((image.width - width) * 0.5)
        image = image.crop((left, 0, left + width, image.height))
    else:
        height = int(image.width / target)
        top = int((image.height - height) * focus)
        image = image.crop((0, top, image.width, top + height))
    return image.resize(size, Image.LANCZOS)


def grade(
    image: Image.Image,
    *,
    saturation: float = 1.0,
    contrast: float = 1.0,
    brightness: float = 1.0,
    warm: tuple[float, float, float] | None = None,
) -> Image.Image:
    image = ImageEnhance.Color(image).enhance(saturation)
    image = ImageEnhance.Contrast(image).enhance(contrast)
    image = ImageEnhance.Brightness(image).enhance(brightness)
    if warm:
        r, g, b = image.split()
        r = r.point(lambda v: min(255, int(v * warm[0])))
        g = g.point(lambda v: min(255, int(v * warm[1])))
        b = b.point(lambda v: min(255, int(v * warm[2])))
        image = Image.merge("RGB", (r, g, b))
    return image


def vertical_alpha(size: tuple[int, int], keep: str, span: float) -> Image.Image:
    """Alpha mask that keeps `keep` edge solid and fades across `span` of height."""
    width, height = size
    mask = Image.new("L", (1, height), 0)
    pixels = mask.load()
    fade = max(1, int(height * span))
    solid = fade * 0.3
    for y in range(height):
        distance = y if keep == "top" else height - 1 - y
        if distance <= solid:
            value = 1.0
        else:
            progress = min(1.0, (distance - solid) / max(1.0, fade - solid))
            value = (1 - progress) ** 2 * (3 - 2 * (1 - progress)) if progress < 1 else 0.0
        pixels[0, y] = max(0, min(255, int(255 * value)))
    return mask.resize((width, height), Image.BICUBIC)


@dataclass
class Layer:
    photo: int
    focus: float = 0.5
    blur: float = 0.0
    scale: float = 1.0
    saturation: float = 1.0
    contrast: float = 1.0
    brightness: float = 1.0
    warm: tuple[float, float, float] | None = None
    alpha: tuple[str, float] | None = None
    flip: bool = False


@dataclass
class Scene:
    name: str
    sky: Layer
    mid: Layer
    front: Layer
    tint: tuple[int, int, int] = (0, 0, 0)
    tint_strength: float = 0.0
    extras: dict[str, Layer] = field(default_factory=dict)


def render(layer: Layer) -> Image.Image:
    image = source(layer.photo)
    if layer.flip:
        image = image.transpose(Image.FLIP_LEFT_RIGHT)
    size = (int(PORTRAIT[0] * layer.scale), int(PORTRAIT[1] * layer.scale))
    image = fill(image, size, layer.focus)
    image = grade(
        image,
        saturation=layer.saturation,
        contrast=layer.contrast,
        brightness=layer.brightness,
        warm=layer.warm,
    )
    if layer.blur:
        image = image.filter(ImageFilter.GaussianBlur(layer.blur))
    if layer.alpha:
        keep, span = layer.alpha
        rgba = image.convert("RGBA")
        rgba.putalpha(vertical_alpha(image.size, keep, span))
        return rgba
    return image


def tinted(image: Image.Image, colour: tuple[int, int, int], strength: float) -> Image.Image:
    if strength <= 0:
        return image
    overlay = Image.new("RGB", image.size, colour)
    return Image.blend(image.convert("RGB"), overlay, strength)


SCENES = [
    Scene(
        name="palace",
        sky=Layer(photo=16534739, focus=0.25, blur=16, scale=1.12, saturation=0.72, brightness=1.12, warm=(1.06, 1.0, 0.94)),
        mid=Layer(photo=12931430, focus=0.42, saturation=1.12, contrast=1.06, warm=(1.05, 0.99, 0.93)),
        front=Layer(photo=11255470, focus=0.35, blur=3.5, scale=1.06, saturation=1.2, alpha=("top", 0.42)),
        tint=(58, 12, 26),
        tint_strength=0.1,
    ),
    Scene(
        name="couple",
        sky=Layer(photo=20046737, focus=0.3, blur=22, scale=1.14, saturation=0.7, brightness=1.16, warm=(1.07, 1.0, 0.95)),
        mid=Layer(photo=20046737, focus=0.46, saturation=1.1, contrast=1.05, brightness=1.04, warm=(1.04, 1.0, 0.96)),
        front=Layer(photo=10149105, focus=0.5, blur=6, scale=1.08, saturation=1.15, brightness=1.1, alpha=("bottom", 0.5)),
        tint=(48, 10, 24),
        tint_strength=0.08,
    ),
    Scene(
        name="haldi",
        sky=Layer(photo=11352914, focus=0.4, blur=14, scale=1.12, saturation=1.05, brightness=1.14, warm=(1.06, 1.02, 0.9)),
        mid=Layer(photo=17004708, focus=0.45, saturation=1.12, contrast=1.05, brightness=1.03, warm=(1.05, 1.01, 0.93)),
        front=Layer(photo=12087682, focus=0.3, blur=4, scale=1.06, saturation=1.2, alpha=("top", 0.38)),
        tint=(96, 52, 6),
        tint_strength=0.07,
    ),
    Scene(
        name="sangeet",
        sky=Layer(photo=12357707, focus=0.45, blur=18, scale=1.14, saturation=0.95, brightness=1.05),
        mid=Layer(photo=12357702, focus=0.42, saturation=1.14, contrast=1.08, brightness=1.02),
        front=Layer(photo=10149105, focus=0.4, blur=5, scale=1.08, saturation=1.1, brightness=1.05, alpha=("top", 0.46)),
        tint=(20, 14, 62),
        tint_strength=0.12,
    ),
    Scene(
        name="wedding",
        sky=Layer(photo=14088916, focus=0.5, blur=20, scale=1.14, saturation=1.0, brightness=0.9, warm=(1.1, 0.98, 0.86)),
        mid=Layer(photo=12033027, focus=0.5, saturation=1.15, contrast=1.08, brightness=1.05, warm=(1.06, 1.0, 0.92)),
        front=Layer(photo=14250179, focus=0.45, blur=6, scale=1.08, saturation=1.15, alpha=("bottom", 0.46)),
        tint=(70, 14, 24),
        tint_strength=0.1,
    ),
]


def save(image: Image.Image, path: Path, quality: int) -> None:
    if image.mode == "RGBA":
        image.save(path, "WEBP", quality=quality, method=6)
    else:
        image.save(path, "WEBP", quality=quality, method=6)
    print(f"{path.name:28} {image.size[0]}x{image.size[1]:<5} {path.stat().st_size / 1024:7.1f} KB")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for scene in SCENES:
        jobs = [("sky", scene.sky, 70), ("mid", scene.mid, 74), ("front", scene.front, 76)]
        jobs += [(name, layer, 82) for name, layer in scene.extras.items()]
        for suffix, layer, quality in jobs:
            image = render(layer)
            if suffix in {"sky", "mid"}:
                image = tinted(image, scene.tint, scene.tint_strength)
            path = OUT / f"{scene.name}-{suffix}.webp"
            save(image, path, quality)
            total += path.stat().st_size
    print(f"\ntotal: {total / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
