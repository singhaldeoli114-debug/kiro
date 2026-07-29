# Indian Royal 3D Wedding World Platform

## Product, Experience, AI Production, and Technical Specification

**Document status:** Product blueprint
**Primary platform:** Mobile web
**Deployment target:** Netlify
**Primary audience:** Couples, families, wedding planners, creative operators, and invited guests
**Core proposition:** Generate the couple's world, not a new website codebase for every wedding.

---

## 1. Executive Summary

This product is a multi-tenant platform for creating personalized, mobile-first Indian royal 3D wedding invitations. Each wedding becomes a guided cinematic world containing the couple's characters, story, ceremonies, venues, hotels, films, voiceovers, guest-specific information, and RSVP flow.

The platform is not a collection of one-off websites and is not a basic template where only names and colors change. It uses one stable, tested runtime that renders different weddings from a versioned **Wedding Manifest** and an approved collection of media and 3D assets.

AI is used during production to understand references, plan the story, create consistent couple characters, generate environments and cinematic clips, produce voiceovers, validate assets, and automate workflows. AI generation is not required while an invited guest is using the published experience.

The intended product balance is:

- **70% stable reusable platform**
- **20% configurable style, motion, and scene system**
- **10% genuinely custom identity, story, characters, venue, and media**

This makes the product scalable while ensuring every wedding feels like it belongs to that couple.

---

## 2. Product Vision

Create the most personal and immersive digital Indian wedding invitation: a royal, interactive journey that works smoothly on mobile and remains useful as an invitation.

A guest should be able to:

1. Open a personalized invitation link.
2. Break a digital royal seal.
3. Enter a stylized 3D wedding world.
4. Meet the couple through consistent custom characters.
5. Explore the couple's story and wedding events.
6. Watch approved cinematic films.
7. Hear optional narration and family messages.
8. Find venues, hotels, travel details, and coordinators.
9. Respond to an event-specific RSVP.
10. Add events to their calendar, open directions, or contact the hosts.

The experience should feel like a game but behave like a reliable, optimized story.

---

## 3. Product Principles

### 3.1 Mobile first

At least 95% of guests are expected to use mobile phones. Portrait mobile is the primary design surface. Desktop is an enhancement, not the source layout.

### 3.2 Guided rather than free-roaming

Guests follow a cinematic camera path controlled by scroll, tap, and limited drag gestures. Unrestricted game controls are avoided because they increase confusion, motion sickness, development cost, and device load.

### 3.3 Personal, not random

AI output must follow an approved identity bible, style pack, event configuration, cultural requirements, and scene recipe. Random combinations are rejected by validation and approval gates.

### 3.4 Information remains accessible

All essential wedding information must exist as semantic HTML outside the 3D canvas. A persistent **Quick Details** action gives immediate access to dates, venues, contacts, and RSVP.

### 3.5 Generation happens before publication

Images, videos, voiceovers, and 3D assets are generated, reviewed, compressed, and published in advance. Guest visits do not trigger expensive or unreliable AI generation.

### 3.6 Human approval is mandatory

Couple likeness, clothing, cultural details, event information, voice, and final scenes require explicit approval. AI confidence scores assist review but do not replace it.

### 3.7 Graceful degradation

Every invitation supports full 3D, reduced-quality 3D, and a complete 2D/2.5D fallback. A guest must never lose event information or RSVP access because of their device.

---

## 4. Goals and Non-Goals

### Goals

- Support many weddings from one maintainable platform.
- Make every wedding visually and emotionally specific to the couple.
- Preserve character identity across images, events, and videos.
- Provide controlled customization without broken visual combinations.
- Perform smoothly on mid-range Android phones and modern iPhones.
- Support multilingual narration and content.
- Provide secure guest personalization and RSVP.
- Permit preview, approval, immutable publishing, and rollback.
- Keep generation providers replaceable through adapters.

### Non-goals for the initial release

- A fully unrestricted 3D game.
- Real-time AI generation during guest visits.
- A separate production codebase for every wedding.
- Fully photorealistic, rigged 3D humans for every customer.
- An open-ended design editor comparable to Blender or Figma.
- Automatic publishing without human review.
- Embedding heavy interactive maps inside the 3D world.

---

## 5. Platform Roles

### Platform administrator

Manages users, plans, style packs, providers, model settings, quotas, moderation, audit logs, and system health.

### Creative operator

Collects references, edits manifests, reviews generations, controls prompts, fixes asset issues, and prepares projects for approval.

### Couple or family approver

Approves identity, outfits, scenes, scripts, narration, events, guest rules, and the final preview.

### Wedding planner

