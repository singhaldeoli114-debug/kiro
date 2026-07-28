# Template 125 — Instagram post flowers bloom

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 125 |
| Pixy name | Instagram post flowers bloom |
| Design ID | `cmmcf6zu901pxp7pbk4udl4ay` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/ad63009a-0b70-4909-a28c-87856f9889c0/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Oleo Script Swash Caps | yes | SIL Open Font License 1.1 | `OleoScriptSwashCaps-Regular.ttf`, `OleoScriptSwashCaps-Bold.ttf` |
| Bebas Neue | yes | SIL Open Font License 1.1 | `BebasNeue-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Oleo Script Swash Caps, Bebas Neue. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Ploom"  (OCR confidence 0.7986)

| Property | Value |
|---|---|
| Bounding box (px) | x=217, y=435, w=637, h=229 |
| Normalised | x=20.09%, y=40.28%, w=58.98%, h=21.2% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `OleoScriptSwashCaps-Bold.ttf` |
| Variation axes | None |
| Font size | 246 px |
| Letter-spacing | -0.84 px (-0.0034 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#ffffff` |
| Polarity | light-on-dark |
| Contrast vs local bg | 2.88:1 |
| Stroke (median/mean) | 36.0 / 27.12 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Oleo Script Swash Caps, Bebas Neue |
| Match IoU | 0.4427 |
| **Geometry fit confidence** | **low-textUnreliable** |
| OCR text reliable | False — low OCR confidence (0.7986) |
| Fit interpretation | plausible but unverified; OCR text is suspect, so the score understates the fit |
| Gap to previous | None px |
| Gap to next | -21 px |

Alternate font fits considered:
- `OleoScriptSwashCaps-Bold.ttf` 244px track 0.46px — IoU 0.4411
- `OleoScriptSwashCaps-Bold.ttf` 245px track -0.18px — IoU 0.44
- `OleoScriptSwashCaps-Regular.ttf` 265px track -0.48px — IoU 0.4392

### `text-2` — body

**Text:** "WHERE YOU ARE PLANTED"  (OCR confidence 0.9746)

| Property | Value |
|---|---|
| Bounding box (px) | x=297, y=643, w=494, h=48 |
| Normalised | x=27.5%, y=59.54%, w=45.74%, h=4.44% |
| Alignment | center |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `BebasNeue-Regular.ttf` |
| Variation axes | None |
| Font size | 65 px |
| Letter-spacing | -0.13 px (-0.002 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#ffffff` |
| Polarity | light-on-dark |
| Contrast vs local bg | 3.04:1 |
| Stroke (median/mean) | 7.0 / 9.26 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Oleo Script Swash Caps, Bebas Neue |
| Match IoU | 0.8045 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | -21 px |
| Gap to next | None px |

Alternate font fits considered:
- `BebasNeue-Regular.ttf` 66px track -0.51px — IoU 0.7807
- `BebasNeue-Regular.ttf` 64px track 0.25px — IoU 0.7786
- `OleoScriptSwashCaps-Bold.ttf` 36px track 0.85px — IoU 0.3597

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#f0eae5` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#2e2d2f` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#ffffff` | glyph ink of 'Ploom' | glyph ink median |
| textSecondary | `#ffffff` | glyph ink of 'WHERE YOU ARE PLANTED' | glyph ink median |
| accent | `#c34c44` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#181f21` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#2e2d2f` | 0.3302 | 0.1794 | 0.0473 |
| `#181f21` | 0.231 | 0.1169 | 0.2683 |
| `#483a3b` | 0.1711 | 0.2418 | 0.1934 |
| `#5b5c5f` | 0.1174 | 0.3628 | 0.0465 |
| `#f0eae5` | 0.0781 | 0.9237 | 0.044 |
| `#c34c44` | 0.0721 | 0.3972 | 0.6507 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=45.8%, y=73.3% (medium confidence) |
| Subject position | lower-centre |
| Background treatment | photographic or gradient background with to bottom darkening |
| Full bleed | True |
| Text coverage | 0.1454 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 109.8
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.707
  - 25% -> alpha ~0.624
  - 50% -> alpha ~0.069
  - 75% -> alpha ~0.498
  - 100% -> alpha ~0.625
- **Grain:** stdDev 10.38, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Ploom |
| `body` | text | WHERE YOU ARE PLANTED |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #f0eae5 |
| `surface` | colour | #2e2d2f |
| `textPrimary` | colour | #ffffff |
| `textSecondary` | colour | #ffffff |
| `accent` | colour | #c34c44 |
| `accentSecondary` | colour | #181f21 |
| `onAccent` | colour | #000000 |
| `brandFont` | font | Oleo Script Swash Caps |
| `show_headline` | boolean | — |
| `show_body` | boolean | — |
| `imageFocalX` | number | 45.8 |
| `imageFocalY` | number | 73.3 |

## 8. Assets collected

**Exact (4):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/OleoScriptSwashCaps-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/OleoScriptSwashCaps-Bold.ttf` — SIL Open Font License 1.1
- `assets/fonts/BebasNeue-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
