/**
 * Couple monogram inside a mandala ring. Shared by the header, hero and
 * closing so the identity stays constant across the whole site (spec §55).
 */
export function Monogram({
  initials,
  size = 44,
  className = "",
  tone = "gold",
}: {
  initials: string;
  size?: number;
  className?: string;
  tone?: "gold" | "ink" | "ivory";
}) {
  const stroke =
    tone === "gold" ? "var(--color-gold)" : tone === "ivory" ? "var(--color-ivory)" : "var(--color-ink)";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${initials} monogram`}
    >
      <g fill="none" stroke={stroke} strokeWidth="1.1">
        <circle cx="50" cy="50" r="46" opacity="0.45" />
        <circle cx="50" cy="50" r="40" strokeDasharray="1.5 5" opacity="0.75" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 50 + Math.cos(a) * 46;
          const y = 50 + Math.sin(a) * 46;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="5.5"
              ry="2.4"
              opacity="0.55"
              transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`}
            />
          );
        })}
      </g>
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill={stroke}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: initials.length > 3 ? 26 : 32,
          letterSpacing: "0.02em",
        }}
      >
        {initials}
      </text>
    </svg>
  );
}

/** Ornamental divider between chapters. */
export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="rule-gold w-16 opacity-60 sm:w-24" />
      <svg viewBox="0 0 40 20" className="h-4 w-10 text-gold" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M20 3c3.5 3 5 5 5 7s-1.5 4-5 7c-3.5-3-5-5-5-7s1.5-4 5-7Z" />
        <path d="M4 10h9M27 10h9" />
        <circle cx="20" cy="10" r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <span className="rule-gold w-16 opacity-60 sm:w-24" />
    </div>
  );
}
