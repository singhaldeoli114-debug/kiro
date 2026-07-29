"use client";

import { useSyncExternalStore } from "react";

interface CountdownProps {
  /** ISO 8601 with offset. */
  start: string;
  end?: string;
  label: string;
}

/**
 * Shared clock.
 *
 * Seconds are deliberately never shown or ticked: the snapshot is a 30-second
 * bucket, so the component re-renders at most twice a minute and stays off the
 * battery (spec §28). The value is also refreshed when the tab becomes visible
 * again, which is when a stale countdown would actually be noticed.
 */
const BUCKET_MS = 30_000;

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, BUCKET_MS);
  const onVisibility = () => {
    if (!document.hidden) onStoreChange();
  };
  document.addEventListener("visibilitychange", onVisibility);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

function getSnapshot() {
  return Math.floor(Date.now() / BUCKET_MS);
}

/** 0 marks "not yet running in the browser". */
function getServerSnapshot() {
  return 0;
}

function parts(msRemaining: number) {
  const totalMinutes = Math.floor(msRemaining / 60_000);
  return {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
  };
}

export function Countdown({ start, end, label }: CountdownProps) {
  const bucket = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Server render and first paint show the label only, so the markup is stable
  // and there is no hydration mismatch on a time-dependent value.
  if (bucket === 0) {
    return (
      <p className="text-[0.8125rem] text-ink-muted" aria-live="polite">
        {label}
      </p>
    );
  }

  const now = bucket * BUCKET_MS;
  const startMs = new Date(start).getTime();
  const endMs = end ? new Date(end).getTime() : startMs;

  if (now >= endMs) {
    return <p className="text-[0.8125rem] text-ink-muted">This celebration has finished.</p>;
  }

  if (now >= startMs) {
    return (
      <p className="text-[0.8125rem] font-medium tracking-[0.12em] text-crimson uppercase">
        Happening now
      </p>
    );
  }

  const { days, hours, minutes } = parts(startMs - now);

  if (days === 0 && hours === 0) {
    return (
      <p className="text-[0.8125rem] font-medium tracking-[0.12em] text-crimson uppercase">
        Starting in {minutes} minute{minutes === 1 ? "" : "s"}
      </p>
    );
  }

  return (
    <dl className="flex items-baseline gap-4" aria-label={`Time until ${label}`}>
      {[
        { value: days, unit: days === 1 ? "day" : "days" },
        { value: hours, unit: hours === 1 ? "hour" : "hours" },
        { value: minutes, unit: minutes === 1 ? "minute" : "minutes" },
      ].map((item) => (
        <div key={item.unit} className="flex flex-col">
          <dd className="font-display text-[1.75rem] leading-none text-ink tabular-nums">
            {item.value}
          </dd>
          <dt className="eyebrow mt-1">{item.unit}</dt>
        </div>
      ))}
    </dl>
  );
}
