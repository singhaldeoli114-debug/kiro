import "server-only";

import type { GuestRecord } from "@/lib/guest/types";

/**
 * Guest records never reach the browser.
 *
 * `server-only` makes an accidental client import a build error, which is the
 * cheapest possible enforcement of spec §60: room, pickup and table data must
 * not be visible to other guests. In production this module is replaced by a
 * server-side lookup on an opaque, revocable token.
 */
export const aaravMeeraGuests: GuestRecord[] = [
  {
    token: "kapoor-7QP2X",
    displayName: "Kapoor Family",
    greetingName: "Kapoor Family",
    language: "en",
    partyLimit: 4,
    // No `event_haldi_family` rule: the Haldi is private and will not appear.
    visibilityRules: ["event_public"],
    rsvp: {
      engagement: "attending",
      mehndi: "attending",
      sangeet: "pending",
      wedding: "pending",
      reception: "pending",
    },
    privateMessage:
      "Aarav insists you are seated where he can see you during the pheras.",
    assignments: {
      hotelName: "Lake View Residency",
      checkIn: "10 February 2027",
      checkOut: "15 February 2027",
      roomNumber: "412",
      pickupPoint: "Maharana Pratap Airport, Gate 3",
      vehicle: "Innova RJ-27-AB-4410",
      tableName: "Table 6 — Pichola",
    },
  },
  {
    token: "iyer-4LM9B",
    displayName: "Iyer Family",
    greetingName: "Iyer Family",
    language: "en",
    partyLimit: 2,
    visibilityRules: ["event_public", "event_haldi_family"],
    rsvp: {
      engagement: "attending",
      haldi: "attending",
      mehndi: "attending",
      sangeet: "attending",
      wedding: "attending",
      reception: "attending",
    },
    assignments: {
      hotelName: "Amrit Haveli",
      checkIn: "10 February 2027",
      roomNumber: "7",
      tableName: "Table 2 — Sajjangarh",
    },
  },
];

export function findGuestByToken(token: string | undefined): GuestRecord | null {
  if (!token) return null;
  const normalised = token.trim();
  return aaravMeeraGuests.find((guest) => guest.token === normalised) ?? null;
}
