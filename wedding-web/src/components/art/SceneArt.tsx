import { TileArt } from "@/components/art/TileArt";
import type { ArtworkKey } from "@/lib/manifest/types";

/**
 * Layered 2.5D vector scenes.
 *
 * Approved bitmap artwork is not yet delivered for this wedding, so each scene
 * is drawn as a stack of SVG layers instead. This keeps the composition,
 * depth ordering and parallax behaviour of the final experience (spec §4) with
 * none of the payload, and gives every image slot a guaranteed static fallback
 * (spec §53). When a manifest asset gains an approved `src`, `SceneImage`
 * swaps the bitmap in and this art becomes the fallback.
 *
 * Layers are decorative: they are hidden from assistive technology and the
 * meaningful description stays on the surrounding figure (spec §61).
 */

type SceneMode = "hero" | "card" | "portrait" | "tile" | "fill";

interface SceneArtProps {
  artwork: ArtworkKey;
  /** Stable, unique id used to namespace gradient ids. */
  uid: string;
  mode?: SceneMode;
  className?: string;
}

/** Coordinates are rounded: `412.7223611075682` in markup is pure payload. */
const r = (n: number) => Math.round(n * 10) / 10;

/** Depth values follow the layer guidance in the platform spec (§4). */
const DEPTH = {
  sky: "0.02",
  distant: "0.06",
  mid: "0.1",
  focal: "0.14",
  near: "0.2",
} as const;

function Layer({
  depth,
  children,
}: {
  depth: string;
  children: React.ReactNode;
}) {
  return (
    <div className="scene-layer" data-parallax={depth} aria-hidden="true">
      {children}
    </div>
  );
}

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Rajasthani dome with a finial, used across the palace silhouettes. */
function Dome({ x, y, w, h, fill, opacity = 1 }: { x: number; y: number; w: number; h: number; fill: string; opacity?: number }) {
  const half = w / 2;
  return (
    <g fill={fill} opacity={opacity}>
      <path d={`M${x},${y} C${x},${y - h * 0.72} ${x + half * 0.42},${y - h} ${x + half},${y - h} C${x + w - half * 0.42},${y - h} ${x + w},${y - h * 0.72} ${x + w},${y} Z`} />
      <rect x={x + half - w * 0.03} y={y - h - w * 0.16} width={w * 0.06} height={w * 0.18} />
      <circle cx={x + half} cy={y - h - w * 0.2} r={w * 0.05} />
    </g>
  );
}

function Chhatri({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g fill={fill}>
      <Dome x={x} y={y} w={s} h={s * 0.55} fill={fill} />
      <rect x={x} y={y} width={s} height={s * 0.05} />
      <rect x={x + s * 0.08} y={y} width={s * 0.07} height={s * 0.5} />
      <rect x={x + s * 0.85} y={y} width={s * 0.07} height={s * 0.5} />
    </g>
  );
}

/** Cusped arch outline used for foreground framing. */
function CuspedArch({ id, fill }: { id: string; fill: string }) {
  return (
    <g fill={fill}>
      <path
        d="M0,0 H400 V500 H360 V150 C360,84 300,34 200,34 C100,34 40,84 40,150 V500 H0 Z"
        opacity="0.96"
      />
      <path
        d="M40,150 C40,84 100,34 200,34 C300,34 360,84 360,150 L352,150 C352,92 296,46 200,46 C104,46 48,92 48,150 Z"
        opacity="0.5"
      />
      <g id={`${id}-scallops`}>
        {Array.from({ length: 9 }).map((_, i) => {
          const t = (i + 0.5) / 9;
          const angle = Math.PI * (1 - t);
          const cx = r(200 + Math.cos(angle) * 158);
          const cy = r(152 - Math.sin(angle) * 112);
          return <circle key={i} cx={cx} cy={cy} r="7" opacity="0.35" />;
        })}
      </g>
    </g>
  );
}

function Marigold({ x, y, r: radius, petal, core }: { x: number; y: number; r: number; petal: string; core: string }) {
  // Two circles read as a marigold at the sizes single flowers are drawn.
  return (
    <g>
      <circle cx={r(x)} cy={r(y)} r={r(radius)} fill={petal} />
      <circle cx={r(x)} cy={r(y)} r={r(radius * 0.44)} fill={core} />
    </g>
  );
}

