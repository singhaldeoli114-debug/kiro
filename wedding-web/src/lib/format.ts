import type { LocalisedDateTime } from "@/lib/manifest/types";

/**
 * All formatting pins an explicit IANA timezone so that the server render and
 * the browser render agree, and so guests in other countries still read the
 * wedding's local time (spec §21).
 */
function fmt(iso: string, timezone: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-IN", { ...options, timeZone: timezone }).format(
    new Date(iso),
  );
}

export function formatDay(iso: string, timezone: string) {
  return fmt(iso, timezone, { weekday: "long", day: "numeric", month: "long" });
}

export function formatShortDay(iso: string, timezone: string) {
  return fmt(iso, timezone, { day: "numeric", month: "short" });
}

export function formatWeekday(iso: string, timezone: string) {
  return fmt(iso, timezone, { weekday: "short" });
}

export function formatDayNumber(iso: string, timezone: string) {
  return fmt(iso, timezone, { day: "2-digit" });
}

export function formatMonth(iso: string, timezone: string) {
  return fmt(iso, timezone, { month: "short" });
}

export function formatTime(iso: string, timezone: string) {
  // en-IN gives "7:00 pm"; guests read "7:00 PM" faster.
  return fmt(iso, timezone, { hour: "numeric", minute: "2-digit", hour12: true }).replace(
    /\s*(am|pm)/i,
    (match) => ` ${match.trim().toUpperCase()}`,
  );
}

export function formatFullDate(iso: string, timezone: string) {
  return fmt(iso, timezone, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateRange(range: LocalisedDateTime) {
  const { start, end, timezone } = range;
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  if (!endDate) return formatFullDate(start, timezone);

  const sameMonth =
    fmt(start, timezone, { month: "long", year: "numeric" }) ===
    fmt(end!, timezone, { month: "long", year: "numeric" });

  if (sameMonth) {
    return `${fmt(start, timezone, { day: "numeric" })}–${fmt(end!, timezone, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;
  }

  void startDate;
  return `${fmt(start, timezone, { day: "numeric", month: "long" })} – ${fmt(end!, timezone, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

export function formatDeadline(iso: string, timezone: string) {
  return fmt(iso, timezone, { day: "numeric", month: "long", year: "numeric" });
}

/** Google Maps deep link that works on both mobile and desktop. */
export function googleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Apple Maps deep link (spec §26). */
export function appleMapsUrl(query: string) {
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}
