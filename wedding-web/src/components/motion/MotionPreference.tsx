"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Icons } from "@/components/art/Glyph";

/**
 * Guest-facing motion control.
 *
 * The device's `prefers-reduced-motion` setting is always respected. This adds
 * an explicit in-page control as well, because plenty of guests never change
 * the OS setting but still want a calmer page (spec §54, §61 accessibility
 * controls in the footer).
 *
 * State lives outside React — in `localStorage` and a media query — so it is
 * read with `useSyncExternalStore`. That keeps the server snapshot stable
 * (motion allowed) and avoids a hydration mismatch.
 */

const STORAGE_KEY = "wedding:motion-preference";
const CHANGE_EVENT = "wedding:motion-preference-change";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

type MotionPreference = "system" | "reduced";

/** Snapshot is a primitive so repeated reads compare equal. */
type Snapshot = `${MotionPreference}|${"reduced" | "ok"}`;

function readStored(): MotionPreference {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "reduced" ? "reduced" : "system";
  } catch {
    // Private browsing can throw on access; the default is fine.
    return "system";
  }
}

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener("change", onChange);
  // `storage` covers other tabs, the custom event covers this one.
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    query.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot(): Snapshot {
  const system = window.matchMedia(REDUCE_QUERY).matches ? "reduced" : "ok";
  return `${readStored()}|${system}`;
}

function getServerSnapshot(): Snapshot {
  return "system|ok";
}

export function useMotionPreference() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preference, system] = snapshot.split("|") as [MotionPreference, "reduced" | "ok"];

  const toggle = useCallback(() => {
    const next: MotionPreference = readStored() === "reduced" ? "system" : "reduced";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return {
    preference,
    /** Resolved answer: the device setting OR the explicit choice. */
    reduced: preference === "reduced" || system === "reduced",
    toggle,
  };
}

/** Footer control. Uses a text label, never colour or icon alone. */
export function MotionToggle({ className = "" }: { className?: string }) {
  const { preference, reduced, toggle } = useMotionPreference();
  const explicitlyReduced = preference === "reduced";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={explicitlyReduced}
      className={`tap-target inline-flex items-center gap-2 text-[0.8125rem] underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-current ${className}`}
    >
      <Icons.leaf className="h-4 w-4" />
      {explicitlyReduced ? "Motion is reduced — restore animation" : "Reduce motion on this page"}
      {reduced && !explicitlyReduced && (
        <span className="sr-only">
          Your device is already set to reduced motion, so animation is off.
        </span>
      )}
    </button>
  );
}
