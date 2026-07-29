import type { GuestContext } from "@/lib/guest/types";
import type { WeddingEvent, WeddingManifest } from "@/lib/manifest/types";

/**
 * Everything a main-page section needs. Resolved once on the server so no
 * section re-derives guest eligibility or event ordering.
 */
export interface JourneyContext {
  manifest: WeddingManifest;
  guest: GuestContext;
  /** Events this guest may see, in true chronological order. */
  events: WeddingEvent[];
  /** Count of events hidden from this guest, for an honest note. */
  hiddenEventCount: number;
  nextEvent: WeddingEvent | null;
  /** Rendered on the server; sections must not call Date.now() themselves. */
  now: Date;
}