Manages schedules, hospitality, venues, hotels, travel, guest groups, and coordinators.

### Guest

Views the invitation, accesses relevant events, watches media, obtains directions, and submits or edits an RSVP.

---

## 6. System Architecture

```text
Customer / Operator Builder
            |
            v
Versioned Wedding Manifest + Project State
            |
            v
Hermes Workflow and Orchestration Layer
   |          |             |             |
   v          v             v             v
Claude     Omni QA    Media Providers    3D Pipeline
   |          |        |    |    |           |
Schemas,      |      GPT   Nano Veo       Blender
storyboards,  |      Image Banana         and GLB
scripts,      |       2                   optimization
prompts       |
              v
       Consistency reports
            |
            v
Asset Store + Database + Approval Records
            |
            v
Manifest Compiler and Publish Validation
            |
            v
Immutable Preview / Production Release
            |
            v
Stable Wedding Runtime on Netlify
            |
            +----> Guest experience
            +----> RSVP API
            +----> Maps / calendar / contact actions
```

### Architectural rule

The public runtime consumes only approved manifests and published assets. It does not depend on Claude, Hermes, image generation, video generation, or voice generation to serve a guest.

---

## 7. Multi-Tenant Model

One runtime supports many isolated wedding projects.

```text
/wedding/aanya-arjun
/wedding/riya-kabir
/wedding/meera-vikram
```

Optional custom domains may point to a published project:

```text
aanyaandarjun.com
riyawedskabir.com
```

Each tenant or project has isolated:

- Users and permissions
- Wedding Manifest
- Couple identity pack
- Generated assets and versions
- Events and hospitality data
- Guest list and invitation rules
- RSVP records
- Provider costs and quotas
- Approval history
- Preview and production releases
- Custom domain and sharing metadata

Tenant identity must be enforced on every database query, storage path, job, webhook, and server function.

---

## 8. Wedding Manifest

The Wedding Manifest is the single source of truth for rendering and publishing a wedding. It is versioned, validated, and immutable after publication.

### 8.1 Manifest responsibilities

The manifest defines:

- Project identity and publication state
- Couple and family information
- Character references and outfits
- Story content
- Style pack and allowed variations
- 3D world and camera recipe
- Events and ceremony-specific presentation
- Photos, video, voice, music, and captions
- Venues, hotels, travel, and coordinators
- Guest-personalization rules
- RSVP fields and event permissions
- Localization
- Feature flags
- Quality tiers and fallbacks
- Social sharing metadata
- Consent and rights references

### 8.2 Example manifest

```json
{
  "schemaVersion": "1.0",
  "project": {
    "id": "wed_aanya_arjun",
    "tenantId": "tenant_123",
    "slug": "aanya-arjun",
    "status": "published",
    "version": 7,
    "defaultLocale": "en-IN",
    "locales": ["en-IN", "hi-IN"]
  },
  "couple": {
    "partnerOne": {
      "name": "Aanya",
      "characterId": "character_aanya"
    },
    "partnerTwo": {
      "name": "Arjun",
      "characterId": "character_arjun"
    },
    "monogram": "AA",
    "story": []
  },
  "style": {
    "pack": "royal-rajasthan",
    "packVersion": 3,
    "palette": "rani-pink-gold",
    "lighting": "sunset",
    "typography": "heritage-serif",
    "motionIntensity": "cinematic",
    "ornamentDensity": "balanced"
  },
  "world": {
    "entrance": "royal-gate-02",
    "palace": "rajasthan-palace-02",
    "landscape": "desert-sunset",
    "cameraPath": "royal-journey-01",
    "qualityProfiles": ["high", "standard", "lite"]
  },
  "characters": {
    "identityProvider": "chatgpt-image-2",
    "partnerOne": {
      "canonicalReference": "asset_aanya_canonical_v3",
      "approved": true,
      "outfits": {
        "haldi": "asset_aanya_haldi_v2",
        "sangeet": "asset_aanya_sangeet_v4",
        "wedding": "asset_aanya_wedding_v5"
      }
    },
    "partnerTwo": {
      "canonicalReference": "asset_arjun_canonical_v4",
      "approved": true,
      "outfits": {
        "haldi": "asset_arjun_haldi_v2",
        "sangeet": "asset_arjun_sangeet_v3",
        "wedding": "asset_arjun_wedding_v4"
      }
    }
  },
  "events": [],
  "media": {
    "gallery": [],
    "films": [],
    "music": [],
    "voiceChapters": []
  },
  "hospitality": {
    "venues": [],
    "hotels": [],
    "travel": [],
    "coordinators": []
  },
  "guestExperience": {
    "personalizedGreeting": true,
    "quickDetails": true,
    "chapterNavigation": true
  },
  "rsvp": {
    "enabled": true,
    "deadline": "2027-01-25",
    "allowEditing": true,
    "fields": []
  },
  "features": {
    "waxSeal": true,
    "scratchReveal": true,
    "preWeddingFilm": true,
    "addToCalendar": true,
    "reducedMotion": true
  },
  "publishing": {
    "releaseId": "release_007",
    "publishedAt": "2027-01-01T10:00:00Z",
    "approvedBy": ["user_couple_01", "user_operator_09"]
  }
}
```

