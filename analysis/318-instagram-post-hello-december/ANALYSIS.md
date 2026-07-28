# Template 318 — Instagram post hello december

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 318 |
| Pixy name | Instagram post hello december |
| Design ID | `cmmbz639v003zp7pbvxeqcbsr` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/9f8f5ea4-9404-49c3-a584-746512e0f899/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Satisfy | yes | Apache License 2.0 | `Satisfy-Regular.ttf` |
| Poppins | yes | SIL Open Font License 1.1 | `Poppins-Regular.ttf`, `Poppins-Medium.ttf`, `Poppins-SemiBold.ttf`, `Poppins-Bold.ttf`, `Poppins-ExtraBold.ttf`, `Poppins-Black.ttf`, `Poppins-Light.ttf`, `Poppins-ExtraLight.ttf`, `Poppins-Thin.ttf`, `Poppins-MediumItalic.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Satisfy, Poppins. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — supporting

**Text:** "Hello,"  (OCR confidence 0.9732)

| Property | Value |
|---|---|
| Bounding box (px) | x=424, y=416, w=237, h=83 |
| Normalised | x=39.26%, y=38.52%, w=21.94%, h=7.69% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Poppins-Medium.ttf` |
| Variation axes | None |
| Font size | 88 px |
| Letter-spacing | -0.35 px (-0.004 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#ffffff` |
| Polarity | light-on-dark |
| Contrast vs local bg | 1.78:1 |
| Stroke (median/mean) | 10.0 / 12.21 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Satisfy, Poppins |
| Match IoU | 0.8676 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | None px |
| Gap to next | 56 px |

Alternate font fits considered:
- `Poppins-Regular.ttf` 91px track -0.68px — IoU 0.8674
- `Poppins-Medium.ttf` 87px track 0.2px — IoU 0.8378
- `Poppins-Regular.ttf` 89px track 0.37px — IoU 0.8278

### `text-2` — headline

**Text:** "December"  (OCR confidence 0.9864)

| Property | Value |
|---|---|
| Bounding box (px) | x=164, y=555, w=759, h=219 |
| Normalised | x=15.19%, y=51.39%, w=70.28%, h=20.28% |
| Alignment | center |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Satisfy-Regular.ttf` |
| Variation axes | None |
| Font size | 209 px |
| Letter-spacing | -0.59 px (-0.0028 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#ffffff` |
| Polarity | light-on-dark |
| Contrast vs local bg | 3.17:1 |
| Stroke (median/mean) | 19.0 / 20.82 px |
| Render model | solid-vector-text |
| Render-model note | strongly slanted or rotated; may sit on a curved path |
| Font family (authoritative) | Satisfy, Poppins |
| Match IoU | 0.3459 |
| **Geometry fit confidence** | **very-low** |
| OCR text reliable | True  |
| Fit interpretation | not verified; commonly outlined/hollow type, an offset duplicate layer, overlapping copies of a word, or incomplete OCR capture |
| Gap to previous | 56 px |
| Gap to next | None px |

Alternate font fits considered:
- `Satisfy-Regular.ttf` 208px track -0.07px — IoU 0.345
- `Satisfy-Regular.ttf` 207px track 0.45px — IoU 0.3418
- `Poppins-Black.ttf` 141px track -0.81px — IoU 0.2259

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#f6e9d1` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#8d1d07` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#ffffff` | glyph ink of 'December' | glyph ink median |
| textSecondary | `#ffffff` | glyph ink of 'Hello,' | glyph ink median |
| accent | `#8d1d07` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#c74615` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#8d1d07` | 0.2566 | 0.2035 | 0.9458 |
| `#c74615` | 0.207 | 0.3696 | 0.8937 |
| `#de9156` | 0.1638 | 0.618 | 0.6097 |
| `#4d1002` | 0.141 | 0.1104 | 0.9638 |
| `#170601` | 0.137 | 0.0383 | 0.9321 |
| `#f6e9d1` | 0.0946 | 0.9195 | 0.1501 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=53.2%, y=51.3% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | photographic or gradient background with to left darkening |
| Full bleed | True |
| Text coverage | 0.1594 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to left
- **Brightness range across axis:** 102.7
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.698
  - 25% -> alpha ~0.264
  - 50% -> alpha ~0.516
  - 75% -> alpha ~0.066
  - 100% -> alpha ~0.542
- **Grain:** stdDev 16.78, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `supporting` | text | Hello, |
| `headline` | text | December |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #f6e9d1 |
| `surface` | colour | #8d1d07 |
| `textPrimary` | colour | #ffffff |
| `textSecondary` | colour | #ffffff |
| `accent` | colour | #8d1d07 |
| `accentSecondary` | colour | #c74615 |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Satisfy |
| `show_supporting` | boolean | — |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 53.2 |
| `imageFocalY` | number | 51.3 |

## 8. Assets collected

**Exact (12):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/Satisfy-Regular.ttf` — Apache License 2.0
- `assets/fonts/Poppins-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-Medium.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-SemiBold.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-Bold.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-ExtraBold.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-Black.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-Light.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-ExtraLight.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-Thin.ttf` — SIL Open Font License 1.1
- `assets/fonts/Poppins-MediumItalic.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
