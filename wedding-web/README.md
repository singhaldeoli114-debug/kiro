# Wedding Journey — main page

Implementation of the **Main Wedding Journey** page from
[`mobile_first_wedding_pages_personalization_spec.md`](../mobile_first_wedding_pages_personalization_spec.md),
built on the runtime chosen in
[`mobile_first_2_5d_wedding_platform.md`](../mobile_first_2_5d_wedding_platform.md)
(Next.js + React, GSAP, layered 2.5D artwork, no runtime WebGL).

**Scope of this phase: the main page only.** No event pages, travel page, RSVP
page, gallery page, blessing wall, registry, upload, fun page, secure guest page
or contact page have been built.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000  → redirects to /w/aarav-meera
npm run build
```

| URL | What it shows |
| --- | --- |
| `/w/aarav-meera` | The public/shared view — no guest personalisation |
| `/w/aarav-meera?g=kapoor-7QP2X` | A guest **not** invited to the private Haldi, with responses outstanding |
| `/w/aarav-meera?g=iyer-4LM9B` | A guest invited to everything, fully responded |

## What is on the page

All fourteen blocks from §5 of the spec, in that order:

1. Personalised Welcome · 2. Quick Details · 3. Couple Introduction ·
4. Wedding Events · 5. Our Story · 6. Family Introductions · 7. Travel and Stay ·
8. Gallery Preview · 9. Food and Dietary · 10. RSVP · 11. Blessings Preview ·
12. Help and Coordinators · 13. Closing · 14. Footer

Plus the site chrome: minimal header, full-height menu drawer, the persistent
Quick Details overlay and the complete footer. **No bottom tab bar, no content
tabs, no hidden tab panels** — the whole page is one vertical narrative of
ordinary links (§3, §65).

## How it is put together

```
src/
  app/w/[weddingSlug]/page.tsx   Server component: resolves guest, composes sections
  data/weddings/*.ts             The Wedding Manifest (+ a server-only guest file)
  lib/manifest/                  Manifest schema, publishing gate, lookups
  lib/guest/                     Guest record → sanitised guest context
  lib/nav.ts                     Menu + link resolution against page feature flags
  lib/format.ts lib/ics.ts       Timezone-pinned formatting, iCalendar writer
  components/sections/           One component per numbered section
  components/chrome/             Header, menu, Quick Details, footer, countdown
  components/art/                Layered 2.5D vector scenes, tile art, icons
  components/motion/             GSAP controller + guest motion preference
```

A few decisions worth knowing about:

**Nothing is hardcoded into a section.** Every string, date, venue, dress code,
palette, contact and image slot is read from the manifest, so a second wedding
needs a new data file and no code changes (§64).

**Guest rules are enforced on the server.** The guest file is marked
`server-only`, so importing it into a client component is a build error. Event
eligibility is filtered before render, and the sanitised context passed to
client components deliberately omits room numbers, drivers and table
allocations — the page only ever says that private details exist (§43, §60).
The Haldi in the reference manifest is a private ceremony, which is why it
disappears entirely on the anonymous and Kapoor views.

**Links never dangle.** Every dedicated route is marked `planned` in the
manifest, so the navigation resolver points menu entries at the equivalent
main-page anchor and suppresses "View Event" / "Plan your stay" style CTAs
altogether (§2.1). Where an action genuinely matters — RSVP, blessings — the
section falls back to the coordinator's phone and WhatsApp instead of a dead
button. Flip a page to `enabled` and the real links appear with no other edits.

**Unapproved content is not published.** Content blocks carry a status, and
`approved`/`published` are the only ones rendered. That is why there is no
sound control (the ambient track is a draft), no language switcher (Hindi is
unreviewed), no couple voice player, no highlight reel, and no menus — dietary
assurances are shown instead of invented dishes (§14, §57).

**Artwork is vector, for now.** No approved bitmaps exist yet, so each image
slot draws a layered SVG scene with the composition and depth ordering of the
final asset. When a manifest asset gains an approved `src`, `SceneImage` swaps
the bitmap in and the vector art becomes its static fallback. Small squares use
flat tile art rather than five-layer scenes, which is what keeps the document
near 50 KB gzipped.

**Motion is additive.** Sections declare intent with `data-reveal`,
`data-parallax` and `data-hero-layer`; one client controller wires up GSAP
ScrollTrigger. The hero copy is the exception — it is revealed with CSS
keyframes, so the couple's names never wait on a JavaScript frame. With
JavaScript off, or with `prefers-reduced-motion`, or with the footer's "Reduce
motion" control, every word is still there; only transforms and opacity are
animated, and nothing hijacks the scroll (§54).

**Calendar entries are real.** `lib/ics.ts` writes a VTIMEZONE block from the
event offset and emits `DTSTART;TZID=Asia/Kolkata:…` with a stable UID, so a
re-download updates the entry instead of duplicating it, and the time is right
for a guest whose phone is set to another country (§21). Files are generated in
the browser, so this works on static hosting.

## Known gaps

- `/i/{guestToken}` is not built; the token is read from `?g=` on the server.
  Production should exchange it for an HttpOnly cookie.
- The guest lookup is an in-repo fixture, not a database.
- Language selection renders only when more than one language is approved, so
  the control is currently hidden and no translated copy exists.
- Image slots draw vector art; no approved photography or AI stills exist yet.
- No automated tests. Verification so far: `tsc`, ESLint, a production build,
  rendered-HTML checks (section order, private-event filtering, no dead links,
  no private allocations in the payload), an iCalendar output check, and
  headless-browser screenshots at 390x844 including a reduced-motion pass.
