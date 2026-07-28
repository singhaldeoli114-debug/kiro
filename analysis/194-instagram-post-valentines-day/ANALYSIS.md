# Template 194 — Instagram post valentines day

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 194 |
| Pixy name | Instagram post valentines day |
| Design ID | `cmmc5pb88017vp7pbvdkm2505` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/21f68a67-301c-4dce-ad54-c3e8153e355a/ |
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

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Great Vibes. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Valentine's"  (OCR confidence 0.9187)

| Property | Value |
|---|---|
| Bounding box (px) | x=91, y=104, w=634, h=202 |
| Normalised | x=8.43%, y=9.63%, w=58.7%, h=18.7% |
| Alignment | left |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `GreatVibes-Regular.ttf` |
| Variation axes | None |
| Font size | 181 px |
| Letter-spacing | 0.25 px (0.0014 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#f5170f` |
| Polarity | dark-on-light |
| Contrast vs local bg | 2.78:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Render-model note | strongly slanted or rotated; may sit on a curved path |
| Font family (authoritative) | Great Vibes |
| Match IoU | 0.0967 |
| **Geometry fit confidence** | **very-low-textUnreliable** |
| OCR text reliable | False — low OCR confidence (0.9187) |
| Fit interpretation | not verified; driven by corrupted OCR text rather than a wrong family |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `GreatVibes-Regular.ttf` 183px track -0.45px — IoU 0.0959
- `GreatVibes-Regular.ttf` 182px track -0.1px — IoU 0.0953

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#d8d8d8` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#822117` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#f5170f` | glyph ink of 'Valentine's' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#822117` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#aa6749` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#d8d8d8` | 0.6371 | 0.8488 | 0.0026 |
| `#822117` | 0.1227 | 0.2089 | 0.8207 |
| `#aa6749` | 0.102 | 0.4528 | 0.5708 |
| `#c1966e` | 0.088 | 0.6144 | 0.4307 |
| `#fefdfc` | 0.0262 | 0.9955 | 0.0075 |
| `#d5c1b3` | 0.024 | 0.7713 | 0.1596 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=60.1%, y=63.6% (medium confidence) |
| Subject position | lower-right |
| Background treatment | photographic or gradient background with to top darkening |
| Full bleed | False |
| Text coverage | 0.1098 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to top
- **Brightness range across axis:** 106.1
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.133
  - 25% -> alpha ~0.398
  - 50% -> alpha ~0.236
  - 75% -> alpha ~0.092
  - 100% -> alpha ~0.087
- **Grain:** stdDev 8.8, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Valentine's |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #d8d8d8 |
| `surface` | colour | #822117 |
| `textPrimary` | colour | #f5170f |
| `accent` | colour | #822117 |
| `accentSecondary` | colour | #aa6749 |
| `onAccent` | colour | #000000 |
| `brandFont` | font | Great Vibes |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 60.1 |
| `imageFocalY` | number | 63.6 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/GreatVibes-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
