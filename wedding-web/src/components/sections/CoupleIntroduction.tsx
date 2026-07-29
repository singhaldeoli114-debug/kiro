import { Icons } from "@/components/art/Glyph";
import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, Section } from "@/components/ui/primitives";
import { SceneImage } from "@/components/ui/SceneImage";
import { coupleFullNames, isPublishable } from "@/lib/manifest";
import { SECTION_IDS } from "@/lib/nav";

/**
 * 03 — Couple Introduction (spec §8).
 *
 * The portrait slot accepts real photography, an editorial AI portrait or the
 * illustrated 2.5D characters; the manifest decides which. A couple voice
 * greeting is opt-in and always accompanied by visible text — until the
 * recording is approved, neither the player nor the transcript is published.
 */
export function CoupleIntroduction({ journey }: { journey: JourneyContext }) {
  const { manifest } = journey;
  const { couple } = manifest;
  const voiceApproved = Boolean(couple.voice?.src) && isPublishable(couple.voice!.status);

  return (
    <Section id={SECTION_IDS.couple} eyebrow="The two of them" title="Aarav and Meera">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:items-start sm:gap-10">
        <figure className="overflow-hidden" data-reveal>
          <SceneImage asset={couple.portrait} mode="portrait" />
          <figcaption className="mt-3 text-[0.75rem] tracking-[0.14em] text-ink-muted uppercase">
            {coupleFullNames(manifest)}
          </figcaption>
        </figure>

        <div data-reveal-group>
          <p className="text-[1.0625rem] leading-relaxed text-ink-soft" data-reveal>
            {couple.introduction}
          </p>

          {couple.quote && (
            <blockquote className="mt-7 border-l-2 border-gold/60 pl-5" data-reveal>
              <Icons.quote className="mb-2 h-5 w-5 text-gold" />
              <p className="font-display text-[1.375rem] leading-snug text-ink">
                “{couple.quote}”
              </p>
            </blockquote>
          )}

          {voiceApproved && (
            <div className="mt-6" data-reveal>
              <p className="eyebrow mb-2">A word from the couple</p>
              <audio controls preload="none" src={couple.voice!.src} className="w-full max-w-sm">
                Your browser cannot play audio. The transcript is below.
              </audio>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                “{couple.voice!.transcript}”
              </p>
            </div>
          )}

          <div className="mt-7" data-reveal>
            <ActionLink href={`#${SECTION_IDS.story}`} variant="quiet">
              Read how they met
            </ActionLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
