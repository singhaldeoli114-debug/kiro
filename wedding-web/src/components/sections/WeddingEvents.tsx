import { EventGlyphIcon, Icons } from "@/components/art/Glyph";
import { AddToCalendarButton } from "@/components/chrome/AddToCalendarButton";
import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, Chip, RsvpBadge, Section } from "@/components/ui/primitives";
import { SceneImage } from "@/components/ui/SceneImage";
import { eventToCalendar } from "@/lib/calendar";
import {
  formatDayNumber,
  formatMonth,
  formatTime,
  formatWeekday,
  googleMapsUrl,
} from "@/lib/format";
import { venueForEvent } from "@/lib/manifest";
import { SECTION_IDS, resolveEventPage, isPagePublished } from "@/lib/nav";
import type { WeddingEvent } from "@/lib/manifest/types";

/**
 * 04 — Wedding Events (spec §9).
 *
 * A chronological vertical timeline, not a set of navigation tabs. Only the
 * events this guest is eligible for appear; ceremonies they were not invited to
 * are absent entirely rather than greyed out, and no count of hidden events is
 * shown, because that would itself reveal a private ceremony.
 *
 * Dedicated event pages are not published yet, so each card carries the full
 * practical detail inline. The main page must be complete on its own
 * (spec §2.2).
 */
export function WeddingEvents({ journey }: { journey: JourneyContext }) {
  const { manifest, guest, events, now } = journey;
  const eventsPagePublished = isPagePublished(manifest, "events");

  return (
    <Section
      id={SECTION_IDS.events}
      eyebrow="The celebrations"
      title="Four days, in order"
      intro={
        guest.isPersonalised
          ? "These are the celebrations you are invited to, with everything you need for each one."
          : "The full run of celebrations. Your personal invitation link shows which of these are yours."
      }
    >
      <ol className="relative" data-draw-scope>
        {/* Timeline spine. Decorative; the list itself conveys the order. */}
        <span
          aria-hidden="true"
          data-draw
          className="absolute left-[1.4375rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold/70 via-gold/40 to-transparent sm:block"
        />

        {events.map((event, index) => (
          <EventCard
            key={event.slug}
            event={event}
            journey={journey}
            index={index}
            eventsPagePublished={eventsPagePublished}
            hasFinished={
              new Date(event.dateTime.end ?? event.dateTime.start).getTime() < now.getTime()
            }
          />
        ))}
      </ol>

      {!events.length && (
        <p className="text-[0.9375rem] text-ink-soft">
          The schedule is being finalised. It will appear here as soon as the family has confirmed
          it.
        </p>
      )}
    </Section>
  );
}

