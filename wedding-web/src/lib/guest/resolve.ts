import "server-only";

import type { GuestContext, GuestRecord, RsvpState } from "@/lib/guest/types";
import type { EventSlug, WeddingEvent, WeddingManifest } from "@/lib/manifest/types";

/** Rule granted to every guest, used for openly invited events. */
export const PUBLIC_RULE = "event_public";

/**
 * Server-side eligibility check. Guest event access is enforced here and never
 * inferred in the browser, so private ceremonies are not merely hidden with
 * CSS (spec §60).
 */
export function canGuestSeeEvent(event: WeddingEvent, rules: string[]): boolean {
  if (event.guestVisibilityRule === PUBLIC_RULE) return true;
  return rules.includes(event.guestVisibilityRule);
}

export function eligibleEvents(
  manifest: WeddingManifest,
  guest: GuestRecord | null,
): WeddingEvent[] {
  const rules = guest?.visibilityRules ?? [];
  return manifest.events
    .filter((event) => canGuestSeeEvent(event, rules))
    .sort(
      (a, b) =>
        new Date(a.dateTime.start).getTime() - new Date(b.dateTime.start).getTime(),
    );
}

/**
 * Projects a guest record onto the safe context consumed by the page.
 * Room numbers, pickup vehicles and table allocations are dropped: the main
 * page only ever states that private details exist.
 */
export function resolveGuestContext(
  manifest: WeddingManifest,
  guest: GuestRecord | null,
): GuestContext {
  const events = eligibleEvents(manifest, guest);
  const rsvpEvents = events.filter((event) => event.rsvp.enabled && event.state !== "cancelled");

  const byEvent: Partial<Record<EventSlug, RsvpState>> = {};
  for (const event of rsvpEvents) {
    byEvent[event.slug] = guest?.rsvp?.[event.slug] ?? "pending";
  }

  const states = Object.values(byEvent) as RsvpState[];
  const respondedCount = states.filter((state) => state !== "pending").length;
  const pendingCount = states.length - respondedCount;

  const overall =
    respondedCount === 0 ? "not-started" : pendingCount === 0 ? "complete" : "in-progress";

  const assignments = guest?.assignments;

  return {
    isPersonalised: Boolean(guest),
    greetingName: guest?.greetingName,
    language: guest?.language ?? manifest.experience.languages[0]?.code ?? "en",
    partyLimit: guest?.partyLimit,
    eligibleEventSlugs: events.map((event) => event.slug),
    rsvp: {
      invitedCount: rsvpEvents.length,
      respondedCount,
      pendingCount,
      byEvent,
      overall,
    },
    stay: assignments?.hotelName
      ? {
          hotelName: assignments.hotelName,
          checkIn: assignments.checkIn,
          hasPrivateDetails: Boolean(
            assignments.roomNumber || assignments.pickupPoint || assignments.tableName,
          ),
        }
      : undefined,
    privateMessage: guest?.privateMessage,
  };
}
