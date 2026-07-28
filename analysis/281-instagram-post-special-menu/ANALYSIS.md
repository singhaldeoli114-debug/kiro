# Template 281 — Instagram post special menu

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 281 |
| Pixy name | Instagram post special menu |
| Design ID | `cmmbzzfd100hhp7pblfa902z6` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/e2399bc4-8cf9-4680-82d2-0c4049caeeef/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Asset | yes | SIL Open Font License 1.1 | `Asset-Regular.ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Asset. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Today"  (OCR confidence 0.9584)

| Property | Value |
|---|---|
| Bounding box (px) | x=280, y=105, w=525, h=86 |
| Normalised | x=25.93%, y=9.72%, w=48.61%, h=7.96% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Asset-Regular.ttf` |
| Variation axes | None |
| Font size | 79 px |
| Letter-spacing | -0.99 px (-0.0125 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#d65e1e` |
| Polarity | dark-on-light |
| Contrast vs local bg | 1.78:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Font family (authoritative) | Asset |
| Match IoU | 0.7462 |
| **Geometry fit confidence** | **high** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics closely reproduce the reference glyph ink |
| Gap to previous | None px |
| Gap to next | -7 px |

Alternate font fits considered:
- `Asset-Regular.ttf` 78px track 0.68px — IoU 0.7326
- `Asset-Regular.ttf` 77px track 2.36px — IoU 0.7185

### `text-2` — supporting

**Text:** "Special Menu"  (OCR confidence 0.9621)

| Property | Value |
|---|---|
| Bounding box (px) | x=273, y=184, w=574, h=48 |
| Normalised | x=25.28%, y=17.04%, w=53.15%, h=4.44% |
| Alignment | right |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Asset-Regular.ttf` |
| Variation axes | None |
| Font size | 38 px |
| Letter-spacing | 1.53 px (0.0403 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#73c2b0` |
| Polarity | dark-on-light |
| Contrast vs local bg | 1.21:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Font family (authoritative) | Asset |
| Match IoU | 0.6333 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | -7 px |
| Gap to next | 747 px |

Alternate font fits considered:
- `Asset-Regular.ttf` 39px track 0.2px — IoU 0.5712
- `Asset-Regular.ttf` 40px track -1.13px — IoU 0.5634

### `text-3` — supporting

**Text:** "Gyoza"  (OCR confidence 0.9564)

| Property | Value |
|---|---|
| Bounding box (px) | x=444, y=979, w=246, h=37 |
| Normalised | x=41.11%, y=90.65%, w=22.78%, h=3.43% |
| Alignment | right |
| z-order | 102 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Asset-Regular.ttf` |
| Variation axes | None |
| Font size | 36 px |
| Letter-spacing | 1.86 px (0.0517 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#4a90e2` |
| Polarity | dark-on-light |
| Contrast vs local bg | 1.54:1 |
| Stroke (median/mean) | None / None px |
| Render model | solid-vector-text |
| Font family (authoritative) | Asset |
| Match IoU | 0.5598 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | 747 px |
| Gap to next | None px |

Alternate font fits considered:
- `Asset-Regular.ttf` 38px track -1.46px — IoU 0.5529
- `Asset-Regular.ttf` 37px track 0.2px — IoU 0.5516

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#e3dcd2` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#fbceb3` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#d65e1e` | glyph ink of 'Today' | glyph ink median |
| textSecondary | `#73c2b0` | glyph ink of 'Special Menu' | glyph ink median |
| accent | `#331d12` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#bc6628` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#ffffff` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#fbceb3` | 0.667 | 0.8396 | 0.2864 |
| `#331d12` | 0.1557 | 0.1314 | 0.6401 |
| `#bc6628` | 0.0968 | 0.4564 | 0.7849 |
| `#999687` | 0.0464 | 0.5897 | 0.1204 |
| `#f5aef6` | 0.0213 | 0.7641 | 0.2926 |
| `#e3dcd2` | 0.0128 | 0.8684 | 0.0733 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | contain-or-framed |
| Focal point | x=49.2%, y=53.8% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | flat colour or framed panel |
| Full bleed | False |
| Text coverage | 0.0701 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to left
- **Brightness range across axis:** 118.6
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.026
  - 25% -> alpha ~0.032
  - 50% -> alpha ~0.465
  - 75% -> alpha ~0.027
  - 100% -> alpha ~0.026
- **Grain:** stdDev 11.39, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Today |
| `supporting` | text | Special Menu |
| `supporting` | text | Gyoza |
| `heroImage` | image | framed/panelled artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #e3dcd2 |
| `surface` | colour | #fbceb3 |
| `textPrimary` | colour | #d65e1e |
| `textSecondary` | colour | #73c2b0 |
| `accent` | colour | #331d12 |
| `accentSecondary` | colour | #bc6628 |
| `onAccent` | colour | #ffffff |
| `overlay` | colour | #000000 |
| `brandFont` | font | Asset |
| `show_headline` | boolean | — |
| `show_supporting` | boolean | — |
| `show_supporting` | boolean | — |
| `imageFocalX` | number | 49.2 |
| `imageFocalY` | number | 53.8 |

## 8. Assets collected

**Exact (2):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/Asset-Regular.ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
