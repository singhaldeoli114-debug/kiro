# Template 070 — Instagram post free shipping

> Scope: **analysis and asset collection only**. No HTML, CSS or renderer manifest is produced here.

## 1. Source

| Field | Value |
|---|---|
| Template number | 070 |
| Pixy name | Instagram post free shipping |
| Design ID | `cmmciieh600jb112wngj0gwsu` |
| Source kind | template |
| Thumbnail URL | https://cdn.pixy.art/8a6f8776-5ff5-43fa-adc0-c5a735c0b3e4/ |
| Category | Social media |
| Orientation | Square |
| Pages | 1 |
| Canvas | 1080 x 1080 px |
| Aspect ratio | 1:1 |
| Reference file | `reference.png` |

## 2. Fonts declared by Pixy

| Family | Resolved | Licence | Local files |
|---|---|---|---|
| Galada | yes | SIL Open Font License 1.1 | `Galada-Regular.ttf` |
| Roboto | yes | SIL Open Font License 1.1 | `Roboto-Italic[wdth,wght].ttf`, `Roboto[wdth,wght].ttf` |

### How to read the confidence figures

Two separate things are reported, and only the second is uncertain:

- **Font family — authoritative — supplied by the Pixy API, not inferred.** Declared: Galada, Roboto. These are read from Pixy's API, not inferred from pixels.
- **Fitted metrics — estimated.** fontSizePx, letterSpacingPx, variationAxes (weight/width), recovered by candidate renders scored by scale-normalised IoU against the reference glyph ink.
  - IoU is a conservative lower bound on fit quality. Alternative metrics were trialled and performed worse; see BATCH-REPORT.md.

A `very-low` fit score does **not** mean the declared font family is wrong. It marks geometry that the solid-font fitter could not verify. Common causes are outlined or curved text, duplicate shadow layers, overlapping word copies, and incomplete OCR capture. Text printed on a photographed object is labelled `not-applicable-rasterText` instead.

## 3. Text elements

### `text-1` — headline

**Text:** "Free Shipping"  (OCR confidence 0.9694)

| Property | Value |
|---|---|
| Bounding box (px) | x=243, y=163, w=607, h=121 |
| Normalised | x=22.5%, y=15.09%, w=56.2%, h=11.2% |
| Alignment | center |
| z-order | 100 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Galada-Regular.ttf` |
| Variation axes | None |
| Font size | 114 px |
| Letter-spacing | -0.5 px (-0.0044 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | none |
| Colour | `#3d1d03` |
| Polarity | dark-on-light |
| Contrast vs local bg | 5.6:1 |
| Stroke (median/mean) | 16.0 / 14.44 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Galada, Roboto |
| Match IoU | 0.6827 |
| **Geometry fit confidence** | **medium** |
| OCR text reliable | True  |
| Fit interpretation | fitted metrics reproduce the reference well; minor drift |
| Gap to previous | None px |
| Gap to next | -19 px |

Alternate font fits considered:
- `Galada-Regular.ttf` 112px track 0.4px — IoU 0.658
- `Galada-Regular.ttf` 113px track -0.05px — IoU 0.6568
- `Roboto[wdth,wght].ttf` 109px track -0.1px — IoU 0.3205

### `text-2` — body

**Text:** "over 50% discounts in all items"  (OCR confidence 0.9941)

| Property | Value |
|---|---|
| Bounding box (px) | x=332, y=265, w=422, h=29 |
| Normalised | x=30.74%, y=24.54%, w=39.07%, h=2.69% |
| Alignment | center |
| z-order | 101 |
| Rotation | 0° |
| Opacity | 1.0 |
| Font file matched | `Roboto[wdth,wght].ttf` |
| Variation axes | [500, 87.5] |
| Font size | 33 px |
| Letter-spacing | -0.27 px (-0.0082 em) |
| Line-height | None px (ratio None) |
| Line | 1 of 1 |
| Transform | lowercase |
| Colour | `#111103` |
| Polarity | dark-on-light |
| Contrast vs local bg | 9.1:1 |
| Stroke (median/mean) | 3.0 / 3.4 px |
| Render model | solid-vector-text |
| Font family (authoritative) | Galada, Roboto |
| Match IoU | 0.5112 |
| **Geometry fit confidence** | **low** |
| OCR text reliable | True  |
| Fit interpretation | plausible but unverified; letterform drift across the line |
| Gap to previous | -19 px |
| Gap to next | None px |

Alternate font fits considered:
- `Roboto[wdth,wght].ttf` 30px track 0.15px — IoU 0.4794
- `Roboto[wdth,wght].ttf` 33px track -0.49px — IoU 0.4752
- `Roboto[wdth,wght].ttf` 33px track -0.39px — IoU 0.4749

