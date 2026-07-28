# Template 131 — Instagram post mood board

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 131 |
| Pixy name | Instagram post mood board |
| Design ID | `cmmcf6t9001plp7pb7258891x` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/1fa3b640-fb02-4106-a9c6-c75584c283e9/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Roboto | yes | SIL Open Font License 1.1 | `Roboto-Italic[wdth,wght].ttf`, `Roboto[wdth,wght].ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Roboto. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "LOVE YOURSELF"  (OCR confidence 0.996)

| Property | Value |
|---|---|
| Bounding box (px) | x=159, y=515, w=352, h=36 |
| Normalised | x=14.72%, y=47.69%, w=32.59%, h=3.33% |
| Alignment | left |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Roboto[wdth,wght].ttf` |
| Variation axes | [600, 100.0] |
| Font size | 48 px |
| Letter-spacing | -0.88 px (-0.0183 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#ffffff` |
| Polarity | light-on-dark |
| Contrast vs local bg | 7.96:1 |
| Stroke (median/mean) | 4.0 / 6.0 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Roboto |
| Match IoU | 0.8069 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `Roboto[wdth,wght].ttf` 48px track -0.8px — IoU 0.7645
- `Roboto[wdth,wght].ttf` 51px track -0.7px — IoU 0.7512
- `Roboto[wdth,wght].ttf` 46px track 0.46px — IoU 0.7375

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#fcfcfb` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#a4a096` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#ffffff` | glyph ink of 'LOVE YOURSELF' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#27190b` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#806548` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#ffffff` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#a4a096` | 0.2402 | 0.6315 | 0.0858 |
| `#fcfcfb` | 0.2114 | 0.9884 | 0.0018 |
| `#e6e5e2` | 0.1775 | 0.8992 | 0.0165 |
| `#27190b` | 0.1516 | 0.1086 | 0.7011 |
| `#cdc3b5` | 0.1118 | 0.7726 | 0.1169 |
| `#806548` | 0.1076 | 0.4135 | 0.4321 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=43.4%, y=65.6% (medium confidence) |
| Subject position | lower-centre |
| Background treatment | flat colour or framed panel |
| Full bleed | False |
| Text coverage | 0.0109 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to right
- **Brightness range across axis:** 173.1
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.0
  - 25% -> alpha ~0.506
  - 50% -> alpha ~0.402
  - 75% -> alpha ~0.164
  - 100% -> alpha ~0.0
- **Grain:** stdDev 17.03, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | LOVE YOURSELF |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #fcfcfb |
| `surface` | colour | #a4a096 |
| `textPrimary` | colour | #ffffff |
| `accent` | colour | #27190b |
| `accentSecondary` | colour | #806548 |
| `onAccent` | colour | #ffffff |
| `brandFont` | font | Roboto |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 43.4 |
| `imageFocalY` | number | 65.6 |

## 8. Assets collected

**Exact (3):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/Roboto-Italic[wdth,wght].ttf` — SIL Open Font License 1.1
- `assets/fonts/Roboto[wdth,wght].ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
