import type { JourneyContext } from "@/components/sections/context";
import { Section } from "@/components/ui/primitives";
import { SceneImage } from "@/components/ui/SceneImage";
import { publishable } from "@/lib/manifest";
import { SECTION_IDS } from "@/lib/nav";

/**
 * 05 — Our Story preview (spec §10).
 *
 * Three to five milestones, kept deliberately short. The full story lives here
 * and nowhere else: event pages will reference at most one sentence rather than
 * repeating it (spec §58 inheritance rules).
 */
export function OurStory({ journey }: { journey: JourneyContext }) {
  const milestones = publishable(journey.manifest.story).slice(0, 5);
  if (!milestones.length) return null;

  return (
    <Section
      id={SECTION_IDS.story}
      eyebrow="Our story"
      title="How this happened"
      tone="parchment"
    >
      <ol className="grid gap-8" data-reveal-group>
        {milestones.map((milestone, index) => (
          <li
            key={milestone.id}
            className="grid gap-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-start sm:gap-6"
            data-reveal
          >
            <figure className="overflow-hidden sm:sticky sm:top-24">
              <SceneImage asset={milestone.image} mode="tile" />
            </figure>

            <div className="border-l border-gold/40 pl-5">
              <p className="eyebrow">
                <span className="text-gold">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-sand">/</span>
                {milestone.when}
              </p>
              <h3 className="mt-1.5 font-display text-[1.5rem] leading-snug text-ink">
                {milestone.label}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                {milestone.copy}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
