"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/components/motion/MotionPreference";

/**
 * Page-level motion controller.
 *
 * Sections stay server-rendered and simply declare intent with data
 * attributes, which keeps all copy in the HTML and lets the page work with no
 * JavaScript at all (spec §61):
 *
 *   data-reveal            → fades and lifts into place once, on scroll
 *   data-reveal-group      → staggers the direct [data-reveal] children
 *   data-parallax="0.12"   → depth factor for a layer inside a `.scene`
 *   data-hero-layer        → part of the opening scene timeline
 *   data-draw              → SVG line that draws as the timeline scrolls past
 *
 * Everything runs inside a `gsap.matchMedia` block for
 * `prefers-reduced-motion: no-preference`, so a guest who asks for reduced
 * motion gets plain content with no parallax, no masks and no auto-panning
 * (spec §54).
 */
export function MotionRoot() {
  const { reduced } = useMotionPreference();

  useEffect(() => {
    const root = document.documentElement;

    // Explicit guest choice, or the device setting: show everything at once and
    // register no timelines at all.
    if (reduced) {
      root.classList.remove("motion-ready");
      root.classList.add("reduced-motion");
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => {
          el.classList.add("is-revealed");
          el.style.removeProperty("transform");
          el.style.removeProperty("opacity");
        });
      return () => root.classList.remove("reduced-motion");
    }

    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("motion-ready");

    const mm = gsap.matchMedia();

    // ---- Full motion -------------------------------------------------------
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Opening scene: the layered artwork settles into focus. The hero
        // *text* is deliberately not animated here — it is revealed with CSS
        // instead, so the couple's names never depend on a JavaScript frame
        // (spec §54: essential information appears before decorative animation
        // completes).
        const heroLayers = gsap.utils.toArray<HTMLElement>("[data-hero-layer]");
        if (heroLayers.length) {
          gsap.from(heroLayers, {
            opacity: 0,
            scale: 1.04,
            duration: 1.1,
            ease: "power2.out",
            stagger: 0.09,
          });
        }

        // Staggered groups
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = gsap.utils.toArray<HTMLElement>(
            group.querySelectorAll<HTMLElement>("[data-reveal]"),
          );
          if (!items.length) return;
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
            onStart: () => items.forEach((el) => el.classList.add("is-revealed")),
          });
          gsap.set(items, { y: 22 });
        });

        // Individual reveals (anything not already handled by a group)
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .filter((el) => !el.closest("[data-reveal-group]"))
          .forEach((el) => {
            gsap.set(el, { y: 22 });
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              onStart: () => el.classList.add("is-revealed"),
            });
          });

        // Camera-like parallax inside each layered scene. Only transforms are
        // animated, and each scene is its own trigger so off-screen work stops.
        gsap.utils.toArray<HTMLElement>(".scene").forEach((scene) => {
          const layers = gsap.utils.toArray<HTMLElement>(
            scene.querySelectorAll<HTMLElement>("[data-parallax]"),
          );
          layers.forEach((layer) => {
            const depth = parseFloat(layer.dataset.parallax ?? "0") || 0;
            if (!depth) return;
            gsap.fromTo(
              layer,
              { yPercent: -depth * 60, scale: 1 + depth * 0.35 },
              {
                yPercent: depth * 60,
                scale: 1 + depth * 0.12,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });
        });

        // Timeline spine draws as the events chapter scrolls past.
        gsap.utils.toArray<SVGGeometryElement>("[data-draw]").forEach((line) => {
          gsap.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line.closest("[data-draw-scope]") ?? line,
                start: "top 75%",
                end: "bottom 65%",
                scrub: 0.4,
              },
            },
          );
        });
      });

      return () => ctx.revert();
    });

    // ---- Reduced motion ----------------------------------------------------
    mm.add("(prefers-reduced-motion: reduce)", () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-revealed"));
      return () => {};
    });

    // Late-loading webfonts change section heights.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);

    return () => {
      mm.revert();
      root.classList.remove("motion-ready");
    };
  }, [reduced]);

  return null;
}
