# Template 329 — Instagram post waffle pancake

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 329 |
| Pixy name | Instagram post waffle pancake |
| Design ID | `cmmbz5thf003dp7pbzy7c86oz` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/f3a455ff-2177-4260-8fde-d4c692164bdd/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Libre Baskerville | yes | SIL Open Font License 1.1 | `LibreBaskerville-Italic[wght].ttf`, `LibreBaskerville[wght].ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Libre Baskerville. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Waiting for a waffle o'clock"  (OCR confidence 0.9698)

| Property | Value |
|---|---|
| Bounding box (px) | x=90, y=170, w=899, h=71 |
| Normalised | x=8.33%, y=15.74%, w=83.24%, h=6.57% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `LibreBaskerville[wght].ttf` |
| Variation axes | [500] |
| Font size | 64 px |
| Letter-spacing | -0.36 px (-0.0056 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#bd8224` |
| Polarity | dark-on-light |
| Contrast vs local bg | 1.4:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Font family (authoritative) | Libre Baskerville |
| Match IoU | 0.5802 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `LibreBaskerville[wght].ttf` 64px track -0.61px — IoU 0.5663
- `LibreBaskerville[wght].ttf` 63px track -0.09px — IoU 0.5609
- `LibreBaskerville[wght].ttf` 63px track 0.17px — IoU 0.5392

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#c3bead` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#f4bd66` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#bd8224` | glyph ink of 'Waiting for a waffle o'clock' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#f4bd66` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#cd8e36` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#f4bd66` | 0.3248 | 0.7648 | 0.5805 |
| `#f1e8c4` | 0.2818 | 0.909 | 0.1845 |
| `#c3bead` | 0.1201 | 0.7452 | 0.1094 |
| `#6f4422` | 0.1003 | 0.2946 | 0.6888 |
| `#cd8e36` | 0.0932 | 0.5878 | 0.7346 |
| `#a38b6c` | 0.0798 | 0.5584 | 0.3345 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=48.6%, y=53.0% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | photographic or gradient background with to bottom darkening |
| Full bleed | False |
| Text coverage | 0.0547 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 81.1
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.194
  - 25% -> alpha ~0.194
  - 50% -> alpha ~0.324
  - 75% -> alpha ~0.299
  - 100% -> alpha ~0.0
- **Grain:** stdDev 9.07, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Waiting for a waffle o'clock |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #c3bead |
| `surface` | colour | #f4bd66 |
| `textPrimary` | colour | #bd8224 |
| `accent` | colour | #f4bd66 |
| `accentSecondary` | colour | #cd8e36 |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Libre Baskerville |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 48.6 |
| `imageFocalY` | number | 53.0 |

## 8. Assets collected

**Exact (3):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/LibreBaskerville-Italic[wght].ttf` — SIL Open Font License 1.1
- `assets/fonts/LibreBaskerville[wght].ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