### 8.3 Schema rules

- Unknown required fields block publication.
- Referenced assets must exist, be approved, and belong to the tenant.
- Event times include a timezone.
- Every video has a poster and caption track where required.
- Every interactive reveal has an accessible alternative.
- Every full 3D scene has a lite fallback.
- Published manifests cannot be changed in place; changes create a new version.

---

## 9. Customization System

Customization is divided into seven layers.

### Identity

- Names, monogram, families, and wedding hashtag
- Couple characters and physical relationships
- Outfits, jewellery, and accessories
- Languages and preferred terminology

### Story

- First meeting, proposal, engagement, and milestones
- Personal copy, photos, family messages, and blessings
- Couple-specific visual symbols and places

### Culture

- Regional traditions and ceremony naming
- Architecture and decorative vocabulary
- Music direction and attire conventions
- North Indian, Gujarati, Punjabi, Marathi, Bengali, South Indian, fusion, and other supported cultural packs

### Events

- Event names, schedules, dress codes, venues, and colors
- Event-specific characters, props, motion, narration, and calls to action

### World

- Palace, garden, temple, landscape, time of day, weather, particles, camera path, and venue treatment

### Media

- Portraits, event posters, gallery, pre-wedding films, voiceovers, music, and social preview artwork

### Guest experience

- Personalized greeting
- Guest-specific event access
- Family-size limits
- Hotel and transport assignments
- Language and RSVP configuration

---

## 10. Style Packs and Visual Grammar

Initial style packs may include:

1. Royal Rajasthan
2. Mughal Garden
3. South Indian Temple
4. Modern Indian Palace
5. Bollywood Celebration
6. Floral Heritage
7. Minimal Indian Luxury

Each pack defines:

```text
Style Pack
├── Approved palettes
├── Typography pairings
├── Architecture kit
├── Character illustration rules
├── Materials and textures
├── Lighting presets
├── Camera grammar
├── Motion presets
├── Particle rules
├── Ornament library
├── Music direction
├── Image prompt grammar
├── Video prompt grammar
└── Fallback assets
```

### Bounded customization

Customers select from compatible variables. A style validator rejects conflicting combinations. For example, Royal Rajasthan can permit sunset or night lighting, approved pink/crimson/emerald accents, selected palace entrances, and multiple event pavilions without allowing unrelated cyberpunk materials unless a fusion pack explicitly supports them.

### Consistency validator

Before generation and publication, validate:

- Palette compatibility
- Typography pairing
- Architecture and cultural fit
- Character rendering style
- Lighting continuity
- Event outfit references
- Motion intensity
- Ornament density
- Video and image aspect ratios
- Mobile readability

---

## 11. Couple Character System

Character consistency is treated as an identity-management problem, not a series of independent prompts.

### 11.1 Identity authority

**ChatGPT Image 2 owns couple identity.** It creates canonical faces, bodies, poses, expressions, outfits, and character-containing stills.

**Nano Banana owns the visual world.** It creates architecture, landscapes, decorations, textures, props, concept variations, and character-free scene elements.

**Veo animates approved moments.** It receives approved character keyframes and creates short controlled clips.

Multiple models must not independently reinterpret the couple without a consistency review.

### 11.2 Reference collection

For each person, collect with explicit consent:

- 8–12 clear photographs
- Front, profile, and three-quarter views
- Close-up and full-body references
- Neutral and smiling expressions
- Accurate complexion references
- Height relationship and body proportions
- Hair, facial hair, and accessory preferences

### 11.3 Character bible

Generate and approve:

- Front portrait
- Three-quarter portrait
- Side profile
- Full-body proportions
- Expression sheet
- Hair reference
- Complexion reference
- Jewellery and accessory reference
- Negative constraints
- Character rendering style

### 11.4 Outfit packs

Each event has locked approved outfits for both partners. Assets receive stable versioned identifiers such as:

```text
aanya_haldi_v3_approved
aanya_wedding_v5_approved
arjun_sangeet_v2_approved
arjun_wedding_v4_approved
```

### 11.5 Approval gate

