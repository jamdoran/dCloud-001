import styles from "./SpiralLogo.module.css";

/**
 * The dCloud rainbow-vortex mark.
 *
 * Uses the supplied artwork directly (public/logo-vortex.png). The artwork's
 * black background is keyed out to true transparency, so the real page (glow,
 * grid and all) shows through — it matches the page background everywhere and
 * rotates without a visible square edge. A baked-in colour can't do this
 * because the area behind the logo isn't a flat colour.
 */

interface SpiralLogoProps {
  /** Rendered size in px (square). */
  size?: number;
  /** Slowly rotate the mark. */
  animated?: boolean;
}

export function SpiralLogo({ size = 200, animated = true }: SpiralLogoProps) {
  return (
    <img
      className={`${styles.logo} ${animated ? styles.spin : ""}`}
      src="/logo-vortex.png"
      width={size}
      height={size}
      alt="dCloud"
      draggable={false}
    />
  );
}
