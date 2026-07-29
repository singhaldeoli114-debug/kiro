# Mobile-First 2.5D Wedding Invitation Platform

## Product and Technical Specification Without Runtime 3D

**Decision:** Runtime 3D is excluded from the initial product.
**Primary platform:** Portrait mobile web
**Deployment:** Netlify
**Experience model:** Layered 2.5D scenes, cinematic motion, short videos, audio, and standard mobile interactions

---

## 1. Product Decision

The initial wedding platform will use a mobile-first 2.5D cinematic experience instead of WebGL scenes or downloadable 3D models.

The product will create depth and richness through:

- Layered AI-generated artwork
- Foreground, midground, and background parallax
- Camera-like pan, zoom, and focus effects
- Character animation loops
- GSAP scroll choreography
- CSS transforms and masks
- Lightweight particles
- Short pre-generated Veo transitions
- ElevenLabs narration
- Interactive HTML event cards

This direction is faster, less expensive, easier to customize, and more reliable across mobile devices. Runtime 3D may be evaluated later as an optional premium enhancement, but it is not a dependency for the product.

---

## 2. Why 2.5D Is the Default

### Advantages

- Faster initial loading
- Lower mobile memory usage
- Better performance on mid-range Android phones
- Lower battery and thermal impact
- More consistent visual output from generative image models
- Easier couple-character consistency
- Simpler accessibility and fallbacks
- Faster customer customization
- Lower asset-production cost
- Easier quality assurance
- More predictable behavior across browsers

### What is intentionally excluded

- No WebGL requirement
- No Three.js or React Three Fiber requirement
- No downloadable GLB models
- No real-time 3D lighting
- No unrestricted camera movement
- No complex real-time shadows
- No device GPU dependency for essential content

### Visual-quality principle

Premium quality comes from art direction, identity consistency, composition, lighting, typography, sound, and motion—not from the presence of 3D geometry.

---

## 3. Product Architecture

```text
Customer / Operator Builder
            |
            v
Versioned Wedding Manifest
            |
            v
Hermes Workflow Layer
   |          |           |          |
   v          v           v          v
Claude    ChatGPT      Nano       ElevenLabs
           Image 2     Banana
   |          |           |          |
Story,      Couple      Worlds,     Voice and
copy,       identity    props,      narration
prompts     and poses   textures
            |
            +---------> Approved keyframes
                              |
                              v
                             Veo
                      Short motion sequences
                              |
                              v
                 Optimization and human approval
                              |
                              v
             Manifest + responsive published assets
                              |
                              v
               Stable mobile runtime on Netlify
```

The public invitation reads only approved manifests and optimized assets. AI services are not called during a guest visit.

---

## 4. 2.5D Scene Composition

Every cinematic scene is built from ordered layers.

```text
Scene
├── Background sky or environment
├── Distant architecture
├── Midground architecture
├── Event pavilion or focal object
├── Couple characters
├── Foreground flowers or arches
├── Atmosphere and particles
├── Lighting overlays
├── Text and controls
└── Optional short video transition
```

### Layer behavior

| Layer | Typical movement |
|---|---|
| Background | 2–4% slow pan or scale |
| Distant architecture | 4–7% parallax |
| Midground | 7–12% parallax |
| Characters | Controlled entrance or idle loop |
| Foreground | 12–18% parallax |
| Particles | Small independent movement |
| Text | Stable HTML reveal |

Parallax values are directional guidance, not fixed implementation values. Motion is reduced automatically on low-power or reduced-motion devices.

---

## 5. Complete Guest Journey

```text
Personalized invitation link
        ↓
Lightweight branded loader
        ↓
Language and audio choice
        ↓
Interactive royal seal
        ↓
Layered palace reveal
        ↓
Couple introduction
        ↓
Love-story journey
        ↓
Haldi → Mehndi → Sangeet → Wedding → Reception
        ↓
Gallery and pre-wedding film
        ↓
Venue, hotel, and travel information
        ↓
Blessing or scratch reveal
        ↓
RSVP
        ↓
Final celebration and utility actions
```

The full journey should take approximately three to five minutes. A persistent **Quick Details** action lets guests skip directly to practical information.

---

## 6. Screen and Motion Specification

### 6.1 Shared-link preview

Include:

- Couple names
- Wedding date
- Approved invitation artwork
- Short invitation message
- Custom domain or project URL

Personal guest information must not appear in the public preview metadata.

### 6.2 Loader

Visuals:

- Royal crimson or plum background
- Gold mandala or monogram
- Lightweight line-drawing animation
- Real asset-loading progress

Motion:

- Mandala draw: 800–1,200 ms
- Monogram fade: 400–600 ms
- Decorative particles: optional and minimal

