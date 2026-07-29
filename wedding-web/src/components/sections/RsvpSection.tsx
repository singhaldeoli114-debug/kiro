import { Icons } from "@/components/art/Glyph";
import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, RsvpBadge, Section } from "@/components/ui/primitives";
import { formatDeadline, telHref, whatsappHref } from "@/lib/format";
import { SECTION_IDS, isPagePublished, resolvePage } from "@/lib/nav";

/**
 * 10 — Main RSVP section (spec §15).
 *
 * Shows the guest's own invitation status, how many responses are still needed
 * and the per-event summary. The action adapts: Start, Continue or Edit once the
 * RSVP page is live, and a real alternative — the coordinator — while it is not.
 */
export function RsvpSection({ journey }: { journey: JourneyContext }) {
  const { manifest, guest, events } = journey;
  if (!manifest.rsvp.enabled) return null;

  const rsvpPage = resolvePage(manifest, "rsvp");
  const rsvpPageLive = isPagePublished(manifest, "rsvp");
  const coordinator = manifest.coordinators[0] ?? null;
  const deadline = formatDeadline(manifest.rsvp.deadline, manifest.wedding.dateRange.timezone);

  const rsvpEvents = events.filter((event) => event.rsvp.enabled && event.state !== "cancelled");

  const actionLabel =
    guest.rsvp.overall === "not-started"
      ? "Start your RSVP"
      : guest.rsvp.overall === "in-progress"
        ? "Continue your RSVP"
        : "Edit your response";

  return (
    <Section
      id={SECTION_IDS.rsvp}
      eyebrow="RSVP"
      title="Will you be there?"
      intro={manifest.rsvp.helpText}
    >
      <div className="card p-5 sm:p-7" data-reveal>
        {guest.isPersonalised ? (
          <>
            <p className="font-display text-[1.75rem] leading-tight text-ink">
              {guest.greetingName}
            </p>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">
              Invited to {rsvpEvents.length} celebration{rsvpEvents.length === 1 ? "" : "s"}
              {typeof guest.partyLimit === "number" && (
                <> · {guest.partyLimit} seats held for you</>
              )}
            </p>
            <p className="mt-1 text-[0.9375rem] font-medium text-crimson">
              {guest.rsvp.pendingCount === 0
                ? "Every response received — thank you."
                : `${guest.rsvp.pendingCount} response${
                    guest.rsvp.pendingCount === 1 ? "" : "s"
                  } still needed`}
            </p>

            <ul className="mt-5 grid gap-2.5">
              {rsvpEvents.map((event) => (
                <li
                  key={event.slug}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-sand/60 pb-2.5 last:border-b-0"
                >
                  <span className="text-[0.9375rem] text-ink">{event.name}</span>
                  <RsvpBadge state={guest.rsvp.byEvent[event.slug] ?? "pending"} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="font-display text-[1.75rem] leading-tight text-ink">
              Open your personal invitation
            </p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              Each family received a private link by message. Opening it shows the celebrations held
              for you, the number of seats reserved and your response so far. If you cannot find
              yours, {coordinator ? coordinator.name : "a coordinator"} can resend it.
            </p>
          </>
        )}

        <p className="mt-5 text-[0.875rem] text-ink-muted">Please respond by {deadline}.</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {rsvpPageLive && rsvpPage ? (
            <ActionLink href={rsvpPage.href} variant="solid">
              {actionLabel}
            </ActionLink>
          ) : (
            <>
              {coordinator?.whatsapp && (
                <ActionLink href={whatsappHref(coordinator.whatsapp)} variant="solid" external>
                  Respond on WhatsApp
                </ActionLink>
              )}
              {coordinator?.phone && (
                <ActionLink href={telHref(coordinator.phone)} variant="outline">
                  Call {coordinator.name}
                </ActionLink>
              )}
            </>
          )}
        </div>

        {!rsvpPageLive && manifest.rsvp.interimNote && (
          <p className="mt-5 flex gap-2 border-t border-sand/70 pt-4 text-[0.875rem] leading-relaxed text-ink-muted">
            <Icons.info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {manifest.rsvp.interimNote}
          </p>
        )}

        <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-muted">
          Dietary needs, travel dates and accessibility requirements are collected with your RSVP so
          the kitchen and travel desk work from one list.
        </p>
      </div>
    </Section>
  );
}
