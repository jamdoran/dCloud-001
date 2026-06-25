import type { CSSProperties } from "react";
import type { Demo, DemoType } from "@/lib/types";
import styles from "./DemoCard.module.css";

/** Per-type accent so the tag is scannable at a glance. */
const TYPE_COLOR: Record<DemoType, string> = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
};

export function DemoCard({
  demo,
  highlighted = false,
  variant = "default",
}: {
  demo: Demo;
  highlighted?: boolean;
  variant?: "default" | "hero";
}) {
  const isHero = variant === "hero";

  return (
    <button
      type="button"
      id={`demo-${demo.id}`}
      className={`${styles.card} ${isHero ? styles.hero : ""} ${highlighted ? styles.highlighted : ""}`}
      style={{ "--type": TYPE_COLOR[demo.type] } as CSSProperties}
    >
      <div className={isHero ? styles.heroBody : undefined}>
        <div className={styles.tags}>
          <span className={styles.type}>{demo.type}</span>
          <span className={styles.op}>{demo.operationalType}</span>
        </div>
        <h4 className={styles.title}>{demo.title}</h4>
        <p className={styles.desc}>{demo.description}</p>
      </div>
      <div className={styles.foot}>
        <span className={styles.duration}>{demo.durationMins} min</span>
        <span className={styles.go}>Open →</span>
      </div>
    </button>
  );
}