The useful shell should appear immediately while later scenes continue loading.

### 6.3 Audio and language choice

Offer:

- Enter with music
- Continue silently
- Supported language selection

Audio begins only after a user gesture. Entry must work if audio fails.

### 6.4 Royal seal

Use layered images and masks rather than a 3D envelope.

Sequence:

1. Seal responds to touch.
2. Hold or tap progress appears.
3. Fine crack textures are revealed.
4. Gold-light overlay expands.
5. Seal pieces or particles fade outward.
6. Envelope layers separate.
7. The palace image zooms into view.

Provide an **Open Invitation** button as an accessible alternative.

### 6.5 Palace reveal

Use separate optimized layers for:

- Sky
- Distant palace
- Courtyard
- Couple or monogram
- Foreground arch
- Petals and light rays

Motion:

- Background scales from 1.03 to 1
- Palace rises approximately 12–20 pixels
- Foreground arch moves faster than the palace
- Light rays fade in
- Couple names appear after the scene settles

The scene should resemble a cinematic camera reveal without rendering 3D geometry.

### 6.6 Couple introduction

Use approved character artwork from ChatGPT Image 2.

Possible animation:

- Characters slide or fade in on separate depth layers
- Clothing and jewellery use small masked shimmer loops
- Hair or fabric uses a subtle pre-rendered loop
- Flower petals connect the characters
- Names and date appear as stable HTML

Avoid excessive body or face deformation.

### 6.7 Love story

Use three to five milestones. Each milestone contains:

- One approved illustration or photograph
- One symbolic prop
- One concise text card
- Optional voice chapter

Transitions may use:

- Horizontal image wipe
- Parallax travel
- Paper-fold mask
- Ornamental arch reveal
- Short Veo bridge shot

Provide **Skip Story**.

### 6.8 Haldi

Visual direction:

- Yellow, saffron, ivory, and marigold orange
- Layered courtyard and canopy
- Brass vessels and flower bowls

Motion:

- Marigold petals
- Warm-light overlay
- Slow fabric loop
- Tap flower bowl to reveal event details

### 6.9 Mehndi

Visual direction:

- Emerald, magenta, and antique gold
- Garden pavilion and lanterns

Motion:

- SVG henna pattern draws around the viewport
- Lantern layers sway slightly
- Peacock feather mask reveals event information

Provide a direct Reveal Details button.

### 6.10 Sangeet

Visual direction:

- Indigo, violet, fuchsia, and gold
- Stage, chandeliers, and decorative floor

Motion:

- Sequenced light overlays
- Short dancing silhouette loops
- Controlled confetti burst
- Optional short Veo celebration transition

Avoid continuous high-density effects.

### 6.11 Wedding

Visual direction:

- Crimson, ivory, and royal gold
- Layered mandap, floral canopy, and palace courtyard

Motion:

- Foreground curtains separate
- Mandap moves into focus
- Sacred-fire animation uses a small video or sprite loop
- Petals appear during the couple reveal
- Tap a diya to reveal a blessing

This chapter is the emotional visual climax.

### 6.12 Reception

Visual direction:

- Midnight blue, champagne, and silver-gold
- Palace terrace, fairy lights, and skyline

Motion:

- Sunset crossfades into night
- Lights illuminate in sequence
- Short restrained fireworks video or animation
- Couple monogram appears in the sky

### 6.13 Gallery and film

Gallery:

- Use standard mobile swipe navigation
- Load 8–15 selected images progressively
- Use responsive AVIF/WebP assets
- Provide portrait-safe crops

Film:

- Load only after the guest taps Play
- Show an image poster first
- Use mobile 720p by default
- Pause decorative motion during playback
- Duck background music
- Include captions

### 6.14 Venue, hotel, and travel

Use elegant image cards and optional layered venue artwork.

Actions:

- Open Google Maps
- Open Apple Maps
- Copy address
- Add to calendar
- View hotel details
- View transfers
- Call or message coordinator

Do not embed a heavy map library.

### 6.15 Blessing reveal

Use a small 2D canvas for scratch interaction or a tap-to-reveal card.

- Complete automatically after approximately 60% scratching
- Provide Reveal Message
- Add optional light haptic feedback
- Keep essential information outside the reveal

### 6.16 RSVP

RSVP remains a semantic HTML form.

Configurable fields:

- Attendance
- Event selection
- Number of guests
- Guest names
- Children
- Dietary requirements
- Accommodation
- Arrival details
- Message for the couple

The form supports guest-specific event permissions, secure editing, clear failures, and confirmation actions.

### 6.17 Finale

- Crossfade to a wide palace composition
- Illuminate each event location using overlays
- Reveal the couple monogram
- Use petals and restrained fireworks
- Conclude the music gently

Final actions:

