# Mobile-First Wedding Website Pages and Personalization Specification

## Website-Style Information Architecture Without Tabs or Runtime 3D

**Document purpose:** Define every guest-facing page, section order, event-specific experience, AI personalization option, interaction, and private guest feature for the mobile-first 2.5D wedding platform.

**Primary experience:** A premium vertically scrolling wedding website.

**Explicit navigation decision:** This is not an app-like tab interface. It does not use bottom navigation tabs, horizontal content tabs, or hidden tab panels as the primary structure.

---

## 1. Product Direction

The invitation is a connected wedding website with a narrative main page and dedicated event pages. Guests begin with the complete wedding journey, then open deeper event or utility pages only when needed.

The design references establish useful principles:

- Floral Indian-luxury art direction
- Strong couple-focused hero imagery
- Event information in guest-priority order
- Clear dress code, venue, menu, RSVP, and contact sections
- Mobile-first typography and cards
- Event-specific visual identity

The product will use those strengths without copying the app-style bottom tab bars shown in some references.

### Core experience rule

> Guests should feel that they are moving through a wedding story, not switching between application tabs.

### Runtime decision

The initial version uses:

- Layered 2.5D artwork
- Responsive images
- Parallax and camera-like motion
- GSAP timelines
- CSS and SVG animation
- Short approved AI videos
- ElevenLabs voiceover
- Semantic HTML content and forms

Runtime WebGL and downloadable 3D models are not required.

---

## 2. Website Architecture

### 2.1 Route map

```text
/i/{guestToken}                         Personalized entry resolver
/w/{weddingSlug}                        Main Wedding Journey
/w/{weddingSlug}/events/{eventSlug}     Dedicated event page
/w/{weddingSlug}/travel                 Travel, Hotel, and Pickup
/w/{weddingSlug}/gallery                Photo and Video Gallery
/w/{weddingSlug}/rsvp                   RSVP flow
/w/{weddingSlug}/blessings              Blessing and Message Wall
/w/{weddingSlug}/registry               Registry or Digital Shagun
/w/{weddingSlug}/upload                 Guest Photo Upload
/w/{weddingSlug}/fun                    Poll, Quiz, and Song Requests
/w/{weddingSlug}/guest                  Secure Guest Details
/w/{weddingSlug}/contact                Coordinators and Help
```

Not every wedding must enable every route. Disabled features do not appear in links, search, or generated navigation.

### 2.2 Main Wedding Journey

The main page is a complete vertical narrative. It introduces the couple, families, wedding events, story, hospitality, media, and RSVP without forcing guests to open other pages.

Dedicated pages provide depth, not missing essentials. A guest should understand the wedding from the main page alone.

### 2.3 Dedicated event pages

Each major event receives a real page with its own URL and vertical section flow. It is not a tab panel inside a single screen.

Example:

```text
/w/aarav-meera/events/engagement
/w/aarav-meera/events/haldi
/w/aarav-meera/events/mehndi
/w/aarav-meera/events/sangeet
/w/aarav-meera/events/wedding
/w/aarav-meera/events/reception
```

Dedicated pages support direct sharing, event-specific RSVP, independent social previews, and guest-specific access rules.

---

## 3. Navigation Without Tabs

### 3.1 Minimal website header

The mobile header contains:

- Couple monogram or names
- Sound control
- Menu button
- Optional language control

The header may become compact after scrolling. It must not resemble a bottom app tab bar.

### 3.2 Menu drawer

The menu opens a full-height or partial-height website menu containing ordinary links:

- Our Wedding
- Events
- Our Story
- Families
- Travel and Stay
- Gallery
- RSVP
- Blessings
- Help

Only enabled pages are shown.

### 3.3 Contextual navigation

Sections link naturally to related pages:

- Event preview card → View Engagement
- Travel preview → Plan Your Stay
- Gallery preview → View All Moments
- RSVP prompt → Respond Now
- Family section → Leave a Blessing

### 3.4 In-page anchors

Long pages may include a compact **On This Page** list near the beginning. It uses normal anchor links and scrolls to sections. It is not a persistent tab bar.

### 3.5 Quick Details

A persistent, unobtrusive **Quick Details** button opens a lightweight overlay containing:

- Next event
- Date and time
- Venue
- Dress code
- RSVP state
- Directions
- Coordinator

This overlay provides utility without changing the website structure.

### 3.6 Breadcrumb and return links

Dedicated pages use contextual links:

```text
Back to Wedding Journey
Wedding Journey / Events / Engagement
Continue to Mehndi
```

### 3.7 Footer

Every public page ends with a complete footer:

- Couple names
- Main journey
- Events
- Travel and stay
- Gallery
- RSVP
- Coordinators
- Privacy notice
- Accessibility controls

---

