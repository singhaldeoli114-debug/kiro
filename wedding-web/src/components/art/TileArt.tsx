import type { ArtworkKey } from "@/lib/manifest/types";

/**
 * Lightweight square art for small slots (story milestones, gallery tiles,
 * family crests).
 *
 * A full layered scene at 120px wide costs a hundred DOM nodes and buys nothing
 * visible, so tiles get a flat two-tone treatment with a single motif instead.
 * This is what keeps the main page inside the mobile transfer budget
 * (spec §59) while the large slots keep their real depth.
 */

interface TilePalette {
  from: string;
  to: string;
  motif: string;
  accent: string;
}

const PALETTES: Record<ArtworkKey, TilePalette> = {
  "palace-arch": { from: "#f7e2c6", to: "#dfa184", motif: "#8f5a4c", accent: "#fbf7f1" },
  "couple-portrait": { from: "#fbf1e2", to: "#e6cbaa", motif: "#8c1d2f", accent: "#b3873c" },
  courtyard: { from: "#fdf0d2", to: "#eab95c", motif: "#c25a12", accent: "#f0b13f" },
  "garden-pavilion": { from: "#e4e6c8", to: "#7d9c7a", motif: "#0f4433", accent: "#f4d78a" },
  stage: { from: "#42327a", to: "#231a45", motif: "#e0c187", accent: "#f6e3bb" },
  mandap: { from: "#f0cdae", to: "#8c4a45", motif: "#8c1d2f", accent: "#f0a12c" },
  "terrace-night": { from: "#16233f", to: "#324563", motif: "#0c1526", accent: "#f3e6c8" },
  "lake-city": { from: "#f8e8cf", to: "#9db6c4", motif: "#8d5a58", accent: "#e7f0f4" },
  "family-crest": { from: "#f7ecd9", to: "#e6d2b6", motif: "#8c1d2f", accent: "#b3873c" },
};

function Motif({ artwork, palette }: { artwork: ArtworkKey; palette: TilePalette }) {
  const { motif, accent } = palette;

  switch (artwork) {
    case "palace-arch":
    case "lake-city":
      return (
        <g fill={motif}>
          <path d="M8 72h84v28H8z" />
          <path d="M28 72V52c0-9 6-15 14-15s14 6 14 15v20z" />
          <path d="M62 72V60c0-6 4-10 9-10s9 4 9 10v12z" />
          <g fill={accent} opacity="0.7">
            <rect x="34" y="60" width="6" height="10" rx="1" />
            <rect x="46" y="60" width="6" height="10" rx="1" />
          </g>
        </g>
      );

    case "couple-portrait":
      return (
        <g>
          <path d="M22 100V56c0-16 12-28 28-28s28 12 28 28v44z" fill={accent} opacity="0.35" />
          <circle cx="42" cy="52" r="8" fill={motif} />
          <circle cx="60" cy="50" r="8" fill={motif} opacity="0.75" />
          <path d="M30 100c0-14 6-22 12-22s12 8 12 22z" fill={motif} />
          <path d="M50 100c0-13 5-20 10-20s10 7 10 20z" fill={motif} opacity="0.75" />
        </g>
      );

    case "courtyard":
      return (
        <g>
          <circle cx="50" cy="54" r="18" fill={accent} />
          <circle cx="50" cy="54" r="8" fill={motif} />
          <path d="M14 88h72v12H14z" fill={motif} opacity="0.45" />
          <circle cx="22" cy="26" r="7" fill={accent} opacity="0.8" />
          <circle cx="80" cy="20" r="5" fill={accent} opacity="0.6" />
        </g>
      );

    case "garden-pavilion":
      return (
        <g>
          <path d="M50 92c0-24 10-40 34-46-4 30-16 44-34 46z" fill={motif} opacity="0.85" />
          <path d="M50 92c0-20-8-34-28-40 2 26 12 38 28 40z" fill={motif} opacity="0.6" />
          <path d="M50 96V44" stroke={accent} strokeWidth="2" />
          <circle cx="50" cy="34" r="6" fill={accent} />
        </g>
      );

    case "stage":
      return (
        <g>
          <path d="M50 10v18" stroke={motif} strokeWidth="2" />
          <path d="M32 28h36l-9 16H41z" fill={motif} opacity="0.75" />
          <circle cx="50" cy="52" r="4" fill={accent} />
          <path d="M10 84h80v16H10z" fill={motif} opacity="0.3" />
          <circle cx="24" cy="66" r="3" fill={accent} opacity="0.7" />
          <circle cx="76" cy="72" r="2.5" fill={accent} opacity="0.6" />
        </g>
      );

    case "mandap":
      return (
        <g>
          <path d="M18 34h64l-6 8H24z" fill={motif} />
          <rect x="24" y="42" width="6" height="52" fill={motif} />
          <rect x="70" y="42" width="6" height="52" fill={motif} />
          <path d="M50 60c9 12 6 20 3 24-1 3-2 5-3 6-1-1-2-3-3-6-3-4-6-12 3-24z" fill={accent} />
        </g>
      );

    case "terrace-night":
      return (
        <g>
          <circle cx="70" cy="28" r="11" fill={accent} opacity="0.9" />
          <path d="M8 76h84v24H8z" fill={motif} />
          <g fill={accent} opacity="0.6">
            <circle cx="22" cy="20" r="1.6" />
            <circle cx="38" cy="34" r="1.2" />
            <circle cx="16" cy="46" r="1.4" />
            <circle cx="88" cy="52" r="1.2" />
          </g>
          <g fill={motif} opacity="0.85">
            <rect x="14" y="66" width="8" height="12" rx="4" />
            <rect x="34" y="66" width="8" height="12" rx="4" />
            <rect x="54" y="66" width="8" height="12" rx="4" />
            <rect x="74" y="66" width="8" height="12" rx="4" />
          </g>
        </g>
      );

    case "family-crest":
    default:
      return (
        <g fill="none" stroke={accent} strokeWidth="1.6">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="24" strokeDasharray="2 5" />
          <path d="M50 30c10 8 10 16 10 22 0 8-5 13-10 16-5-3-10-8-10-16 0-6 0-14 10-22z" fill={motif} stroke="none" />
        </g>
      );
  }
}

export function TileArt({
  artwork,
  uid,
  className = "",
}: {
  artwork: ArtworkKey;
  /** Stable, unique id so gradient ids never collide in one document. */
  uid: string;
  className?: string;
}) {
  const palette = PALETTES[artwork] ?? PALETTES["palace-arch"];
  const gradientId = `tile-${uid.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div className={`scene aspect-square ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.from} />
            <stop offset="100%" stopColor={palette.to} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${gradientId})`} />
        <Motif artwork={artwork} palette={palette} />
      </svg>
    </div>
  );
}
