# Skin Serum

## Description
Ingredient/benefit ad template with strict vertical 50/50 split panel. Left shows ingredient imagery, right shows results/benefits text list.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Strict 50/50 vertical split (left and right panels)
- Left panel: full-bleed ingredient/before image with overlay label
- Divider line at center for visual separation
- Right panel: Category tag, headline, description, 4-item benefit list, CTA button
- Benefit items have accent-colored check circles
- Logo at top-right

## Slots Available

### Text Slots
- headline (primary) - Main benefit headline
- subheadline (secondary) - Description paragraph
- ingredient-label (tertiary) - Label on left image
- category (tertiary) - Category tag
- benefit-1 (primary) - First benefit
- benefit-2 (primary) - Second benefit
- benefit-3 (primary) - Third benefit
- benefit-4 (primary) - Fourth benefit
- cta (primary) - CTA button text

### Media Slots
- ingredient-image (required) - Left panel full-bleed image
- logo (optional) - Brand logo

## Notes
- Check mark icons are pure CSS (border technique)
- Split panel layout is distinct from other beauty templates
- Information-rich right panel contrasts with visual left panel
- Zero JavaScript
- Fixed 1080x1080 canvas
