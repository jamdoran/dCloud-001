import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { FavouriteStar } from "@/components/FavouriteStar/FavouriteStar";
import type { SolutionSpace } from "@/lib/types";
import { motionName, spaceHasNewContent } from "@/data/catalog";
import styles from "./SpaceCard.module.css";

/**
 * A Solution Space tile on the hub — accent gradient visual plus title and
 * upstream GTM motion. The full immersive background appears inside the Space.
 */
export function SpaceCard({ space }: { space: SolutionSpace }) {
  const isNew = spaceHasNewContent(space.id);

  return (
    <article
      className={styles.card}
      style={
        {
          "--accent": space.accent,
          "--accent2": space.accent2,
        } as CSSProperties
      }
    >
      <Link to={`/spaces/${space.id}`} className={styles.link}>
        <div className={styles.media}>
          <div className={styles.mediaGradient} aria-hidden="true" />
          <div className={styles.scrim} aria-hidden="true" />
          {isNew && <span className={styles.newBadge}>New Content</span>}
        </div>
        <span className={styles.body}>
          <span className={styles.name}>{space.name}</span>
          <span className={styles.meta}>
            {space.motions.map(motionName).join(" · ")}
          </span>
        </span>
      </Link>
      <FavouriteStar kind="space" id={space.id} className={styles.favourite} />
    </article>
  );
}
