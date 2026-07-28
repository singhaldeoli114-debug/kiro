# Shoes Sale Social

## Description
Dynamic footwear sale template with the product displayed at a -15 degree tilt for kinetic energy. Features a circular price tag overlay in the top-right corner and bold pricing at the bottom.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Dark background with large circular shape behind product
- Shoe product image rotated -15 degrees for dynamic feel
- Round price tag badge at top-right corner with drop shadow
- Content anchored to bottom-left: headline, subheadline, prices, CTA
- Logo safe zone at top-left

## Slots Available

### Text Slots
- price-tag-value (primary) - Discount percentage in circle
- price-tag-label (secondary) - Label under discount (e.g., "OFF")
- headline (primary) - Main headline
- subheadline (secondary) - Supporting text
- sale-price (primary) - Current sale price
- original-price (tertiary) - Strikethrough original price
- cta (primary) - Call to action button

### Media Slots
- product-image (required) - Shoe product photo
- logo (optional) - Brand logo

## Notes
- Product tilt achieved with CSS transform rotate(-15deg)
- Circular price tag uses border-radius 50% with drop shadow
- All colors use semantic CSS variables only
- Zero JavaScript
- Fixed 1080x1080 canvas