- RSVP
- Add to calendar
- Directions
- Contact host
- Share
- Replay
- Quick Details

---

## 7. Motion Design System

| Motion type | Duration |
|---|---:|
| Tap response | 120–180 ms |
| Button or tooltip | 180–250 ms |
| Card entrance | 300–500 ms |
| Text reveal | 400–700 ms |
| Layered scene reveal | 700–1,100 ms |
| Chapter transition | 800–1,400 ms |
| Emotional reveal | Up to 2,000 ms, skippable |

Rules:

- Use one dominant movement at a time.
- Stop scene movement while guests read or complete forms.
- Keep text in HTML and stable after entry.
- Avoid large continuous background loops.
- Do not attach every decorative movement directly to scroll.
- Use transform and opacity whenever possible.
- Avoid layout-changing animation.
- Pause off-screen animations.
- Respect reduced motion.

### Reduced-motion behavior

- Replace parallax with crossfades
- Remove particles
- Stop automatic panning
- Replace animated masks with immediate reveals
- Preserve voice, content, RSVP, and navigation

---

## 8. AI Production Pipeline

### Claude

- Converts the customer brief into structured content
- Creates storyboards and shot lists
- Writes invitation copy and voice scripts
- Generates provider-specific prompts
- Validates the Wedding Manifest
- Checks required content and publishing rules

### ChatGPT Image 2

Acts as the identity authority for:

- Couple character bible
- Faces and body proportions
- Expressions and poses
- Event outfit sheets
- Character-containing scene layers
- Portrait and fallback assets

### Nano Banana

Creates:

- Palaces and environments
- Mandaps and event backgrounds
- Decorative foreground layers
- Props, textures, and ornaments
- Posters and share artwork
- Character-free fallback scenes

### Veo

Creates short optional motion assets:

- Palace reveal bridge
- Couple entrance
- Haldi petals
- Sangeet celebration
- Mandap reveal
- Reception finale

Use approved image keyframes, short shots, and human review. Veo clips enhance transitions but are never required for basic navigation.

### ElevenLabs

Creates:

- Royal narrator
- Couple narration
- Family welcome
- Blessings
- Multilingual chapter audio

Voice is generated before publication, requires consent when cloned, and always has text or captions.

### Omni or multimodal QA

Checks:

- Character similarity
- Outfit consistency
- Scene-style consistency
- Incorrect cultural details
- Broken hands, faces, jewellery, or text
- Video first, middle, and final frames
- Mobile composition and safe areas

### Hermes

Coordinates jobs, approvals, retries, provider adapters, cost limits, asset lineage, project states, and publishing gates.

---

## 9. Character Consistency

1. Collect approved couple reference photographs.
2. Generate canonical front, side, three-quarter, and full-body sheets.
3. Approve complexion, face, proportions, hair, and accessories.
4. Generate and approve one outfit sheet per event.
5. Lock approved character references.
6. Generate character layers with ChatGPT Image 2.
7. Generate environments separately where practical.
8. Composite characters into approved scenes.
9. Run multimodal consistency review.
10. Regenerate only the failed asset.

Do not ask different image models to independently recreate the couple.

---

## 10. Wedding Manifest Changes

The manifest should describe layered scenes rather than 3D models.

```json
{
  "experience": {
    "mode": "2.5d-cinematic",
    "runtime3d": false,
    "quickDetails": true,
    "reducedMotion": true
  },
  "scene": {
    "id": "wedding-mandap",
    "background": "asset_sky_sunset",
    "layers": [
      {
        "asset": "asset_palace_back",
        "depth": 0.15,
        "motion": "slow-pan"
      },
      {
        "asset": "asset_mandap_mid",
        "depth": 0.45,
        "motion": "rise-in"
      },
      {
        "asset": "asset_couple_wedding",
        "depth": 0.65,
        "motion": "character-reveal"
      },
      {
        "asset": "asset_flowers_front",
        "depth": 0.9,
        "motion": "foreground-parallax"
      }
    ],
    "voiceover": "audio_wedding_intro",
    "fallback": "asset_wedding_static"
  }
}
```

Each layer records:

- Responsive source assets
- Aspect ratio and focal point
- Depth value
- Motion preset
- Entrance and exit timing
- Safe-area behavior
- Approved version
- Fallback image

---

## 11. Frontend Stack

Recommended runtime:

- Next.js and React
- GSAP for timelines and controlled scroll motion
- CSS transforms, masks, gradients, and filters
- SVG for ornamental line animation
- Small Canvas component only for scratch effects or limited particles
- Native responsive images
- Native or lightweight video player
- Semantic HTML for content, controls, and RSVP

Runtime 3D libraries are not required.

### Scene implementation

