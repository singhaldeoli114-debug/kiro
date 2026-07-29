"use client";

import { Icons } from "@/components/art/Glyph";
import { downloadIcs, type CalendarEvent } from "@/lib/ics";

/**
 * Generates the .ics file in the browser so the page keeps working on static
 * hosting. Each entry carries the wedding timezone, the venue address and a
 * stable UID so re-downloading updates the existing entry (spec §21, §33).
 */
export function AddToCalendarButton({
  events,
  filename,
  label = "Add to calendar",
  productName,
  variant = "outline",
  className = "",
}: {
  events: CalendarEvent[];
  filename: string;
  label?: string;
  productName?: string;
  variant?: "outline" | "quiet";
  className?: string;
}) {
  if (!events.length) return null;

  const styles =
    variant === "quiet"
      ? "text-crimson underline decoration-gold/60 underline-offset-4 hover:decoration-crimson"
      : "border border-gold/70 px-5 py-3 text-ink hover:bg-gold-pale/60";

  return (
    <button
      type="button"
      onClick={() => downloadIcs(filename, events, productName)}
      className={`tap-target inline-flex items-center justify-center gap-2 text-[0.8125rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${styles} ${className}`}
    >
      <Icons.calendar className="h-4 w-4" />
      {label}
    </button>
  );
}
