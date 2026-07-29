import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, Section } from "@/components/ui/primitives";
import { SceneImage } from "@/components/ui/SceneImage";
import { isPublishable, publishable } from "@/lib/manifest";
import { SECTION_IDS, resolvePage } from "@/lib/nav";

/**
 * 08 — Gallery preview (spec §13).
 *
 * Four to six approved images. The section is omitted entirely rather than
 * shown empty, and the highlight reel only appears once it has been approved —
 * with a poster first and no autoplay (spec §37 media behaviour).
 */
export function GalleryPreview({ journey }: { journey: JourneyContext }) {
  const gallery = journey.manifest.gallery;
  const images = publishable(gallery.images).slice(0, 6);
  if (!images.length) return null;

  const reel = gallery.highlightReel;
  const reelAvailable = Boolean(reel?.src) && Boolean(reel && isPublishable(reel.status));
  const galleryPage = resolvePage(journey.manifest, "gallery");

  return (
    <Section
      id={SECTION_IDS.gallery}
      eyebrow="Photographs"
      title="A few moments"
      intro={gallery.caption}
    >
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3" data-reveal-group>
        {images.map((image) => (
          <li key={image.id} className="overflow-hidden" data-reveal>
            <figure>
              <SceneImage asset={image} mode="tile" />
              <figcaption className="sr-only">{image.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {reelAvailable && reel && (
        <div className="mt-5" data-reveal>
          <video
            controls
            preload="none"
            playsInline
            poster={reel.poster.src}
            src={reel.src}
            className="w-full"
          />
          <p className="mt-2 text-[0.75rem] text-ink-muted">
            Highlight film · {reel.seconds} seconds · plays only when you press play
          </p>
        </div>
      )}

      <div className="mt-6" data-reveal>
        {galleryPage?.isDedicatedPage ? (
          <ActionLink href={galleryPage.href} variant="outline">
            View all moments
          </ActionLink>
        ) : (
          <p className="text-[0.875rem] text-ink-muted">
            Photographs from each celebration will be added here after the wedding, once the couple
            has approved them.
          </p>
        )}
      </div>
    </Section>
  );
}
