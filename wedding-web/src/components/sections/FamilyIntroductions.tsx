import type { JourneyContext } from "@/components/sections/context";
import { FloralDivider } from "@/components/art/Monogram";
import { Section } from "@/components/ui/primitives";
import { SceneImage } from "@/components/ui/SceneImage";
import { publishable } from "@/lib/manifest";
import type { WeddingEvent } from "@/lib/manifest/types";
import { SECTION_IDS } from "@/lib/nav";

/**
 * 06 — Family Introductions (spec §11).
 *
 * Family chapters in a vertical flow rather than a searchable directory. Only
 * host names and approved welcome messages appear: no phone numbers, no private
 * relationships, nothing the families have not signed off.
 */
/** "the Mehndi, Sangeet and Reception" */
function listNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export function FamilyIntroductions({ journey }: { journey: JourneyContext }) {
  const families = publishable(journey.manifest.families);
  if (!families.length) return null;

  // Only events this guest may see can be named.
  const visible = new Map<string, WeddingEvent>(
    journey.events.map((event) => [event.slug, event]),
  );

  const designation = (slugs?: string[]) => {
    if (!slugs?.length) return null;
    const names = slugs
      .map((slug) => visible.get(slug)?.name)
      .filter((name): name is string => Boolean(name));
    return names.length ? `Hosting the ${listNames(names)}` : null;
  };

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
                {designation(family.hostsEvents) && (
                  <p className="mt-0.5 text-[0.8125rem] text-ink-muted">
                    {designation(family.hostsEvents)}
                  </p>
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