/**
 * Garland flowers are drawn once as a symbol and referenced, so a full garland
 * costs a dozen short `<use>` elements rather than a hundred shapes.
 */
function MarigoldSymbol({ id, petal, core }: { id: string; petal: string; core: string }) {
  return (
    <symbol id={id} viewBox="-10 -10 20 20" overflow="visible">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const cx = r(Math.cos(a) * 4.6);
        const cy = r(Math.sin(a) * 4.6);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="4.4"
            ry="3.4"
            fill={petal}
            transform={`rotate(${r((a * 180) / Math.PI)} ${cx} ${cy})`}
          />
        );
      })}
      <circle r="3.6" fill={core} />
    </symbol>
  );
}

function Garland({
  uid,
  y,
  count,
  size = 7,
  petal,
  core,
}: {
  uid: string;
  y: number;
  count: number;
  size?: number;
  petal: string;
  core: string;
}) {
  const symbolId = `${uid}-marigold`;
  return (
    <g>
      <defs>
        <MarigoldSymbol id={symbolId} petal={petal} core={core} />
      </defs>
      <path
        d={`M-10,${y} Q200,${y + 46} 410,${y}`}
        fill="none"
        stroke={core}
        strokeWidth="1.5"
        opacity="0.6"
      />
      {Array.from({ length: count }).map((_, i) => {
        const t = i / (count - 1);
        const x = r(-10 + t * 420);
        const dy = r(Math.sin(Math.PI * t) * 46);
        return (
          <use
            key={i}
            href={`#${symbolId}`}
            x={x - size}
            y={y + dy - size}
            width={size * 2}
            height={size * 2}
          />
        );
      })}
    </g>
  );
}

function Petals({ tint, count = 8, seed = 1 }: { tint: string; count?: number; seed?: number }) {
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const n = (i + 1) * seed;
        const x = (n * 73) % 400;
        const y = (n * 137) % 500;
        const rot = (n * 47) % 180;
        return (
          <ellipse
            key={i}
            cx={r(x)}
            cy={r(y)}
            rx="5"
            ry="2.6"
            fill={tint}
            opacity={0.22 + ((n * 13) % 30) / 100}
            transform={`rotate(${rot} ${r(x)} ${r(y)})`}
          />
        );
      })}
    </g>
  );
}

function Lantern({ x, y, s, glass, frame }: { x: number; y: number; s: number; glass: string; frame: string }) {
  return (
    <g>
      <line x1={x} y1={y - s * 2.4} x2={x} y2={y - s} stroke={frame} strokeWidth="1" opacity="0.7" />
      <path d={`M${x - s * 0.7},${y - s} h${s * 1.4} l${-s * 0.28},${s * 1.5} h${-s * 0.84} Z`} fill={glass} opacity="0.92" />
      <rect x={x - s * 0.8} y={y - s * 1.15} width={s * 1.6} height={s * 0.18} rx="1" fill={frame} />
      <circle cx={x} cy={y - s * 0.3} r={s * 0.5} fill={glass} opacity="0.4" />
    </g>
  );
}

function StringLights({ y, count, glow }: { y: number; count: number; glow: string }) {
  return (
    <g>
      <path d={`M-10,${y - 14} Q200,${y + 26} 410,${y - 14}`} fill="none" stroke={glow} strokeWidth="0.8" opacity="0.5" />
      {Array.from({ length: count }).map((_, i) => {
        const t = i / (count - 1);
        const x = -10 + t * 420;
        const dy = Math.sin(Math.PI * t) * 40;
        return (
          <g key={i}>
            <circle cx={r(x)} cy={r(y - 14 + dy)} r="2.2" fill={glow} />
            <circle cx={r(x)} cy={r(y - 14 + dy)} r="6" fill={glow} opacity="0.18" />
          </g>
        );
      })}
    </g>
  );
}

/* ==========================================================================
   Scenes
   ========================================================================== */

