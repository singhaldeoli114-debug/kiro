import { FloralDivider } from "@/components/art/Monogram";
import { Icons } from "@/components/art/Glyph";

/**
 * Shared card geometry, button style and section rhythm. Event pages will reuse
 * these unchanged and personalise only the accent (spec §55).
 */

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "ivory",
  divider = true,
  className = "",
  labelledBy,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  tone?: "ivory" | "parchment" | "ink";
  divider?: boolean;
  className?: string;
  labelledBy?: string;
}) {
  const toneClass =
    tone === "parchment"
      ? "bg-parchment"
      : tone === "ink"
        ? "bg-ink text-ivory"
        : "bg-ivory";

  const headingId = title ? `${id}-heading` : labelledBy;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${toneClass} scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-2xl lg:max-w-4xl">
        {(eyebrow || title) && (
          <header className="mb-8 sm:mb-10" data-reveal>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2
                id={headingId}
                className={`text-[2rem] leading-[1.1] sm:text-[2.6rem] ${
                  tone === "ink" ? "text-ivory" : "text-ink"
                }`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-4 max-w-prose text-[0.975rem] leading-relaxed ${
                  tone === "ink" ? "text-ivory/75" : "text-ink-soft"
                }`}
              >
                {intro}
              </p>
            )}
            {divider && <FloralDivider className="mt-7 justify-start" />}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * Primary in-page or outbound action. Renders an anchor so that keyboard and
 * screen-reader behaviour is the browser default.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
  icon,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "quiet";
  external?: boolean;
  className?: string;
  icon?: React.ReactNode;
}) {
  const base =
    "tap-target inline-flex items-center justify-center gap-2 px-5 py-3 text-[0.8125rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200";

  const styles = {
    solid: "bg-crimson text-ivory hover:bg-crimson-deep",
    outline: "border border-gold/70 text-ink hover:bg-gold-pale/60",
    quiet: "text-crimson underline decoration-gold/60 underline-offset-4 hover:decoration-crimson px-0",
  }[variant];

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {icon ?? null}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

/** Small factual chip: dress-code colours, dietary markers, palette swatches. */
export function Chip({
  children,
  tone = "sand",
}: {
  children: React.ReactNode;
  tone?: "sand" | "gold" | "green" | "muted";
}) {
  const styles = {
    sand: "border-sand bg-white/70 text-ink-soft",
    gold: "border-gold/50 bg-gold-pale/50 text-ink",
    green: "border-event-mehndi/40 bg-event-mehndi/8 text-event-mehndi",
    muted: "border-sand/70 bg-transparent text-ink-muted",
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.75rem] leading-5 ${styles}`}
    >
      {children}
    </span>
  );
}

/** Label/value row used by every details block. */
export function DetailRow({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 border-b border-sand/60 py-3 last:border-b-0">
      {icon && <span className="mt-0.5 shrink-0 text-gold">{icon}</span>}
      <div className="min-w-0 flex-1">
        <dt className="eyebrow mb-0.5">{label}</dt>
        <dd className="text-[0.9375rem] leading-relaxed text-ink">{children}</dd>
      </div>
    </div>
  );
}

/** RSVP state, rendered as text rather than colour alone (spec §61). */
export function RsvpBadge({ state }: { state: "attending" | "not-attending" | "undecided" | "pending" }) {
  const map = {
    attending: { label: "You are attending", cls: "border-event-mehndi/50 text-event-mehndi", icon: <Icons.check className="h-3.5 w-3.5" /> },
    "not-attending": { label: "You declined", cls: "border-ink-muted/40 text-ink-muted", icon: null },
    undecided: { label: "Undecided", cls: "border-gold/60 text-gold", icon: null },
    pending: { label: "Response needed", cls: "border-crimson/40 text-crimson", icon: <Icons.info className="h-3.5 w-3.5" /> },
  }[state];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.1em] uppercase ${map.cls}`}
    >
      {map.icon}
      {map.label}
    </span>
  );
}
