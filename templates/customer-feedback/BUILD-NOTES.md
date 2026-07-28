# Customer Feedback

## Description
Review card template with a customer photo circle at top, horizontal rating dots (filled/unfilled), a styled blockquote for the review text, and reviewer name/title below.

## Reference Fidelity
**inferred** - Built from description without CDN reference image.

## Layout Approach
- Card container with subtle shadow and rounded corners on surfaceAlt
- Customer photo in circle positioned at top-left of card
- Rating displayed as filled/unfilled dots in a horizontal row
- Quote text in italic styled blockquote with left accent border
- Reviewer name and title below the blockquote
- Distinct from client-testimonials: card layout, left-aligned photo, dots instead of stars

## Slots Available

### Text Slots
- quote (primary) - The review/feedback quote text
- reviewer-name (secondary) - Customer name
- reviewer-title (tertiary) - Customer title/role
- rating-label (tertiary) - Rating label text

### Media Slots
- customer-photo (required) - Customer photo in circle
- logo (optional) - Brand logo

## Notes
- Rating dots use CSS border-radius (filled = accent, unfilled = surfaceAlt border)
- Blockquote uses left border accent styling
- Distinct card-based layout differentiates from client-testimonials
- All colors use semantic CSS variables only
- Zero JavaScript
- Fixed 1080x1080 canvas