No character-containing scene or video proceeds until the couple approves:

- Face likeness
- Complexion
- Body proportions
- Hair and facial hair
- Clothing
- Jewellery
- Height relationship
- Illustration style

### 11.6 Recommended rendering strategy

For the first product version, use 3D environments with 2.5D illustrated couple characters, small animation loops, and pre-generated cinematic moments. Fully rigged realistic 3D humans should be a premium later capability because they are expensive, heavy, and prone to uncanny results.

---

## 12. AI and Production Responsibilities

### Hermes: workflow operating layer

Hermes manages:

- Project and job state
- Provider invocation
- Dependencies between jobs
- Retries and timeouts
- Cost and quota limits
- Approval gates
- Prompt and model lineage
- Audit logs
- Provider outage queues
- Publishing gates
- Rollback initiation

Suggested project state machine:

```text
Draft
→ Collecting Content
→ Planning Story
→ Awaiting Character Approval
→ Generating Scenes
→ Awaiting Scene Approval
→ Generating Video and Voice
→ Optimizing Assets
→ Mobile QA
→ Awaiting Final Approval
→ Ready to Publish
→ Published
→ Archived
```

### Claude: reasoning and engineering

Claude handles:

- Manifest and API schemas
- Runtime and builder engineering
- Content validation
- Brief-to-storyboard conversion
- Scene plans and camera directions
- Structured prompts
- Video shot lists
- Voiceover scripts
- Translation drafts
- Pronunciation lists
- Failure diagnosis
- Style consistency rules

Claude does not generate a separate production codebase per wedding.

### Omni or multimodal understanding model

The multimodal QA layer handles:

- Reference-board analysis
- Venue-photo understanding
- Character-reference comparison
- Outfit and jewellery checks
- Visual-style scoring
- Cultural-detail review assistance
- First/middle/final video-frame comparison
- Defect and artifact detection

### ChatGPT Image 2

Primary uses:

- Canonical couple character sheets
- Event outfit sheets
- Expressions and poses
- Character-containing keyframes
- Couple portraits
- Character fallback imagery

### Nano Banana

Primary uses:

- Palace and environment concepts
- Mandaps and event pavilions
- Props and decorations
- Texture concepts
- Posters without critical identity requirements
- Scene backgrounds
- Mobile fallback environments
- Social-sharing artwork variants

### Veo

Primary uses:

- Short palace reveals
- Couple introductions
- Haldi flower moments
- Mehndi motif reveals
- Sangeet celebration shots
- Mandap reveals
- Reception finales

Video rules:

- Prefer 3–6 second shots.
- Start from approved keyframes.
- Prefer medium and wide character shots.
- Avoid long facial close-ups and complex hand interactions.
- Keep outfits fixed per shot.
- Generate shots independently.
- Review first, middle, and final frames.
- Reject and regenerate one failed shot rather than an entire film.

### Blender and controlled 3D pipeline

Use Blender and artist-controlled automation for:

- Reusable palace modules
- Event pavilions
- Low-poly landscapes
- Venue models
- Decorative props
- Camera paths
- Baked lighting
- GLB exports
- Mobile optimization

Use reusable kits for standard plans. Reserve fully custom venue modeling for premium projects.

---

## 13. ElevenLabs Voiceover System

Voice is optional and generated before publication.

### Voice modes

- Royal narrator
- Couple narration
- Parent or grandparent welcome
- Family blessing
- Multilingual event guide
- Premium guest-group greeting

### Voice consent

If a real person's voice is cloned:

1. Obtain explicit recorded consent.
2. Describe the scripts and distribution context.
3. Store a consent record linked to the project.
4. Restrict the voice profile to authorized jobs.
5. Prevent arbitrary script generation.
6. Apply an agreed retention and deletion policy.
7. Offer a synthetic narrator if consent is unavailable.

### Production workflow

```text
Claude drafts chapter script
→ Pronunciation dictionary is prepared
→ Couple approves the script
→ ElevenLabs generates voice samples
→ Voice and pronunciation are approved
→ Final chapter audio is generated
→ Audio is normalized and compressed
→ Captions and transcript are created
→ Assets are added to the manifest
```

### Pronunciation requirements

Names, venues, and ceremony terminology require approved phonetic guidance. Generate a pronunciation test containing every important proper noun before creating all chapters.

### Mobile audio behavior

- Audio starts only after user consent.
- A persistent mute control is available.
- Music ducks during narration and video.
- Audio pauses when the page is hidden.
- Narration is lazy-loaded by chapter.
- Captions and visible text remain available.
- Guests can skip narration.
- Narration does not play over the RSVP form.
- Use efficient Opus with AAC fallback where required.

