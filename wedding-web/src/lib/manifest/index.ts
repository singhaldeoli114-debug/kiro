import { aaravMeera } from "@/data/weddings/aarav-meera";
import type {
  ContentStatus,
  ImageAsset,
  WeddingEvent,
  WeddingManifest,
  Venue,
} from "@/lib/manifest/types";
import { PUBLISHABLE } from "@/lib/manifest/types";

const MANIFESTS: Record<string, WeddingManifest> = {
  [aaravMeera.slug]: aaravMeera,
};

/** The wedding shown at the site root. */
export const DEFAULT_WEDDING_SLUG = aaravMeera.slug;

export function listWeddingSlugs(): string[] {
  return Object.keys(MANIFESTS);
}

export function getWedding(slug: string): WeddingManifest | null {
  return MANIFESTS[slug] ?? null;
}

/** Publishing gate — unapproved content is never rendered (spec §57). */
export function isPublishable(status: ContentStatus): boolean {
  return PUBLISHABLE.includes(status);
}

export function publishable<T extends { status: ContentStatus }>(items: T[]): T[] {
  return items.filter((item) => isPublishable(item.status));
}

export function coupleNames(manifest: WeddingManifest): string {
  const { partnerOne, partnerTwo } = manifest.couple;
  return `${partnerOne.firstName} and ${partnerTwo.firstName}`;
}

export function coupleFullNames(manifest: WeddingManifest): string {
  const { partnerOne, partnerTwo } = manifest.couple;
  return `${partnerOne.firstName} ${partnerOne.lastName} and ${partnerTwo.firstName} ${partnerTwo.lastName}`;
}

export function findVenue(manifest: WeddingManifest, venueId: string): Venue | null {
  return manifest.venues.find((venue) => venue.id === venueId) ?? null;
}

export function mainVenue(manifest: WeddingManifest): Venue | null {
  return findVenue(manifest, manifest.wedding.mainVenueId);
}

export function venueForEvent(manifest: WeddingManifest, event: WeddingEvent): Venue | null {
  return findVenue(manifest, event.inheritMainVenue ? manifest.wedding.mainVenueId : event.venueId);
}

/** True when an image has an approved bitmap; otherwise vector art is drawn. */
export function hasBitmap(asset: ImageAsset): boolean {
  return Boolean(asset.src) && isPublishable(asset.status);
}

/**
 * The next event a guest is actually eligible for, relative to `now`.
 * An event stays "next" until it has finished, so guests who open the page
 * mid-ceremony still see the right thing (spec §7, §28).
 */
export function nextEventForGuest(
  events: WeddingEvent[],
  now: Date = new Date(),
): WeddingEvent | null {
  const upcoming = events
    .filter((event) => event.state !== "cancelled")
    .filter((event) => {
      const finish = new Date(event.dateTime.end ?? event.dateTime.start).getTime();
      return finish >= now.getTime();
    });
  return upcoming[0] ?? null;
}
