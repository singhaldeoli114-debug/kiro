# Static preview

Two self-contained HTML files, generated from the production build so the page
can be reviewed in a browser without installing anything. The stylesheet and the
Latin webfont subsets are inlined, so there are no external requests.

- `guest-view.html` — the Kapoor Family view: personalised greeting, per-event
  RSVP state, assigned hotel, and the private Haldi filtered out.
- `public-view.html` — the shared-link view, with no guest personalisation.

**These are snapshots, not the app.** Scrolling, layout, typography and every
word of copy are real. The menu drawer, the Quick Details overlay, the countdown
and the scroll parallax are React and GSAP, so they only work against the local
server (`npm install`, then the `dev` script).

To regenerate after changing the page: run the `build` script, start the server,
save the rendered HTML for both URLs, inline the emitted stylesheet plus the
`-s.p.` font files as data URIs, and strip the `<script>` and `<link rel=preload>`
tags.
