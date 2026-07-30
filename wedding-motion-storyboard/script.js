(() => {
  "use strict";

  const body = document.body;
  const toggle = document.querySelector(".plan-toggle");
  const replay = document.querySelector(".replay");
  const beats = [...document.querySelectorAll("[data-beat]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  body.classList.add("show-plan");
  toggle.addEventListener("click", () => {
    const visible = body.classList.toggle("show-plan");
    toggle.setAttribute("aria-pressed", String(visible));
    toggle.textContent = `Layer plan: ${visible ? "on" : "off"}`;
  });
  replay.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
    document.querySelectorAll(".gate").forEach((gate) => { gate.style.transform = gate.classList.contains("gate--left") ? "translateX(-92%)" : "translateX(92%)"; });
    document.querySelector(".copy--opening").style.opacity = "1";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const setBeat = (number) => beats.forEach((beat) => beat.classList.toggle("active", beat.dataset.beat === String(number)));
  setBeat(1);

  const opening = gsap.timeline({ defaults: { ease: "power4.out" } });
  opening
    .from(".frame i:nth-child(odd)", { scaleX: 0, transformOrigin: "left", duration: 1.1, stagger: .08 })
    .from(".frame i:nth-child(even)", { scaleY: 0, transformOrigin: "top", duration: 1.1, stagger: .08 }, 0)
    .from(".copy--opening .eyebrow", { opacity: 0, x: -20, duration: .7 }, .25)
    .from(".copy--opening h1 span", { yPercent: 115, duration: .9, stagger: .09 }, .35)
    .from(".copy--opening .lede", { opacity: 0, y: 18, duration: .7 }, .75)
    .from(".scroll-cue", { opacity: 0, duration: .5 }, 1);

  const story = gsap.timeline({
    scrollTrigger: {
      trigger: ".gateway",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.25,
      onUpdate(self) {
        const progress = self.progress;
        setBeat(progress < .22 ? 1 : progress < .49 ? 2 : progress < .76 ? 3 : 4);
      },
    },
  });

  story
    // Beat 1: gates physically part and expose the palace.
    .to(".gate--left", { xPercent: -92, rotateY: -8, duration: 1.2, ease: "power2.inOut" }, 0)
    .to(".gate--right", { xPercent: 92, rotateY: 8, duration: 1.2, ease: "power2.inOut" }, 0)
    .to(".copy--opening", { opacity: 0, y: -38, duration: .65 }, .35)
    .to(".scroll-cue", { opacity: 0, duration: .35 }, .25)
    .to(".light-sweep", { xPercent: 68, duration: 1.2, ease: "none" }, 0)

    // Beat 2: camera travels through the arch; depth planes move at different rates.
    .fromTo(".layer--sky", { scale: 1.02, yPercent: 0 }, { scale: 1.08, yPercent: -2, duration: 1.3, ease: "none" }, .45)
    .fromTo(".layer--palace", { scale: 1.02, yPercent: 1 }, { scale: 1.25, yPercent: -7, duration: 1.3, ease: "none" }, .45)
    .to(".layer--foreground", { scale: 1.3, yPercent: -12, opacity: .46, duration: 1.3, ease: "none" }, .45)
    .to(".gate--left", { xPercent: -112, duration: .7, ease: "none" }, .8)
    .to(".gate--right", { xPercent: 112, duration: .7, ease: "none" }, .8)

    // Beat 3: couple receives focus while architecture falls away.
    .to(".layer--palace", { scale: 1.4, filter: "blur(5px) brightness(.68)", opacity: .72, duration: 1.1 }, 1.4)
    .fromTo(".layer--couple", { opacity: 0, yPercent: 12, scale: .88 }, { opacity: 1, yPercent: 0, scale: 1, duration: 1.1, ease: "power3.out" }, 1.35)
    .fromTo(".copy--couple", { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: .9, ease: "power3.out" }, 1.6)
    .to(".floral--left", { xPercent: -18, rotate: -4, duration: .9 }, 1.45)
    .to(".floral--right", { xPercent: 18, rotate: 4, duration: .9 }, 1.45)

    // Beat 4: copy clears and one useful detail card concludes the section.
    .to(".copy--couple", { opacity: 0, x: -28, duration: .6 }, 2.35)
    .to(".layer--couple", { xPercent: window.innerWidth >= 760 ? -18 : 0, scale: 1.08, filter: "brightness(.72)", duration: .85 }, 2.3)
    .to(".event-card", { opacity: 1, y: 0, duration: .85, ease: "power3.out" }, 2.55)
    .to(".grade", { backgroundColor: "rgba(22,3,10,.24)", duration: .8 }, 2.5);

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
})();