## 4. Colours (semantic)

| Semantic name | Hex | Sampled at | Method |
|---|---|---|---|
| background | `#ead7da` | dominant low-saturation cluster | k-means dominant cluster |
| surface | `#fefbc5` | second distinct cluster | k-means secondary cluster |
| textPrimary | `#3d1d03` | glyph ink of 'Free Shipping' | glyph ink median |
| textSecondary | `#111103` | glyph ink of 'over 50% discounts in all it' | glyph ink median |
| accent | `#c18f63` | highest saturation-weighted cluster | k-means + saturation ranking |
| accentSecondary | `#593915` | second saturation-weighted cluster | k-means + saturation ranking |
| overlay | `#000000` | derived from the reference brightness gradient | brightness-gradient estimate from flattened pixels |
| onAccent | `#000000` | derived | max WCAG contrast against accent |

Full palette (k-means):

| Hex | Share | Luminance | Saturation |
|---|---|---|---|
| `#fefbc5` | 0.377 | 0.9749 | 0.2236 |
| `#c18f63` | 0.3277 | 0.5914 | 0.488 |
| `#ead7da` | 0.1049 | 0.8612 | 0.0829 |
| `#dec1bc` | 0.0795 | 0.7809 | 0.1519 |
| `#593915` | 0.062 | 0.2403 | 0.7618 |
| `#ddab80` | 0.049 | 0.7011 | 0.417 |

## 5. Media

| Property | Value |
|---|---|
| Bounding box | x=0, y=0, w=1080, h=1080 |
| Crop mode | cover |
| Focal point | x=53.8%, y=53.9% (medium confidence) |
| Subject position | middle-centre |
| Background treatment | photographic or gradient background with to top darkening |
| Full bleed | True |
| Text coverage | 0.0735 |
| Min resolution | 1080x1080 |
| Masks / cutouts | cannot be determined from a flattened render |
| Shadows | photographic shading and layer shadows are indistinguishable in a flattened render |

## 6. Effects

- **Overlay detected:** True
- **Direction:** to top
- **Brightness range across axis:** 94.0
- **Estimated stops (black alpha):**
  - 0% -> alpha ~0.359
  - 25% -> alpha ~0.371
  - 50% -> alpha ~0.18
  - 75% -> alpha ~0.094
  - 100% -> alpha ~0.005
- **Grain:** stdDev 15.08, likely textured: True
- **Blur:** not separable from a flattened render
- **Blend mode:** not recoverable from a flattened render
- **Text shadow:** a large positive delta on light text suggests either a shadow/scrim or naturally darker artwork behind the text; not separable here

## 7. Editable-variable recommendations

_Recommendations only — no manifest is generated._

| Suggested name | Kind | Current value |
|---|---|---|
| `headline` | text | Free Shipping |
| `body` | text | over 50% discounts in all items |
| `heroImage` | image | full-bleed artwork |
| `brandLogo` | image | no logo element was isolated; a flattened render does not... |
| `background` | colour | #ead7da |
| `surface` | colour | #fefbc5 |
| `textPrimary` | colour | #3d1d03 |
| `textSecondary` | colour | #111103 |
| `accent` | colour | #c18f63 |
| `accentSecondary` | colour | #593915 |
| `onAccent` | colour | #000000 |
| `brandFont` | font | Galada |
| `show_headline` | boolean | — |
| `show_body` | boolean | — |
| `imageFocalX` | number | 53.8 |
| `imageFocalY` | number | 53.9 |

## 8. Assets collected

**Exact (4):**

- `reference.png` — flattened render served by Pixy CDN
- `assets/fonts/Galada-Regular.ttf` — SIL Open Font License 1.1
- `assets/fonts/Roboto-Italic[wdth,wght].ttf` — SIL Open Font License 1.1
- `assets/fonts/Roboto[wdth,wght].ttf` — SIL Open Font License 1.1

**Approximate (1):**

- `assets/background-approx.png` — APPROXIMATE — reconstructed by inpainting, NOT the original asset

**Missing (1):**

- `original background photograph (unflattened layer)` — Pixy API exposes only a flattened render; no layer/asset endpoint exists

## 9. Limitations

- Pixy exposes no per-element/layer endpoint, so all geometry is derived from pixel analysis of the flattened render rather than read from design data.
- Font families are authoritative (declared by Pixy); size, weight and tracking are fitted and carry an IoU-based confidence score.
- Layer opacity, blend modes and true overlay alpha cannot be recovered from a flattened render.
- background-approx.png is reconstructed and must never be treated as exact.
