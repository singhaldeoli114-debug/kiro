# Fashion Sale Promotion

## Description
Fashion discount campaign template featuring a bold diagonal price banner cutting across the top-right corner. Full-bleed model image with gradient scrim overlay for text readability at the bottom.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Full-bleed model image covers entire 1080x1080 canvas
- Diagonal banner rotated 45 degrees at top-right corner
- Gradient scrim from bottom covers lower 50%
- Discount badge, headline, subheadline, and CTA stacked at bottom-left
- Logo safe zone at top-left

## Slots Available

### Text Slots
- banner-text (primary) - Diagonal banner text (e.g., "50% OFF")
- discount (primary) - Large discount percentage badge
- headline (primary) - Main headline text
- subheadline (secondary) - Supporting description
- cta (primary) - Call to action button text

### Media Slots
- model-image (required) - Full-bleed fashion model image
- logo (optional) - Brand logo

## Notes
- Diagonal banner uses CSS transform rotate(45deg) for the corner cut effect
- Scrim overlay ensures text readability over any background image
- All colors use semantic CSS variables only
- Zero JavaScript
- Fixed 1080x1080 canvas
