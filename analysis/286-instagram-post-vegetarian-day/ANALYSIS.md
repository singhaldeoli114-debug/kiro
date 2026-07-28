# Template 286 — Instagram post vegetarian day

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 286 |
| Pixy name | Instagram post vegetarian day |
| Design ID | `cmmbzz9wg00h7p7pb4zml10l3` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/d700319b-924d-416c-bc4a-ded684e1166e/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Libre Baskerville | yes | SIL Open Font License 1.1 | `LibreBaskerville-Italic[wght].ttf`, `LibreBaskerville[wght].ttf` |
| Bahianita | yes | SIL Open Font License 1.1 | `Bahianita-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Libre Baskerville, Bahianita. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "World Vegetarian Day"  (OCR confidence 0.9788)

| Property | Value |
|---|---|
| Bounding box (px) | x=87, y=209, w=949, h=95 |
| Normalised | x=8.06%, y=19.35%, w=87.87%, h=8.8% |
| Alignment | right |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `LibreBaskerville[wght].ttf` |
| Variation axes | [700.0] |
| Font size | 81 px |
| Letter-spacing | -0.38 px (-0.0047 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#2c460f` |
| Polarity | dark-on-light |
| Contrast vs local bg | 3.61:1 |
| Stroke (median/mean) | 4.0 / 4.42 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Libre Baskerville, Bahianita |
| Match IoU | 0.57 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | None px |
| Gap to next | 15 px |

Alternate font fits considered:
- `LibreBaskerville[wght].ttf` 80px track 0.24px — IoU 0.559
- `LibreBaskerville[wght].ttf` 79px track 0.86px — IoU 0.5508
- `LibreBaskerville[wght].ttf` 81px track 0.05px — IoU 0.5416

### `text-2` — headline

**Text:** "LET'S EAT SOME VEGETABLE NOW"  (OCR confidence 0.9294)

| Property | Value |
|---|---|
| Bounding box (px) | x=244, y=319, w=605, h=59 |
| Normalised | x=22.59%, y=29.54%, w=56.02%, h=5.46% |
| Alignment | center |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Bahianita-Regular.ttf` |
| Variation axes | None |
| Font size | 82 px |
| Letter-spacing | -0.23 px (-0.0028 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#0e1804` |
| Polarity | dark-on-light |
| Contrast vs local bg | 7.97:1 |
| Stroke (median/mean) | 6.0 / 6.54 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Libre Baskerville, Bahianita |
| Match IoU | 0.3792 |
| **Geometry fit confidence** | **very-low-textUnreliable** |
| OCR text reliable | False — low OCR confidence (0.9294) |
| Fit interpretation | not verified; driven by corrupted OCR text rather than a wrong family |
| Gap to previous | 15 px |
| Gap to next | None px |

Alternate font fits considered:
- `Bahianita-Regular.ttf` 81px track 0.05px — IoU 0.3626
- `Bahianita-Regular.ttf` 80px track 0.32px — IoU 0.3508
- `LibreBaskerville[wght].ttf` 31px track -1.1px — IoU 0.1948

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#f5feec` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#247e36` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#2c460f` | glyph ink of 'World Vegetarian Day' | glyph ink median |
| textSecondary | `#0e1804` | glyph ink of 'LET'S EAT SOME VEGETABLE NOW' | glyph ink median |
| accent | `#247e36` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#e74823` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#f5feec` | 0.7323 | 0.9873 | 0.0706 |
| `#247e36` | 0.0961 | 0.4021 | 0.7092 |
| `#a9d041` | 0.0915 | 0.7457 | 0.6872 |
| `#e74823` | 0.0629 | 0.4059 | 0.8475 |
| `#a168a3` | 0.0129 | 0.4749 | 0.3591 |
| `#c3d2b8` | 0.0043 | 0.8064 | 0.1241 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=50.0%, y=50.0% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | flat colour or framed panel |
| Full bleed | False |
| Text coverage | 0.1079 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to top
- **Brightness range across axis:** 116.3
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.0
  - 25% -> alpha ~0.329
  - 50% -> alpha ~0.172
  - 75% -> alpha ~0.296
  - 100% -> alpha ~0.0
- **Grain:** stdDev 14.21, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | World Vegetarian Day |
| `headline` | text | LET'S EAT SOME VEGETABLE NOW |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #f5feec |
| `surface` | colour | #247e36 |
| `textPrimary` | colour | #2c460f |
| `textSecondary` | colour | #0e1804 |
| `accent` | colour | #247e36 |
| `accentSecondary` | colour | #e74823 |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Libre Baskerville |
| `show_headline` | boolean | — |
| `show_headline` | boolean | — |
| `imageFocalX` | number | 50.0 |
| `imageFocalY` | number | 50.0 |

## 8. Assets collected

**Exact (4):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/LibreBaskerville-Italic[wght].ttf` — SIL Open Font License 1.1
- `assets/fonts/LibreBaskerville[wght].ttf` — SIL Open Font License 1.1
- `assets/fonts/Bahianita-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