---

## 14. Guest Experience and Motion Specification

The complete journey should take approximately 3–5 minutes, while Quick Details permits immediate utility.

### Persistent controls

- Sound on/off
- Quick Details
- Chapter navigation
- Skip animation
- Language selector
- Reduced-motion option
- Progress indicator
- RSVP action after the opening

Touch targets are at least 44 by 44 CSS pixels.

### Chapter 0: Shared-link preview

Display names, date, invitation artwork, and a concise invitation message in WhatsApp and social previews. Do not expose personal guest data in the URL.

### Chapter 1: Royal loader

- Deep crimson or royal plum background
- Gold mandala line animation
- Couple monogram
- Real ornamental loading progress
- Optional personalized welcome

Show a meaningful interface in approximately 1–1.5 seconds on good 4G.

### Chapter 2: Audio and language

Ask whether to continue with music or silently. Offer supported languages. Use a 250–400 ms card transition. Entry must continue if audio fails.

### Chapter 3: Wax-seal opening

- Ivory envelope and gold border
- Central royal sun or mandala seal
- Tap-and-hold or direct Open Invitation action
- Seal cracks, emits light, and becomes particles
- Envelope opens and the camera passes into the world

Target 1.5–2 seconds. Include a non-gesture button and optional light haptics.

### Chapter 4: 3D palace reveal

- Stylized Rajasthan-inspired architecture
- Sunset lighting, jharokhas, arches, domes, lamps, and marigolds
- Camera passes through gates and settles at the central palace
- Couple names and wedding date appear in crisp HTML
- Scroll advances the camera; limited drag adds small parallax

Idle motion includes restrained fabric, fountains, lamps, birds, and petals.

### Chapter 5: Couple introduction

Use approved 2.5D characters or portraits inside the 3D environment. Animate a restrained turn, petal arc, name reveal, and small camera orbit. Reduced-motion mode uses a crossfade.

### Chapter 6: Love-story path

Use three to five story islands connected by a royal path. Each has one symbolic object and a short text card. Tapping reveals a concise milestone. Provide Skip Story.

### Event worlds

#### Haldi

- Saffron, yellow, ivory, and marigold orange
- Courtyard, brass vessels, cushions, and floral canopy
- Falling petals and warm sunlight
- Tap a flower bowl to reveal dress code and details

#### Mehndi

- Emerald, magenta, and antique gold
- Garden pavilion, lanterns, swings, and peacock details
- Henna border draws around the viewport
- Tap or trace a motif; also provide Reveal Details

#### Sangeet

- Indigo, violet, fuchsia, and gold
- Stage, chandeliers, and decorative floor
- Sequenced lights and brief dancing silhouettes
- Use authored animation loops rather than expensive live audio shaders

#### Wedding

- Crimson, ivory, and royal gold
- Mandap, sacred fire, floral canopy, and palace courtyard
- Slow emotional camera approach
- Tap a diya to reveal a blessing
- This is the visual and emotional high point

#### Reception

- Midnight blue, champagne, and silver-gold
- Palace terrace, dining lights, and night skyline
- Environment transitions to night
- Restrained distant fireworks and monogram reveal

### Film and gallery

Videos load only after the guest taps Play. Music ducks, invitation motion pauses, and captions are available. Use mobile 720p by default and adaptive or higher quality where appropriate.

Use standard swipe behavior for 8–15 selected gallery images. A 3D entrance may introduce the gallery, but mobile image browsing remains familiar and accessible.

### Venue and hospitality

Show a simplified venue model or image, then provide:

- Open in Google Maps
- Open in Apple Maps
- Copy address
- Add to calendar
- Hotel details
- Airport and station information
- Transfers
- Coordinator contacts

Do not load a heavy map SDK inside the main scene.

### Scratch-to-reveal blessing

Use a lightweight 2D canvas. Automatically complete after 55–65% reveal. Provide a Reveal Message button. Essential details are never hidden behind scratching.

### RSVP

Use a normal semantic HTML form with attendance, event selection, attendee count, names, children, dietary needs, accommodation, arrival details, and couple message as configurable fields.

The system supports guest-specific events, saves progress where feasible, prevents accidental duplicates, shows clear errors, and permits secure edits.

### Finale

Pull the camera back, illuminate event locations, reveal the couple monogram, and use restrained petals and fireworks. Provide RSVP, calendar, directions, contact, replay, share, and Quick Details actions.

---

## 15. Global Motion System

