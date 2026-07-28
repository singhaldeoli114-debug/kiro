# Template 334 — Instagram shoes sale

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 334 |
| Pixy name | Instagram shoes sale |
| Design ID | `cmmcizqh800nv112w6tja2gnn` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/f0ded6d9-556e-41e5-a5a3-7e7859f0684c/ |
| Category | Uncategorized |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Della Respira | yes | SIL Open Font License 1.1 | `DellaRespira-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Della Respira. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "SALE"  (OCR confidence 0.9643)

| Property | Value |
|---|---|
| Bounding box (px) | x=372, y=536, w=421, h=139 |
| Normalised | x=34.44%, y=49.63%, w=38.98%, h=12.87% |
| Alignment | right |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `DellaRespira-Regular.ttf` |
| Variation axes | None |
| Font size | 160 px |
| Letter-spacing | 1.19 px (0.0074 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#4d3c2d` |
| Polarity | dark-on-light |
| Contrast vs local bg | 2.35:1 |
| Stroke (median/mean) | 12.5 / 14.21 px |
| Render model | text-in-photograph |
| Render-model note | soft glyph edges over textured surroundings: the text appears to be printed on a photographed object rather than set as a text layer, so it is not editable type and should not be treated as a font match |
| Font family (authoritative) | Della Respira |
| Match IoU | 0.1376 |
| **Geometry fit confidence** | **not-applicable-rasterText** |
| OCR text reliable | True  |
| Fit interpretation | this is text printed on a photographed object, not editable type, so a font fit is not meaningful and no font claim is made |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `DellaRespira-Regular.ttf` 161px track 0.32px — IoU 0.1369
- `DellaRespira-Regular.ttf` 162px track -0.55px — IoU 0.1369

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#f6f7f6` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#ecbbac` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#4d3c2d` | glyph ink of 'SALE' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#ecbbac` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#c69587` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#ecbbac` | 0.3229 | 0.7731 | 0.2707 |
| `#c69587` | 0.2253 | 0.6234 | 0.3183 |
| `#dbdbd9` | 0.1708 | 0.8598 | 0.0074 |
| `#f6f7f6` | 0.1244 | 0.9685 | 0.0024 |
| `#c0b9b5` | 0.103 | 0.7329 | 0.0569 |
| `#50473f` | 0.0536 | 0.2847 | 0.2129 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=55.2%, y=51.5% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | photographic or gradient background with to top darkening |
| Full bleed | True |
| Text coverage | 0.0502 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to top
- **Brightness range across axis:** 64.0
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.165
  - 25% -> alpha ~0.109
  - 50% -> alpha ~0.196
  - 75% -> alpha ~0.118
  - 100% -> alpha ~0.117
- **Grain:** stdDev 8.78, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | SALE |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #f6f7f6 |
| `surface` | colour | #ecbbac |
| `textPrimary` | colour | #4d3c2d |
| `accent` | colour | #ecbbac |
| `accentSecondary` | colour | #c69587 |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Della Respira |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 55.2 |
| `imageFocalY` | number | 51.5 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/DellaRespira-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