function PalaceArch({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f7e2c6" />
              <stop offset="45%" stopColor="#f3c69f" />
              <stop offset="100%" stopColor="#e3a184" />
            </linearGradient>
            <radialGradient id={`${uid}-sun`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff3d8" />
              <stop offset="100%" stopColor="#fff3d8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-sky)`} />
          <circle cx="200" cy="250" r="150" fill={`url(#${uid}-sun)`} />
          <circle cx="200" cy="252" r="46" fill="#fff6e2" opacity="0.85" />
        </Svg>
      </Layer>

      <Layer depth={DEPTH.distant}>
        <Svg>
          <g fill="#b9846d" opacity="0.5">
            <Dome x={20} y={330} w={54} h={30} fill="#b9846d" />
            <Dome x={92} y={330} w={40} h={22} fill="#b9846d" />
            <Dome x={276} y={330} w={46} h={26} fill="#b9846d" />
            <Dome x={332} y={330} w={58} h={32} fill="#b9846d" />
            <rect x="10" y="330" width="380" height="60" />
          </g>
        </Svg>
      </Layer>

      <Layer depth={DEPTH.mid}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-palace`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8f5a4c" />
              <stop offset="100%" stopColor="#5d3a34" />
            </linearGradient>
          </defs>
          <g fill={`url(#${uid}-palace)`}>
            <Chhatri x={44} y={356} s={40} fill="#7d4c43" />
            <Chhatri x={316} y={356} s={40} fill="#7d4c43" />
            <Dome x={150} y={352} w={100} h={54} fill="#7d4c43" />
            <rect x="30" y="392" width="340" height="108" />
            {Array.from({ length: 7 }).map((_, i) => (
              <path
                key={i}
                d={`M${46 + i * 44},500 V430 C${46 + i * 44},414 ${46 + i * 44 + 26},414 ${46 + i * 44 + 26},430 V500 Z`}
                fill="#4a2d29"
                opacity="0.55"
              />
            ))}
          </g>
        </Svg>
      </Layer>

      <Layer depth={DEPTH.focal}>
        <Svg>
          <Garland uid={uid} y={74} count={11} size={9} petal="#e8a33c" core="#b4611d" />
        </Svg>
      </Layer>

      <Layer depth={DEPTH.near}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-arch`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbf7f1" />
              <stop offset="100%" stopColor="#f0e0c0" />
            </linearGradient>
          </defs>
          <CuspedArch id={uid} fill={`url(#${uid}-arch)`} />
          <Petals tint="#d98a72" count={7} seed={3} />
        </Svg>
      </Layer>
    </>
  );
}

function CouplePortrait({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <radialGradient id={`${uid}-bg`} cx="0.5" cy="0.42" r="0.72">
              <stop offset="0%" stopColor="#fdf5ea" />
              <stop offset="100%" stopColor="#e7cdae" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-bg)`} />
        </Svg>
      </Layer>

      <Layer depth={DEPTH.mid}>
        <Svg>
          {/* Cusped arch, drawn as an outline so the slot reads as a frame
              waiting for a portrait rather than as finished character art. */}
          <g fill="none" stroke="#c39a53" strokeWidth="1.4" opacity="0.85">
            <path d="M92,470 V240 C92,168 140,124 200,124 C260,124 308,168 308,240 V470" />
            <path d="M106,470 V244 C106,180 148,140 200,140 C252,140 294,180 294,244 V470" opacity="0.5" />
          </g>
        </Svg>
      </Layer>

      <Layer depth={DEPTH.focal}>
        <Svg>
          {/* Medallion: the same mandala language as the monogram. */}
          <g fill="none" stroke="#b3873c" strokeWidth="1.1">
            <circle cx="200" cy="286" r="74" opacity="0.55" />
            <circle cx="200" cy="286" r="64" strokeDasharray="2 6" opacity="0.8" />
          </g>
          <g fill="#8c1d2f" opacity="0.9">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              const cx = r(200 + Math.cos(a) * 34);
              const cy = r(286 + Math.sin(a) * 34);
              return (
                <ellipse
                  key={i}
                  cx={cx}
                  cy={cy}
                  rx="20"
                  ry="9"
                  opacity="0.55"
                  transform={`rotate(${r((a * 180) / Math.PI)} ${cx} ${cy})`}
                />
              );
            })}
          </g>
          <circle cx="200" cy="286" r="17" fill="#e0c187" />
          <circle cx="200" cy="286" r="8" fill="#8c1d2f" />
        </Svg>
      </Layer>

      <Layer depth={DEPTH.near}>
        <Svg>
          {/* Corner sprays */}
          <g fill="#3f6b52" opacity="0.5">
            <path d="M-6,40 q60,-6 96,44 q-64,10 -96,-44 z" />
            <path d="M406,470 q-62,4 -98,-44 q66,-8 98,44 z" />
          </g>
          <g>
            <Marigold x={54} y={70} r={13} petal="#e8a33c" core="#b4611d" />
            <Marigold x={82} y={44} r={8} petal="#d98a72" core="#8c1d2f" />
            <Marigold x={344} y={452} r={12} petal="#e8a33c" core="#b4611d" />
            <Marigold x={318} y={478} r={8} petal="#d98a72" core="#8c1d2f" />
          </g>
          <Petals tint="#c9744f" count={6} seed={5} />
        </Svg>
      </Layer>
    </>
  );
}

function Courtyard({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdf0d2" />
              <stop offset="100%" stopColor="#f2d79c" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-wall)`} />
          <g stroke="#e9bf6a" strokeWidth="10" opacity="0.35">
            <line x1="-40" y1="120" x2="440" y2="-40" />
            <line x1="-40" y1="220" x2="440" y2="60" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.mid}>
        <Svg>
          <g fill="#e2b25c" opacity="0.75">
            {Array.from({ length: 4 }).map((_, i) => (
              <path
                key={i}
                d={`M${34 + i * 96},500 V300 C${34 + i * 96},262 ${34 + i * 96 + 62},262 ${34 + i * 96 + 62},300 V500 Z`}
              />
            ))}
          </g>
          <rect y="470" width="400" height="30" fill="#c9903f" opacity="0.5" />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.focal}>
        <Svg>
          {/* Brass vessels */}
          <g fill="#b57c22">
            <path d="M150,470 q-16,-8 -14,-26 q2,-18 24,-18 q22,0 24,18 q2,18 -14,26 z" />
            <rect x="140" y="440" width="44" height="6" rx="3" />
            <path d="M246,470 q-12,-6 -10,-20 q2,-14 18,-14 q16,0 18,14 q2,14 -10,20 z" opacity="0.85" />
          </g>
          <Marigold x={162} y={434} r={11} petal="#f0b13f" core="#c25a12" />
          <Marigold x={182} y={440} r={8} petal="#e8952c" core="#b4611d" />
          <Marigold x={252} y={438} r={8} petal="#f0b13f" core="#c25a12" />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.near}>
        <Svg>
          <Garland uid={uid} y={40} count={12} size={7} petal="#f0b13f" core="#c25a12" />
          <Petals tint="#e08b1e" count={8} seed={7} />
        </Svg>
      </Layer>
    </>
  );
}

