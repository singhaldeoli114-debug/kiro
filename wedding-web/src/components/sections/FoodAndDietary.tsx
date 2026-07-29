import { Icons } from "@/components/art/Glyph";
import type { JourneyContext } from "@/components/sections/context";
import { Chip, Section } from "@/components/ui/primitives";
import { SECTION_IDS } from "@/lib/nav";

/**
 * 09 — Food and Dietary Information (spec §14).
 *
 * States what is guaranteed and nothing more. Because no menu has been approved
 * yet, the section shows dietary assurances instead of inventing dishes
 * (spec §19 content inheritance).
 */
export function FoodAndDietary({ journey }: { journey: JourneyContext }) {
  const food = journey.manifest.food;

  const markers = [
    food.vegetarian ? "Vegetarian" : null,
    food.jain ? "Jain" : null,
    food.vegan ? "Vegan" : null,
  ].filter((marker): marker is string => Boolean(marker));

  return (
    <Section
      id={SECTION_IDS.food}
      eyebrow="Food"
      title="Eating well, all four days"
      tone="parchment"
    >
      <div className="card p-5 sm:p-7" data-reveal>
        <p className="font-display text-[1.5rem] leading-snug text-ink">{food.assurance}</p>

        {markers.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {markers.map((marker) => (
              <Chip key={marker} tone="green">
                <Icons.check className="h-3.5 w-3.5" />
                {marker} available
              </Chip>
            ))}
          </div>
        )}

        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
          {food.allergyStatement}
        </p>

        {!food.menusPublished && (
          <p className="mt-5 flex gap-2 border-t border-sand/70 pt-4 text-[0.875rem] leading-relaxed text-ink-muted">
            <Icons.info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            The menus for each celebration are still being tasted and argued about. They will be
            published here once the families have signed them off.
          </p>
        )}
      </div>
    </Section>
  );
}
