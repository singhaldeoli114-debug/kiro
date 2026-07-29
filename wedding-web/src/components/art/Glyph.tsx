import type { EventGlyph } from "@/lib/manifest/types";

/**
 * One icon family shared by the main page and every future event page
 * (spec §55). All glyphs are decorative — the adjacent text carries meaning.
 */

interface GlyphProps {
  className?: string;
}

function Base({ children, className = "" }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ---------- Event glyphs (spec §20) ---------- */

const EVENT_GLYPHS: Record<EventGlyph, (props: GlyphProps) => React.ReactElement> = {
  ring: (p) => (
    <Base {...p}>
      <circle cx="12" cy="15" r="5.5" />
      <path d="M9.4 7.6 12 4l2.6 3.6" />
      <path d="M9.4 7.6h5.2" />
    </Base>
  ),
  turmeric: (p) => (
    <Base {...p}>
      <path d="M5 12h14a7 7 0 0 1-7 7 7 7 0 0 1-7-7Z" />
      <path d="M3.5 12h17" />
      <path d="M12 9V6.5" />
      <path d="M9 9.5c0-2 1.3-3 3-3s3 1 3 3" />
      <path d="M8.5 4.5v.01M15.5 4.5v.01" />
    </Base>
  ),
  henna: (p) => (
    <Base {...p}>
      <path d="M12 21c0-5 3-8 7-9-4-1-7-4-7-9-0 5-3 8-7 9 4 1 7 4 7 9Z" />
      <circle cx="12" cy="12" r="1.2" />
    </Base>
  ),
  music: (p) => (
    <Base {...p}>
      <circle cx="7" cy="17" r="2.6" />
      <circle cx="18" cy="15" r="2.6" />
      <path d="M9.6 17V6.5l11-2v10.5" />
      <path d="M9.6 9.5l11-2" />
    </Base>
  ),
  fire: (p) => (
    <Base {...p}>
      <path d="M12 21c3.3 0 5.5-2.2 5.5-5 0-4-4-5.5-3-9.5-3 1-5 3.6-5 6 0-1-.6-2-1.6-2.6-1 1.3-1.4 3-1.4 4.4 0 3.4 2.2 6.7 5.5 6.7Z" />
      <path d="M12 21c-1.6 0-2.6-1.2-2.6-2.6 0-1.7 1.6-2.4 2.6-4.4 1 2 2.6 2.7 2.6 4.4 0 1.4-1 2.6-2.6 2.6Z" />
    </Base>
  ),
  lights: (p) => (
    <Base {...p}>
      <path d="M2.5 5.5c3.5 3 6.5 3 9.5 0 3 3 6 3 9.5 0" />
      <path d="M6 7.5v2.2M12 5.8V8M18 7.5v2.2" />
      <path d="M6 9.7a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM12 8a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 12 8ZM18 9.7a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" />
      <path d="M4 19h16" />
    </Base>
  ),
};

export function EventGlyphIcon({ glyph, className }: { glyph: EventGlyph; className?: string }) {
  const Icon = EVENT_GLYPHS[glyph] ?? EVENT_GLYPHS.ring;
  return <Icon className={className} />;
}

/* ---------- Utility glyphs ---------- */

export const Icons = {
  menu: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  ),
  close: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  ),
  soundOn: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M4 10v4h3l4 3V7L7 10H4Z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" />
    </Base>
  ),
  soundOff: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M4 10v4h3l4 3V7L7 10H4Z" />
      <path d="M15 10l4 4M19 10l-4 4" />
    </Base>
  ),
  map: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </Base>
  ),
  calendar: (p: GlyphProps) => (
    <Base {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3.5V6M16 3.5V6" />
    </Base>
  ),
  phone: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M5.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3.5 5.7 2 2 0 0 1 5.5 3.5Z" />
    </Base>
  ),
  whatsapp: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M3.8 20.2l1.3-4a8 8 0 1 1 3 2.9l-4.3 1.1Z" />
      <path d="M9 9.4c0 3 2.6 5.6 5.6 5.6.7 0 1.2-.6 1.2-1.2l-1.8-.8-.9 1a6 6 0 0 1-2.5-2.5l1-.9-.8-1.8c-.6 0-1.2.5-1.2 1.2Z" />
    </Base>
  ),
  mail: (p: GlyphProps) => (
    <Base {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.6 6.6 12 13l8.4-6.4" />
    </Base>
  ),
  clock: (p: GlyphProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  ),
  arrowRight: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" />
    </Base>
  ),
  arrowUp: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M12 20V5M6.5 10.5 12 5l5.5 5.5" />
    </Base>
  ),
  check: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M5 12.5 9.5 17 19 7" />
    </Base>
  ),
  info: (p: GlyphProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.01" />
    </Base>
  ),
  leaf: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M5 19c0-7 4.5-12 14-13 1 9.5-5 14-14 13Z" />
      <path d="M5 19c3.5-3.5 6.5-6 11-8" />
    </Base>
  ),
  quote: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M9.5 6.5C7 8 5.5 10.2 5.5 13v4.5H10V12H8c0-2 .6-3.4 2.2-4.4ZM18 6.5C15.5 8 14 10.2 14 13v4.5h4.5V12h-2c0-2 .6-3.4 2.2-4.4Z" />
    </Base>
  ),
  chevronDown: (p: GlyphProps) => (
    <Base {...p}>
      <path d="M6 9.5 12 15.5 18 9.5" />
    </Base>
  ),
};
