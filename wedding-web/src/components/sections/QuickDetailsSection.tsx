import { Icons } from "@/components/art/Glyph";
import { AddToCalendarButton } from "@/components/chrome/AddToCalendarButton";
import { Countdown } from "@/components/chrome/Countdown";
import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, DetailRow, RsvpBadge, Section } from "@/components/ui/primitives";
import { calendarFilename, calendarForGuest } from "@/lib/calendar";
import {
  formatDateRange,
  formatDay,
  formatDeadline,
  formatTime,
  googleMapsUrl,
} from "@/lib/format";
import { mainVenue, venueForEvent } from "@/lib/manifest";
import { SECTION_IDS, buildOnThisPage } from "@/lib/nav";

/**
 * 02 — Quick Details (spec §7).
 *
 * Sits immediately below the welcome so the practical answers arrive before any
 * storytelling. Only events this guest is eligible for are named — a private
 * ceremony is never revealed here.
 */
export function QuickDetailsSection({ journey }: { journey: JourneyContext }) {
  const { manifest, guest, nextEvent } = journey;
  const venue = mainVenue(manifest);
  const nextVenue = nextEvent ? venueForEvent(manifest, nextEvent) : null;
  const onThisPage = buildOnThisPage(manifest);
  const calendar = calendarForGuest(manifest, journey.events);

  const rsvpStatusLabel = !guest.isPersonalised
    ? "Open your personal invitation link to see your RSVP"
    : guest.rsvp.overall === "complete"
      ? "All responses received — thank you"
      : guest.rsvp.overall === "not-started"
        ? `${guest.rsvp.invitedCount} response${guest.rsvp.invitedCount === 1 ? "" : "s"} needed`
        : `${guest.rsvp.pendingCount} response${guest.rsvp.pendingCount === 1 ? "" : "s"} still needed`;

  return (
    <Section
      id={SECTION_IDS.quickDetails}
      eyebrow="Everything at a glance"
      title="Quick details"
      tone="parchment"
    >
      <div className="card p-5 sm:p-7" data-reveal>
        <dl>
          <DetailRow label="Dates" icon={<Icons.calendar className="h-4 w-4" />}>
            {formatDateRange(manifest.wedding.dateRange)}
          </DetailRow>

          <DetailRow label="Where" icon={<Icons.map className="h-4 w-4" />}>
            {manifest.wedding.city}, {manifest.wedding.region}, {manifest.wedding.country}
            {venue && (
              <>
                <br />
                <span className="text-ink-soft">{venue.name}</span>
              </>
            )}
          </DetailRow>

          {nextEvent && (
            <DetailRow label="Next celebration" icon={<Icons.clock className="h-4 w-4" />}>
              <span className="font-display text-[1.25rem] leading-snug">{nextEvent.name}</span>
              <br />
              {formatDay(nextEvent.dateTime.start, nextEvent.dateTime.timezone)} ·{" "}
              {formatTime(nextEvent.dateTime.start, nextEvent.dateTime.timezone)}
              {nextVenue && (
                <>
                  <br />
                  <span className="text-ink-soft">{nextVenue.name}</span>
                </>
              )}
              <span className="mt-3 block">
                <Countdown
                  start={nextEvent.dateTime.start}
                  end={nextEvent.dateTime.end}
                  label={`${nextEvent.name} on ${formatDay(nextEvent.dateTime.start, nextEvent.dateTime.timezone)}`}
                />
              </span>
            </DetailRow>
          )}

          {manifest.rsvp.enabled && (
            <DetailRow label="RSVP" icon={<Icons.check className="h-4 w-4" />}>
              {rsvpStatusLabel}
              <br />
              <span className="text-ink-soft">
                Please respond by {formatDeadline(manifest.rsvp.deadline, manifest.wedding.dateRange.timezone)}
              </span>
              {guest.isPersonalised && nextEvent && guest.rsvp.byEvent[nextEvent.slug] && (
                <span className="mt-2 block">
                  <RsvpBadge state={guest.rsvp.byEvent[nextEvent.slug]!} />
                </span>
              )}
            </DetailRow>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <ActionLink href={`#${SECTION_IDS.events}`} variant="solid">
            View all celebrations
          </ActionLink>
          {nextVenue && (
            <ActionLink href={googleMapsUrl(nextVenue.mapsQuery)} variant="outline" external>
              Directions
            </ActionLink>
          )}
          <AddToCalendarButton
            events={calendar}
            filename={calendarFilename(manifest)}
            label="Add all dates"
            productName={`${manifest.couple.partnerOne.firstName} & ${manifest.couple.partnerTwo.firstName}`}
          />
        </div>
      </div>

      {/* On This Page — ordinary anchor links, not a persistent tab bar
          (spec §3.4). */}
      <nav aria-label="On this page" className="mt-8" data-reveal>
        <h3 className="eyebrow mb-3">On this page</h3>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {onThisPage.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[0.875rem] text-ink-soft underline decoration-gold/50 underline-offset-4 transition-colors hover:text-crimson"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
