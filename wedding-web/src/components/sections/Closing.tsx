import { Icons } from "@/components/art/Glyph";
import { FloralDivider, Monogram } from "@/components/art/Monogram";
import type { JourneyContext } from "@/components/sections/context";
import { SceneImage } from "@/components/ui/SceneImage";
import { formatDeadline } from "@/lib/format";
import { SECTION_IDS } from "@/lib/nav";

/**
 * 13 — Graceful closing (spec §18).
 *
 * Thank-you, closing artwork, the hashtag, a last RSVP reminder and a way back
 * to the top. No new information is introduced here.
 */
export function Closing({ journey }: { journey: JourneyContext }) {
  const { manifest, guest } = journey;
  const closing = manifest.closing;
  const showReminder = manifest.rsvp.enabled && guest.rsvp.pendingCount > 0;

  return (
    <section
      id={SECTION_IDS.closing}
      aria-labelledby="closing-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <SceneImage asset={closing.image} mode="fill" className="h-full" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-ivory/78" />

      <div className="relative z-10 px-5 py-20 text-center sm:px-8 sm:py-24">
        <div className="mx-auto max-w-xl" data-reveal-group>
          <div className="flex justify-center" data-reveal>
            <Monogram initials={manifest.couple.monogram} size={64} />
          </div>

          <h2
            id="closing-heading"
            className="mt-6 font-display text-[1.875rem] leading-snug text-ink sm:text-[2.25rem]"
            data-reveal
          >
            {closing.thankYou}
          </h2>

          <FloralDivider className="mt-7" />

          <p className="mt-6 text-[0.9375rem] tracking-[0.18em] text-ink-soft uppercase" data-reveal>
            {closing.signature}
          </p>

          <p className="mt-4 font-display text-[1.5rem] text-crimson" data-reveal>
            {closing.hashtag}
          </p>

          {showReminder && (
            <p className="mt-8 text-[0.875rem] text-ink-soft" data-reveal>
              You still have {guest.rsvp.pendingCount} response
              {guest.rsvp.pendingCount === 1 ? "" : "s"} to send — the deadline is{" "}
              {formatDeadline(manifest.rsvp.deadline, manifest.wedding.dateRange.timezone)}.{" "}
              <a
                href={`#${SECTION_IDS.rsvp}`}
                className="text-crimson underline decoration-gold/60 underline-offset-4"
              >
                Respond now
              </a>
              .
            </p>
          )}

          <div className="mt-10" data-reveal>
            <a
              href={`#${SECTION_IDS.welcome}`}
              className="tap-target inline-flex items-center gap-2 border border-gold/70 px-6 py-3 text-[0.6875rem] font-medium tracking-[0.16em] text-ink uppercase transition-colors hover:bg-gold-pale/60"
            >
              <Icons.arrowUp className="h-4 w-4" />
              Back to the beginning
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
