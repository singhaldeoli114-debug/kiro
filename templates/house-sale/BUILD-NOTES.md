# House Sale

## Description
Property sale template featuring a "FOR SALE" or "SOLD" badge in the corner (rotated -5deg, togglable with data-visibility), centered property photo, prominent price, four feature pills in a row, and contact information.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Status badge (FOR SALE / SOLD) positioned top-left with -5deg rotation
- Property photo centered with rounded corners
- Price large and centered below the photo
- Address below price in secondary color
- 4 feature pills in a horizontal flex row (beds, baths, sqft, garage)
- Contact section at bottom with agent name and phone
- Distinct from real-estate-house: focus on sale status, pills instead of grid

## Slots Available

### Text Slots
- status-badge (primary) - FOR SALE or SOLD toggle
- price (primary) - Property price
- address (secondary) - Property address
- feature-1 through feature-4 (tertiary) - Feature pills
- agent-name (tertiary) - Agent name
- agent-phone (tertiary) - Agent phone

### Media Slots
- property-photo (required) - Main property image

## Notes
- Status badge uses data-visibility="status" for SOLD/FOR SALE toggle
- Badge is rotated -5deg for dynamic visual interest
- Feature pills use rounded corners with accent border
- Differentiates from real-estate-house by layout focus and badge system
- All colors use semantic CSS variables only
- Zero JavaScript
- Fixed 1080x1080 canvas
