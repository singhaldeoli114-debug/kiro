# Template 063 — Instagram skincare 101

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 063 |
| Pixy name | Instagram skincare 101 |
| Design ID | `cmmcizopp00nt112wrzrlm2ww` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/b2756c6c-6652-4da8-877f-1c64f1cbc23f/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Covered By Your Grace | yes | SIL Open Font License 1.1 | `CoveredByYourGrace.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Covered By Your Grace. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Skincare 101"  (OCR confidence 0.8423)

| Property | Value |
|---|---|
| Bounding box (px) | x=357, y=852, w=364, h=69 |
| Normalised | x=33.06%, y=78.89%, w=33.7%, h=6.39% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `CoveredByYourGrace.ttf` |
| Variation axes | None |
| Font size | 90 px |
| Letter-spacing | 0.19 px (0.0021 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#232424` |
| Polarity | dark-on-light |
| Contrast vs local bg | 4.82:1 |
| Stroke (median/mean) | 8.0 / 9.18 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Covered By Your Grace |
| Match IoU | 0.6184 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | False — low OCR confidence (0.8423) |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `CoveredByYourGrace.ttf` 91px track -0.18px — IoU 0.6036
- `CoveredByYourGrace.ttf` 92px track -0.55px — IoU 0.5842

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#e3e4e2` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#6c5746` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#232424` | glyph ink of 'Skincare 101' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#302212` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#6c5746` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#ffffff` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#6c5746` | 0.2431 | 0.3545 | 0.3541 |
| `#8e6d58` | 0.1838 | 0.452 | 0.3768 |
| `#e3e4e2` | 0.1751 | 0.8959 | 0.0113 |
| `#c18a71` | 0.1596 | 0.5823 | 0.4123 |
| `#dfaf9e` | 0.1332 | 0.7228 | 0.2899 |
| `#302212` | 0.1052 | 0.142 | 0.6248 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=54.3%, y=39.3% (medium confidence) |
| Subject position | upper-centre |
| Background treatment | photographic or gradient background with to bottom darkening |
| Full bleed | True |
| Text coverage | 0.0215 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 121.4
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.519
  - 25% -> alpha ~0.49
  - 50% -> alpha ~0.418
  - 75% -> alpha ~0.063
  - 100% -> alpha ~0.406
- **Grain:** stdDev 8.47, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Skincare 101 |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #e3e4e2 |
| `surface` | colour | #6c5746 |
| `textPrimary` | colour | #232424 |
| `accent` | colour | #302212 |
| `accentSecondary` | colour | #6c5746 |
| `onAccent` | colour | #ffffff |
| `brandFont` | font | Covered By Your Grace |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 54.3 |
| `imageFocalY` | number | 39.3 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/CoveredByYourGrace.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