## 4. Guest-Priority Content Order

Information should be ordered by what guests need, not by what is visually impressive.

### Event page priority

1. Event name
2. Date and time
3. Venue or same-venue note
4. Dress code
5. RSVP status
6. Schedule
7. Guest instructions
8. Food and dietary options
9. Personalized media
10. Gallery, only when relevant
11. Countdown
12. Coordinator
13. Return to journey

### Main page priority

1. Welcome and wedding identity
2. Quick details
3. Couple introduction
4. Event overview
5. Family introduction
6. Story
7. Travel and stay
8. Gallery preview
9. Food and dietary assurance
10. RSVP
11. Blessings
12. Help
13. Closing

---

# Part I: Main Wedding Journey

## 5. Main Page Overview

**Route:** `/w/{weddingSlug}`

**Purpose:** Give every guest a complete emotional and practical overview, then invite deeper exploration.

### Main-page section sequence

```text
01. Personalized Welcome
02. Quick Details
03. Couple Introduction
04. Wedding Events
05. Our Story
06. Family Introductions
07. Travel and Stay
08. Gallery Preview
09. Food and Dietary Information
10. RSVP
11. Blessings Preview
12. Help and Coordinators
13. Graceful Closing
14. Website Footer
```

---

## 6. Personalized Welcome

### Content

- Couple names
- Wedding date or date range
- Location
- Couple monogram
- Short invitation message
- Personalized guest greeting when permitted
- Open Invitation action
- Audio choice

### Personalization

```text
Welcome, Sharma Family
Aarav and Meera would love to celebrate with you.
```

Possible variations:

- Guest name or family name
- Language
- Family-specific greeting
- Event-specific greeting for limited invitations
- Couple or parent invitation wording

### Visual treatment

- Approved couple key art
- Palace, garden, temple, beach, or modern-luxury environment
- Regional floral and architectural details
- Event-season lighting
- Layered foreground arch

### Motion

- Foreground arch opens or fades
- Couple artwork moves subtly into focus
- Names reveal after the image settles
- Petals or light particles remain restrained

### Optional AI media

A 3–5 second welcome loop can show the couple entering the visual world. It must be generated from approved character references and have a static fallback.

---

## 7. Quick Details Section

### Content

- Wedding date range
- City and country
- Next guest-eligible event
- Main venue
- RSVP deadline
- Current RSVP status

### Actions

- View all events
- RSVP
- Directions
- Add date range to calendar

### Guest personalization

If the guest is invited only to selected events, show only those events. Do not reveal private ceremonies.

---

## 8. Couple Introduction

### Content

- Approved couple portrait or character scene
- Short introduction
- Names and preferred form of address
- Optional quote
- Link to story

### Personalization choices

- Real photography
- Editorial AI portrait
- Illustrated 2.5D characters
- Traditional miniature-painting style
- Modern Indian editorial style
- Regional attire
- Event-specific outfits

### Optional voice

The couple may record or generate a short welcome:

> We are so happy to celebrate this new chapter with you.

Audio is opt-in and always has visible text.

---

## 9. Wedding Events Overview

### Purpose

Present events as a chronological story, not navigation tabs.

### Presentation

Use a vertical event timeline with event cards. Each card includes:

- Event icon
- Event name
- Date and start time
- Venue label
- Dress-code summary
- One distinctive event image
- RSVP state
- View Event link

### Guest rules

- Show only events assigned to that guest.
- Mark RSVP status individually.
- Show cancelled or changed events clearly.
- Order by actual date and time.
- After an event, replace countdown with a gallery or memory action if enabled.

### Motion

- Timeline line draws as the user scrolls
- Event cards enter individually
- Images use small depth movement
- No carousel is required

---

## 10. Our Story Preview

### Content

- Three to five milestones
- First meeting
- Relationship milestone
- Proposal
- Engagement
- Wedding announcement

### Rules

- Keep copy short on the main page.
- Do not repeat the complete story on every event page.
- Event pages may reference one relevant sentence only.

### AI personalization

Generate a consistent visual milestone series using the approved couple identity:

- Illustrated memory cards
- Cinematic stills
- Location-inspired backgrounds
- Short bridge clips

### Interaction

- Scroll through milestones vertically
- Optional Couple Quiz link after the final milestone

---

## 11. Family Introductions

### Purpose

Introduce the people hosting and celebrating the wedding without creating an overwhelming family directory.

### Content options

- Parent names
- Family names
- Family photograph or approved illustration
- One welcome message per family
- Grandparent remembrance or blessing, when requested
- Host designation

### Layout

Use two or more family chapters in a vertical flow:

```text
Aarav's Family
The Malhotras

Meera's Family
The Sharmas
```

### Personalization