- Each chapter is a reusable scene component.
- Layer configuration comes from the Wedding Manifest.
- Motion presets are reusable and versioned.
- Only the current and next chapter assets are prefetched.
- Off-screen timelines are paused or destroyed.
- Images use explicit dimensions to prevent layout shift.

---

## 12. Mobile Performance Budget

| Metric | Target |
|---|---:|
| Useful interface | Under 1.5 s on good 4G |
| Largest Contentful Paint | Under 2.5 s |
| Interaction response | Under 200 ms |
| Initial transfer | Approximately 1.5–3 MB |
| Core journey | Approximately 6–10 MB progressively loaded |
| Video | Loaded only after request |
| Layout shift | Under 0.1 |

Asset rules:

- AVIF first with WebP fallback
- Responsive image widths
- 512–1280 pixel layers depending on display role
- 1920 pixel assets only where visibly necessary
- Compressed transparent WebP/AVIF where supported
- Avoid large full-screen transparent PNGs
- Use sprite sheets or short compressed loops sparingly
- Lazy-load later chapters
- Prefetch only the next likely chapter
- Pause videos and timelines when hidden
- Load fonts selectively

### Device tiers

**Enhanced:** full parallax, particles, and optional short transition clips.
**Standard:** fewer layers, lower image resolution, and reduced particles.
**Lite:** static chapter images with simple fades and full HTML functionality.

---

## 13. Builder Changes

The customer builder remains guided and includes:

```text
1. Wedding
2. Couple and Families
3. Style
4. Characters
5. Events
6. Scene Layers
7. Photos and Films
8. Voice and Music
9. Venue, Hotels, and Travel
10. Guests
11. RSVP
12. Mobile Preview
13. Publish
```

Customers configure scene recipes rather than positioning layers manually.

Example scene options:

- Palace entrance
- Royal courtyard
- Garden pavilion
- Sangeet stage
- Mandap
- Reception terrace

Each recipe exposes controlled choices for palette, architecture, characters, outfit, lighting, motion intensity, foreground ornament, and optional video transition.

---

## 14. Accessibility

- All information exists in HTML.
- Touch targets are at least 44 by 44 CSS pixels.
- Audio is optional.
- Voice has captions or visible equivalent text.
- Videos have captions.
- Reduced motion removes parallax and particles.
- Scratch and hold gestures have button alternatives.
- Keyboard navigation works on desktop.
- Forms use labels, instructions, and inline errors.
- Text contrast is verified over every background.
- Decorative layers are hidden from screen readers.

---

## 15. Privacy and Consent

Record explicit permission for:

- Couple likeness generation
- Uploaded photographs
- Voice cloning
- Family photographs or voices
- Venue and photographer media
- Music usage
- Guest personalization

No unnecessary guest information is sent to media-generation providers. Identity and voice assets remain restricted to the authorized project and retention policy.

---

## 16. MVP Scope

1. One stable mobile runtime
2. Wedding Manifest with layered-scene schema
3. One Royal Rajasthan style pack
4. Loader and seal interaction
5. Palace entrance
6. Couple introduction
7. Three configurable event scenes
8. Character-bible and outfit approval
9. Layered image generation and review
10. Optional short Veo transitions
11. ElevenLabs narration
12. Gallery and film
13. Venue, hotels, travel, maps, and calendar
14. Guest personalization and RSVP
15. Enhanced, standard, and lite quality modes
16. Preview, approval, publish, and rollback
17. Mobile performance and accessibility verification

---

## 17. Acceptance Criteria

### Experience

- The complete invitation works without WebGL or 3D models.
- Every scene is configurable from the manifest.
- The invitation feels dimensional through composition and motion.
- Quick Details and RSVP remain immediately accessible.
- Motion can be skipped or reduced.

### Performance

- The first useful interface meets the mobile target.
- Mid-range Android phones scroll and animate smoothly.
- Later chapters load progressively.
- Video is not downloaded automatically.
- Hidden animation and audio pause.
- Lite mode preserves every essential feature.

### Customization

- Couple identity and outfits remain consistent.
- Events, hotels, venues, narration, and guest rules are replaceable per project.
- One asset can be regenerated without affecting approved assets.
- New weddings require no runtime code changes.

### Accessibility and reliability

- Essential information works without motion, audio, canvas, or gesture-only controls.
- RSVP is semantic, secure, and editable where configured.
- Published releases are immutable and reversible.
- Every media asset has ownership, version, and approval metadata.

---

## 18. Final Rule

> Build cinematic depth, not runtime 3D complexity.

The product should feel rich and personal because of excellent character consistency, layered art direction, controlled movement, sound, storytelling, hospitality information, and guest personalization. Runtime 3D can remain an optional future experiment, not a requirement for the initial platform.