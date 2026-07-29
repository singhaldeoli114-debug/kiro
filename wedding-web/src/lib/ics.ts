/**
 * Minimal iCalendar writer.
 *
 * Calendar entries must carry the event timezone, the venue address, the
 * recommended arrival time and an update-safe identifier (spec §21). A
 * VTIMEZONE block is emitted from the offset in the source timestamp so the
 * entry stays correct for guests whose phone is set to another region.
 */

export interface CalendarEvent {
  /** Stable identifier so a re-download updates rather than duplicates. */
  uid: string;
  title: string;
  description?: string;
  location?: string;
  url?: string;
  /** ISO 8601 with offset, e.g. 2027-02-13T19:30:00+05:30 */
  start: string;
  end?: string;
  timezone: string;
  /** Minutes before start for the reminder, e.g. arrive 30 minutes early. */
  reminderMinutes?: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Local wall-clock stamp, i.e. the time as printed in the source string. */
function localStamp(iso: string): string | null {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return null;
  const [, y, m, d, hh, mm, ss] = match;
  return `${y}${m}${d}T${hh}${mm}${ss ?? "00"}`;
}

/** "+05:30" → "+0530" */
function offsetOf(iso: string): string | null {
  const match = iso.match(/([+-]\d{2}):?(\d{2})$/);
  if (!match) return null;
  return `${match[1]}${match[2]}`;
}

function utcStamp(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 asks for lines of 75 octets or fewer. */
function fold(line: string) {
  if (line.length <= 73) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 73));
  rest = rest.slice(73);
  while (rest.length) {
    parts.push(` ${rest.slice(0, 72)}`);
    rest = rest.slice(72);
  }
  return parts.join("\r\n");
}

export function buildIcs(events: CalendarEvent[], productName = "Wedding Journey"): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${productName}//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  const zones = new Map<string, string>();
  for (const event of events) {
    const offset = offsetOf(event.start);
    if (offset && !zones.has(event.timezone)) zones.set(event.timezone, offset);
  }

  for (const [tzid, offset] of zones) {
    lines.push(
      "BEGIN:VTIMEZONE",
      `TZID:${tzid}`,
      "BEGIN:STANDARD",
      "DTSTART:19700101T000000",
      `TZOFFSETFROM:${offset}`,
      `TZOFFSETTO:${offset}`,
      `TZNAME:${tzid}`,
      "END:STANDARD",
      "END:VTIMEZONE",
    );
  }

  const stamp = utcStamp(new Date());

  for (const event of events) {
    const startLocal = localStamp(event.start);
    const endLocal = event.end ? localStamp(event.end) : null;
    const useTz = Boolean(startLocal && offsetOf(event.start));

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${event.uid}`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push("SEQUENCE:0");

    if (useTz && startLocal) {
      lines.push(`DTSTART;TZID=${event.timezone}:${startLocal}`);
      if (endLocal) lines.push(`DTEND;TZID=${event.timezone}:${endLocal}`);
    } else {
      lines.push(`DTSTART:${utcStamp(new Date(event.start))}`);
      if (event.end) lines.push(`DTEND:${utcStamp(new Date(event.end))}`);
    }

    lines.push(fold(`SUMMARY:${escapeText(event.title)}`));
    if (event.location) lines.push(fold(`LOCATION:${escapeText(event.location)}`));
    if (event.description) lines.push(fold(`DESCRIPTION:${escapeText(event.description)}`));
    if (event.url) lines.push(fold(`URL:${event.url}`));

    if (event.reminderMinutes && event.reminderMinutes > 0) {
      lines.push(
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        fold(`DESCRIPTION:${escapeText(event.title)}`),
        `TRIGGER:-PT${event.reminderMinutes}M`,
        "END:VALARM",
      );
    }

    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

/** Triggers a download without a server round trip, so static hosting works. */
export function downloadIcs(filename: string, events: CalendarEvent[], productName?: string) {
  const blob = new Blob([buildIcs(events, productName)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Give Safari a moment before revoking.
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
