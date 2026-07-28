# Template 299 — Instagram post merry christmas

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 299 |
| Pixy name | Instagram post merry christmas |
| Design ID | `cmmbzk0ez00bzp7pbwruo6pvu` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/d2f1f7cb-ecb6-4a02-b564-bb20987c069b/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Great Vibes | yes | SIL Open Font License 1.1 | `GreatVibes-Regular.ttf` |
| Abhaya Libre | yes | SIL Open Font License 1.1 | `AbhayaLibre-Regular.ttf`, `AbhayaLibre-Medium.ttf`, `AbhayaLibre-SemiBold.ttf`, `AbhayaLibre-Bold.ttf`, `AbhayaLibre-ExtraBold.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Great Vibes, Abhaya Libre. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — fine-print

**Text:** "WARM WISHES THIS HOLIDAY"  (OCR confidence 0.966)

| Property | Value |
|---|---|
| Bounding box (px) | x=243, y=273, w=632, h=31 |
| Normalised | x=22.5%, y=25.28%, w=58.52%, h=2.87% |
| Alignment | right |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `AbhayaLibre-Bold.ttf` |
| Variation axes | None |
| Font size | 47 px |
| Letter-spacing | 0.64 px (0.0136 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#fdfafb` |
| Polarity | light-on-dark |
| Contrast vs local bg | 4.67:1 |
| Stroke (median/mean) | 4.0 / 4.23 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Great Vibes, Abhaya Libre |
| Match IoU | 0.6319 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | None px |
| Gap to next | 74 px |

Alternate font fits considered:
- `AbhayaLibre-SemiBold.ttf` 48px track 0.27px — IoU 0.6088
- `AbhayaLibre-SemiBold.ttf` 49px track -0.29px — IoU 0.594
- `AbhayaLibre-Medium.ttf` 50px track -0.69px — IoU 0.5937

### `text-2` — headline

**Text:** "Mery"  (OCR confidence 0.9727)

| Property | Value |
|---|---|
| Bounding box (px) | x=223, y=378, w=598, h=277 |
| Normalised | x=20.65%, y=35.0%, w=55.37%, h=25.65% |
| Alignment | left |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `GreatVibes-Regular.ttf` |
| Variation axes | None |
| Font size | 267 px |
| Letter-spacing | 0.68 px (0.0025 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#ffffff` |
| Polarity | light-on-dark |
| Contrast vs local bg | 4.35:1 |
| Stroke (median/mean) | 15.0 / 14.3 px |
| Render model | solid-vector-text |
| Render-model note | strongly slanted or rotated; may sit on a curved path |
| Font family (authoritative) | Great Vibes, Abhaya Libre |
| Match IoU | 0.1666 |
| **Geometry fit confidence** | **very-low** |
| OCR text reliable | True  |
| Fit interpretation | not verified; commonly outlined/hollow type, an offset duplicate layer, overlapping copies of a word, or incomplete OCR capture |
| Gap to previous | 74 px |
| Gap to next | None px |

Alternate font fits considered:
- `GreatVibes-Regular.ttf` 269px track -0.8px — IoU 0.1654
- `GreatVibes-Regular.ttf` 268px track -0.06px — IoU 0.1653
- `AbhayaLibre-ExtraBold.ttf` 280px track -0.37px — IoU 0.1635

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#f8f5f5` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#88131a` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#ffffff` | glyph ink of 'Mery' | glyph ink median |
| textSecondary | `#fdfafb` | glyph ink of 'WARM WISHES THIS HOLIDAY' | glyph ink median |
| accent | `#88131a` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#1a1910` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#ffffff` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#88131a` | 0.4243 | 0.1747 | 0.8605 |
| `#1a1910` | 0.2407 | 0.0992 | 0.356 |
| `#342b1e` | 0.1427 | 0.1735 | 0.4268 |
| `#b85d5b` | 0.0733 | 0.4424 | 0.5029 |
| `#555341` | 0.0668 | 0.3247 | 0.2289 |
| `#f8f5f5` | 0.0522 | 0.9669 | 0.0113 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=53.7%, y=61.3% (medium confidence) |
| Subject position | lower-centre |
| Background treatment | photographic or gradient background with to bottom darkening |
| Full bleed | True |
| Text coverage | 0.1588 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 96.6
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.768
  - 25% -> alpha ~0.465
  - 50% -> alpha ~0.256
  - 75% -> alpha ~0.417
  - 100% -> alpha ~0.597
- **Grain:** stdDev 14.65, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `fine-print` | text | WARM WISHES THIS HOLIDAY |
| `headline` | text | Mery |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #f8f5f5 |
| `surface` | colour | #88131a |
| `textPrimary` | colour | #ffffff |
| `textSecondary` | colour | #fdfafb |
| `accent` | colour | #88131a |
| `accentSecondary` | colour | #1a1910 |
| `onAccent` | colour | #ffffff |
| `overlay` | colour | #000000 |
| `brandFont` | font | Great Vibes |
| `show_fine-print` | boolean | — |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 53.7 |
| `imageFocalY` | number | 61.3 |

## 8. Assets collected

**Exact (7):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/GreatVibes-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/AbhayaLibre-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/AbhayaLibre-Medium.ttf` — SIL Open Font License 1.1
- `assets/fonts/AbhayaLibre-SemiBold.ttf` — SIL Open Font License 1.1
- `assets/fonts/AbhayaLibre-Bold.ttf` — SIL Open Font License 1.1
- `assets/fonts/AbhayaLibre-ExtraBold.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
