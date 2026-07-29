import { FloralDivider, Monogram } from "@/components/art/Monogram";
import { Icons } from "@/components/art/Glyph";
import type { JourneyContext } from "@/components/sections/context";
import { SceneImage } from "@/components/ui/SceneImage";
import { isPublishable } from "@/lib/manifest";
import { formatDateRange } from "@/lib/format";
import { SECTION_IDS } from "@/lib/nav";

/**
 * 01 — Personalised Welcome (spec §6).
 *
 * The layered arch is the only decorative element that loads eagerly. Names,
 * date, place and the invitation message are plain HTML inside a legible panel,
 * so the essential information is readable before any motion finishes
 * (spec §54).
 */
export function Welcome({ journey }: { journey: JourneyContext }) {
  const { manifest, guest } = journey;
  const dateLabel = formatDateRange(manifest.wedding.dateRange);
  const place = `${manifest.wedding.city}, ${manifest.wedding.region}`;

  const audio = manifest.experience.ambientAudio;
  const audioAvailable = Boolean(audio?.src) && isPublishable(audio!.status);

  return (
    <section
      id={SECTION_IDS.welcome}
      aria-labelledby="welcome-heading"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0" data-hero-layer>
        <SceneImage asset={manifest.hero} mode="fill" priority className="h-full" />
      </div>

      {/* Legibility scrim. Decorative only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ivory/50 via-ivory/20 to-ivory/95"
      />

      <div className="relative z-10 px-5 pb-14 pt-28 sm:px-8 sm:pb-20">
        {/* The invitation card itself: a translucent panel guarantees text
            contrast over any approved artwork that lands in the hero slot
            (spec §61 contrast over generated backgrounds). */}
        <div
          className="mx-auto w-full max-w-xl border border-gold/40 bg-ivory/78 px-5 py-10 text-center shadow-[0_20px_60px_-40px_rgba(42,30,26,0.45)] backdrop-blur-[3px] sm:px-10"
          data-hero-text
        >
          <div className="flex justify-center">
            <Monogram initials={manifest.couple.monogram} size={72} />
          </div>

          {guest.isPersonalised && guest.greetingName && (
            <p className="mt-6 font-display text-[1.25rem] text-crimson">
              Welcome, {guest.greetingName}
            </p>
          )}

          <p className="mx-auto mt-5 max-w-sm font-display text-[1.0625rem] leading-relaxed text-ink-soft italic">
            {manifest.wedding.invitationWording}
          </p>

          <h1
            id="welcome-heading"
            className="mt-3 font-display text-[3rem] leading-[1.04] text-ink sm:text-[4rem]"
          >
            {manifest.couple.partnerOne.firstName}
            <span className="mx-2 text-gold">&amp;</span>
            {manifest.couple.partnerTwo.firstName}
          </h1>

          <FloralDivider className="mt-6" />

          <p className="mt-6 text-[0.9375rem] tracking-[0.16em] text-ink uppercase">{dateLabel}</p>
          <p className="mt-1 text-[0.8125rem] tracking-[0.16em] text-ink-muted uppercase">
            {place}, {manifest.wedding.country}
          </p>

          <p className="mx-auto mt-7 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
            {manifest.wedding.invitationMessage}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href={`#${SECTION_IDS.quickDetails}`}
              className="tap-target inline-flex items-center gap-2 bg-crimson px-7 py-3.5 text-[0.75rem] font-medium tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-crimson-deep"
            >
              Open invitation
              <Icons.arrowRight className="h-4 w-4" />
            </a>

            {/* Audio never starts on its own and only appears once an approved
                track exists (spec §6.3, §57). */}
            {audioAvailable && (
              <p className="text-[0.75rem] text-ink-muted">
                Music can be turned on with the sound control in the header.
              </p>
            )}
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-gold/70"
      >
        <Icons.chevronDown className="h-5 w-5" />
      </span>
    </section>
  );
}
