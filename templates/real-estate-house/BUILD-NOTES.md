# Real Estate House

## Description
Property listing template with a large property photo dominating the top 55% of the canvas, a price badge overlaid on the top-right corner of the image, a specs grid (bedrooms/bathrooms/sqft with icon areas) below, and an agent information strip at the bottom.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Property photo covers the top 55% of the 1080px canvas (594px)
- Price badge positioned absolute on top-right corner of image area
- Address displayed below the image
- Three specs in a grid row using CSS icon areas (circles with text below)
- Agent strip at bottom with headshot circle, name, and phone number
- Clean white card-based lower section

## Slots Available

### Text Slots
- price (primary) - Property price in badge
- address (secondary) - Property address
- beds (tertiary) - Bedroom count
- baths (tertiary) - Bathroom count
- sqft (tertiary) - Square footage
- agent-name (secondary) - Agent name
- agent-phone (tertiary) - Agent phone number

### Media Slots
- property-photo (required) - Main property image
- agent-photo (optional) - Agent headshot

## Notes
- Spec icons use CSS circular backgrounds with emoji-free text labels
- Price badge uses accent background with onAccent text
- Agent strip has its own surfaceAlt background bar
- All colors use semantic CSS variables only
- Zero JavaScript
- Fixed 1080x1080 canvas
