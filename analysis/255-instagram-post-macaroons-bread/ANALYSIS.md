# Template 255 — Instagram post macaroons bread

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 255 |
| Pixy name | Instagram post macaroons bread |
| Design ID | `cmmc130yd00kpp7pbaobbz269` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/7c8e6dbb-8f45-4e5d-968d-a466c965a018/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Knewave | yes | SIL Open Font License 1.1 | `Knewave-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Knewave. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "MACARONS"  (OCR confidence 0.9963)

| Property | Value |
|---|---|
| Bounding box (px) | x=44, y=101, w=779, h=149 |
| Normalised | x=4.07%, y=9.35%, w=72.13%, h=13.8% |
| Alignment | left |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Knewave-Regular.ttf` |
| Variation axes | None |
| Font size | 162 px |
| Letter-spacing | 0.31 px (0.0019 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#f80549` |
| Polarity | dark-on-light |
| Contrast vs local bg | 2.93:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Render-model note | strongly slanted or rotated; may sit on a curved path |
| Font family (authoritative) | Knewave |
| Match IoU | 0.6134 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `Knewave-Regular.ttf` 163px track -0.37px — IoU 0.6114
- `Knewave-Regular.ttf` 161px track 1.0px — IoU 0.6084

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#faf9f8` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#f1bbfc` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#f80549` | glyph ink of 'MACARONS' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#ce6827` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#2b2413` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#f1bbfc` | 0.271 | 0.7979 | 0.2597 |
| `#ce6827` | 0.2639 | 0.4773 | 0.8102 |
| `#2b2413` | 0.2211 | 0.1445 | 0.5477 |
| `#aab7a2` | 0.1645 | 0.7018 | 0.1125 |
| `#da71ea` | 0.0655 | 0.5681 | 0.5134 |
| `#faf9f8` | 0.0139 | 0.9805 | 0.0095 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=57.9%, y=61.4% (medium confidence) |
| Subject position | lower-centre |
| Background treatment | photographic or gradient background with to top darkening |
| Full bleed | True |
| Text coverage | 0.0995 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to top
- **Brightness range across axis:** 144.9
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.391
  - 25% -> alpha ~0.395
  - 50% -> alpha ~0.301
  - 75% -> alpha ~0.141
  - 100% -> alpha ~0.001
- **Grain:** stdDev 9.51, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | MACARONS |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #faf9f8 |
| `surface` | colour | #f1bbfc |
| `textPrimary` | colour | #f80549 |
| `accent` | colour | #ce6827 |
| `accentSecondary` | colour | #2b2413 |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Knewave |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 57.9 |
| `imageFocalY` | number | 61.4 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/Knewave-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
