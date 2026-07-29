import type { EventSlug } from "@/lib/manifest/types";

export type RsvpState = "attending" | "not-attending" | "undecided" | "pending";

/**
 * Full guest record. Stored server-side only — it carries room, pickup and
 * table allocations which must never reach another guest (spec §36, §43, §60).
 */
export interface GuestRecord {
  token: string;
  displayName: string;
  greetingName: string;
  language: string;
  partyLimit: number;
  /** Visibility rules this guest has been granted (spec §56). */
  visibilityRules: string[];
  rsvp: Partial<Record<EventSlug, RsvpState>>;
  privateMessage?: string;
  assignments?: {
    hotelName?: string;
    checkIn?: string;
    checkOut?: string;
    /** Deliberately not exposed to the main page. */
    roomNumber?: string;
    pickupPoint?: string;
    vehicle?: string;
    tableName?: string;
  };
}

/**
 * The sanitised projection handed to the page and its client components.
 * Sensitive allocations are stripped during resolution.
 */
export interface GuestContext {
  /** False for the public/shared link. */
  isPersonalised: boolean;
  greetingName?: string;
  language: string;
  partyLimit?: number;
  eligibleEventSlugs: EventSlug[];
  rsvp: {
    invitedCount: number;
    respondedCount: number;
    pendingCount: number;
    byEvent: Partial<Record<EventSlug, RsvpState>>;
    /** "not-started" | "in-progress" | "complete" */
    overall: "not-started" | "in-progress" | "complete";
  };
  stay?: {
    hotelName: string;
    checkIn?: string;
    /** True when private details exist behind the secure guest page. */
    hasPrivateDetails: boolean;
  };
  privateMessage?: string;
}
