import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { QuickDetails } from "@/components/chrome/QuickDetails";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import type { HeaderData, QuickDetailsData } from "@/components/chrome/types";
import { MotionRoot } from "@/components/motion/MotionRoot";

import { BlessingsPreviewSection } from "@/components/sections/BlessingsPreviewSection";
import { Closing } from "@/components/sections/Closing";
import { CoupleIntroduction } from "@/components/sections/CoupleIntroduction";
import { FamilyIntroductions } from "@/components/sections/FamilyIntroductions";
import { FoodAndDietary } from "@/components/sections/FoodAndDietary";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { HelpAndCoordinators } from "@/components/sections/HelpAndCoordinators";
import { OurStory } from "@/components/sections/OurStory";
import { QuickDetailsSection } from "@/components/sections/QuickDetailsSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { TravelAndStay } from "@/components/sections/TravelAndStay";
import { WeddingEvents } from "@/components/sections/WeddingEvents";
import { Welcome } from "@/components/sections/Welcome";
import type { JourneyContext } from "@/components/sections/context";

import { findGuestByToken } from "@/data/weddings/aarav-meera.guests";
import { calendarFilename, calendarForGuest, eventToCalendar } from "@/lib/calendar";
import { eligibleEvents, resolveGuestContext } from "@/lib/guest/resolve";
import {
  coupleNames,
  getWedding,
  isPublishable,
  listWeddingSlugs,
  nextEventForGuest,
  venueForEvent,
} from "@/lib/manifest";
import {
  formatDateRange,
  formatDay,
  formatDeadline,
  formatTime,
  googleMapsUrl,
} from "@/lib/format";
import { SECTION_IDS, buildMenu, resolvePage } from "@/lib/nav";

interface PageProps {
  params: Promise<{ weddingSlug: string }>;
  /**
   * `?g=` carries the opaque guest token. In production the personalised entry
   * route (`/i/{guestToken}`) exchanges it for an HttpOnly cookie; either way
   * the token is only ever read on the server (spec §60).
   */
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return listWeddingSlugs().map((weddingSlug) => ({ weddingSlug }));
}

/**
 * Social preview carries the couple, date and artwork — and no guest data
 * (spec §6.1).
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { weddingSlug } = await params;
  const manifest = getWedding(weddingSlug);
  if (!manifest) return { title: "Wedding not found" };

  const names = coupleNames(manifest);
  const dateLabel = formatDateRange(manifest.wedding.dateRange);
  const title = `${names} · ${dateLabel}`;

  return {
    title,
    description: manifest.wedding.invitationMessage,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: manifest.wedding.invitationMessage,
      type: "website",
      siteName: `${names} — ${manifest.wedding.city}`,
    },
  };
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function WeddingJourneyPage({ params, searchParams }: PageProps) {
  const { weddingSlug } = await params;
  const manifest = getWedding(weddingSlug);
  if (!manifest) notFound();

  const query = await searchParams;
  const guestRecord = findGuestByToken(firstParam(query.g));
  const guest = resolveGuestContext(manifest, guestRecord);

  const events = eligibleEvents(manifest, guestRecord);
  const now = new Date();
  const nextEvent = nextEventForGuest(events, now);

  const journey: JourneyContext = {
    manifest,
    guest,
    events,
    // Never rendered: showing a count of hidden ceremonies would itself reveal
    // that a private event exists (spec §7 guest personalization).
    hiddenEventCount: manifest.events.length - events.length,
    nextEvent,
    now,
  };

  const names = coupleNames(manifest);
  const dateLabel = formatDateRange(manifest.wedding.dateRange);
  const locationLabel = `${manifest.wedding.city}, ${manifest.wedding.region}`;
  const menu = buildMenu(manifest);

  const ambient = manifest.experience.ambientAudio;
  const headerData: HeaderData = {
    monogram: manifest.couple.monogram,
    coupleNames: names,
    dateLabel,
    menu,
    languages: manifest.experience.languages
      .filter((language) => isPublishable(language.status))
      .map(({ code, label }) => ({ code, label })),
    audio:
      ambient?.src && isPublishable(ambient.status)
        ? { src: ambient.src, transcript: ambient.transcript }
        : null,
  };

  const nextVenue = nextEvent ? venueForEvent(manifest, nextEvent) : null;
  const rsvpTarget = resolvePage(manifest, "rsvp");

  const rsvpStatusLabel = !guest.isPersonalised
    ? "Open your personal link"
    : guest.rsvp.overall === "complete"
      ? "All responses received"
      : `${guest.rsvp.pendingCount} still needed`;

  const quickDetails: QuickDetailsData = {
    coupleNames: names,
    dateRangeLabel: dateLabel,
    locationLabel,
    nextEvent:
      nextEvent && nextVenue
        ? {
            name: nextEvent.name,
            dayLabel: formatDay(nextEvent.dateTime.start, nextEvent.dateTime.timezone),
            timeLabel: formatTime(nextEvent.dateTime.start, nextEvent.dateTime.timezone),
            venueName: nextEvent.inheritMainVenue
              ? `${nextVenue.name} (main venue)`
              : nextVenue.name,
            venueLine: nextVenue.travelNote ?? nextVenue.city,
            mapsUrl: googleMapsUrl(nextVenue.mapsQuery),
            dressCode: nextEvent.dressCode.name,
            rsvpState: guest.rsvp.byEvent[nextEvent.slug] ?? null,
            calendar: eventToCalendar(manifest, nextEvent),
          }
        : null,
    afterAllEventsNote:
      events.length > 0 && !nextEvent
        ? "Every celebration has finished. Thank you for being there — approved photographs are being added to the gallery."
        : null,
    rsvp: {
      enabled: manifest.rsvp.enabled,
      deadlineLabel: formatDeadline(manifest.rsvp.deadline, manifest.wedding.dateRange.timezone),
      statusLabel: rsvpStatusLabel,
      href: rsvpTarget ? rsvpTarget.href : `#${SECTION_IDS.rsvp}`,
      pendingCount: guest.rsvp.pendingCount,
    },
    coordinator: manifest.coordinators[0]
      ? {
          role: manifest.coordinators[0].role,
          name: manifest.coordinators[0].name,
          phone: manifest.coordinators[0].phone,
          whatsapp: manifest.coordinators[0].whatsapp,
        }
      : null,
    allEventsCalendar: calendarForGuest(manifest, events),
    calendarFilename: calendarFilename(manifest),
  };

  return (
    <>
      <SiteHeader data={headerData} />

      {/* One vertical narrative, in guest-priority order (spec §4, §5). */}
      <main id="main">
        <Welcome journey={journey} />
        <QuickDetailsSection journey={journey} />
        <CoupleIntroduction journey={journey} />
        <WeddingEvents journey={journey} />
        <OurStory journey={journey} />
        <FamilyIntroductions journey={journey} />
        <TravelAndStay journey={journey} />
        <GalleryPreview journey={journey} />
        <FoodAndDietary journey={journey} />
        <RsvpSection journey={journey} />
        <BlessingsPreviewSection journey={journey} />
        <HelpAndCoordinators journey={journey} />
        <Closing journey={journey} />
      </main>

      <SiteFooter
        coupleNames={names}
        monogram={manifest.couple.monogram}
        dateLabel={dateLabel}
        locationLabel={locationLabel}
        links={menu}
        privacyNotice={manifest.privacyNotice}
        hashtag={manifest.wedding.hashtag}
      />

      {manifest.experience.quickDetails && <QuickDetails data={quickDetails} />}
      <MotionRoot />
    </>
  );
}
