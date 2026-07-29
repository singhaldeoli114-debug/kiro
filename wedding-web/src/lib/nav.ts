import type { PageKey, PageState, WeddingManifest } from "@/lib/manifest/types";

/**
 * Navigation resolver.
 *
 * The product is a website, not an app made of tabs (spec §3, §65). Menu items
 * are ordinary links. Where a dedicated page is not yet published the link
 * resolves to the equivalent main-page section anchor, because the main page is
 * required to be complete on its own (spec §2.2). Pages that are `planned` or
 * `disabled` never appear as an outbound link (spec §2.1).
 */

export interface NavTarget {
  href: string;
  /** True when the link leaves the main page for a dedicated route. */
  isDedicatedPage: boolean;
}

export const SECTION_IDS = {
  welcome: "welcome",
  quickDetails: "quick-details",
  couple: "couple",
  events: "events",
  story: "story",
  families: "families",
  travel: "travel",
  gallery: "gallery",
  food: "food",
  rsvp: "rsvp",
  blessings: "blessings",
  help: "help",
  closing: "closing",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** Main-page anchor that carries the same information as each dedicated page. */
const PAGE_FALLBACK_ANCHOR: Record<PageKey, SectionId | null> = {
  events: SECTION_IDS.events,
  travel: SECTION_IDS.travel,
  gallery: SECTION_IDS.gallery,
  rsvp: SECTION_IDS.rsvp,
  blessings: SECTION_IDS.blessings,
  contact: SECTION_IDS.help,
  registry: null,
  upload: null,
  fun: null,
  guest: null,
};

const PAGE_PATH: Record<PageKey, string> = {
  events: "events",
  travel: "travel",
  gallery: "gallery",
  rsvp: "rsvp",
  blessings: "blessings",
  registry: "registry",
  upload: "upload",
  fun: "fun",
  guest: "guest",
  contact: "contact",
};

export function pageState(manifest: WeddingManifest, page: PageKey): PageState {
  return manifest.pages[page] ?? "disabled";
}

export function isPagePublished(manifest: WeddingManifest, page: PageKey): boolean {
  return pageState(manifest, page) === "enabled";
}

export function resolvePage(
  manifest: WeddingManifest,
  page: PageKey,
): NavTarget | null {
  if (isPagePublished(manifest, page)) {
    return { href: `/w/${manifest.slug}/${PAGE_PATH[page]}`, isDedicatedPage: true };
  }
  const anchor = PAGE_FALLBACK_ANCHOR[page];
  return anchor ? { href: `#${anchor}`, isDedicatedPage: false } : null;
}

export function resolveEventPage(
  manifest: WeddingManifest,
  eventSlug: string,
): NavTarget | null {
  if (!isPagePublished(manifest, "events")) return null;
  return { href: `/w/${manifest.slug}/events/${eventSlug}`, isDedicatedPage: true };
}

export interface MenuLink {
  label: string;
  href: string;
  isDedicatedPage: boolean;
}

/** Menu drawer contents in the order given by spec §3.2. */
export function buildMenu(manifest: WeddingManifest): MenuLink[] {
  const links: MenuLink[] = [
    { label: "Our Wedding", href: `#${SECTION_IDS.welcome}`, isDedicatedPage: false },
  ];

  const push = (label: string, page: PageKey) => {
    const target = resolvePage(manifest, page);
    if (target) links.push({ label, href: target.href, isDedicatedPage: target.isDedicatedPage });
  };

  push("Events", "events");
  links.push({ label: "Our Story", href: `#${SECTION_IDS.story}`, isDedicatedPage: false });
  links.push({ label: "Families", href: `#${SECTION_IDS.families}`, isDedicatedPage: false });
  push("Travel and Stay", "travel");
  push("Gallery", "gallery");
  if (manifest.rsvp.enabled) push("RSVP", "rsvp");
  push("Blessings", "blessings");
  push("Help", "contact");

  return links;
}

/** Compact "On This Page" list — anchor links, never a persistent tab bar. */
export function buildOnThisPage(manifest: WeddingManifest): MenuLink[] {
  const items: MenuLink[] = [
    { label: "Events", href: `#${SECTION_IDS.events}`, isDedicatedPage: false },
    { label: "Our Story", href: `#${SECTION_IDS.story}`, isDedicatedPage: false },
    { label: "Families", href: `#${SECTION_IDS.families}`, isDedicatedPage: false },
    { label: "Travel", href: `#${SECTION_IDS.travel}`, isDedicatedPage: false },
    { label: "Gallery", href: `#${SECTION_IDS.gallery}`, isDedicatedPage: false },
  ];
  if (manifest.rsvp.enabled) {
    items.push({ label: "RSVP", href: `#${SECTION_IDS.rsvp}`, isDedicatedPage: false });
  }
  items.push({ label: "Help", href: `#${SECTION_IDS.help}`, isDedicatedPage: false });
  return items;
}
