# Sales Product Price

## Description
Clean structured product card with product image at top, price comparison in the middle, and a bold CTA button at the bottom. Designed for e-commerce single-product sale ads.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Full card with rounded corners on white background
- Product image takes top 55% of card with centered composition
- Sale badge overlay in top-left of product area
- Info section below with product name, description, prices, and CTA
- Strikethrough on original price creates visual urgency
- CTA button spans full width of info section

## Slots Available

### Text Slots
- sale-badge (secondary) - Corner badge text
- product-name (primary) - Product title
- product-description (secondary) - Brief description
- current-price (primary) - Sale price
- original-price (tertiary) - Original price with strikethrough
- cta (primary) - Call to action button

### Media Slots
- product-image (required) - Main product photo
- logo (optional) - Brand logo

## Notes
- Card-based layout provides clear visual hierarchy
- Price comparison (sale vs original) creates urgency
- All colors use semantic CSS variables only
- Zero JavaScript
- Fixed 1080x1080 canvas