- Family crest or monogram
- Regional language greeting
- Family voice welcome
- Family-specific colors or symbols within the shared style system

### Privacy

Do not expose phone numbers, private relationships, or family details without approval.

---

## 12. Travel and Stay Preview

### Content

- Destination city
- Main venue
- Recommended arrival date
- Hotel summary
- Airport or railway station
- Pickup availability

### Actions

- Plan Your Stay
- View Hotel
- View Pickup Details
- Contact Travel Coordinator

### Personalized behavior

If the guest has an assignment, show:

- Assigned hotel
- Check-in date
- Pickup status

Detailed private information opens the secure Guest Details page.

---

## 13. Gallery Preview

### Content

- Four to six approved images
- Optional 10–20 second highlight reel
- Link to full gallery

### Before the wedding

Use:

- Engagement images
- Pre-wedding photographs
- Couple portraits
- Family memories

### After an event

The operator may publish approved event photographs. Avoid showing an empty gallery section before content exists.

---

## 14. Food and Dietary Information

### Main-page content

- Confirmation that vegetarian options are available
- Jain availability
- Allergy and dietary-support statement
- Link to detailed event menus where enabled

### Example

```text
Vegetarian and Jain meals will be available at every celebration.
Please share allergies or dietary requirements in your RSVP.
```

### Rules

- Do not display unconfirmed menus.
- Connect dietary needs to RSVP records.
- Allow operators to export dietary counts by event and hotel.

---

## 15. Main RSVP Section

### Content

- Personalized invitation status
- RSVP deadline
- Number of eligible guests
- Event-level response summary

### Actions

- Start RSVP
- Continue RSVP
- Edit Response

### Example

```text
Sharma Family
Invited to 4 celebrations
2 responses still needed
```

---

## 16. Blessings Preview

Show three to five approved messages and a **Leave a Blessing** link.

Options:

- Text message
- Voice blessing
- Photo blessing
- Short video message

All public messages require moderation before display.

---

## 17. Help and Coordinators

### Content

- Wedding coordinator
- Travel coordinator
- Hotel coordinator
- Emergency day-of contact

### Actions

- Call
- WhatsApp or approved messaging link
- Email
- View FAQ

Only share contact details approved for guests.

---

## 18. Main Closing

### Content

- Couple thank-you message
- Closing portrait or artwork
- Wedding hashtag
- RSVP reminder
- Replay or return to top

### Motion

- Gentle image crossfade
- Final monogram reveal
- Optional short audio conclusion

---

# Part II: Event Page System

## 19. Shared Event Page Template

Every event page is a vertically scrolling website page. It follows a common structure but receives its own visual identity and personalized media.

### Standard section order

```text
01. Event Hero and Welcome
02. Quick Details
03. Dress Code
04. Schedule
05. Guest Notes
06. Food and Drinks
07. Event-Specific Couple Film or Moment
08. Venue and Directions
09. Event Interaction
10. Gallery or Preview Media
11. Event RSVP
12. Countdown or Memory State
13. Help and Coordinator
14. Continue or Return to Journey
15. Footer
```

The hero may use the AI film poster or a short muted preview, but practical details remain immediately below it. Full video playback must never push date, time, dress code, or RSVP behind a long autoplay sequence.

### Content inheritance

The event page should not repeat large blocks unnecessarily.

- If the venue is the same as the main venue, show a concise same-venue note and directions link.
- If no event gallery exists, omit the gallery.
- If the story belongs on the main page, link to it rather than repeating it.
- If the menu is not finalized, show dietary assurances rather than invented dishes.

---

## 20. Event Hero and Welcome

### Required content

- Event name
- Couple names
- Date
- Start time
- City or venue label
- Event icon or symbol
- One-line event meaning

### Visual personalization

- Unique event palette
- Approved event outfits
- Event-specific flowers and ornaments
- Event-specific environment
- Family or cultural symbols

### Motion

- Event symbol reveals first
- Character scene follows
- Essential details remain readable and stable

---

## 21. Event Quick Details

Display above decorative storytelling:

- Date
- Start and optional end time
- Venue or same-venue note
- Dress code
- RSVP state
- Directions action
- Add to Calendar

Guests must not search through media to find these details. Each calendar file must use the event timezone, venue address, recommended arrival time, and an update-safe event identifier.

---

## 22. Event Schedule

Use a vertical or horizontal-on-wide-screen timeline.

Possible entries:

- Guest arrival
- Welcome
- Ceremony
- Family ritual
- Meal
- Performance
- Celebration close

Each entry contains time, label, and optional guest instruction.

---

## 23. Event Dress Code

### Content

- Dress-code name
- Short practical explanation
- Preferred colors
- Colors to avoid, if relevant
- Weather and footwear advice
- Inspiration images or palette chips

### Personalization