| Motion type | Duration |
|---|---:|
| Tap feedback | 120–180 ms |
| Button or tooltip | 180–250 ms |
| Card entrance | 350–550 ms |
| Text reveal | 500–800 ms |
| Scene transition | 800–1,200 ms |
| Camera move | 1,200–2,000 ms |
| Emotional reveal | Up to 2,500 ms, skippable |

Rules:

- One dominant animation at a time.
- Camera motion pauses while guests read.
- Scroll-linked movement is reversible.
- Parallax remains restrained.
- Text stabilizes after entry.
- Interactive objects show clear affordances.
- No uncontrolled rotation behind forms.
- Long sequences are skippable.

Reduced-motion mode replaces camera flights with 150–250 ms crossfades, disables parallax and particles, stops automatic rotation, and preserves all content.

---

## 16. Customer and Operator Builder

The builder is a guided setup flow, not a technical 3D editor.

```text
1. Wedding
2. Couple and Families
3. Style
4. Characters
5. Events
6. World
7. Photos and Films
8. Voice and Music
9. Venue, Hotels, and Travel
10. Guests
11. RSVP
12. Preview
13. Publish
```

### Style selection

Customers choose visual cards for world, palette, lighting, invitation opening, journey, and music mood.

### Event editor

For every event, configure:

- Event recipe
- Name, date, time, and timezone
- Venue and dress code
- Palette and decoration
- Approved character outfits
- Motion intensity
- Voiceover
- CTA and optional film

### Asset approval dashboard

Every generated asset includes:

- Draft, approved, rejected, and superseded state
- Provider and model
- Prompt and seed/reference lineage where supported
- Character and style consistency score
- Outfit reference
- Generation cost
- Human reviewer
- Compare versions
- Regenerate this asset only
- Replace manually
- Restore previous approved version

Regenerating one scene never silently replaces approved assets elsewhere.

---

## 17. Publishing Workflow

```text
Complete project setup
→ Compile manifest draft
→ Generate and approve identity
→ Generate and approve scenes
→ Generate and approve videos and voice
→ Optimize media and 3D
→ Validate schema and references
→ Validate privacy and consent
→ Validate performance and fallback
→ Create immutable preview
→ Couple/family approval
→ Publish immutable release
→ Warm CDN and run smoke checks
```

Example versions:

```text
Version 6 — Previous production
Version 7 — Current production
Version 8 — Draft
```

A failed draft never modifies production. Rollback promotes a previously validated release without regenerating assets.

---

## 18. Technical Stack

### Frontend runtime

- Next.js and React
- React Three Fiber and Three.js
- Drei utilities
- GSAP for controlled choreography
- Native scrolling where practical
- Semantic HTML overlays
- CSS and SVG for lightweight ornaments

### Runtime scene strategy

- One persistent WebGL canvas
- Load the current and next chapters only
- Dispose inactive geometry, materials, and textures
- Pause rendering when hidden or off-screen
- Reuse and instance decorations
- Bake lighting and ambient occlusion
- Limit dynamic shadows and transparent layers

### Backend and platform services

Netlify hosts:

- Marketing website
- Authenticated builder
- Preview routes
- Published wedding routes
- Edge routing and caching
- Server functions for guest resolution, RSVP, publishing webhooks, calendar generation, and authorized media operations

Managed services hold:

- Relational application data
- Object and media storage
- Video delivery/CDN
- Authentication
- Email and approved messaging integrations
- Monitoring and logs

### Core data entities

```text
tenants
users
memberships
projects
wedding_manifests
manifest_versions
style_packs
characters
character_versions
events
venues
hotels
assets
asset_versions
generation_jobs
approvals
consent_records
guests
guest_groups
invitations
rsvp_responses
publish_releases
audit_logs
```

### Provider abstraction

Every AI provider is accessed through an internal adapter with standardized job input, status, output, cost, error, and metadata contracts. Model names are configuration, not hard-coded product logic.

---

## 19. Guest Personalization and RSVP

Invitation links use opaque, revocable tokens rather than names, emails, or phone numbers.

A guest context may define:

- Display greeting
- Guest or family name
- Allowed events
- Maximum party size
- Hotel assignment
- Transport allocation
- Language
- RSVP state
- Private host message

RSVP requirements:

- Idempotent submission
- Secure edit flow
- Event-level attendance
- Configurable fields
- Validation and clear errors
- Export for planners
- Audit trail
- Optional confirmation email or approved message
- No RSVP personal data in analytics

---

## 20. Mobile Performance Budget

| Metric | Target |
|---|---:|
| First useful interface | Under 1.5 s on good 4G |
| Largest Contentful Paint | Under 2.5 s |
| Interactive opening | Around 3 s |
| Initial transfer | Ideally 3–5 MB |
| Progressive 3D journey | 12–20 MB excluding requested video |
| Interaction response | Under 200 ms |
| Layout shift | Under 0.1 |
| Minimum active frame rate | 30 FPS on target mid-range Android |

