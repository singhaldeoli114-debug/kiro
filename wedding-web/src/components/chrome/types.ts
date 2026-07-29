import type { CalendarEvent } from "@/lib/ics";
import type { RsvpState } from "@/lib/guest/types";

/** Serializable props passed from the server page into the client chrome. */

export interface ChromeLink {
  label: string;
  href: string;
  isDedicatedPage: boolean;
}

export interface LanguageOption {
  code: string;
  label: string;
}

export interface AudioOption {
  src: string;
  transcript: string;
}

export interface HeaderData {
  monogram: string;
  coupleNames: string;
  dateLabel: string;
  menu: ChromeLink[];
  languages: LanguageOption[];
  audio: AudioOption | null;
}

export interface QuickDetailsNextEvent {
  name: string;
  dayLabel: string;
  timeLabel: string;
  venueName: string;
  venueLine: string;
  mapsUrl: string;
  dressCode: string;
  rsvpState: RsvpState | null;
  calendar: CalendarEvent;
}

export interface QuickDetailsData {
  coupleNames: string;
  dateRangeLabel: string;
  locationLabel: string;
  nextEvent: QuickDetailsNextEvent | null;
  /** Present when the guest is eligible for no further events. */
  afterAllEventsNote: string | null;
  rsvp: {
    enabled: boolean;
    deadlineLabel: string;
    statusLabel: string;
    href: string | null;
    pendingCount: number;
  };
  coordinator: {
    role: string;
    name: string;
    phone?: string;
    whatsapp?: string;
  } | null;
  /** Every event the guest may see, for the whole-wedding calendar file. */
  allEventsCalendar: CalendarEvent[];
  calendarFilename: string;
}
