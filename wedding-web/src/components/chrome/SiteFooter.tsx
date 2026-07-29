import { Icons } from "@/components/art/Glyph";
import { Monogram } from "@/components/art/Monogram";
import type { ChromeLink } from "@/components/chrome/types";
import { MotionToggle } from "@/components/motion/MotionPreference";

/**
 * Complete website footer, present at the end of every public page
 * (spec §3.7): couple names, the main journey and its sections, coordinators,
 * the privacy notice and accessibility controls.
 */
export function SiteFooter({
  coupleNames,
  monogram,
  dateLabel,
  locationLabel,
  links,
  privacyNotice,
  hashtag,
}: {
  coupleNames: string;
  monogram: string;
  dateLabel: string;
  locationLabel: string;
  links: ChromeLink[];
  privacyNotice: string;
  hashtag: string;
}) {
  return (
    <footer className="bg-ink px-5 pb-10 pt-14 text-ivory sm:px-8">
      <div className="mx-auto w-full max-w-2xl lg:max-w-4xl">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:justify-between">
          <div>
            <Monogram initials={monogram} size={52} tone="gold" />
            <p className="mt-4 font-display text-[1.75rem] leading-tight">{coupleNames}</p>
            <p className="mt-1 text-[0.8125rem] tracking-[0.14em] text-ivory/60 uppercase">
              {dateLabel} · {locationLabel}
            </p>
            <p className="mt-3 text-[0.875rem] text-gold-light">{hashtag}</p>
          </div>

          <nav aria-label="Footer" className="w-full sm:w-auto">
            <h2 className="eyebrow mb-3 text-ivory/50">Wedding journey</h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-1">
              {links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <a
                    href={link.href}
                    className="tap-target inline-flex items-center text-[0.9375rem] text-ivory/85 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-ivory/15 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-md text-[0.8125rem] leading-relaxed text-ivory/60">
              <span className="eyebrow mb-1 block text-ivory/45">Privacy</span>
              {privacyNotice}
            </p>

            <div className="flex flex-col items-start gap-3">
              <span className="eyebrow text-ivory/45">Accessibility</span>
              <MotionToggle className="text-ivory/80 hover:text-gold-light" />
              <a
                href="#welcome"
                className="tap-target inline-flex items-center gap-2 text-[0.8125rem] text-ivory/80 underline decoration-gold/50 underline-offset-4 hover:text-gold-light"
              >
                <Icons.arrowUp className="h-4 w-4" />
                Back to the top
              </a>
            </div>
          </div>

          <p className="mt-8 text-[0.6875rem] tracking-[0.14em] text-ivory/35 uppercase">
            A private wedding invitation · Please do not share your personal link
          </p>
        </div>
      </div>
    </footer>
  );
}
