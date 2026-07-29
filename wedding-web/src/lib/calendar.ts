import { venueForEvent } from "@/lib/manifest";
import type { WeddingEvent, WeddingManifest } from "@/lib/manifest/types";
import type { CalendarEvent } from "@/lib/ics";

/** Recommended arrival buffer used for the calendar reminder (spec §33). */
const ARRIVE_EARLY_MINUTES = 30;

export function eventToCalendar(
  manifest: WeddingManifest,
  event: WeddingEvent,
): CalendarEvent {
  const venue = venueForEvent(manifest, event);

  // Address lines often restate the venue name; a calendar entry reading
  // "Chandni Terrace, Jal Mahal, Chandni Terrace, Jal Mahal Palace Grounds"
  // looks broken on a phone, so overlapping lines are dropped.
  const addressLines = venue
    ? venue.addressLines.filter((line) => {
        const a = line.toLowerCase();
        const b = venue.name.toLowerCase();
        return !a.includes(b) && !b.includes(a);
      })
    : [];

  const location = venue
    ? [venue.name, ...addressLines, venue.city].join(", ")
    : manifest.wedding.city;

  const coordinator = manifest.coordinators[0];

  const description = [
    event.meaning,
    `Dress code: ${event.dressCode.name} — ${event.dressCode.description}`,
    `Please arrive about ${ARRIVE_EARLY_MINUTES} minutes early.`,
    coordinator ? `${coordinator.role}: ${coordinator.name}${coordinator.phone ? ` (${coordinator.phone})` : ""}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    // Update-safe identifier: re-downloading replaces rather than duplicates.
    uid: `${event.slug}.${manifest.slug}.${manifest.version}@wedding-journey`,
    title: `${event.name} — ${manifest.couple.partnerOne.firstName} & ${manifest.couple.partnerTwo.firstName}`,
    description,
    location,
    start: event.dateTime.start,
    end: event.dateTime.end,
    timezone: event.dateTime.timezone,
    reminderMinutes: ARRIVE_EARLY_MINUTES,
  };
}

/** One entry per event the guest is eligible for. */
export function calendarForGuest(
  manifest: WeddingManifest,
  events: WeddingEvent[],
): CalendarEvent[] {
  return events
    .filter((event) => event.state !== "cancelled")
    .map((event) => eventToCalendar(manifest, event));
}

export function calendarFilename(manifest: WeddingManifest): string {
  return `${manifest.slug}-celebrations`;
}