- Generate outfit moodboards that match the event style.
- Offer separate guidance for different attire preferences without enforcing gendered assumptions.
- Allow family-specific or wedding-party notes.

### Example

```text
Pastel Elegance
Soft rose, ivory, sage, champagne, and powder blue.
The celebration is outdoors; comfortable footwear is recommended.
```

---

## 24. Event Guest Notes

Examples:

- Arrive 20 minutes early
- Carry a light shawl
- Family seating is assigned
- Phones should remain silent during the ceremony
- Outdoor venue and footwear guidance
- Transportation departure time
- Children are welcome

Notes are configurable by guest group where required.

---

## 25. Event Food and Drinks

### Content

- Meal service time
- Cuisine categories
- Live counters
- Desserts
- Beverage information
- Vegetarian marker
- Jain marker
- Vegan marker
- Allergy notice

### Menu detail levels

**Summary:** categories and dietary assurance.
**Highlights:** selected signature dishes.
**Full menu:** complete approved menu when the host wants it public.

### RSVP connection

Dietary choices and allergies are stored by guest and event.

---

## 26. Event Venue

### Content

- Venue name
- Address
- Venue photograph or illustration
- Travel time from assigned hotel
- Entry-gate instructions
- Parking or valet information

### Actions

- Open in Google Maps
- Open in Apple Maps
- Copy address
- Contact coordinator

### No-duplicate rule

When multiple events share a venue, show:

```text
Same celebration venue as the main wedding experience.
View directions and arrival details.
```

Do not repeat a full venue essay on every page.

---

## 27. Event RSVP

Event RSVP supports:

- Attending
- Not attending
- Undecided, if enabled
- Guest count
- Attendee names
- Dietary needs
- Accessibility needs
- Transport needs
- Event-specific question

The response updates the main RSVP summary.

---

## 28. Event Countdown and Memory State

### Before the event

Show days, hours, and minutes. Do not update seconds if it creates unnecessary battery usage.

### During the event

Show:

- Happening Today
- Directions
- Coordinator
- Schedule

### After the event

Replace countdown with:

- Thank-you message
- Upload Photos
- View Approved Moments
- Leave a Blessing

---

# Part III: Event-Specific Personalization

## 29. Engagement Page

**Route example:** `/events/engagement`

### Emotional purpose

Present the engagement as the first formal chapter and the promise that begins the wedding journey.

### Recommended sections

1. Engagement hero with approved film poster
2. Quick details
3. Dress code
4. Ceremony schedule
5. Guest notes
6. Food and drinks
7. AI couple film and ring or promise moment
8. Venue and directions
9. RSVP
10. Countdown
11. Help
12. Return to wedding journey

### Engagement AI video

Create a short approved cinematic sequence:

```text
Shot 1: Evening palace or garden establishing view
Shot 2: Couple walking toward a floral arch
Shot 3: Symbolic ring or joined-hands close-up
Shot 4: Couple portrait under warm lights
Shot 5: Event title and date
```

Recommended length: 10–20 seconds.

### Personalization inputs

- Approved engagement outfits
- Real engagement or proposal location
- Ring style or symbolic substitute
- Preferred palette
- Couple quote
- Proposal story
- Family invitation wording
- Voiceover choice

### Optional interactions

- Scratch to reveal the engagement message
- Couple quiz entry
- Which moment are you excited for poll

### Gallery rule

Before the event, use approved couple or proposal media. Do not label an unrelated pre-wedding gallery as engagement-event photographs.

---

## 30. Haldi Page

### Emotional purpose

Create a playful, warm, family-centered experience.

### Visual identity

- Marigold yellow
- Saffron
- Ivory
- Warm sunlight
- Courtyard textures

### Haldi AI video

```text
Shot 1: Sunlit courtyard and flower decorations
Shot 2: Couple in approved Haldi outfits
Shot 3: Marigold petals moving through frame
Shot 4: Family laughter or symbolic hands
Shot 5: Haldi event title and timing
```

Use symbolic turmeric or petals carefully to avoid facial deformation.

### Personalized sections

- Family ritual explanation
- Splash-safe or outfit note
- Separate bride/groom location when applicable
- Guest arrival and transport
- Vegetarian/Jain brunch menu
- Color palette inspiration

### Optional interaction

Tap a marigold bowl to reveal a family message.

---

## 31. Mehndi Page

### Emotional purpose

Present artistry, anticipation, music, and intimate celebration.

### Visual identity

- Emerald
- Magenta
- Antique gold
- Garden foliage
- Henna line motifs

### Mehndi AI video

```text
Shot 1: Garden pavilion
Shot 2: Approved couple or bride portrait
Shot 3: Henna motif animating around the frame
Shot 4: Lanterns and family gathering
Shot 5: Event invitation title
```

