import { useId } from "react";
import styles from "./CiscoLogo.module.css";

interface CiscoLogoProps {
  /** Rendered width in px; height follows the mark aspect ratio. */
  size?: number;
  className?: string;
  /** Subtle light wash across the bars. Off for small inline marks. */
  wash?: boolean;
}

/** Cisco bridge bars — shared mark for landing and auth controls. */
export function CiscoLogo({ size = 72, className, wash = true }: CiscoLogoProps) {
  // useId() includes ':' which breaks SVG url(#…) references in many browsers.
  const gradId = `cisco-logo-grad-${useId().replace(/:/g, "")}`;
  const height = Math.round(size * (32 / 44));

  return (
    <div
      className={`${styles.wrap} ${className ?? ""}`}
      style={{ width: size, height }}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 44 32"
        width={size}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e0ff" />
            <stop offset="55%" stopColor="#7b5cff" />
            <stop offset="100%" stopColor="#eef2fb" />
          </linearGradient>
        </defs>
        <g
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          className={styles.bars}
        >
          <path d="M3 18 v-4" />
          <path d="M11 24 v-16" />
          <path d="M19 28 v-24" />
          <path d="M27 22 v-12" />
          <path d="M35 26 v-20" />
          <path d="M43 18 v-4" />
        </g>
      </svg>
      {wash ? <span className={styles.wash} /> : null}
    </div>
  );
}

/** Compact mark for buttons — no wash overlay. */
export function CiscoMark() {
  return <CiscoLogo size={22} wash={false} />;
}