Active scene guidelines:

- Approximately 200k–250k triangles or fewer
- Prefer fewer than 100 draw calls
- Device pixel ratio capped around 1.25–1.5 on mobile
- Most textures at 512 or 1024 pixels
- 2048 textures only for critical hero assets
- KTX2 texture compression
- Meshopt or Draco geometry compression
- Baked shadows and lighting
- One primary dynamic shadow light at most

### Quality tiers

**High:** better particles, textures, soft shadows, and pixel density.
**Standard:** fewer particles, baked shadows, lower texture resolution, and 30–45 FPS target.
**Lite:** static or pre-rendered environments, crossfades, no dynamic particles, and complete HTML functionality.
**No WebGL:** vertical video or image sequence plus event cards, gallery, venue, and RSVP.

Quality selection considers device memory, GPU capability, connection information where available, frame-time sampling, reduced-motion settings, and data-saving preferences.

---

## 21. Accessibility

- Essential content exists in HTML.
- Canvas decoration is hidden appropriately from screen readers.
- Touch targets are at least 44 by 44 CSS pixels.
- Text contrast meets accessibility requirements.
- Focus states are visible.
- Desktop controls are keyboard operable.
- Heading structure and form labels are semantic.
- Films have captions and important speech has transcripts.
- Sound is optional and controllable.
- Reduced motion is fully supported.
- Hold, scratch, and trace gestures have button alternatives.
- Information does not rely only on color.
- Forms explain errors inline.
- RSVP works at 200% zoom.
- Locale and reading language are declared correctly.

---

## 22. Privacy, Consent, and Security

### Consent and rights

Record consent for:

- Couple photographs and likeness generation
- Voice cloning
- Family voice or images
- Music and video usage
- Venue photography
- Guest personalization

### Security controls

- Tenant isolation in database and storage
- Role-based access control
- Short-lived signed operations where appropriate
- Opaque guest tokens
- Encryption in transit and at rest
- Secrets stored outside source control
- Rate limits on RSVP and generation APIs
- Input validation and output encoding
- Upload type and size restrictions
- Malware scanning where supported
- Webhook signature verification
- Audit logs for approvals, publishing, exports, and consent changes
- Backup and restore procedures
- Data-retention and deletion workflows

### AI safety and privacy

- Do not send unnecessary guest PII to generation providers.
- Keep character and voice assets scoped to the authorized project.
- Prevent arbitrary voice-clone scripts.
- Allow removal of identity data after the agreed retention period.
- Preserve model/provider metadata for auditability.

---

## 23. Reliability and Observability

Track:

- Invitation loads and quality tier
- Seal completion
- Chapters viewed
- Quick Details usage
- Film playback
- Map and calendar actions
- RSVP start, completion, edit, and failure
- WebGL context loss
- Runtime exceptions
- Asset-loading failures
- Frame-time degradation
- Generation job cost, duration, retries, and failure
- Publish validation and rollback

Do not place RSVP answers or other sensitive personal fields in analytics.

Operational requirements:

- Provider retries with backoff
- Dead-letter handling for failed jobs
- Idempotent webhooks
- Versioned prompts and models
- CDN cache control
- Error monitoring
- Health dashboards
- Published-release rollback
- Database and asset backups

---

## 24. Product Tiers

### Essential

- 2D/2.5D animated invitation
- Style-pack customization
- Couple portraits
- Events, gallery, venue, hotel, travel, maps, calendar, and RSVP
- Mobile fallback

### Royal 3D

- Guided palace world
- Custom character kit
- Event-world journey
- Wax seal and scratch reveal
- Cinematic transitions
- Optional generated film moments
- Voice narration
- Guest personalization
- Automatic quality tiers

### Bespoke

- Custom art direction
- Custom architecture or venue model
- Advanced character animation
- Multiple cinematic films
- Unique camera journey
- Dedicated artist review
- White-label domain and priority support

Bespoke work must be priced separately because custom 3D, video, and human review do not scale like a standard style pack.

---

## 25. MVP Scope

The first production version should include:

1. Stable mobile wedding runtime
2. Versioned Wedding Manifest schema
3. Tenant-aware operator/customer builder
4. One excellent Royal Rajasthan style pack
5. Wax-seal opening
6. One reusable palace world
7. Three configurable event scenes
8. ChatGPT Image 2 character-bible workflow
9. 2.5D approved couple characters
10. Nano Banana environment workflow
11. Optional short Veo clips
12. ElevenLabs narration workflow
13. Omni consistency review
14. Venue, hotel, travel, maps, and calendar modules
15. Guest groups and RSVP
16. Full, standard, lite, and no-WebGL experiences
17. Asset approval and version comparison
18. Preview, immutable publish, and rollback
19. Analytics, monitoring, privacy, and consent records