### Personalized sections

- Mehndi artist timing
- Bride/family session timing
- Guest application availability
- Outfit and sleeve advice
- Footwear guidance
- Music and refreshments
- Custom henna symbols meaningful to the couple

### Optional interaction

Trace or tap a henna motif to reveal a hidden couple symbol. Always provide a Reveal button.

---

## 32. Sangeet Page

### Emotional purpose

Build excitement around performance, music, and family celebration.

### Visual identity

- Indigo
- Plum
- Fuchsia
- Gold stage lighting
- Chandeliers

### Sangeet AI video

```text
Shot 1: Stage-light reveal
Shot 2: Couple in approved Sangeet outfits
Shot 3: Short controlled dance pose or entrance
Shot 4: Family silhouettes and celebration
Shot 5: Sangeet title and date
```

Avoid long AI dance sequences. Use short shots and editorial cuts to preserve character consistency.

### Personalized sections

- Performance schedule
- Family team names
- Rehearsal details for selected guests
- Stage-entry instructions
- Dress code
- Dinner timing
- Song request
- Performance coordinator

### Song request

Guests may submit:

- Song title
- Artist
- Optional dedication
- Event association

Requests enter moderation. Submission does not guarantee playback.

### Poll

Possible question:

> Which Sangeet moment are you most excited for?

Results may appear after voting without exposing voter identities.

---

## 33. Wedding Ceremony Page

### Emotional purpose

This is the most important and respectful event page. Practical clarity comes before decorative interaction.

### Visual identity

- Crimson
- Ivory
- Antique gold
- Mandap
- Sacred-fire motif
- Palace or venue architecture

### Wedding AI video

```text
Shot 1: Wedding venue at the correct time of day
Shot 2: Approved bride and groom portraits in wedding attire
Shot 3: Symbolic procession or floral entrance
Shot 4: Mandap and varmala-inspired moment
Shot 5: Family blessing and wedding title
```

Avoid generating sensitive rituals inaccurately. Ritual details require family or cultural review.

### Personalized sections

- Baraat time and entrance
- Bridal entrance
- Ceremony start
- Ritual outline
- Guest seating guidance
- Photography or phone guidance
- Dress code
- Weather and footwear
- Wedding meal and Jain/veg options
- Venue gate and transport
- Event-specific RSVP

### Add to Calendar

Create an event-specific calendar entry with:

- Correct timezone
- Venue address
- Directions link
- Arrival recommendation
- Coordinator contact

### Optional interaction

Tap a diya to reveal a blessing. Always provide a visible alternative.

---

## 34. Reception Page

### Emotional purpose

Present the formal celebration and closing chapter.

### Visual identity

- Midnight blue
- Champagne
- Silver-gold
- Palace terrace or ballroom
- Evening lights

### Reception AI video

```text
Shot 1: Venue transforming into evening
Shot 2: Couple grand entrance
Shot 3: Toast or symbolic celebration
Shot 4: Dining and light details
Shot 5: Reception title and invitation
```

### Personalized sections

- Guest arrival
- Couple entrance
- Toasts
- Dinner
- Cake cutting
- Dance floor
- Table allocation
- Dress code
- Menu and beverages
- Return transport

### Private table allocation

Only authenticated guests can see:

- Table name or number
- Seating zone
- Family group
- Accessibility note

Never publish the full seating plan publicly.

---

## 35. Additional Configurable Events

The system supports optional pages such as:

- Roka
- Tilak
- Welcome Dinner
- Cocktail Night
- Pithi
- Chooda
- Mayra
- Grah Shanti
- Nikah
- Anand Karaj
- Pheras
- Post-wedding brunch

Each event uses the shared template with a culturally reviewed event recipe. The platform must not assume every wedding follows the same ceremonies.

---

# Part IV: Utility and Interactive Pages

## 36. Travel, Hotel, and Pickup Page

**Route:** `/travel`

### Public sections

1. Destination overview
2. Recommended arrival and departure
3. Airport and railway station
4. Hotel options
5. Venue travel times
6. Local weather and packing advice
7. Coordinator
8. Frequently asked questions

### Secure personalized section

After token resolution, show:

- Assigned hotel
- Room type or room number, only when approved
- Check-in and checkout
- Booking reference
- Pickup point
- Driver or vehicle details when available
- Pickup status
- Return transfer

### Actions

- Open hotel map
- Call hotel
- Contact travel coordinator
- Confirm pickup
- Report delayed arrival

### Privacy

Room and transport assignments must not be visible to other guests.

---

## 37. Gallery Page

**Route:** `/gallery`

### Sections

- Featured film
- Couple portraits
- Story memories
- Event collections
- Family moments
- Guest uploads after moderation

### Filters without tabs

Do not use horizontal tab panels. Use a simple page list or anchored collection headings:

