import type { CSSProperties } from "react";
import { FavouriteStar } from "@/components/FavouriteStar/FavouriteStar";
import { demoCategory } from "@/lib/demoLabels";
import { demoPublishedDate, formatPublishedDate, isRecentlyPublished } from "@/lib/demoFreshness";
import type { CommunityDemo, DemoType } from "@/lib/types";
import styles from "./CommunityDemoCard.module.css";

const TYPE_COLOR: Record<DemoType, string> = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
};

export function CommunityDemoCard({
  demo,
  onOpen,
  compact = false,
  highlighted = false,
}: {
  demo: CommunityDemo;
  onOpen: (demo: CommunityDemo) => void;
  compact?: boolean;
  highlighted?: boolean;
}) {
  const isNew = isRecentlyPublished(demo.addedAt);

  return (
    <article
      id={`demo-${demo.id}`}
      className={`${styles.card} ${compact ? styles.compact : ""} ${highlighted ? styles.highlighted : ""}`}
      style={{ "--type": TYPE_COLOR[demo.type] } as CSSProperties}
      onClick={() => onOpen(demo)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(demo);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className={styles.head}>
        <span className={styles.type}>{demoCategory(demo)}</span>
        {isNew && <span className={styles.newTag}>New</span>}
      </div>
      <h3 className={styles.title}>
        <FavouriteStar kind="demo" id={demo.id} className={styles.favourite} />
        <span>{demo.title}</span>
      </h3>
      {!compact && <p className={styles.desc}>{demo.description}</p>}
      <div className={styles.foot}>
        <span className={styles.contributor}>{demo.contributor}</span>
        <div className={styles.topics}>
          {demo.topics.slice(0, compact ? 2 : 3).map((topic) => (
            <span key={topic} className={styles.topic}>
              {topic}
            </span>
          ))}
        </div>
        {!compact && (
          <span className={styles.published}>
            Published {formatPublishedDate(demoPublishedDate(demo))}
          </span>
        )}
        {demo.rating != null && (
          <span className={styles.rating} aria-label={`Rating ${demo.rating} out of 5`}>
            ★ {demo.rating.toFixed(1)}
          </span>
        )}
      </div>
    </article>
  );
}
