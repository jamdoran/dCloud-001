import { useMemo } from "react";
import type { CSSProperties } from "react";
import type { SolutionSpace } from "@/lib/types";
import styles from "./SpaceBackground.module.css";

/**
 * The unique, high-tech backdrop for a Solution Space — the marquee visual.
 * Each Space gets a distinct identity from its two accent colours plus a
 * geometry variant chosen deterministically from its id, so no two Spaces look
 * alike. A subtle accent-tinted mesh sits over the field, very low-key snowfall
 * drifts behind the content, and a scrim keeps foreground text legible.
 */

const VARIANTS = [
  {
    o1: "8% 10%",
    o2: "84% 72%",
    angle: "155deg",
    mesh: ["22% 32%", "76% 14%", "58% 86%", "10% 68%"],
  },
  {
    o1: "86% 6%",
    o2: "10% 80%",
    angle: "200deg",
    mesh: ["68% 24%", "18% 58%", "88% 78%", "34% 12%"],
  },
  {
    o1: "78% 78%",
    o2: "6% 12%",
    angle: "128deg",
    mesh: ["82% 38%", "28% 82%", "12% 28%", "52% 48%"],
  },
  {
    o1: "48% -8%",
    o2: "52% 96%",
    angle: "180deg",
    mesh: ["44% 22%", "72% 62%", "26% 74%", "62% 38%"],
  },
  {
    o1: "-6% 42%",
    o2: "92% 58%",
    angle: "162deg",
    mesh: ["14% 18%", "64% 8%", "86% 52%", "38% 88%"],
  },
  {
    o1: "90% 24%",
    o2: "18% 92%",
    angle: "208deg",
    mesh: ["74% 66%", "20% 36%", "48% 12%", "8% 52%"],
  },
  {
    o1: "24% 90%",
    o2: "82% 6%",
    angle: "138deg",
    mesh: ["32% 64%", "92% 42%", "16% 22%", "56% 92%"],
  },
];

function variantFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return VARIANTS[h % VARIANTS.length];
}

const FLAKE_COUNT = 22;

/** Deterministic flakes so the field is stable across renders. */
function buildFlakes() {
  let s = 9301;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: FLAKE_COUNT }, () => {
    const size = +(1.5 + rnd() * 2.3).toFixed(2);
    return {
      left: +(rnd() * 100).toFixed(2),
      size,
      duration: +(11 + rnd() * 13).toFixed(1),
      delay: +(-rnd() * 24).toFixed(1),
      opacity: +(0.08 + rnd() * 0.28).toFixed(2),
      drift: Math.round((rnd() * 2 - 1) * 36),
    };
  });
}

export function SpaceBackground({ space }: { space: SolutionSpace }) {
  const v = variantFor(space.id);
  const flakes = useMemo(buildFlakes, []);

  const style = {
    "--accent": space.accent,
    "--accent2": space.accent2,
    "--o1": v.o1,
    "--o2": v.o2,
    "--angle": v.angle,
    "--m1": v.mesh[0],
    "--m2": v.mesh[1],
    "--m3": v.mesh[2],
    "--m4": v.mesh[3],
  } as CSSProperties;

  return (
    <div className={styles.root} style={style} aria-hidden="true">
      <div className={styles.field} />
      <div className={styles.drift} />
      <div className={styles.meshGlow} />
      <div className={styles.scrim} />
      <div className={styles.meshLines} />
      <div className={styles.snow}>
        {flakes.map((f, i) => (
          <span
            key={i}
            className={styles.flake}
            style={
              {
                left: `${f.left}%`,
                width: f.size,
                height: f.size,
                opacity: f.opacity,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                "--drift": `${f.drift}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
