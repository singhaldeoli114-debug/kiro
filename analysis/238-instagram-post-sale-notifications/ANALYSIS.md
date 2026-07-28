# Template 238 — Instagram post sale notifications

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 238 |
| Pixy name | Instagram post sale notifications |
| Design ID | `cmmc1tq7o00p5p7pbzpcmcr09` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/26fc79b0-857d-4322-beba-25749e7f1cb4/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Archivo Black | yes | SIL Open Font License 1.1 | `ArchivoBlack-Regular.ttf` |
| Anton | yes | SIL Open Font License 1.1 | `Anton-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Archivo Black, Anton. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "SALE"  (OCR confidence 0.9876)

| Property | Value |
|---|---|
| Bounding box (px) | x=285, y=442, w=534, h=141 |
| Normalised | x=26.39%, y=40.93%, w=49.44%, h=13.06% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `ArchivoBlack-Regular.ttf` |
| Variation axes | None |
| Font size | 186 px |
| Letter-spacing | -1.12 px (-0.006 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#000000` |
| Polarity | dark-on-light |
| Contrast vs local bg | 14.6:1 |
| Stroke (median/mean) | 7.0 / 10.09 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Archivo Black, Anton |
| Match IoU | 0.2266 |
| **Geometry fit confidence** | **very-low** |
| OCR text reliable | True  |
| Fit interpretation | not verified; commonly outlined/hollow type, an offset duplicate layer, overlapping copies of a word, or incomplete OCR capture |
| Gap to previous | None px |
| Gap to next | 67 px |

Alternate font fits considered:
- `ArchivoBlack-Regular.ttf` 185px track -0.15px — IoU 0.2247
- `ArchivoBlack-Regular.ttf` 184px track 0.81px — IoU 0.2157
- `Anton-Regular.ttf` 303px track 0.66px — IoU 0.2136

### `text-2` — body

**Text:** "UP T0 50% 0FF"  (OCR confidence 0.901)

| Property | Value |
|---|---|
| Bounding box (px) | x=650, y=650, w=280, h=43 |
| Normalised | x=60.19%, y=60.19%, w=25.93%, h=3.98% |
| Alignment | right |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Anton-Regular.ttf` |
| Variation axes | None |
| Font size | 49 px |
| Letter-spacing | -0.66 px (-0.0135 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#000000` |
| Polarity | dark-on-light |
| Contrast vs local bg | 21.0:1 |
| Stroke (median/mean) | 8.0 / 9.63 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Archivo Black, Anton |
| Match IoU | 0.8718 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | False — low OCR confidence (0.901) |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | 67 px |
| Gap to next | None px |

Alternate font fits considered:
- `Anton-Regular.ttf` 48px track -0.17px — IoU 0.8616
- `Anton-Regular.ttf` 47px track 0.32px — IoU 0.8317
- `ArchivoBlack-Regular.ttf` 34px track -0.12px — IoU 0.3909

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#fefefe` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#f7dcb3` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#000000` | glyph ink of 'SALE' | glyph ink median |
| textSecondary | `#000000` | glyph ink of 'UP T0 50% 0FF' | glyph ink median |
| accent | `#f4a523` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#f7dcb3` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#fefefe` | 0.4907 | 0.9999 | 0.0002 |
| `#f7dcb3` | 0.3069 | 0.8772 | 0.2778 |
| `#f4a523` | 0.1613 | 0.6773 | 0.8562 |
| `#0a0703` | 0.0214 | 0.0312 | 0.6891 |
| `#fcf4e6` | 0.0102 | 0.9605 | 0.0896 |
| `#fae7cb` | 0.0096 | 0.9169 | 0.1853 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=50.0%, y=50.0% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | photographic or gradient background with to bottom darkening |
| Full bleed | False |
| Text coverage | 0.0749 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 142.8
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.0
  - 25% -> alpha ~0.0
  - 50% -> alpha ~0.371
  - 75% -> alpha ~0.087
  - 100% -> alpha ~0.0
- **Grain:** stdDev 9.36, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | SALE |
| `body` | text | UP T0 50% 0FF |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #fefefe |
| `surface` | colour | #f7dcb3 |
| `textPrimary` | colour | #000000 |
| `textSecondary` | colour | #000000 |
| `accent` | colour | #f4a523 |
| `accentSecondary` | colour | #f7dcb3 |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Archivo Black |
| `show_headline` | boolean | — |
| `show_body` | boolean | — |
| `imageFocalX` | number | 50.0 |
| `imageFocalY` | number | 50.0 |

## 8. Assets collected

**Exact (3):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/ArchivoBlack-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/Anton-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