```text
Jump to Engagement
Jump to Haldi
Jump to Wedding
```

Each collection remains part of the vertical page or opens a dedicated gallery URL.

### Media behavior

- Progressive images
- Full-screen viewer
- Captions
- Download permission controlled by host
- Video poster before load
- No autoplay with sound

---

## 38. RSVP Page

**Route:** `/rsvp`

### Flow

1. Guest greeting
2. Party verification
3. Event-by-event attendance
4. Attendee names
5. Dietary needs
6. Travel and hotel needs
7. Accessibility requirements
8. Event-specific questions
9. Review
10. Confirmation

### Event-level behavior

A guest can accept Sangeet and Wedding while declining another event. Party limits are enforced per event.

### Dietary fields

- Vegetarian
- Jain
- Vegan
- Allergy
- Other note

### Confirmation

- Response summary
- Calendar actions
- Directions
- Edit link
- Coordinator contact

---

## 39. Blessing and Message Wall

**Route:** `/blessings`

### Submission formats

- Text
- Image
- Voice
- Short video

### Display

Use a vertical editorial wall with approved messages. Do not create an endless social feed.

### Moderation states

```text
Submitted → Processing → Review → Approved → Published
                           ↘ Rejected
```

### Privacy options

- Public to guests
- Couple only
- Family only
- Anonymous display, while retaining moderation identity privately

---

## 40. Registry and Digital Shagun

**Route:** `/registry`

### Modes

- External registry links
- Charity contribution
- Experience fund
- Digital shagun through an approved payment provider
- No-gifts message

### Requirements

- Do not store raw payment-card data.
- Clearly identify payment recipient.
- Display refund and support information where applicable.
- Confirm payment-provider responsibility.
- Respect regional legal and tax requirements.
- Allow the couple to disable the page entirely.

### Tone

Registry and shagun should remain tasteful and optional, never a dominant CTA.

---

## 41. Guest Photo Upload

**Route:** `/upload`

### Features

- Guest token or event code
- Select event
- Upload images or short video
- Optional caption
- Upload progress
- Consent statement
- Submission confirmation

### Controls

- File type and size limits
- Malware scanning where supported
- Duplicate detection
- Moderation
- Storage quota
- Photographer-rights notice
- Removal request workflow

Uploaded media does not appear publicly until approved.

---

## 42. Fun Page

**Route:** `/fun`

This page is optional. It groups lightweight activities without cluttering essential event pages.

### Event excitement poll

- One vote per guest or token
- Configurable options
- Anonymous public result totals
- Close date

### Couple quiz

- Five to ten questions
- Immediate score
- No public ranking by default
- Optional couple explanations

### Song request

- Song
- Artist
- Dedication
- Sangeet or Reception selection
- Moderation status

### Wedding hashtag

The official hashtag is generated and approved in the builder. Guests may optionally submit suggestions, but generation does not run during every guest visit.

### Scratch surprise

A scratch or tap reveal may contain:

- Couple message
- Hidden photo
- Hashtag
- Event clue
- Thank-you

It must not hide essential details.

---

## 43. Secure Guest Details Page

**Route:** `/guest`

### Personalized content

- Guest or family name
- Eligible events
- RSVP state
- Party limit
- Hotel assignment
- Room allocation
- Pickup and vehicle
- Table allocation
- Dietary record
- Private host note

### Security

- Opaque guest token
- Revocable access
- No search indexing
- No public sharing metadata
- Sensitive values excluded from analytics
- Optional secondary verification for high-sensitivity details

---

## 44. Contact and Help Page

**Route:** `/contact`

### Sections

- Wedding coordinator
- Travel coordinator
- Hotel help
- RSVP help
- Emergency day-of contact
- FAQ

### FAQ topics

- Dress code
- Children
- Plus-one policy
- Weather
- Transportation
- Dietary support
- Photography
- Event timing

---

# Part V: Personalization System

## 45. Couple Personalization

- Names and monogram
- Real or illustrated likeness
- Character style
- Skin tone, proportions, hair, and accessories
- Approved outfits per event
- Couple quote
- Story milestones
- Voice and language
- Favorite flowers, colors, places, and symbols

---

## 46. Cultural Personalization

- Ceremony names
- Regional architecture
- Textile and ornament references
- Ritual descriptions
- Music direction
- Family invitation wording
- Language and transliteration
- Food categories

Cultural details require human approval and should not be inferred only from names or appearance.

---

## 47. Event Personalization

Every event can configure:

- Palette
- Environment
- Floral system
- Couple outfit
- Event symbol
- AI video recipe
- Voice chapter
- Schedule
- Dress code
- Menu
- Guest notes
- Venue
- RSVP questions
- Interaction
- Countdown and after-event state

