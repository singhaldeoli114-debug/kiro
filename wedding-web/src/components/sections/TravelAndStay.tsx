import { Icons } from "@/components/art/Glyph";
import type { JourneyContext } from "@/components/sections/context";
import { ActionLink, DetailRow, Section } from "@/components/ui/primitives";
import { SceneImage } from "@/components/ui/SceneImage";
import { googleMapsUrl, telHref, whatsappHref } from "@/lib/format";
import { mainVenue } from "@/lib/manifest";
import { SECTION_IDS, isPagePublished, resolvePage } from "@/lib/nav";

/**
 * 07 — Travel and Stay preview (spec §12).
 *
 * Public logistics live here. A guest with an assignment sees their hotel and
 * check-in date, but room numbers, drivers and vehicles stay behind the secure
 * guest page and are never rendered on a shareable page (spec §36 privacy).
 */
export function TravelAndStay({ journey }: { journey: JourneyContext }) {
  const { manifest, guest } = journey;
  const travel = manifest.travel;
  const venue = mainVenue(manifest);
  const travelCoordinator =
    manifest.coordinators.find((c) => c.role.toLowerCase().includes("travel")) ?? null;
  const guestPagePublished = isPagePublished(manifest, "guest");
  const travelPage = resolvePage(manifest, "travel");

  return (
    <Section
      id={SECTION_IDS.travel}
      eyebrow="Travel and stay"
      title={`Getting to ${travel.destination}`}
      tone="parchment"
    >
      <div className="grid gap-7 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:items-start">
        <figure className="overflow-hidden" data-reveal>
          <SceneImage asset={travel.image} mode="card" />
        </figure>

        <div className="card p-5 sm:p-6" data-reveal>
          <dl>
            <DetailRow label="Arrive" icon={<Icons.calendar className="h-4 w-4" />}>
              {travel.arrivalRecommendation}
              <br />
              <span className="text-ink-soft">{travel.departureRecommendation}</span>
            </DetailRow>
            <DetailRow label="By air" icon={<Icons.map className="h-4 w-4" />}>
              {travel.airport}
            </DetailRow>
            <DetailRow label="By train" icon={<Icons.map className="h-4 w-4" />}>
              {travel.railway}
            </DetailRow>
            {venue && (
              <DetailRow label="Main venue" icon={<Icons.map className="h-4 w-4" />}>
                {venue.name}
                <br />
                <span className="text-ink-soft">{venue.travelNote}</span>
              </DetailRow>
            )}
          </dl>
        </div>
      </div>

      {/* Personalised stay summary */}
      {guest.stay && (
        <div className="mt-7 border border-gold/50 bg-gold-pale/40 p-5" data-reveal>
          <p className="eyebrow mb-2">Your stay</p>
          <p className="font-display text-[1.375rem] leading-snug text-ink">
            {guest.stay.hotelName}
          </p>
          {guest.stay.checkIn && (
            <p className="mt-1 text-[0.9375rem] text-ink-soft">
              Check-in from {guest.stay.checkIn}
            </p>
          )}
          {guest.stay.hasPrivateDetails && (
            <p className="mt-3 flex gap-2 text-[0.875rem] leading-relaxed text-ink-soft">
              <Icons.info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {guestPagePublished
                ? "Your room, pickup and seating details are on your private guest page."
                : "Your room number, airport pickup and seating are held privately. A coordinator will send them to you directly before you travel — they are deliberately not shown on this page."}
            </p>
          )}
        </div>
      )}

      <div className="mt-8" data-reveal-group>
        <h3 className="eyebrow mb-3">Where everyone is staying</h3>
        <ul className="grid gap-3 sm:grid-cols-3">
          {travel.hotels.map((hotel) => (
            <li key={hotel.id} className="card p-4" data-reveal>
              <p className="font-display text-[1.25rem] leading-snug text-ink">{hotel.name}</p>
              <p className="mt-0.5 text-[0.75rem] tracking-[0.12em] text-ink-muted uppercase">
                {hotel.area}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{hotel.note}</p>
            </li>
          ))}
        </ul>
      </div>

      {travel.pickupAvailable && (
        <p className="mt-6 flex gap-2 text-[0.9375rem] leading-relaxed text-ink-soft" data-reveal>
          <Icons.info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          {travel.pickupNote}
        </p>
      )}

      <div className="mt-7 flex flex-wrap gap-2.5" data-reveal>
        {venue && (
          <ActionLink href={googleMapsUrl(venue.mapsQuery)} variant="outline" external>
            Open venue in Maps
          </ActionLink>
        )}
        {travelPage?.isDedicatedPage && (
          <ActionLink href={travelPage.href} variant="solid">
            Plan your stay
          </ActionLink>
        )}
        {travelCoordinator?.phone && (
          <ActionLink href={telHref(travelCoordinator.phone)} variant="outline">
            Call {travelCoordinator.name.split(" ")[0]}
          </ActionLink>
        )}
        {travelCoordinator?.whatsapp && (
          <ActionLink href={whatsappHref(travelCoordinator.whatsapp)} variant="quiet" external>
            WhatsApp travel desk
          </ActionLink>
        )}
      </div>
    </Section>
  );
}