function GardenPavilion({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-dusk`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8dfbf" />
              <stop offset="60%" stopColor="#bcc9a2" />
              <stop offset="100%" stopColor="#7d9c7a" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-dusk)`} />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.distant}>
        <Svg>
          <g fill="#3f6b52" opacity="0.55">
            {Array.from({ length: 9 }).map((_, i) => (
              <circle key={i} cx={(i * 53) % 400} cy={300 + ((i * 37) % 60)} r={34 + ((i * 11) % 18)} />
            ))}
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.mid}>
        <Svg>
          <g fill="#16624a">
            <Dome x={130} y={330} w={140} h={70} fill="#1d7256" />
            <rect x="132" y="330" width="136" height="8" />
            <rect x="140" y="338" width="10" height="150" />
            <rect x="250" y="338" width="10" height="150" />
            <rect y="470" width="400" height="30" opacity="0.8" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.focal}>
        <Svg>
          <Lantern x={70} y={190} s={20} glass="#f4d78a" frame="#0f4433" />
          <Lantern x={330} y={168} s={16} glass="#f4d78a" frame="#0f4433" />
          <Lantern x={300} y={224} s={12} glass="#f0c96f" frame="#0f4433" />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.near}>
        <Svg>
          {/* Henna vine motif */}
          <g stroke="#0e3b2c" fill="none" strokeWidth="1.6" opacity="0.5">
            <path d="M-10,470 q40,-40 80,-8 q40,32 78,-4 q38,-36 80,-2 q42,34 84,-6 q40,-38 80,-4" />
          </g>
          <g fill="#0e3b2c" opacity="0.45">
            {Array.from({ length: 7 }).map((_, i) => (
              <ellipse key={i} cx={20 + i * 60} cy={452} rx="7" ry="12" transform={`rotate(${i % 2 ? 24 : -24} ${20 + i * 60} 452)`} />
            ))}
          </g>
        </Svg>
      </Layer>
    </>
  );
}

