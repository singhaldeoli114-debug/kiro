# Fashion Sale Social

## Description
Full model photo with a multi-directional gradient scrim overlay and discount text layering. The large discount percentage appears in the top-right while content is anchored left for a balanced composition.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Full-bleed model image as background
- Multi-directional gradient scrim (135deg) providing depth
- Large discount value (120px) anchored top-right
- Left column with badge, headline, subheadline and CTA
- Logo positioned bottom-right
- Content split into top and bottom for visual balance

## Slots Available

### Text Slots
- badge (tertiary) - Limited-time indicator badge
- headline (primary) - Main sale headline
- subheadline (secondary) - Supporting description
- discount-value (primary) - Large percentage number
- discount-label (secondary) - "OFF" label under discount
- cta (primary) - Call to action
- terms (tertiary) - Terms text

### Media Slots
- model-image (required) - Full-bleed fashion model
- logo (optional) - Brand logo

## Notes
- Gradient scrim uses 135-degree angle for diagonal depth
- Discount overlay positioned top-right creates visual triangle composition
- All colors use semantic CSS variables only
- Zero JavaScript
- Fixed 1080x1080 canvas
