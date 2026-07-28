# Template 295 — Instagram post graduation greetings

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 295 |
| Pixy name | Instagram post graduation greetings |
| Design ID | `cmmbzk3uo00c7p7pbxtkyftr8` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/5be3187c-a94e-4523-8965-60b9e560ef9a/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Caveat Brush | yes | SIL Open Font License 1.1 | `CaveatBrush-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Caveat Brush. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "CLASS 0F 2021"  (OCR confidence 0.9918)

| Property | Value |
|---|---|
| Bounding box (px) | x=141, y=824, w=768, h=131 |
| Normalised | x=13.06%, y=76.3%, w=71.11%, h=12.13% |
| Alignment | left |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `CaveatBrush-Regular.ttf` |
| Variation axes | None |
| Font size | 151 px |
| Letter-spacing | -0.23 px (-0.0015 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#ffffff` |
| Polarity | light-on-dark |
| Contrast vs local bg | 5.26:1 |
| Stroke (median/mean) | 27.0 / 31.21 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Caveat Brush |
| Match IoU | 0.6073 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `CaveatBrush-Regular.ttf` 149px track 0.62px — IoU 0.6063
- `CaveatBrush-Regular.ttf` 150px track 0.2px — IoU 0.6059

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#505e64` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#192839` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#ffffff` | glyph ink of 'CLASS 0F 2021' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#192839` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#100e06` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#ffffff` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#192839` | 0.5582 | 0.1497 | 0.5639 |
| `#100e06` | 0.1645 | 0.0556 | 0.6369 |
| `#eee48e` | 0.1203 | 0.8811 | 0.4039 |
| `#583f1e` | 0.0692 | 0.259 | 0.649 |
| `#ac9775` | 0.0637 | 0.6022 | 0.3193 |
| `#505e64` | 0.0241 | 0.3611 | 0.1993 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=46.6%, y=45.7% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | photographic or gradient background with to bottom darkening |
| Full bleed | True |
| Text coverage | 0.0863 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 117.1
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.722
  - 25% -> alpha ~0.637
  - 50% -> alpha ~0.639
  - 75% -> alpha ~0.663
  - 100% -> alpha ~0.453
- **Grain:** stdDev 10.14, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | CLASS 0F 2021 |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #505e64 |
| `surface` | colour | #192839 |
| `textPrimary` | colour | #ffffff |
| `accent` | colour | #192839 |
| `accentSecondary` | colour | #100e06 |
| `onAccent` | colour | #ffffff |
| `overlay` | colour | #000000 |
| `brandFont` | font | Caveat Brush |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 46.6 |
| `imageFocalY` | number | 45.7 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/CaveatBrush-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
