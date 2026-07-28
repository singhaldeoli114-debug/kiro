# Template 336 — Trip travel adventure polaroid instagram

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 336 |
| Pixy name | Trip travel adventure polaroid instagram |
| Design ID | `cmmcgiatt008r112wydruzug1` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/9ab65a8a-1641-4876-b1c4-b3fb6b4b88d9/ |
| Category | Uncategorized |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Allan | yes | SIL Open Font License 1.1 | `Allan-Regular.ttf`, `Allan-Bold.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Allan. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Road Trip"  (OCR confidence 0.9566)

| Property | Value |
|---|---|
| Bounding box (px) | x=413, y=246, w=266, h=86 |
| Normalised | x=38.24%, y=22.78%, w=24.63%, h=7.96% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Allan-Regular.ttf` |
| Variation axes | None |
| Font size | 88 px |
| Letter-spacing | 0.14 px (0.0016 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#8b572a` |
| Polarity | dark-on-light |
| Contrast vs local bg | 2.49:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Render-model note | strongly slanted or rotated; may sit on a curved path |
| Font family (authoritative) | Allan |
| Match IoU | 0.7665 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `Allan-Regular.ttf` 89px track -0.23px — IoU 0.7549
- `Allan-Regular.ttf` 87px track 0.52px — IoU 0.7157
- `Allan-Bold.ttf` 80px track 0.15px — IoU 0.6702

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#fbfbfb` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#dbb395` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#8b572a` | glyph ink of 'Road Trip' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#876240` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#c4905c` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#dbb395` | 0.2784 | 0.7297 | 0.3177 |
| `#876240` | 0.2294 | 0.4064 | 0.5255 |
| `#fbfbfb` | 0.1718 | 0.9855 | 0.003 |
| `#3b382f` | 0.1146 | 0.2219 | 0.198 |
| `#c4905c` | 0.1091 | 0.5942 | 0.5262 |
| `#e3dddd` | 0.0968 | 0.8743 | 0.0254 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=51.7%, y=68.4% (medium confidence) |
| Subject position | lower-centre |
| Background treatment | photographic or gradient background with to top darkening |
| Full bleed | True |
| Text coverage | 0.0196 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to top
- **Brightness range across axis:** 158.8
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.246
  - 25% -> alpha ~0.593
  - 50% -> alpha ~0.148
  - 75% -> alpha ~0.058
  - 100% -> alpha ~0.172
- **Grain:** stdDev 11.61, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Road Trip |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #fbfbfb |
| `surface` | colour | #dbb395 |
| `textPrimary` | colour | #8b572a |
| `accent` | colour | #876240 |
| `accentSecondary` | colour | #c4905c |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Allan |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 51.7 |
| `imageFocalY` | number | 68.4 |

## 8. Assets collected

**Exact (3):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/Allan-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/Allan-Bold.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
