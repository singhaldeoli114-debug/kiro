import { Icons } from "@/components/art/Glyph";
import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, Section } from "@/components/ui/primitives";
import { telHref, whatsappHref } from "@/lib/format";
import { SECTION_IDS, isPagePublished, resolvePage } from "@/lib/nav";
import type { Blessing } from "@/lib/manifest/types";

const FORMAT_LABEL: Record<Blessing["format"], string> = {
  text: "Written note",
  voice: "Voice message",
  photo: "Photo",
  video: "Video message",
};

/**
 * 11 — Blessings preview (spec §16).
 *
 * Three to five messages, and only those that have cleared moderation. Anything
 * still submitted, processing, in review or rejected is absent — moderation is
 * applied to the data, not hidden in the interface (spec §39).
 */
export function BlessingsPreviewSection({ journey }: { journey: JourneyContext }) {
  const { manifest } = journey;
  const blessings = manifest.blessings;

  const visible = blessings.messages
    .filter((message) => message.moderation === "approved" || message.moderation === "published")
    .slice(0, 5);

  if (!visible.length) return null;

  const page = resolvePage(manifest, "blessings");
  const pageLive = isPagePublished(manifest, "blessings");
  const coordinator = manifest.coordinators[0] ?? null;

  return (
    <Section
      id={SECTION_IDS.blessings}
      eyebrow="Blessings"
      title="Words already sent"
      intro={blessings.intro}
      tone="parchment"
    >
      <ul className="grid gap-4 sm:grid-cols-2" data-reveal-group>
        {visible.map((message) => (
          <li key={message.id} className="card p-5" data-reveal>
            <Icons.quote className="mb-2 h-5 w-5 text-gold" />
            <blockquote className="font-display text-[1.1875rem] leading-snug text-ink">
              {message.message}
            </blockquote>
            <p className="mt-3 text-[0.8125rem] text-ink-soft">
              {message.from}
              {message.relation && <span className="text-ink-muted"> · {message.relation}</span>}
            </p>
            <p className="mt-1 text-[0.6875rem] tracking-[0.14em] text-ink-muted uppercase">
              {FORMAT_LABEL[message.format]}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2.5" data-reveal>
        {pageLive && page ? (
          <ActionLink href={page.href} variant="solid">
            Leave a blessing
          </ActionLink>
        ) : (
          <>
            {coordinator?.whatsapp && (
              <ActionLink href={whatsappHref(coordinator.whatsapp)} variant="outline" external>
                Send a blessing on WhatsApp
              </ActionLink>
            )}
            {coordinator?.phone && !coordinator.whatsapp && (
              <ActionLink href={telHref(coordinator.phone)} variant="outline">
                Call {coordinator.name}
              </ActionLink>
            )}
          </>
        )}
      </div>

      {!pageLive && blessings.interimNote && (
        <p className="mt-4 flex max-w-prose gap-2 text-[0.875rem] leading-relaxed text-ink-muted" data-reveal>
          <Icons.info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          {blessings.interimNote}
        </p>
      )}

      <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-muted" data-reveal>
        Every message is read by the family before it appears here.
      </p>
    </Section>
  );
}