Do not begin with seven packs, photorealistic 3D humans, or unlimited self-service generation. Validate the full workflow with three to five real weddings first.

---

## 26. Delivery Phases

### Phase 1: Foundation

- Product requirements and schemas
- Multi-tenant authentication and permissions
- Manifest storage and validation
- Asset and job models
- Netlify runtime skeleton

### Phase 2: Builder and publishing

- Guided project setup
- Manifest editor
- Preview routes
- Approval system
- Immutable releases and rollback

### Phase 3: Royal Rajasthan runtime

- Mobile shell
- Loader and seal
- Palace world
- Three event scenes
- Quick Details and accessibility fallback

### Phase 4: AI production factory

- Hermes jobs and state machine
- Claude planning contracts
- ChatGPT Image 2 character workflow
- Nano Banana environment workflow
- Omni QA reports
- Cost and retry controls

### Phase 5: Voice and video

- Script and pronunciation approval
- ElevenLabs generation and captions
- Veo short-shot workflow
- Video review and delivery

### Phase 6: Hospitality and RSVP

- Venues, hotels, travel, coordinator actions
- Guest import and groups
- Event permissions
- RSVP, edits, export, and confirmation

### Phase 7: Optimization and QA

- GLB and texture compression
- Quality selection
- Device and network testing
- Security and privacy review
- Accessibility verification

### Phase 8: Pilot and expansion

- Launch three to five real weddings
- Measure performance and operator effort
- Improve the most-used customization points
- Add style packs and premium capabilities after validation

---

## 27. Major Risks and Controls

| Risk | Control |
|---|---|
| Faces change across scenes | Locked character bible, one identity authority, and multimodal QA |
| Outfits or jewellery drift | Versioned approved outfit references per event |
| Random visual combinations | Bounded style recipes and pre-generation validation |
| Slow mobile experience | Strict budgets, progressive loading, quality tiers, and fallbacks |
| Video identity drift | Approved keyframes, short shots, wide framing, and frame QA |
| Cultural inaccuracies | Structured cultural packs and human approval |
| Voice misuse | Explicit consent, scoped profiles, script restrictions, and audit logs |
| High generation cost | Quotas, cached assets, selective regeneration, and tiered pricing |
| Provider outage | Hermes queues, retries, adapters, and manual replacement |
| Bad release | Immutable versions, validation gates, preview approval, and rollback |
| Guest data exposure | Tenant isolation, opaque tokens, RBAC, and minimized analytics |
| AI unavailable during visit | No runtime dependency on generation services |
| Old device cannot render 3D | Complete lite and no-WebGL paths |

---

## 28. Acceptance Criteria

### Product and customization

- A new wedding can be created without changing runtime source code.
- Couple identity, story, events, hospitality, media, voice, and guest rules are configurable.
- Every published project has a validated versioned manifest.
- A project can preview, publish, and roll back safely.

### Character and media

- Canonical character and outfit approval occurs before dependent generation.
- Every asset records provider, version, references, approval, and project ownership.
- One failed shot or image can be regenerated independently.
- Voice scripts and cloned voices have approval and consent records.

### Guest journey

- The opening, palace, event journey, hospitality, media, RSVP, and finale work on mobile.
- Quick Details remains reachable.
- Animations can be skipped.
- Audio is opt-in.
- Guest-specific events and limits are enforced.

### Performance

- A useful interface appears within the defined mobile target.
- Target mid-range Android devices maintain approximately 30 FPS in active scenes.
- Video is not downloaded until requested.
- Hidden pages pause expensive rendering and audio.
- Lite and no-WebGL versions retain all essential information.

### Accessibility

- Essential content is usable without WebGL, motion, sound, or gesture-only controls.
- Forms are semantic and keyboard/screen-reader accessible.
- Videos have captions.
- Reduced-motion behavior is complete.

### Security and reliability

- Tenant data and media are isolated.
- RSVP operations are validated, rate-limited, and idempotent.
- Webhooks are verified.
- Published releases are immutable.
- Logs, monitoring, backups, and rollback are operational.

---

## 29. Final Product Rule

> Generate the couple's world, not the website code.

The application remains stable, tested, accessible, and fast. The Wedding Manifest, couple identity, cultural style, characters, outfits, story, ceremonies, venues, hotels, films, narration, guest rules, and approved generated assets make the result fully theirs.
