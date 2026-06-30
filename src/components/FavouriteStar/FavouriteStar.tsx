import { useFavourite } from "@/lib/useFavourites";
import type { FavouriteKind } from "@/lib/favourites";
import styles from "./FavouriteStar.module.css";

export function FavouriteStar({
  kind,
  id,
  className,
  size = 17,
}: {
  kind: FavouriteKind;
  id: string;
  className?: string;
  size?: number;
}) {
  const { favourited, toggle } = useFavourite(kind, id);

  return (
    <button
      type="button"
      className={`${styles.star} ${favourited ? styles.active : ""} ${className ?? ""}`}
      aria-label={favourited ? "Remove from favourites" : "Add to favourites"}
      aria-pressed={favourited}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={favourited ? "currentColor" : "none"}
        aria-hidden="true"
        className={styles.icon}
      >
        <path
          d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L12 17.9l-5.25 2.77 1-5.87L3.5 9.66l5.9-.86L12 3.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