function EventCard({
  event,
  journey,
  index,
  eventsPagePublished,
  hasFinished,
}: {
  event: WeddingEvent;
  journey: JourneyContext;
  index: number;
  eventsPagePublished: boolean;
  hasFinished: boolean;
}) {
  const { manifest, guest } = journey;
  const venue = venueForEvent(manifest, event);
  const tz = event.dateTime.timezone;
  const rsvpState = guest.isPersonalised ? guest.rsvp.byEvent[event.slug] : undefined;
  const eventPage = resolveEventPage(manifest, event.slug);
  const cancelled = event.state === "cancelled";

  return (
    <li className="relative pb-8 last:pb-0 sm:pl-16" data-reveal>
      {/* Date marker */}
      <div className="mb-3 flex items-center gap-3 sm:absolute sm:left-0 sm:top-1 sm:mb-0 sm:w-12 sm:flex-col sm:gap-0">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-ivory"
          style={{ borderColor: event.accent, color: event.accent }}
        >
          <EventGlyphIcon glyph={event.glyph} />
        </span>
        <span className="flex items-baseline gap-1.5 sm:mt-2 sm:flex-col sm:items-center sm:gap-0">
          <span className="text-[1.125rem] font-medium leading-none text-ink tabular-nums">
            {formatDayNumber(event.dateTime.start, tz)}
          </span>
          <span className="text-[0.6875rem] tracking-[0.14em] text-ink-muted uppercase">
            {formatMonth(event.dateTime.start, tz)}
          </span>
        </span>
      </div>

      <article
        className={`card overflow-hidden ${cancelled ? "opacity-70" : ""}`}
        style={{ borderTopColor: event.accent, borderTopWidth: 2 }}
      >
        <div className="relative">
          <SceneImage asset={event.hero} mode="card" priority={index === 0} />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
          />
          <h3 className="absolute bottom-3 left-4 right-4 font-display text-[1.75rem] leading-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
            {event.name}
          </h3>
        </div>

        <div className="p-5">
          {cancelled && (
            <p className="mb-3 border border-crimson/40 bg-crimson/5 px-3 py-2 text-[0.8125rem] text-crimson">
              This celebration has been cancelled. {event.stateNote}
            </p>
          )}
          {!cancelled && event.state === "changed" && event.stateNote && (
            <p className="mb-3 border border-gold/50 bg-gold-pale/40 px-3 py-2 text-[0.8125rem] text-ink">
              Updated: {event.stateNote}
            </p>
          )}

          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{event.meaning}</p>

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="eyebrow mb-0.5">When</dt>
              <dd className="text-[0.9375rem] text-ink">
                {formatWeekday(event.dateTime.start, tz)}{" "}
                {formatDayNumber(event.dateTime.start, tz)} {formatMonth(event.dateTime.start, tz)}
                {" · "}
                {formatTime(event.dateTime.start, tz)}
                {event.dateTime.end && <> – {formatTime(event.dateTime.end, tz)}</>}
              </dd>
            </div>

            <div>
              <dt className="eyebrow mb-0.5">Where</dt>
              <dd className="text-[0.9375rem] text-ink">
                {event.inheritMainVenue ? (
                  <>
                    Same grounds as the wedding
                    <br />
                    <span className="text-ink-muted">{venue?.name}</span>
                  </>
                ) : (
                  <>
                    {venue?.name}
                    <br />
                    <span className="text-ink-muted">{venue?.travelNote}</span>
                  </>
                )}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="eyebrow mb-1">Dress code · {event.dressCode.name}</dt>
              <dd className="text-[0.9375rem] text-ink-soft">
                {event.dressCode.description}
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {event.dressCode.palette.map((colour) => (
                    <Chip key={colour} tone="gold">
                      {colour}
                    </Chip>
                  ))}
                </span>
              </dd>
            </div>
          </dl>

          {event.stateNote && event.state === "scheduled" && (
            <p className="mt-4 flex gap-2 text-[0.875rem] text-ink-soft">
              <Icons.info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {event.stateNote}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2.5">
            {rsvpState && <RsvpBadge state={rsvpState} />}

            {!cancelled && (
              <>
                {venue && (
                  <a
                    href={googleMapsUrl(venue.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target inline-flex items-center gap-1.5 text-[0.8125rem] text-crimson underline decoration-gold/60 underline-offset-4 hover:decoration-crimson"
                  >
                    <Icons.map className="h-4 w-4" />
                    Directions
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}

                <AddToCalendarButton
                  events={[eventToCalendar(manifest, event)]}
                  filename={`${manifest.slug}-${event.slug}`}
                  label="Add to calendar"
                  variant="quiet"
                  productName={`${manifest.couple.partnerOne.firstName} & ${manifest.couple.partnerTwo.firstName}`}
                />

                {/* Once event pages ship this becomes the "View Event" link.
                    Until then no dead URL is rendered (spec §2.1). */}
                {eventsPagePublished && eventPage && (
                  <ActionLink href={eventPage.href} variant="quiet">
                    View {event.name}
                  </ActionLink>
                )}

                {/* After an event, the countdown is replaced by a memory action
                    (spec §9). */}
                {hasFinished && (
                  <ActionLink href={`#${SECTION_IDS.gallery}`} variant="quiet">
                    View moments
                  </ActionLink>
                )}
              </>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}
