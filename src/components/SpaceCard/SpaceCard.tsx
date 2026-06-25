import { Link } from "react-router-dom";
import type { SolutionSpace } from "@/lib/types";
import { motionName, spaceHasNewContent } from "@/data/catalog";
import styles from "./SpaceCard.module.css";

/**
 * A Solution Space tile on the hub — a representative photo plus title and
 * upstream GTM motion. The full immersive background appears inside the Space.
 */
export function SpaceCard({ space }: { space: SolutionSpace }) {
  const isNew = spaceHasNewContent(space.id);

  return (
    <Link to={`/spaces/${space.id}`} className={styles.card}>
      <div className={styles.media}>
        <img
          src={`/images/spaces/${space.id}.jpg`}
          alt=""
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
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
  );
}
