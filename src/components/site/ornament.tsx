import * as React from "react";

/**
 * Ridgewood ornaments — gold-rule separators, small leaf marks, circle pattern.
 * The real Ridgewood logo (transparent PNG shield) is used as the brand mark.
 */

/**
 * CirclePattern — the subtle navy circle pattern from Ridgewood Chronicle.
 * Use as a background overlay on any navy/dark section for cohesive texture.
 */
export function CirclePattern({
  className = "",
  color = "oklch(0.78 0.13 75 / 0.08)",
  size = 160,
  ring1 = 60,
  ring2 = 40,
}: {
  className?: string;
  color?: string;     // stroke color (with alpha)
  size?: number;      // pattern tile size in px (160 default)
  ring1?: number;     // outer ring radius (60 default)
  ring2?: number;     // inner ring radius (40 default)
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 1024">
        <defs>
          <pattern id={`circles-${size}-${ring1}-${ring2}`} width={size} height={size} patternUnits="userSpaceOnUse">
            <circle cx={size / 2} cy={size / 2} r={ring1} fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx={size / 2} cy={size / 2} r={ring2} fill="none" stroke={color} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="1024" fill={`url(#circles-${size}-${ring1}-${ring2})`} />
      </svg>
    </div>
  );
}

export function RidgeDivider({
  className = "",
  color = "var(--brand-navy)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,110 L0,72 C60,68 100,40 180,46 C240,51 260,28 320,30 C380,32 410,55 480,55 C540,55 580,30 660,32 C740,34 770,58 840,56 C920,54 960,28 1040,30 C1120,32 1160,55 1230,55 C1300,55 1340,30 1440,40 L1440,110 Z"
        fill={color}
      />
      <path
        d="M0,110 L0,86 C80,82 140,62 220,66 C300,70 340,82 440,80 C540,78 580,62 660,62 C740,62 780,82 880,80 C980,78 1020,62 1100,64 C1180,66 1240,82 1440,82 L1440,110 Z"
        fill={color}
        opacity={0.35}
      />
    </svg>
  );
}

export function RidgeCap({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 L1440,0 L1440,40 C1340,60 1240,30 1100,32 C980,34 920,60 820,58 C700,56 660,30 580,30 C500,30 440,55 360,55 C260,55 220,30 120,32 C60,33 30,42 0,40 Z"
        fill="var(--brand-cream)"
      />
    </svg>
  );
}

/* Gold rule with center diamond — a small "luxe" separator */
export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span
        aria-hidden
        className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[oklch(0.78_0.13_75/0.7)]"
      />
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M7 0 L14 7 L7 14 L0 7 Z" fill="var(--brand-gold)" />
        <path d="M7 3 L11 7 L7 11 L3 7 Z" fill="var(--brand-cream)" />
      </svg>
      <span
        aria-hidden
        className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[oklch(0.78_0.13_75/0.7)]"
      />
    </div>
  );
}

/* Small leaf mark — used as section eyebrow icon */
export function LeafMark({
  size = 22,
  color = "var(--brand-gold)",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2 C7 4 4 8 4 13 C4 18 8 22 12 22 C16 22 20 18 20 13 C20 8 17 4 12 2 Z"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M12 4 L12 20 M12 8 C10 9 8 11 8 13 M12 12 C14 13 16 15 16 17"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * BrandLogo — uses the REAL Ridgewood transparent PNG shield extracted
 * from the user's uploaded logo image. No SVG substitute.
 *
 * Variants:
 *   - "shield": just the transparent shield (for nav, hero, footer badges)
 *   - "full": shield + "RIDGEWOOD SCHOOL" + "A CBSE Curriculum School" text
 *
 * Tones (for shield on different backgrounds):
 *   - "navy":    original navy shield (use on light/cream backgrounds)
 *   - "white":   cream-tinted shield (use on dark/navy backgrounds)
 *   - "gold":    gold-tinted shield (use as accent)
 *
 * Implementation note:
 *   The shield PNG is 2395x3878 (aspect ratio 0.618, taller than wide).
 *   To preserve the FULL shield without any cropping, we use Next.js Image
 *   with EXPLICIT width/height props (not `fill`) so the optimized image
 *   is rendered at the exact aspect ratio of the source file. We compute
 *   width = size * 0.618 and height = size, matching the shield's natural
 *   aspect. This guarantees no cropping at any display size.
 */
export function BrandLogo({
  variant = "shield",
  size = 48,
  className = "",
  priority = false,
  tone = "navy",
  crystal = false,
}: {
  variant?: "shield" | "full";
  size?: number;            // The HEIGHT of the rendered logo in px.
  className?: string;
  priority?: boolean;
  tone?: "navy" | "white" | "gold";
  crystal?: boolean;        // If true, the shield revolves like a clear crystal (shield variant only)
}) {
  if (variant === "full") {
    // Full logo = shield + "RIDGEWOOD SCHOOL" + "A CBSE Curriculum School" subtitle.
    // Source file aspect is 2.51 (width:height). We use a plain <img> with
    // explicit integer width/height to bypass Next.js Image's variant
    // cropping (which was causing the shield side to be cut off at some sizes).
    const fullSrc =
      tone === "white"
        ? "/brand/ridgewood-full-logo-white.png"
        : "/brand/ridgewood-full-logo.png";
    const fullW = Math.round(size * 2.51);
    return (
      <img
        src={fullSrc}
        alt="Ridgewood School — A CBSE Curriculum School"
        width={fullW}
        height={size}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`object-contain block ${className}`}
        style={{
          height: `${size}px`,
          width: `${fullW}px`,
          maxWidth: "none",
        }}
      />
    );
  }
  const src =
    tone === "white"
      ? "/brand/ridgewood-shield-white.png"
      : tone === "gold"
      ? "/brand/ridgewood-shield-gold.png"
      : "/brand/ridgewood-shield.png";
  // Shield variant: same plain-<img> approach with explicit integer
  // width/height + 4px breathing room container to guarantee no cropping.
  const shieldWidth = Math.round(size * 0.618);
  const containerWidth = shieldWidth + (crystal ? 12 : 4);
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        height: `${size}px`,
        width: `${containerWidth}px`,
        lineHeight: 0,
        perspective: crystal ? "800px" : undefined,
      }}
    >
      <img
        src={src}
        alt="Ridgewood School shield emblem"
        width={shieldWidth}
        height={size}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`object-contain block ${crystal ? "animate-crystal-revolve" : ""}`}
        style={{
          height: `${size}px`,
          width: `${shieldWidth}px`,
          maxWidth: "none",
        }}
      />
    </span>
  );
}

/* Legacy RidgeCrest — kept for backward compatibility but redirects to BrandLogo.
   New code should use <BrandLogo variant="shield" />. */
export function RidgeCrest({
  size = 40,
  color,
  accent,
  cream,
}: {
  size?: number;
  color?: string;
  accent?: string;
  cream?: string;
}) {
  // Auto-detect tone: if color is cream/white-ish, render white version
  const tone: "navy" | "white" | "gold" =
    cream === "transparent" || color === "var(--brand-cream)"
      ? "white"
      : accent === "var(--brand-gold)" && color === "var(--brand-cream)"
      ? "white"
      : "navy";
  return <BrandLogo variant="shield" size={size} tone={tone} />;
}

