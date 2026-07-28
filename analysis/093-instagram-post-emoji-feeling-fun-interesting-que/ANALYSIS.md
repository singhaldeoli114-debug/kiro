# Template 093 — Instagram post emoji feeling fun interesting question

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 093 |
| Pixy name | Instagram post emoji feeling fun interesting question |
| Design ID | `cmmci0dg800gh112w9vdsv0k5` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/d877a92a-be49-4edb-889f-a548626d8307/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Homemade Apple | yes | Apache License 2.0 | `HomemadeApple-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Homemade Apple. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Hfow are you feeling?"  (OCR confidence 0.8901)

| Property | Value |
|---|---|
| Bounding box (px) | x=182, y=90, w=719, h=112 |
| Normalised | x=16.85%, y=8.33%, w=66.57%, h=10.37% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `HomemadeApple-Regular.ttf` |
| Variation axes | None |
| Font size | 60 px |
| Letter-spacing | -0.49 px (-0.0082 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#000000` |
| Polarity | dark-on-light |
| Contrast vs local bg | 21.0:1 |
| Stroke (median/mean) | 5.0 / 6.6 px |
| Render model | solid-vector-text |
| Render-model note | strongly slanted or rotated; may sit on a curved path |
| Font family (authoritative) | Homemade Apple |
| Match IoU | 0.217 |
| **Geometry fit confidence** | **very-low-textUnreliable** |
| OCR text reliable | False — low OCR confidence (0.8901) |
| Fit interpretation | not verified; driven by corrupted OCR text rather than a wrong family |
| Gap to previous | None px |
| Gap to next | None px |

Alternate font fits considered:
- `HomemadeApple-Regular.ttf` 59px track 0.12px — IoU 0.2001
- `HomemadeApple-Regular.ttf` 58px track 0.72px — IoU 0.1928

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#fefefe` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#fcdbc1` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#000000` | glyph ink of 'Hfow are you feeling?' | glyph ink median |
| textSecondary | — | not identified | — |
| accent | `#fadf01` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#fcdbc1` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#fefefe` | 0.6484 | 0.9997 | 0.0001 |
| `#fcdbc1` | 0.2382 | 0.8811 | 0.2336 |
| `#fadf01` | 0.0888 | 0.8376 | 0.9922 |
| `#ad8c6c` | 0.0108 | 0.569 | 0.3742 |
| `#0b0a0a` | 0.0082 | 0.0427 | 0.0558 |
| `#29cfea` | 0.0056 | 0.6831 | 0.8229 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=50.0%, y=50.0% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | flat colour or framed panel |
| Full bleed | False |
| Text coverage | 0.069 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to bottom
- **Brightness range across axis:** 74.3
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.112
  - 25% -> alpha ~0.0
  - 50% -> alpha ~0.036
  - 75% -> alpha ~0.112
  - 100% -> alpha ~0.006
- **Grain:** stdDev 9.35, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Hfow are you feeling? |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #fefefe |
| `surface` | colour | #fcdbc1 |
| `textPrimary` | colour | #000000 |
| `accent` | colour | #fadf01 |
| `accentSecondary` | colour | #fcdbc1 |
| `onAccent` | colour | #000000 |
| `brandFont` | font | Homemade Apple |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 50.0 |
| `imageFocalY` | number | 50.0 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/HomemadeApple-Regular.ttf` — Apache License 2.0

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
