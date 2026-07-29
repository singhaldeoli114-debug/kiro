"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icons } from "@/components/art/Glyph";
import { Monogram } from "@/components/art/Monogram";
import type { HeaderData } from "@/components/chrome/types";

/**
 * Minimal website header (spec §3.1): monogram, sound control, menu button and
 * an optional language control. It becomes compact after scrolling and never
 * behaves like a bottom app tab bar. The menu is a full-height drawer of
 * ordinary links (spec §3.2).
 */
export function SiteHeader({ data }: { data: HeaderData }) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState(data.languages[0]?.code ?? "en");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the drawer and returns focus to the button that opened it.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const toggleSound = useCallback(() => {
    const element = audioRef.current;
    if (!element) return;
    if (soundOn) {
      element.pause();
      setSoundOn(false);
      return;
    }
    // Playback only ever starts from a user gesture (spec §6.3).
    void element.play().then(
      () => setSoundOn(true),
      () => setSoundOn(false),
    );
  }, [soundOn]);

  const currentLanguage = data.languages.find((l) => l.code === language) ?? data.languages[0];

  return (
    <>
      <a
        href="#welcome"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-crimson focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
          compact
            ? "border-sand/70 bg-ivory/92 py-2 backdrop-blur-md"
            : "border-transparent bg-gradient-to-b from-ivory/85 to-transparent py-3"
        }`}
      >
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-4 sm:px-6">
          <a
            href="#welcome"
            className="tap-target -ml-1 flex items-center gap-2.5 pr-2"
            aria-label={`${data.coupleNames} — back to the top of the wedding journey`}
          >
            <Monogram initials={data.monogram} size={compact ? 32 : 38} />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-[1.0625rem] text-ink">{data.coupleNames}</span>
              <span className="text-[0.6875rem] tracking-[0.16em] text-ink-muted uppercase">
                {data.dateLabel}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-1">
            {data.audio && (
              <>
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-pressed={soundOn}
                  className="tap-target flex items-center justify-center rounded-full text-ink-soft transition-colors hover:text-crimson"
                >
                  {soundOn ? <Icons.soundOn /> : <Icons.soundOff />}
                  <span className="sr-only">
                    {soundOn ? "Turn wedding music off" : "Turn wedding music on"}
                  </span>
                </button>
                <audio ref={audioRef} src={data.audio.src} loop preload="none" />
              </>
            )}

            {data.languages.length > 1 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen((open) => !open)}
                  aria-expanded={langOpen}
                  className="tap-target flex items-center gap-1 px-2 text-[0.75rem] tracking-[0.1em] text-ink-soft uppercase hover:text-crimson"
                >
                  {currentLanguage?.code.toUpperCase()}
                  <Icons.chevronDown className="h-3.5 w-3.5" />
                  <span className="sr-only">Change language</span>
                </button>
                {langOpen && (
                  <ul className="card absolute right-0 top-full mt-1 min-w-32 py-1">
                    {data.languages.map((option) => (
                      <li key={option.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage(option.code);
                            setLangOpen(false);
                          }}
                          className="tap-target flex w-full items-center px-4 text-left text-[0.875rem] text-ink hover:bg-gold-pale/50"
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              className="tap-target -mr-1 flex items-center gap-2 pl-2 text-ink-soft hover:text-crimson"
            >
              <span className="hidden text-[0.6875rem] tracking-[0.18em] uppercase sm:inline">
                Menu
              </span>
              <Icons.menu />
              <span className="sr-only">Open the wedding menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu drawer — a website menu of ordinary links, not a tab panel. */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
        >
          <span className="sr-only">Close the menu</span>
        </button>

        <div
          ref={drawerRef}
          id={menuId}
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Wedding menu"
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-ivory shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand/70 px-5 py-4">
            <span className="flex items-center gap-2.5">
              <Monogram initials={data.monogram} size={34} />
              <span className="font-display text-[1.0625rem]">{data.coupleNames}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="tap-target flex items-center justify-center text-ink-soft hover:text-crimson"
            >
              <Icons.close />
              <span className="sr-only">Close the menu</span>
            </button>
          </div>

          <nav aria-label="Wedding sections" className="flex-1 overflow-y-auto px-5 py-4">
            <ul>
              {data.menu.map((link) => (
                <li key={`${link.label}-${link.href}`} className="border-b border-sand/50 last:border-b-0">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="tap-target flex items-center justify-between gap-3 py-3.5 font-display text-[1.375rem] text-ink transition-colors hover:text-crimson"
                  >
                    {link.label}
                    <Icons.arrowRight className="h-4 w-4 text-gold" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="border-t border-sand/70 px-5 py-4 text-[0.75rem] leading-relaxed text-ink-muted">
            {data.dateLabel} · {data.coupleNames}
          </p>
        </div>
      </div>
    </>
  );
}
