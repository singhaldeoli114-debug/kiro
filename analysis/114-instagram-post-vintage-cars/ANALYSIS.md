# Template 114 — Instagram post vintage cars

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 114 |
| Pixy name | Instagram post vintage cars |
| Design ID | `cmmcg4bkt005p112w0li74699` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/e0ff91a6-d18d-4cfa-9fa6-f77074ea530a/ |
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
| Monoton | yes | SIL Open Font License 1.1 | `Monoton-Regular.ttf` |
| Yellowtail | yes | Apache License 2.0 | `Yellowtail-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Archivo Black, Monoton, Yellowtail. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — subheadline

**Text:** "CLASSIEGL"  (OCR confidence 0.7074)

| Property | Value |
|---|---|
| Bounding box (px) | x=80, y=110, w=711, h=259 |
| Normalised | x=7.41%, y=10.19%, w=65.83%, h=23.98% |
| Alignment | left |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `ArchivoBlack-Regular.ttf` |
| Variation axes | None |
| Font size | 112 px |
| Letter-spacing | 0.98 px (0.0087 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#8b572a` |
| Polarity | dark-on-light |
| Contrast vs local bg | 1.84:1 |
| Stroke (median/mean) | 1.0 / 1.46 px |
| Render model | text-in-photograph |
| Render-model note | soft glyph edges over textured surroundings: the text appears to be printed on a photographed object rather than set as a text layer, so it is not editable type and should not be treated as a font match |
| Font family (authoritative) | Archivo Black, Monoton, Yellowtail |
| Match IoU | 0.288 |
| **Geometry fit confidence** | **not-applicable-rasterText** |
| OCR text reliable | False — low OCR confidence (0.7074) |
| Fit interpretation | this is text printed on a photographed object, not editable type, so a font fit is not meaningful and no font claim is made |
| Gap to previous | None px |
| Gap to next | 409 px |

Alternate font fits considered:
- `ArchivoBlack-Regular.ttf` 113px track 0.2px — IoU 0.2859
- `ArchivoBlack-Regular.ttf` 114px track -0.59px — IoU 0.2859
- `Yellowtail-Regular.ttf` 131px track -0.34px — IoU 0.2432

### `text-2` — headline

**Text:** "Tor Sale"  (OCR confidence 0.9426)

| Property | Value |
|---|---|
| Bounding box (px) | x=532, y=778, w=497, h=125 |
| Normalised | x=49.26%, y=72.04%, w=46.02%, h=11.57% |
| Alignment | right |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Yellowtail-Regular.ttf` |
| Variation axes | None |
| Font size | 159 px |
| Letter-spacing | -0.34 px (-0.0021 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#331c07` |
| Polarity | dark-on-light |
| Contrast vs local bg | 4.48:1 |
| Stroke (median/mean) | 17.0 / 20.21 px |
| Render model | solid-vector-text |
| Render-model note | strongly slanted or rotated; may sit on a curved path |
| Font family (authoritative) | Archivo Black, Monoton, Yellowtail |
| Match IoU | 0.8093 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | 409 px |
| Gap to next | None px |

Alternate font fits considered:
- `Yellowtail-Regular.ttf` 157px track 0.56px — IoU 0.7957
- `Yellowtail-Regular.ttf` 158px track 0.12px — IoU 0.7904
- `ArchivoBlack-Regular.ttf` 110px track -0.58px — IoU 0.3404

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#cfcfcd` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#a8c08c` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#8b572a` | glyph ink of 'CLASSIEGL' | glyph ink median |
| textSecondary | `#331c07` | glyph ink of 'Tor Sale' | glyph ink median |
| accent | `#a8c08c` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#d8aa71` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#a8c08c` | 0.5895 | 0.7216 | 0.2714 |
| `#d8aa71` | 0.1601 | 0.6912 | 0.4771 |
| `#654a2b` | 0.1021 | 0.3055 | 0.5768 |
| `#607c6d` | 0.096 | 0.4592 | 0.2231 |
| `#07a2b7` | 0.0276 | 0.5132 | 0.9598 |
| `#cfcfcd` | 0.0247 | 0.8139 | 0.0118 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=46.3%, y=43.6% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | flat colour or framed panel |
| Full bleed | False |
| Text coverage | 0.2111 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 64.4
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.0
  - 25% -> alpha ~0.165
  - 50% -> alpha ~0.237
  - 75% -> alpha ~0.169
  - 100% -> alpha ~0.0
- **Grain:** stdDev 10.33, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `subheadline` | text | CLASSIEGL |
| `headline` | text | Tor Sale |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #cfcfcd |
| `surface` | colour | #a8c08c |
| `textPrimary` | colour | #8b572a |
| `textSecondary` | colour | #331c07 |
| `accent` | colour | #a8c08c |
| `accentSecondary` | colour | #d8aa71 |
| `onAccent` | colour | #000000 |
| `brandFont` | font | Archivo Black |
| `show_subheadline` | boolean | — |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 46.3 |
| `imageFocalY` | number | 43.6 |

## 8. Assets collected

**Exact (4):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/ArchivoBlack-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/Monoton-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/Yellowtail-Regular.ttf` — Apache License 2.0

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
