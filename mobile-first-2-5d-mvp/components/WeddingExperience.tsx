"use client";

/* eslint-disable @next/next/no-img-element */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CSSProperties, FormEvent } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { QualityTier, WeddingManifest, WeddingScene } from "@/lib/wedding-manifest";

type ExperiencePhase = "loading" | "choice" | "seal" | "journey";
type Language = "en" | "hi";
type AudioGraph = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

const PETALS = Array.from({ length: 14 }, (_, index) => index);
const QUALITY_LABELS: Record<QualityTier, string> = {
  enhanced: "Enhanced",
  standard: "Standard",
  lite: "Lite",
};

function detectQuality(): QualityTier {
  if (typeof window === "undefined") return "standard";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "lite";

  const device = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = typeof device.deviceMemory === "number" && device.deviceMemory <= 4;
  const lowConcurrency = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  return lowMemory || lowConcurrency ? "standard" : "enhanced";
}

function calendarTimestamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function SceneChapter({
  scene,
  index,
  total,
  active,
  onAction,
}: {
  scene: WeddingScene;
  index: number;
  total: number;
  active: boolean;
  onAction: () => void;
}) {
  return (
    <section
      id={scene.id}
      className={`scene scene--${scene.palette}${active ? " is-active" : ""}`}
      data-scene-index={index}
      aria-labelledby={`${scene.id}-title`}
    >
      <div className="scene-sticky">
        <div className="scene-art" aria-hidden="true">
          {scene.layers.map((layer, layerIndex) => (
            <img
              key={layer.id}
              className={`scene-layer scene-layer--${layerIndex}`}
              src={layer.src}
              alt=""
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              data-depth={layer.depth}
              data-motion={layer.motion}
            />
          ))}
          <div className="scene-atmosphere" />
          <div className="scene-vignette" />
          <div className="petal-field">
            {PETALS.map((petal) => (
              <i
                key={petal}
                style={{ "--petal": petal, left: `${(petal * 17 + 7) % 96}%` } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="chapter-marker" aria-hidden="true">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <i />
          <span>{String(total).padStart(2, "0")}</span>
        </div>

        <div className="scene-copy">
          <p className="eyebrow">{scene.eyebrow}</p>
          <h2 id={`${scene.id}-title`}>{scene.title}</h2>
          <p className="scene-description">{scene.copy}</p>

          {scene.date && (
            <dl className="event-ribbon" aria-label={`${scene.title} details`}>
              <div>
                <dt>When</dt>
                <dd>{scene.date} · {scene.time}</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>{scene.venue}</dd>
              </div>
              <div>
                <dt>Dress</dt>
                <dd>{scene.attire}</dd>
              </div>
            </dl>
          )}

          <button className="chapter-action" type="button" onClick={onAction}>
            <span>{scene.actionLabel}</span>
            <span className="down-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function WeddingExperience({ manifest }: { manifest: WeddingManifest }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const quickDetailsRef = useRef<HTMLDialogElement>(null);
  const rsvpRef = useRef<HTMLDialogElement>(null);
  const audioRef = useRef<AudioGraph | null>(null);

  const [phase, setPhase] = useState<ExperiencePhase>("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const [quality, setQuality] = useState<QualityTier>(manifest.quality.default);
  const [activeScene, setActiveScene] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [captionsOpen, setCaptionsOpen] = useState(false);
  const [sealOpening, setSealOpening] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpName, setRsvpName] = useState("Guest");
  const [shareStatus, setShareStatus] = useState("Share invitation");

  const transcript = language === "hi"
    ? "अपने परिवारों के साथ, आरव और मीरा आपको जयपुर में उनके नए सफर का जश्न मनाने के लिए आमंत्रित करते हैं।"
    : manifest.voice.transcript;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setQuality(detectQuality()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const sources = manifest.scenes.slice(0, 2).flatMap((scene) => scene.layers.map((layer) => layer.src));
    let settled = 0;
    let cancelled = false;
    let completionTimer: number | undefined;

    const markSettled = () => {
      settled += 1;
      if (cancelled) return;
      setLoadProgress(Math.round((settled / sources.length) * 100));
      if (settled === sources.length) {
        completionTimer = window.setTimeout(() => setPhase("choice"), 360);
      }
    };

    sources.forEach((source) => {
      const image = new window.Image();
      image.onload = markSettled;
      image.onerror = markSettled;
      image.src = source;
    });

    return () => {
      cancelled = true;
      if (completionTimer) window.clearTimeout(completionTimer);
    };
  }, [manifest.scenes]);

  useEffect(() => {
    const locked = phase !== "journey";
    document.documentElement.classList.toggle("invitation-locked", locked);
    return () => document.documentElement.classList.remove("invitation-locked");
  }, [phase]);

  useEffect(() => {
    return () => {
      audioRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
      void audioRef.current?.context.close();
    };
  }, []);

  const startAmbient = useCallback(async () => {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;

    if (!audioRef.current) {
      const context = new AudioContextClass();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      gain.gain.value = 0;
      filter.type = "lowpass";
      filter.frequency.value = 620;
      gain.connect(filter);
      filter.connect(context.destination);

      const frequencies = [130.81, 196, 261.63];
      const oscillators = frequencies.map((frequency, index) => {
        const oscillator = context.createOscillator();
        const toneGain = context.createGain();
        oscillator.type = index === 1 ? "triangle" : "sine";
        oscillator.frequency.value = frequency;
        toneGain.gain.value = index === 0 ? 0.55 : 0.18;
        oscillator.connect(toneGain);
        toneGain.connect(gain);
        oscillator.start();
        return oscillator;
      });
      audioRef.current = { context, gain, oscillators };
    }

    const { context, gain } = audioRef.current;
    if (context.state === "suspended") await context.resume();
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.028, context.currentTime + 1.4);
    setSoundOn(true);
  }, []);

  const stopAmbient = useCallback(() => {
    const graph = audioRef.current;
    if (graph) {
      graph.gain.gain.cancelScheduledValues(graph.context.currentTime);
      graph.gain.gain.setValueAtTime(graph.gain.gain.value, graph.context.currentTime);
      graph.gain.gain.linearRampToValueAtTime(0, graph.context.currentTime + 0.35);
    }
    setSoundOn(false);
  }, []);

  useLayoutEffect(() => {
    if (phase !== "journey" || !rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || quality === "lite";
    const activeTriggers: ScrollTrigger[] = [];

    const context = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".scene");
      scenes.forEach((scene, index) => {
        activeTriggers.push(ScrollTrigger.create({
          trigger: scene,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveScene(index),
          onEnterBack: () => setActiveScene(index),
        }));

        if (reducedMotion) return;

        const copy = scene.querySelector<HTMLElement>(".scene-copy");
        if (copy) {
          gsap.fromTo(copy,
            { autoAlpha: 0, y: quality === "enhanced" ? 42 : 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: scene, start: "top 68%", toggleActions: "play none none reverse" },
            },
          );
        }

        scene.querySelectorAll<HTMLElement>(".scene-layer").forEach((layer) => {
          const depth = Number(layer.dataset.depth ?? 0.3);
          const distance = quality === "enhanced" ? 10 + depth * 14 : 5 + depth * 7;
          gsap.fromTo(layer,
            { yPercent: distance * 0.5, scale: 1 + depth * 0.018 },
            {
              yPercent: -distance * 0.5,
              ease: "none",
              scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 1.1 },
            },
          );
        });
      });
    }, rootRef);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      activeTriggers.forEach((trigger) => trigger.kill());
      context.revert();
    };
  }, [phase, quality]);

  const beginInvitation = async (withSound: boolean) => {
    if (withSound) await startAmbient();
    else stopAmbient();
    setPhase("seal");
  };

  const openSeal = () => {
    if (sealOpening) return;
    setSealOpening(true);
    navigator.vibrate?.(12);
    window.setTimeout(() => {
      setPhase("journey");
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 920);
  };

  const goToScene = (index: number) => {
    const nextScene = manifest.scenes[index + 1];
    if (nextScene) {
      document.getElementById(nextScene.id)?.scrollIntoView({ behavior: quality === "lite" ? "auto" : "smooth" });
    } else {
      rsvpRef.current?.showModal();
    }
  };

  const cycleQuality = () => {
    const current = manifest.quality.tiers.indexOf(quality);
    setQuality(manifest.quality.tiers[(current + 1) % manifest.quality.tiers.length]);
  };

  const downloadCalendar = () => {
    const start = new Date(manifest.wedding.dateISO);
    const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Aarav and Meera//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `DTSTART:${calendarTimestamp(start)}`,
      `DTEND:${calendarTimestamp(end)}`,
      `SUMMARY:${manifest.couple.partnerOne} & ${manifest.couple.partnerTwo} — Wedding`,
      `LOCATION:${manifest.wedding.venue}, ${manifest.wedding.city}`,
      "DESCRIPTION:Join us for a royal celebration in Jaipur.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "aarav-meera-wedding.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setRsvpName(String(data.get("name") || "Guest"));
    setRsvpSubmitted(true);
  };

  const shareInvitation = async () => {
    const shareData = {
      title: `${manifest.couple.partnerOne} & ${manifest.couple.partnerTwo}`,
      text: `Join us in ${manifest.wedding.city} on ${manifest.wedding.date}.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied");
        window.setTimeout(() => setShareStatus("Share invitation"), 1800);
      }
    } catch {
      // Sharing can be cancelled without changing the experience.
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${manifest.wedding.venue}, ${manifest.wedding.city}`)}`;

  return (
    <div ref={rootRef} className={`experience-shell quality-${quality} phase-${phase}`}>
      <a className="skip-link" href="#palace">Skip to invitation</a>

      {phase === "loading" && (
        <div className="entry-portal" role="status" aria-live="polite">
          <div className="entry-pattern" />
          <div className="loader-mark" aria-hidden="true">{manifest.couple.monogram}</div>
          <p className="entry-kicker">A royal invitation is being prepared</p>
          <div className="loader-track"><i style={{ width: `${loadProgress}%` }} /></div>
          <p className="loader-value">{loadProgress}%</p>
        </div>
      )}

      {phase === "choice" && (
        <div className="entry-portal entry-portal--choice">
          <div className="entry-pattern" />
          <div className="choice-card">
            <p className="eyebrow">You are warmly invited</p>
            <h1>{manifest.couple.partnerOne} <em>&</em> {manifest.couple.partnerTwo}</h1>
            <p className="guest-line">For {manifest.guest.displayName}</p>
            <div className="language-choice">
              <label htmlFor="language">Narration language</label>
              <select id="language" value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
            <button className="primary-entry" type="button" onClick={() => void beginInvitation(true)}>
              Enter with sound
            </button>
            <button className="quiet-entry" type="button" onClick={() => void beginInvitation(false)}>Continue quietly</button>
            <p className="audio-note">Ambient audio is optional. Narration transcript remains available throughout.</p>
          </div>
        </div>
      )}

      {phase === "seal" && (
        <div className={`seal-gate${sealOpening ? " is-opening" : ""}`}>
          <div className="entry-pattern" />
          <div className="envelope" aria-hidden="true">
            <div className="envelope-letter"><span>{manifest.couple.monogram}</span></div>
            <div className="envelope-back" />
            <div className="envelope-flap" />
          </div>
          <div className="seal-content">
            <p className="eyebrow">The honour of your presence is requested</p>
            <button className="royal-seal" type="button" onClick={openSeal} aria-label="Break the royal seal and open the invitation">
              <span>{manifest.couple.monogram}</span>
            </button>
            <p>Touch the seal to begin</p>
          </div>
        </div>
      )}

      {phase === "journey" && (
        <>
          <header className="journey-hud">
            <a className="hud-monogram" href="#palace" aria-label="Return to the first chapter">{manifest.couple.monogram}</a>
            <div className="hud-actions">
              <button type="button" onClick={() => quickDetailsRef.current?.showModal()}>Details</button>
              <button type="button" className={captionsOpen ? "is-on" : ""} onClick={() => setCaptionsOpen((open) => !open)} aria-pressed={captionsOpen}>CC</button>
              <button type="button" className={soundOn ? "is-on" : ""} onClick={() => soundOn ? stopAmbient() : void startAmbient()} aria-pressed={soundOn} aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}>Sound</button>
            </div>
          </header>

          <nav className="chapter-nav" aria-label="Invitation chapters">
            {manifest.scenes.map((scene, index) => (
              <a key={scene.id} href={`#${scene.id}`} className={activeScene === index ? "is-active" : ""} aria-label={scene.chapter} aria-current={activeScene === index ? "step" : undefined}><span /></a>
            ))}
          </nav>

          <button className="quality-switch" type="button" onClick={cycleQuality} aria-label={`Visual quality: ${QUALITY_LABELS[quality]}. Activate to change.`}>Visuals · {QUALITY_LABELS[quality]}</button>

          {captionsOpen && (
            <aside className="caption-card" aria-live="polite">
              <span>Narration transcript</span>
              <p>{transcript}</p>
              <button type="button" onClick={() => setCaptionsOpen(false)} aria-label="Close transcript">×</button>
            </aside>
          )}
        </>
      )}

      <main className="journey" aria-hidden={phase !== "journey"}>
        {manifest.scenes.map((scene, index) => (
          <SceneChapter
            key={scene.id}
            scene={scene}
            index={index}
            total={manifest.scenes.length}
            active={activeScene === index}
            onAction={() => goToScene(index)}
          />
        ))}

        <section className="finale" aria-labelledby="finale-title">
          <div className="finale-pattern" />
          <p className="eyebrow">With love, from Jaipur</p>
          <div className="finale-monogram" aria-hidden="true">{manifest.couple.monogram}</div>
          <h2 id="finale-title">Will you celebrate with us?</h2>
          <p>{manifest.wedding.date} · {manifest.wedding.venue}</p>
          <div className="finale-actions">
            <button className="finale-primary" type="button" onClick={() => rsvpRef.current?.showModal()}>RSVP now</button>
            <button type="button" onClick={downloadCalendar}>Add to calendar</button>
            <button type="button" onClick={() => void shareInvitation()}>{shareStatus}</button>
          </div>
          <button className="replay-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: quality === "lite" ? "auto" : "smooth" })}>Replay the journey ↑</button>
          <p className="prototype-note">A 2.5D invitation preview · No WebGL or runtime 3D</p>
        </section>
      </main>

      <dialog ref={quickDetailsRef} className="invitation-dialog details-dialog" onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
        <div className="dialog-panel">
          <button className="dialog-close" type="button" onClick={() => quickDetailsRef.current?.close()} aria-label="Close Quick Details">×</button>
          <p className="eyebrow">At a glance</p>
          <h2>Quick Details</h2>
          <p className="dialog-intro">Everything you need for our Jaipur celebration.</p>
          <div className="event-list">
            {manifest.scenes.filter((scene) => scene.date).map((scene) => (
              <article key={scene.id}>
                <span>{scene.chapter.replace("Celebration ", "")}</span>
                <div><h3>{scene.title}</h3><p>{scene.date} · {scene.time}</p><p>{scene.venue} · {scene.attire}</p></div>
              </article>
            ))}
          </div>
          <div className="dialog-actions">
            <button type="button" onClick={downloadCalendar}>Add wedding to calendar</button>
            <a href={mapUrl} target="_blank" rel="noreferrer">Open venue in Maps</a>
            <button className="accent-button" type="button" onClick={() => { quickDetailsRef.current?.close(); rsvpRef.current?.showModal(); }}>Respond to invitation</button>
          </div>
          <p className="rsvp-date">Kindly respond by {manifest.wedding.rsvpBy}</p>
        </div>
      </dialog>

      <dialog ref={rsvpRef} className="invitation-dialog rsvp-dialog" onClose={() => setRsvpSubmitted(false)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
        <div className="dialog-panel">
          <button className="dialog-close" type="button" onClick={() => rsvpRef.current?.close()} aria-label="Close RSVP">×</button>
          {!rsvpSubmitted ? (
            <>
              <p className="eyebrow">Répondez s’il vous plaît</p>
              <h2>Join the celebration</h2>
              <p className="dialog-intro">We hope you can be part of our beginning.</p>
              <form onSubmit={submitRsvp}>
                <label>Guest name<input name="name" autoComplete="name" required placeholder="Your full name" /></label>
                <fieldset>
                  <legend>Will you attend?</legend>
                  <label className="radio-option"><input type="radio" name="attendance" value="yes" required /><span>Joyfully accepts</span></label>
                  <label className="radio-option"><input type="radio" name="attendance" value="no" /><span>Regretfully declines</span></label>
                </fieldset>
                <div className="form-row">
                  <label>Party size<select name="partySize" defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></label>
                  <label>Stay needed?<select name="stay" defaultValue="no"><option value="no">No</option><option value="yes">Yes, please</option></select></label>
                </div>
                <label>Dietary notes<textarea name="dietary" rows={3} placeholder="Allergies or preferences" /></label>
                <button className="accent-button submit-rsvp" type="submit">Send RSVP</button>
                <p className="form-note">MVP preview: this response is confirmed locally and is not sent to a server.</p>
              </form>
            </>
          ) : (
            <div className="rsvp-success" role="status">
              <div className="rsvp-success-mark" aria-hidden="true"><i /></div>
              <p className="eyebrow">Response received</p>
              <h2>Thank you, {rsvpName}</h2>
              <p>Your demo response has been recorded for this preview. We cannot wait to celebrate together.</p>
              <button type="button" onClick={() => rsvpRef.current?.close()}>Return to invitation</button>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
