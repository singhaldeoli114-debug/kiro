# BUILD NOTES — Instagram Product Hero Template

> Reverse-engineered from Pixy.art design `cms3i8gz9000b04jq0sf7z1lj`  
> ("Copy of Design 17"), fetched 2026-07-28.

---

## Source

| Field | Value |
|-------|-------|
| Platform | [pixy.art](https://www.pixy.art) |
| Design ID | `cms3i8gz9000b04jq0sf7z1lj` |
| Canvas | 1080 x 1080 px (Instagram square) |
| API key used | `Bearer cms44f21b000004ky28ndeagd` |
| Endpoint | `GET /api/v1/designs` on `www.app.pixy.art` |

---

## Pixel Measurements

All measurements taken programmatically from `reference.png` using Python/Pillow.
White-pixel detection threshold: `>230/255` per channel, `alpha > 200`.

### Text Bounding Boxes

| Element | x | y | width | height | Notes |
|---------|---|---|-------|--------|-------|
| Headline Line 1 | 153 | 116 | 771 | 50 | "GOODBYE PROBLEMS." |
| Headline Line 2 | 183 | 192 | 714 | 49 | "HELLO CONFIDENCE." |
| Subheadline | 250 | 278 | 579 | 24 | Italic, strict threshold |

> **Note:** Heights measured at >90% white threshold. Actual rendered cap-height
> is ~60px (headline) and ~35px (subheadline) when including anti-aliased edges.

### Spacing

| Metric | Value |
|--------|-------|
| Canvas top to Headline L1 | 116px |
| Headline line-to-line (top-to-top) | 76px |
| Gap between headline lines (bottom-to-top) | 27px |
| Headline L2 bottom to Subheadline top | 38px |
| Text block center offset from canvas center | -1px to -2px (effectively centered) |

---

## Typography

### Headline

| Property | Value | How determined |
|----------|-------|----------------|
| Font family | **Oswald** | Density analysis (45.7% fill = bold condensed), width ratio match (1.088 computed vs 1.080 measured) |
| Weight | 700 (Bold) | Variable font axis `wght` set to max |
| Size | 72px | Size where cap-height + letter-spacing produces 771px measured width |
| Letter-spacing | 8.2px (0.114em) | Calculated: `(measured_width - natural_width) / (char_count - 1)` |
| Line-height | 76px (1.056x) | Distance between line 1 top and line 2 top |
| Transform | uppercase | All caps in reference |
| Color | `#fefefe` | Sampled from 81 text pixels, averaged |

### Subheadline

| Property | Value | How determined |
|----------|-------|----------------|
| Font family | **Lora** | Serif italic with 23.3% density (regular weight), width match at 34px |
| Weight | 400 (Regular) | Variable axis at minimum |
| Style | italic | Visual inspection + density analysis |
| Size | 34px | Size producing 573px natural width (target 579px, diff < 1%) |
| Letter-spacing | 0 (normal) | Natural width matches measured width |
| Color | `#fefefe` | Same as headline |

### Font Files

- `assets/fonts/Oswald-Variable.ttf` — Google Fonts, OFL license, weight axis 200–700
- `assets/fonts/Lora-Italic-Variable.ttf` — Google Fonts, OFL license, weight axis 400–700

### Alternative Fonts (if Oswald unavailable)

1. **Anton** — Similar condensed bold, slightly narrower
2. **Bebas Neue** — Condensed caps, no lowercase
3. **Barlow Condensed** (700) — Wider alternative
4. **Impact** — System font fallback

---

## Image & Overlay

### Hero Image

The original Pixy design stores the photo as a layer that cannot be extracted via API.
`hero.png` was created by **inpainting** the text regions:

1. Detect white pixels (>200 brightness) in y=100–320
2. Dilate mask by 5px to catch anti-aliased edges
3. Replace each masked pixel with blend of nearest vertical unmasked neighbors
4. Apply 3px Gaussian blur to smooth transitions

**Limitation:** This is an approximation. For a pixel-perfect result, the original
unflattened photograph would be needed from the Pixy editor.

### Background Analysis

| Region | Avg Brightness | Color |
|--------|---------------|-------|
| Top (y=0–100) | 29–43 | `#23211b` to `#393834` — natural window-blind shadow |
| Mid (y=300–600) | 139–172 | `#b1aea5` — neutral warm wall |
| Bottom (y=900–1080) | 90–107 | `#6a5a43` — wooden surface |

### Overlay / Scrim

The original photo has **natural shadows** from window blinds casting diagonal darkness
across the top. There is no artificial CSS overlay in the original.

For the HTML recreation, a **gradient scrim** is applied to approximate this effect
when using a different hero image:

```
linear-gradient(
  to bottom,
  rgba(0,0,0, overlayStrength × 1.57) 0%,
  rgba(0,0,0, overlayStrength × 0.86) 35%,
  rgba(0,0,0, 0)                       60%
)
```

Default `overlayStrength = 0.35` produces:
- Top: ~55% black opacity
- 35%: ~30% black opacity  
- 60%+: transparent

### Focal Point

| Axis | Value | Meaning |
|------|-------|---------|
| X | 49.2% | Nearly centered horizontally (bottle center) |
| Y | 61.0% | Lower-center (product in bottom 40% of frame) |

Determined by computing center-of-mass of dark pixels (<50 brightness) in the product region.

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Text White | `#fefefe` | All text |
| Wall Beige | `#b1aea5` | Canvas fallback, lightest wall tone |
| Shadow Dark | `#23211b` | Darkest corner (top-left) |
| Bottle Amber | `#5f1f00` | Product accent color |
| Wood Warm | `#6a5a43` | Wooden surface |

---

## Pixel Comparison

Rendered `thumb.png` vs `reference.png`:

| Region | MAE (per channel) | Accuracy |
|--------|-------------------|----------|
| Full image (1080×1080) | 17.3/255 | **93.2%** |
| Background only (y>330) | 6.4/255 | **97.5%** |
| Text region (y=100–320) | 58.1/255 | 77.2% |

### Why text region accuracy is lower

1. **Inpainted background** — the hero image behind text differs from original
2. **Font rendering engine** — Pillow's FreeType vs Pixy's browser renderer
3. **Sub-pixel differences** — anti-aliasing algorithms differ between renderers
4. **Overlay approximation** — natural photo shadow vs CSS linear-gradient

### Debug mode

Open `layout-1x1.html?debug=1` to see the reference image overlaid in
`mix-blend-mode: difference` — any perfectly-matched pixels appear black.

A standalone `assets/images/diff-map.png` is also included (3x amplified difference).

---

## Editable Variables

All customizable via URL params or `window.TEMPLATE_VARS`:

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `HEADLINE` | string | `GOODBYE PROBLEMS.\nHELLO CONFIDENCE.` | Two-line headline (newline = line break) |
| `SUBHEADLINE` | string | `With Tea Tree Oil, You'll finally enjoy` | Italic subheadline |
| `heroImage` | url | `assets/images/hero.png` | Background photo |
| `brandFont` | string | `Oswald` | Headline font family |
| `brandBg` | color | `#b1aea5` | Fallback background |
| `brandInk` | color | `#fefefe` | Text color |
| `brandAccent` | color | `#5f1f00` | Accent color |
| `overlayStrength` | number | `0.35` | Gradient opacity (0–1) |
| `imageFocalX` | number | `49.2` | Image focus X (0–100%) |
| `imageFocalY` | number | `61.0` | Image focus Y (0–100%) |

### URL Example

```
layout-1x1.html?HEADLINE=SUMMER%20SALE%0ASHOP%20NOW&SUBHEADLINE=Free%20shipping%20on%20all%20orders&overlayStrength=0.5
```

---

## File Structure

```
instagram-template/
├── manifest.json              # Template metadata + variable schema
├── layout-1x1.html           # Editable HTML template (1080×1080)
├── thumb.png                  # Rendered preview thumbnail
├── BUILD-NOTES.md            # This file
└── assets/
    ├── fonts/
    │   ├── Oswald-Variable.ttf      # Headline (wght 200–700)
    │   └── Lora-Italic-Variable.ttf # Subheadline (wght 400–700)
    └── images/
        ├── reference.png    # Original from Pixy CDN (ground truth)
        ├── hero.png         # Inpainted background (text removed)
        └── diff-map.png     # Pixel difference visualization (3x amplified)
```

---

## Known Limitations

1. **Not a pixel-perfect replica** — this is an *inspired recreation* because:
   - The original photo cannot be separated from text via Pixy's API
   - The exact font may differ (Pixy doesn't expose font metadata)
   - Overlay is a CSS approximation of natural photo shadows

2. **Pixy API plan** — generation endpoint returned "API access is not included in your current plan", so we couldn't render via their API for comparison

3. **Font identification** — determined by statistical analysis (density, width ratios), not metadata. Oswald is the closest match but the original could be a custom/proprietary variant.

4. **Variable font rendering** — browser rendering of variable fonts may differ slightly from Pillow's FreeType. The HTML version should be considered authoritative for web use.

---

## Licenses

- **Oswald** — SIL Open Font License 1.1 (Google Fonts)
- **Lora** — SIL Open Font License 1.1 (Google Fonts)
- **Template design** — Original design owned by Pixy.art account holder
- **Hero photograph** — Rights belong to original photographer/stock source