function Stage({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-hall`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d215c" />
              <stop offset="55%" stopColor="#42327a" />
              <stop offset="100%" stopColor="#231a45" />
            </linearGradient>
            <radialGradient id={`${uid}-spot`} cx="0.5" cy="0" r="0.85">
              <stop offset="0%" stopColor="#f3d9a0" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f3d9a0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-hall)`} />
          <rect width="400" height="500" fill={`url(#${uid}-spot)`} />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.mid}>
        <Svg>
          {/* Chandeliers */}
          {[90, 200, 310].map((x, i) => (
            <g key={x} opacity={i === 1 ? 1 : 0.7}>
              <line x1={x} y1="0" x2={x} y2={i === 1 ? 86 : 66} stroke="#e0c187" strokeWidth="1" />
              <path d={`M${x - 26},${i === 1 ? 86 : 66} h52 l-14,26 h-24 Z`} fill="#e0c187" opacity="0.55" />
              <circle cx={x} cy={i === 1 ? 120 : 100} r="4" fill="#f6e3bb" />
            </g>
          ))}
        </Svg>
      </Layer>
      <Layer depth={DEPTH.focal}>
        <Svg>
          <rect y="392" width="400" height="12" fill="#e0c187" opacity="0.6" />
          <rect y="404" width="400" height="96" fill="#1b1436" />
          <g fill="#120d28" opacity="0.85">
            <circle cx="140" cy="366" r="14" />
            <path d="M126,392 q14,-22 28,0 z" />
            <circle cx="262" cy="360" r="14" />
            <path d="M246,392 q16,-24 32,0 z" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.near}>
        <Svg>
          <g fill="#f3d9a0">
            {Array.from({ length: 10 }).map((_, i) => {
              const n = (i + 1) * 3;
              const x = (n * 61) % 400;
              const y = (n * 89) % 420;
              return <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.4 : 1.4} opacity={0.25 + ((n * 7) % 45) / 100} />;
            })}
          </g>
        </Svg>
      </Layer>
    </>
  );
}

function Mandap({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-eve`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0cdae" />
              <stop offset="55%" stopColor="#d9997f" />
              <stop offset="100%" stopColor="#8c4a45" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-eve)`} />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.distant}>
        <Svg>
          <g fill="#7a3c3c" opacity="0.45">
            <Dome x={0} y={340} w={70} h={38} fill="#7a3c3c" />
            <Dome x={330} y={340} w={70} h={38} fill="#7a3c3c" />
            <rect y="340" width="400" height="50" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.mid}>
        <Svg>
          <g fill="#8c1d2f">
            {/* Canopy */}
            <path d="M64,214 h272 l-22,26 h-228 Z" />
            <path d="M86,240 q114,44 228,0 l0,10 q-114,44 -228,0 z" opacity="0.85" />
            {/* Pillars */}
            <rect x="86" y="240" width="14" height="240" />
            <rect x="300" y="240" width="14" height="240" />
            <rect x="120" y="248" width="9" height="232" opacity="0.7" />
            <rect x="272" y="248" width="9" height="232" opacity="0.7" />
          </g>
          <g fill="#e0c187">
            <rect x="64" y="206" width="272" height="9" />
            <circle cx="200" cy="200" r="8" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.focal}>
        <Svg>
          {/* Sacred fire */}
          <g>
            <rect x="176" y="452" width="48" height="26" fill="#5d2b22" />
            <path d="M200,394 q22,30 14,52 q-6,18 -14,22 q-8,-4 -14,-22 q-8,-22 14,-52 z" fill="#f0a12c" opacity="0.9" />
            <path d="M200,414 q12,20 7,34 q-3,10 -7,12 q-4,-2 -7,-12 q-5,-14 7,-34 z" fill="#fbe6a8" />
          </g>
          <Garland uid={uid} y={252} count={11} size={7} petal="#f0b13f" core="#b4611d" />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.near}>
        <Svg>
          <Petals tint="#e8dbc9" count={9} seed={11} />
        </Svg>
      </Layer>
    </>
  );
}

