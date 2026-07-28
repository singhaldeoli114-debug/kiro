# Template 305 — Instagram post valentines sale

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 305 |
| Pixy name | Instagram post valentines sale |
| Design ID | `cmmbzjt8w00bnp7pb1w1b9ar5` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/b769469d-6c7b-4723-9ce5-9c87119480b2/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Anton | yes | SIL Open Font License 1.1 | `Anton-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Anton. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — body

**Text:** "VALENTINE'S DAY"  (OCR confidence 0.9134)

| Property | Value |
|---|---|
| Bounding box (px) | x=122, y=94, w=560, h=89 |
| Normalised | x=11.3%, y=8.7%, w=51.85%, h=8.24% |
| Alignment | left |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Anton-Regular.ttf` |
| Variation axes | None |
| Font size | 92 px |
| Letter-spacing | -0.27 px (-0.0029 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#0a072a` |
| Polarity | dark-on-light |
| Contrast vs local bg | 2.77:1 |
| Stroke (median/mean) | 12.0 / 14.56 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Anton |
| Match IoU | 0.475 |
| **Geometry fit confidence** | **low-textUnreliable** |
| OCR text reliable | False — low OCR confidence (0.9134) |
| Fit interpretation | plausible but unverified; OCR text is suspect, so the score understates the fit |
| Gap to previous | None px |
| Gap to next | -20 px |

Alternate font fits considered:
- `Anton-Regular.ttf` 91px track 0.17px — IoU 0.4685
- `Anton-Regular.ttf` 90px track 0.6px — IoU 0.4585

### `text-2` — headline

**Text:** "SALE"  (OCR confidence 0.9727)

| Property | Value |
|---|---|
| Bounding box (px) | x=118, y=163, w=552, h=323 |
| Normalised | x=10.93%, y=15.09%, w=51.11%, h=29.91% |
| Alignment | left |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Anton-Regular.ttf` |
| Variation axes | None |
| Font size | 313 px |
| Letter-spacing | 0.8 px (0.0026 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#0a072a` |
| Polarity | dark-on-light |
| Contrast vs local bg | 1.0:1 |
| Stroke (median/mean) | 52.0 / 43.89 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Anton |
| Match IoU | 0.6156 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | -20 px |
| Gap to next | 25 px |

Alternate font fits considered:
- `Anton-Regular.ttf` 314px track 0.22px — IoU 0.6125
- `Anton-Regular.ttf` 315px track -0.36px — IoU 0.6124

### `text-3` — fine-print

**Text:** "50% OFF"  (OCR confidence 0.9881)

| Property | Value |
|---|---|
| Bounding box (px) | x=140, y=511, w=236, h=59 |
| Normalised | x=12.96%, y=47.31%, w=21.85%, h=5.46% |
| Alignment | left |
| z-order | 102 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Anton-Regular.ttf` |
| Variation axes | None |
| Font size | 67 px |
| Letter-spacing | -0.46 px (-0.0069 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | uppercase |
| Colour | `#fc2b64` |
| Polarity | dark-on-light |
| Contrast vs local bg | 2.04:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Font family (authoritative) | Anton |
| Match IoU | 0.9099 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | 25 px |
| Gap to next | None px |

Alternate font fits considered:
- `Anton-Regular.ttf` 66px track 0.14px — IoU 0.9037
- `Anton-Regular.ttf` 65px track 0.72px — IoU 0.8853

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#fae7f3` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#f8bf8e` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#0a072a` | glyph ink of 'SALE' | glyph ink median |
| textSecondary | `#fc2b64` | glyph ink of '50% OFF' | glyph ink median |
| accent | `#91462c` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#f8bf8e` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#f8bf8e` | 0.4383 | 0.7838 | 0.4269 |
| `#91462c` | 0.1882 | 0.3324 | 0.6935 |
| `#e8555d` | 0.1364 | 0.4604 | 0.631 |
| `#150c26` | 0.1358 | 0.0629 | 0.685 |
| `#ef83a9` | 0.0508 | 0.6153 | 0.4515 |
| `#fae7f3` | 0.0506 | 0.9281 | 0.0761 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=51.2%, y=61.8% (medium confidence) |
| Subject position | lower-centre |
| Background treatment | photographic or gradient background with to top darkening |
| Full bleed | True |
| Text coverage | 0.2075 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to top
- **Brightness range across axis:** 119.1
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.497
  - 25% -> alpha ~0.404
  - 50% -> alpha ~0.167
  - 75% -> alpha ~0.344
  - 100% -> alpha ~0.094
- **Grain:** stdDev 13.15, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `body` | text | VALENTINE'S DAY |
| `headline` | text | SALE |
| `fine-print` | text | 50% OFF |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #fae7f3 |
| `surface` | colour | #f8bf8e |
| `textPrimary` | colour | #0a072a |
| `textSecondary` | colour | #fc2b64 |
| `accent` | colour | #91462c |
| `accentSecondary` | colour | #f8bf8e |
| `onAccent` | colour | #000000 |
| `overlay` | colour | #000000 |
| `brandFont` | font | Anton |
| `show_body` | boolean | — |
| `show_headline` | boolean | — |
| `show_fine-print` | boolean | — |
| `imageFocalX` | number | 51.2 |
| `imageFocalY` | number | 61.8 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
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
