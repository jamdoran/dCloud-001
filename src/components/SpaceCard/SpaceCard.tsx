import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { SolutionSpace } from "@/lib/types";
import { motionName } from "@/data/catalog";
import styles from "./SpaceCard.module.css";

/**
 * A Solution Space tile on the hub. Carries only a quiet hint of the Space's
 * signature colour — the full immersive background appears when you enter it.
 */
export function SpaceCard({ space }: { space: SolutionSpace }) {
  return (
    <Link
      to={`/spaces/${space.id}`}
      className={styles.card}
      style={{ "--accent": space.accent } as CSSProperties}
    >
      <span className={styles.accent} aria-hidden="true" />
      <span className={styles.body}>
        <span className={styles.name}>{space.name}</span>
        <span className={styles.meta}>
          {space.motions.map(motionName).join(" · ")}
        </span>
      </span>
    </Link>
  );
}
