import type { JourneyContext } from "@/components/sections/context";
import { FloralDivider } from "@/components/art/Monogram";
import { Section } from "@/components/ui/primitives";
import { SceneImage } from "@/components/ui/SceneImage";
import { publishable } from "@/lib/manifest";
import { SECTION_IDS } from "@/lib/nav";

/**
 * 06 — Family Introductions (spec §11).
 *
 * Family chapters in a vertical flow rather than a searchable directory. Only
 * host names and approved welcome messages appear: no phone numbers, no private
 * relationships, nothing the families have not signed off.
 */
export function FamilyIntroductions({ journey }: { journey: JourneyContext }) {
  const families = publishable(journey.manifest.families);
  if (!families.length) return null;

  return (
    <Section
      id={SECTION_IDS.families}
      eyebrow="Our families"
      title="The people hosting you"
    >
      <div className="grid gap-10" data-reveal-group>
        {families.map((family, index) => (
          <article key={family.id} data-reveal>
            {index > 0 && <FloralDivider className="mb-10" />}

            <div className="grid gap-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-7">
              <figure className="max-w-32 overflow-hidden">
                <SceneImage asset={family.image} mode="tile" />
              </figure>

              <div>
                <p className="eyebrow">{family.side}</p>
                <h3 className="mt-1 font-display text-[1.875rem] leading-tight text-ink">
                  {family.name}
                </h3>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">{family.hosts.join(" · ")}</p>
                {family.hostDesignation && (
                  <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{family.hostDesignation}</p>
                )}

                <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
                  {family.welcomeMessage}
                </p>

                {family.remembrance && (
                  <p className="mt-4 border-l-2 border-gold/60 pl-4 font-display text-[1.125rem] leading-snug text-ink">
                    {family.remembrance}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