---

## 48. Family Personalization

- Family names
- Parent and host names
- Family message
- Family image
- Family voice note
- Language
- Crest or symbol
- Private guest-group note

---

## 49. Guest Personalization

- Greeting
- Eligible events
- Party size
- Plus-one rule
- Child invitation
- RSVP status
- Dietary profile
- Hotel
- Pickup
- Room
- Table
- Language
- Private message

Guest personalization must be rule-based and stored in the Wedding Manifest or guest context, not manually hardcoded into pages.

---

## 50. Personalization Depth by Product Tier

### Essential

- Couple names and photographs
- Palette and typography
- Events and content
- Venue, hotel, gallery, RSVP
- Standard motion presets

### Signature

- Approved AI couple characters
- Event-specific art
- Voiceover
- Short event videos
- Guest personalization
- Fun interactions

### Bespoke

- Custom visual direction
- Custom event film recipes
- Family voice and media production
- Advanced guest-group journeys
- Custom venue artwork
- Dedicated creative review

---

# Part VI: AI Media Production by Page

## 51. Media Asset Matrix

| Page | Required asset | Optional AI asset |
|---|---|---|
| Main hero | Couple key art | Welcome loop |
| Couple intro | Portrait | Voice greeting |
| Story | Milestone images | Bridge videos |
| Family | Approved family media | Family illustration or voice |
| Engagement | Event key art | Proposal/ring film |
| Haldi | Event key art | Marigold film |
| Mehndi | Event key art | Henna reveal film |
| Sangeet | Event key art | Stage/dance teaser |
| Wedding | Ceremony key art | Mandap film |
| Reception | Evening key art | Entrance/finale film |
| Travel | Venue/hotel media | Stylized destination artwork |
| Gallery | Real media | Highlight edit |
| Blessings | Submitted media | Transcription/caption support |

---

## 52. AI Generation Rules

- ChatGPT Image 2 owns couple identity and character-containing stills.
- Nano Banana creates environments, objects, patterns, and character-free layers.
- Veo creates short motion from approved keyframes.
- ElevenLabs creates approved narration and voice messages.
- Omni or the multimodal reviewer checks identity, outfit, cultural, and composition consistency.
- Claude creates structured storyboards, scripts, prompts, and validations.
- Hermes coordinates jobs, approvals, retries, cost, and lineage.

No generated asset is published automatically.

---

## 53. Video Consistency Rules

- Use 3–6 second shots.
- Assemble shots into 10–20 second event films.
- Begin with approved character keyframes.
- Prefer medium and wide framing.
- Avoid complex hand actions and long dialogue shots.
- Lock event outfits.
- Review first, middle, and final frames.
- Provide poster and static fallback.
- Load video only after user request or when the operator explicitly enables a muted lightweight loop.

---

# Part VII: Motion and Visual Behavior

## 54. Global Motion Language

| Interaction | Duration |
|---|---:|
| Tap response | 120–180 ms |
| Button transition | 180–250 ms |
| Card reveal | 300–500 ms |
| Text reveal | 400–700 ms |
| Layered scene entrance | 700–1,100 ms |
| Page chapter transition | 800–1,400 ms |
| AI film | 10–20 seconds, skippable |

### Rules

- Essential information appears before decorative animation completes.
- Text remains stable while reading.
- Off-screen animation pauses.
- Event pages use distinct motion accents without changing basic usability.
- Reduced motion replaces parallax and masks with fades.
- No scroll hijacking.
- No forced horizontal navigation.

---

## 55. Visual Continuity

The main page and event pages share:

- Couple monogram
- Typography family
- Button style
- Card geometry
- Icon family
- Header and footer
- Core neutral background

Events personalize:

- Accent palette
- Flowers
- Motifs
- Environment
- Couple outfit
- AI media
- Interaction

This produces distinct events without making them look like unrelated websites.

---

# Part VIII: Data and Content Rules

## 56. Event Content Model

```json
{
  "slug": "engagement",
  "name": "Engagement",
  "guestVisibilityRule": "event_engagement",
  "dateTime": {
    "start": "2027-02-14T18:00:00+05:30",
    "end": "2027-02-14T23:00:00+05:30",
    "timezone": "Asia/Kolkata"
  },
  "venue": {
    "venueId": "venue_royal_garden",
    "inheritMainVenue": false
  },
  "dressCode": {
    "name": "Pastel Elegance",
    "description": "Soft hues and comfortable evening attire",
    "palette": ["rose", "sage", "ivory", "champagne"]
  },
  "schedule": [],
  "guestNotes": [],
  "menu": {
    "status": "approved",
    "vegetarian": true,
    "jain": true,
    "vegan": true,
    "highlights": []
  },
  "media": {
    "hero": "asset_engagement_hero",
    "film": "asset_engagement_film",
    "poster": "asset_engagement_poster"
  },
  "interaction": {
    "type": "scratch-reveal",
    "contentId": "message_engagement_surprise"
  },
  "rsvp": {
    "enabled": true,
    "deadline": "2027-01-15"
  }
}
```

