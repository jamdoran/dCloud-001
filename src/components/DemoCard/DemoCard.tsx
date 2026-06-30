import type { CSSProperties } from "react";
import { FavouriteStar } from "@/components/FavouriteStar/FavouriteStar";
import { demoCategory } from "@/lib/demoLabels";
import { demoPublishedDate, formatPublishedDate } from "@/lib/demoFreshness";
import { demoHasTrials } from "@/lib/demoTrials";
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
  onOpen,
}: {
  demo: Demo;
  highlighted?: boolean;
  variant?: "default" | "hero";
  onOpen?: (demo: Demo) => void;
}) {
  const isHero = variant === "hero";
  const opensModal = Boolean(onOpen);
  const hasTrials = demoHasTrials(demo);

  function handleOpen() {
    onOpen?.(demo);
  }

  return (
    <article
      id={`demo-${demo.id}`}
      className={`${styles.card} ${isHero ? styles.hero : ""} ${opensModal && isHero ? styles.heroCompact : ""} ${highlighted ? styles.highlighted : ""} ${opensModal ? styles.clickable : ""}`}
      style={{ "--type": TYPE_COLOR[demo.type] } as CSSProperties}
      onClick={opensModal ? handleOpen : undefined}
      onKeyDown={
        opensModal
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }
          : undefined
      }
      role={opensModal ? "button" : undefined}
      tabIndex={opensModal ? 0 : undefined}
    >
      <div className={styles.body}>
        <div className={styles.head}>
          <div className={styles.tags}>
            <span className={styles.type}>{demoCategory(demo)}</span>
            {hasTrials && <span className={styles.trial}>Trial Available</span>}
          </div>
        </div>
        <h4 className={styles.title}>
          <FavouriteStar kind="demo" id={demo.id} className={styles.favourite} />
          <span className={styles.titleText}>{demo.title}</span>
        </h4>
        <p className={styles.desc}>{demo.description}</p>
      </div>
      <div className={`${styles.foot} ${opensModal ? styles.footCompact : ""}`}>
        <div className={styles.footMeta}>
          <span className={styles.updated}>
            Published {formatPublishedDate(demoPublishedDate(demo))}
          </span>
        </div>
      </div>
    </article>
  );
}