function TerraceNight({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-night`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#101c33" />
              <stop offset="55%" stopColor="#1d2b48" />
              <stop offset="100%" stopColor="#324563" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-night)`} />
          <circle cx="308" cy="88" r="26" fill="#f3e6c8" opacity="0.9" />
          <circle cx="308" cy="88" r="52" fill="#f3e6c8" opacity="0.12" />
          <g fill="#f6efdc">
            {Array.from({ length: 12 }).map((_, i) => {
              const n = (i + 1) * 5;
              return <circle key={i} cx={(n * 67) % 400} cy={(n * 43) % 260} r={i % 5 === 0 ? 1.7 : 1} opacity={0.35 + ((n * 9) % 50) / 100} />;
            })}
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.distant}>
        <Svg>
          <g fill="#0c1526" opacity="0.85">
            <Dome x={16} y={332} w={62} h={34} fill="#0c1526" />
            <Chhatri x={300} y={340} s={44} fill="#0c1526" />
            <rect y="332" width="400" height="40" />
          </g>
          <g fill="#e8c27a" opacity="0.55">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={24 + i * 30} y={344} width="6" height="9" />
            ))}
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.mid}>
        <Svg>
          <rect y="372" width="400" height="128" fill="#16233f" />
          {/* Parapet */}
          <g fill="#22314f">
            <rect y="372" width="400" height="16" />
            {Array.from({ length: 16 }).map((_, i) => (
              <rect key={i} x={6 + i * 25} y={388} width="12" height="22" rx="6" />
            ))}
            <rect y="410" width="400" height="10" />
          </g>
          {/* Lake reflection */}
          <g fill="#f3e6c8" opacity="0.16">
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x={286 + ((i * 13) % 30)} y={430 + i * 8} width={40 - i * 3} height="2" rx="1" />
            ))}
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.near}>
        <Svg>
          <StringLights y={70} count={12} glow="#f6dfa4" />
          <Lantern x={48} y={188} s={16} glass="#f4cf82" frame="#0c1526" />
        </Svg>
      </Layer>
    </>
  );
}

function LakeCity({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-lsky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8e8cf" />
              <stop offset="55%" stopColor="#eec6a6" />
              <stop offset="100%" stopColor="#dba98f" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-lsky)`} />
          <circle cx="120" cy="180" r="34" fill="#fff2d9" opacity="0.9" />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.distant}>
        <Svg>
          <g fill="#a97e79" opacity="0.5">
            <path d="M-10,300 L70,236 L140,300 Z" />
            <path d="M120,300 L210,224 L300,300 Z" />
            <path d="M270,300 L360,244 L440,300 Z" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.mid}>
        <Svg>
          <g fill="#8d5a58">
            <Chhatri x={40} y={306} s={34} fill="#8d5a58" />
            <Dome x={140} y={300} w={78} h={42} fill="#8d5a58" />
            <Chhatri x={280} y={306} s={38} fill="#8d5a58" />
            <rect y="330" width="400" height="42" />
          </g>
          <g fill="#f0d8b2" opacity="0.6">
            {Array.from({ length: 14 }).map((_, i) => (
              <rect key={i} x={12 + i * 28} y={342} width="8" height="12" rx="1" />
            ))}
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.focal}>
        <Svg>
          <defs>
            <linearGradient id={`${uid}-lake`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9db6c4" />
              <stop offset="100%" stopColor="#6d8fa4" />
            </linearGradient>
          </defs>
          <rect y="372" width="400" height="128" fill={`url(#${uid}-lake)`} />
          <g stroke="#e7f0f4" strokeWidth="1.4" opacity="0.4">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1={20 + ((i * 47) % 300)} y1={392 + i * 11} x2={20 + ((i * 47) % 300) + 54} y2={392 + i * 11} />
            ))}
          </g>
          {/* Boat */}
          <g fill="#5b3a36">
            <path d="M168,436 q32,16 64,0 l-8,10 q-24,10 -48,0 z" />
            <rect x="198" y="414" width="3" height="22" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.near}>
        <Svg>
          <g fill="#3f6b52" opacity="0.6">
            <path d="M-10,500 q30,-70 20,-120 q28,54 40,120 z" />
            <path d="M370,500 q26,-64 18,-112 q26,52 32,112 z" />
          </g>
        </Svg>
      </Layer>
    </>
  );
}

