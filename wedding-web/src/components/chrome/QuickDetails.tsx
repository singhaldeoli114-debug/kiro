"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icons } from "@/components/art/Glyph";
import { FloralDivider } from "@/components/art/Monogram";
import type { QuickDetailsData } from "@/components/chrome/types";
import { downloadIcs } from "@/lib/ics";

/**
 * Persistent, unobtrusive Quick Details control (spec §3.5).
 *
 * A single pill button — deliberately not a bar of tabs — opens a lightweight
 * overlay with the next event, its date, time, venue, dress code, the guest's
 * RSVP state, directions and the coordinator. It adds utility without changing
 * the website structure.
 */
export function QuickDetails({ data }: { data: QuickDetailsData }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelId = useId();

  // The button appears once the guest has moved past the opening scene, so it
  // never covers the first impression.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const addAllToCalendar = useCallback(() => {
    if (!data.allEventsCalendar.length) return;
    downloadIcs(data.calendarFilename, data.allEventsCalendar, data.coupleNames);
  }, [data]);

  const addNextToCalendar = useCallback(() => {
    if (!data.nextEvent) return;
    downloadIcs(
      `${data.nextEvent.name.toLowerCase().replace(/\s+/g, "-")}`,
      [data.nextEvent.calendar],
      data.coupleNames,
    );
  }, [data]);

  const next = data.nextEvent;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`tap-target fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-gold/60 bg-ivory/95 px-4 py-2.5 text-[0.75rem] font-medium tracking-[0.12em] text-ink uppercase shadow-lg backdrop-blur transition-all duration-300 hover:border-gold ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <Icons.info className="h-4 w-4 text-crimson" />
        Quick details
      </button>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-250 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
        >
          <span className="sr-only">Close quick details</span>
        </button>

        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal={open}
          aria-label="Quick details"
          className={`absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl border-t border-gold/40 bg-ivory shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[26rem] sm:rounded-2xl sm:border ${
            open ? "translate-y-0" : "translate-y-full sm:translate-y-6"
          }`}
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-start justify-between gap-3 px-5 pt-5">
            <div>
              <p className="eyebrow">Quick details</p>
              <p className="mt-1 font-display text-[1.5rem] leading-tight">{data.coupleNames}</p>
              <p className="text-[0.8125rem] text-ink-soft">
                {data.dateRangeLabel} · {data.locationLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="tap-target -mr-2 flex items-center justify-center text-ink-soft hover:text-crimson"
            >
              <Icons.close />
              <span className="sr-only">Close quick details</span>
            </button>
          </div>

          <FloralDivider className="my-4" />

          <div className="px-5 pb-5">
            {next ? (
              <dl className="mb-4">
                <div className="mb-3">
                  <dt className="eyebrow mb-1">Next celebration</dt>
                  <dd className="font-display text-[1.375rem] leading-tight text-ink">{next.name}</dd>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[0.875rem]">
                  <div>
                    <dt className="eyebrow mb-0.5">When</dt>
                    <dd className="text-ink">
                      {next.dayLabel}
                      <br />
                      {next.timeLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-0.5">Where</dt>
                    <dd className="text-ink">
                      {next.venueName}
                      <br />
                      <span className="text-ink-muted">{next.venueLine}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-0.5">Dress code</dt>
                    <dd className="text-ink">{next.dressCode}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-0.5">Your RSVP</dt>
                    <dd className="text-ink">{data.rsvp.statusLabel}</dd>
                  </div>
                </div>
              </dl>
            ) : (
              <p className="mb-4 text-[0.9375rem] text-ink-soft">
                {data.afterAllEventsNote ?? "Every celebration has finished. Thank you for being there."}
              </p>
            )}

            <div className="grid gap-2">
              {next && (
                <a
                  href={next.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target flex items-center justify-center gap-2 bg-crimson px-4 py-3 text-[0.75rem] font-medium tracking-[0.12em] text-ivory uppercase hover:bg-crimson-deep"
                >
                  <Icons.map className="h-4 w-4" />
                  Directions
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}

              <div className="grid grid-cols-2 gap-2">
                {next && (
                  <button
                    type="button"
                    onClick={addNextToCalendar}
                    className="tap-target flex items-center justify-center gap-2 border border-gold/70 px-3 py-3 text-[0.6875rem] font-medium tracking-[0.1em] text-ink uppercase hover:bg-gold-pale/60"
                  >
                    <Icons.calendar className="h-4 w-4" />
                    Add this event
                  </button>
                )}
                <button
                  type="button"
                  onClick={addAllToCalendar}
                  className="tap-target flex items-center justify-center gap-2 border border-gold/70 px-3 py-3 text-[0.6875rem] font-medium tracking-[0.1em] text-ink uppercase hover:bg-gold-pale/60"
                >
                  <Icons.calendar className="h-4 w-4" />
                  All dates
                </button>
              </div>

              {data.rsvp.enabled && data.rsvp.href && (
                <a
                  href={data.rsvp.href}
                  onClick={() => setOpen(false)}
                  className="tap-target flex items-center justify-center gap-2 border border-gold/70 px-4 py-3 text-[0.6875rem] font-medium tracking-[0.1em] text-ink uppercase hover:bg-gold-pale/60"
                >
                  {data.rsvp.pendingCount > 0 ? "Respond now" : "Review your RSVP"}
                  <Icons.arrowRight className="h-4 w-4" />
                </a>
              )}
            </div>

            {data.coordinator && (
              <div className="mt-4 border-t border-sand/70 pt-4">
                <p className="eyebrow mb-1">{data.coordinator.role}</p>
                <p className="text-[0.9375rem] text-ink">{data.coordinator.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.coordinator.phone && (
                    <a
                      href={`tel:${data.coordinator.phone.replace(/[^+\d]/g, "")}`}
                      className="tap-target inline-flex items-center gap-1.5 text-[0.8125rem] text-crimson underline decoration-gold/60 underline-offset-4"
                    >
                      <Icons.phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                  {data.coordinator.whatsapp && (
                    <a
                      href={`https://wa.me/${data.coordinator.whatsapp.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target inline-flex items-center gap-1.5 text-[0.8125rem] text-crimson underline decoration-gold/60 underline-offset-4"
                    >
                      <Icons.whatsapp className="h-4 w-4" />
                      WhatsApp
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {data.rsvp.enabled && (
              <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-muted">
                Please respond by {data.rsvp.deadlineLabel}.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
