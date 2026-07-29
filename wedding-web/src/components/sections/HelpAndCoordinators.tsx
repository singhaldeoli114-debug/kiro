import { Icons } from "@/components/art/Glyph";
import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, Section } from "@/components/ui/primitives";
import { telHref, whatsappHref } from "@/lib/format";
import { publishable } from "@/lib/manifest";
import { SECTION_IDS, isPagePublished, resolvePage } from "@/lib/nav";

/**
 * 12 — Help and Coordinators (spec §17).
 *
 * Only contact details approved for guests are listed. Because the dedicated
 * contact page is not published yet, the most-asked questions are answered
 * inline with native disclosure elements, which work without JavaScript.
 */
export function HelpAndCoordinators({ journey }: { journey: JourneyContext }) {
  const { manifest } = journey;
  const coordinators = publishable(manifest.coordinators);
  const faqs = publishable(manifest.faqs);
  const contactPage = resolvePage(manifest, "contact");
  const contactPageLive = isPagePublished(manifest, "contact");

  return (
    <Section
      id={SECTION_IDS.help}
      eyebrow="Help"
      title="Someone to ask"
      intro="If anything is unclear, or plans change on the day, these are the people to reach."
    >
      <ul className="grid gap-3 sm:grid-cols-2" data-reveal-group>
        {coordinators.map((coordinator) => (
          <li key={coordinator.id} className="card p-5" data-reveal>
            <p className="eyebrow">{coordinator.role}</p>
            <p className="mt-1 font-display text-[1.375rem] leading-snug text-ink">
              {coordinator.name}
            </p>
            {coordinator.hours && (
              <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{coordinator.hours}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {coordinator.phone && (
                <a
                  href={telHref(coordinator.phone)}
                  className="tap-target inline-flex items-center gap-1.5 text-[0.875rem] text-crimson underline decoration-gold/60 underline-offset-4"
                >
                  <Icons.phone className="h-4 w-4" />
                  {coordinator.phone}
                </a>
              )}
              {coordinator.whatsapp && (
                <a
                  href={whatsappHref(coordinator.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target inline-flex items-center gap-1.5 text-[0.875rem] text-crimson underline decoration-gold/60 underline-offset-4"
                >
                  <Icons.whatsapp className="h-4 w-4" />
                  WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {coordinator.email && (
                <a
                  href={`mailto:${coordinator.email}`}
                  className="tap-target inline-flex items-center gap-1.5 text-[0.875rem] text-crimson underline decoration-gold/60 underline-offset-4"
                >
                  <Icons.mail className="h-4 w-4" />
                  Email
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      {faqs.length > 0 && (
        <div className="mt-9" data-reveal>
          <h3 className="eyebrow mb-3">Asked most often</h3>
          <div className="border-t border-sand/70">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-sand/70">
                <summary className="tap-target flex cursor-pointer items-center justify-between gap-3 py-3.5 text-[0.9375rem] text-ink marker:content-none">
                  {faq.question}
                  <Icons.chevronDown className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-4 pr-8 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      {contactPageLive && contactPage && (
        <div className="mt-7" data-reveal>
          <ActionLink href={contactPage.href} variant="outline">
            All help and FAQs
          </ActionLink>
        </div>
      )}
    </Section>
  );
}