---

## 57. Content Status

Every important content block has a status:

```text
Missing
Draft
Awaiting Approval
Approved
Published
Superseded
```

Unapproved menus, schedules, contacts, assignments, or AI media cannot be published.

---

## 58. Inheritance Rules

To avoid duplicate content:

- Event pages reference shared venue records.
- Dress code remains event-specific.
- Family introduction lives on the main page.
- Story lives on the main page.
- Shared coordinator records are referenced.
- Hotel records live on Travel and Stay.
- Guest assignments live in secure guest context.

---

# Part IX: Performance, Privacy, and Accessibility

## 59. Mobile Performance Targets

| Metric | Target |
|---|---:|
| Useful shell | Under 1.5 s on good 4G |
| Largest Contentful Paint | Under 2.5 s |
| Interaction response | Under 200 ms |
| Initial transfer | Approximately 1.5–3 MB |
| Main journey | Approximately 6–10 MB progressively loaded |
| Event page | Load only its required assets |
| Video | Load after request |

### Asset behavior

- Responsive AVIF/WebP images
- Explicit dimensions
- Lazy-loaded later sections
- Prefetch the next likely page only
- Pause hidden loops
- Avoid large transparent PNG files
- Static fallback for every video
- Server-generated social previews

---

## 60. Privacy

- Guest tokens are opaque and revocable.
- Private event eligibility is enforced server-side.
- Room, pickup, and table data never appears publicly.
- RSVP data is excluded from analytics.
- Guest uploads require consent and moderation.
- Voice and likeness generation require explicit permission.
- Registry payments use approved external providers.

---

## 61. Accessibility

- Every page uses semantic headings and landmarks.
- Important text exists in HTML.
- Touch targets are at least 44 by 44 CSS pixels.
- Videos have captions.
- Voice has visible equivalent text.
- Reduced motion is supported.
- Scratch, hold, and tracing interactions have buttons.
- Contrast is tested over generated backgrounds.
- Forms have labels and inline errors.
- Desktop keyboard navigation works.
- Decorative images use appropriate empty alternative text.

---

# Part X: Delivery Priority

## 62. MVP Pages

1. Main Wedding Journey
2. Shared event page system
3. Engagement page
4. Haldi or Mehndi page
5. Sangeet page
6. Wedding page
7. Reception page
8. Travel and Stay
9. RSVP
10. Gallery
11. Contact and Help
12. Secure Guest Details

### MVP features

- Timeline
- Venue and maps
- Dress code
- Event-level RSVP
- Family introductions
- Travel, hotel, and pickup
- Coordinators
- Calendar
- Gallery
- Food and dietary details
- Countdown

---

## 63. Phase Two Features

- Scratch reveal
- Excitement poll
- Couple quiz
- Blessing wall
- Song requests
- Guest uploads
- Table allocation
- Room allocation enhancements
- Registry or digital shagun
- Guest hashtag suggestions

Private operational features may move into MVP when required by the first real wedding.

---

## 64. Acceptance Criteria

### Website architecture

- The product does not use a bottom tab bar as primary navigation.
- Main and event pages have real URLs.
- Each page scrolls vertically and reads like a website.
- Essential information is available on the main page.
- Event pages provide depth without unnecessary repetition.

### Personalization

- Every event can have unique approved art, outfit, palette, video, voice, schedule, dress code, food, and interaction.
- Couple identity remains consistent.
- Guest event access, RSVP, hotel, pickup, room, and table details are personalized.
- New weddings require no runtime code changes.

### Guest utility

- Dates, venues, dress code, RSVP, directions, food, and coordinator are easy to find.
- Calendar entries contain the correct timezone.
- Jain, vegetarian, vegan, and allergy requirements connect to RSVP.
- Private assignments are secure.

### Media and motion

- Event AI videos have approved posters and fallbacks.
- Video is not required to use the page.
- Motion can be skipped or reduced.
- Pages remain smooth on target mid-range mobile devices.

### Reliability

- Published content is approved and versioned.
- Event RSVP updates the overall guest response.
- Uploads and blessing messages are moderated.
- Published releases support rollback.

---

## 65. Final Experience Rule

> Build a connected wedding website, not an app made of tabs.

The main page should feel like the complete wedding journey. Event pages should feel like personalized chapters with their own approved couple film, visual identity, practical details, food, RSVP, and guest instructions. Utility pages should appear only when they provide genuine depth. Every choice should make the experience more personal, more useful, and easier to use on a phone.