function FamilyCrest({ uid }: { uid: string }) {
  return (
    <>
      <Layer depth={DEPTH.sky}>
        <Svg>
          <defs>
            <radialGradient id={`${uid}-crest`} cx="0.5" cy="0.45" r="0.7">
              <stop offset="0%" stopColor="#f7ecd9" />
              <stop offset="100%" stopColor="#e6d2b6" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${uid}-crest)`} />
        </Svg>
      </Layer>
      <Layer depth={DEPTH.mid}>
        <Svg>
          <g stroke="#b3873c" fill="none">
            <circle cx="200" cy="250" r="96" strokeWidth="1.2" />
            <circle cx="200" cy="250" r="82" strokeWidth="0.8" strokeDasharray="3 6" />
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return (
                <ellipse
                  key={i}
                  cx={r(200 + Math.cos(a) * 108)}
                  cy={r(250 + Math.sin(a) * 108)}
                  rx="14"
                  ry="6"
                  strokeWidth="0.8"
                  transform={`rotate(${r((a * 180) / Math.PI)} ${r(200 + Math.cos(a) * 108)} ${r(250 + Math.sin(a) * 108)})`}
                />
              );
            })}
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.focal}>
        <Svg>
          <g fill="#8c1d2f" opacity="0.75">
            <path d="M200,196 q34,26 34,58 q0,34 -34,50 q-34,-16 -34,-50 q0,-32 34,-58 z" />
          </g>
          <g fill="#e0c187">
            <circle cx="200" cy="254" r="15" />
          </g>
        </Svg>
      </Layer>
      <Layer depth={DEPTH.near}>
        <Svg>
          <Marigold x={54} y={64} r={12} petal="#e8a33c" core="#b4611d" />
          <Marigold x={348} y={440} r={12} petal="#d98a72" core="#8c1d2f" />
          <Petals tint="#b3873c" count={5} seed={13} />
        </Svg>
      </Layer>
    </>
  );
}

const SCENES: Record<ArtworkKey, (props: { uid: string }) => React.ReactElement> = {
  "palace-arch": PalaceArch,
  "couple-portrait": CouplePortrait,
  courtyard: Courtyard,
  "garden-pavilion": GardenPavilion,
  stage: Stage,
  mandap: Mandap,
  "terrace-night": TerraceNight,
  "lake-city": LakeCity,
  "family-crest": FamilyCrest,
};

const MODE_CLASS: Record<SceneMode, string> = {
  hero: "aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9]",
  card: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
  tile: "aspect-square",
  fill: "h-full w-full",
};

export function SceneArt({ artwork, uid, mode = "card", className = "" }: SceneArtProps) {
  // Small squares never justify a five-layer parallax scene.
  if (mode === "tile") return <TileArt artwork={artwork} uid={uid} className={className} />;

  const Scene = SCENES[artwork] ?? SCENES["palace-arch"];
  const safeUid = uid.replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div className={`scene ${MODE_CLASS[mode]} ${className}`}>
      <Scene uid={safeUid} />
    </div>
  );
}
