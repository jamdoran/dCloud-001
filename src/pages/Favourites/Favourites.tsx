import { useState } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { FavouriteStar } from "@/components/FavouriteStar/FavouriteStar";
import { TopBar } from "@/components/TopBar/TopBar";
import { demoById, primarySpaceId, spaceById } from "@/data/catalog";
import { demoCategory } from "@/lib/demoLabels";
import { useFavouritesSnapshot } from "@/lib/useFavourites";
import { demoSpaceUrl, spaceUrl } from "@/lib/search";
import styles from "./Favourites.module.css";

type FavouriteKindFilter = "all" | "spaces" | "demos";

const KIND_OPTIONS: { id: FavouriteKindFilter; label: string }[] = [
  { id: "all", label: "All favourites" },
  { id: "spaces", label: "Solution Spaces" },
  { id: "demos", label: "Demos" },
];

export function FavouritesPage() {
  const { demos: demoIds, spaces: spaceIds } = useFavouritesSnapshot();
  const [kindFilter, setKindFilter] = useState<FavouriteKindFilter>("all");

  const favouriteSpaces = [...spaceIds]
    .map((id) => spaceById(id))
    .filter((space): space is NonNullable<typeof space> => Boolean(space))
    .sort((a, b) => a.name.localeCompare(b.name));

  const favouriteDemos = [...demoIds]
    .map((id) => demoById(id))
    .filter((demo): demo is NonNullable<typeof demo> => Boolean(demo))
    .sort((a, b) => a.title.localeCompare(b.title));

  const total = favouriteSpaces.length + favouriteDemos.length;
  const showSpaces = kindFilter === "all" || kindFilter === "spaces";
  const showDemos = kindFilter === "all" || kindFilter === "demos";
  const filterActive = kindFilter !== "all";
  const visibleCount =
    (showSpaces ? favouriteSpaces.length : 0) + (showDemos ? favouriteDemos.length : 0);

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.content}>
        <header className={styles.hero}>
          <Link to="/home" className={styles.crumb}>
            ← Home
          </Link>
          <h1 className={styles.title}>Favourites</h1>
          <p className={styles.lede}>
            Solution Spaces and demos you have starred. Open any row to jump into
            its Solution Space — tap the star to remove.
          </p>
        </header>

        {total === 0 ? (
          <div className={styles.empty}>
            <StarIcon />
            <p className={styles.emptyTitle}>No favourites yet</p>
            <p className={styles.emptyText}>
              Star a Solution Space or demo from the hub or a Space page — they will
              show up here.
            </p>
            <Link to="/home" className={styles.emptyLink}>
              Browse Solution Spaces
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <aside className={styles.sidebar} aria-label="Filter favourites">
              <div className={styles.sidebarHead}>
                <span className={styles.sidebarTitle}>Filters</span>
                {filterActive && (
                  <button
                    type="button"
                    className={styles.sidebarClear}
                    onClick={() => setKindFilter("all")}
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Show</span>
                <div className={styles.filterChips}>
                  {KIND_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.filterChip} ${kindFilter === option.id ? styles.filterChipActive : ""}`}
                      onClick={() => setKindFilter(option.id)}
                      aria-pressed={kindFilter === option.id}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className={styles.resultCount}>
                {filterActive
                  ? `${visibleCount} of ${total} favourites`
                  : `${total} favourites`}
              </p>
            </aside>

            <main className={styles.main}>
              {showSpaces && favouriteSpaces.length > 0 && (
                <section className={styles.section} aria-labelledby="fav-spaces-heading">
                  <h2 id="fav-spaces-heading" className={styles.sectionTitle}>
                    Solution Spaces
                  </h2>
                  <ul className={styles.list}>
                    {favouriteSpaces.map((space) => (
                      <li key={space.id} className={styles.item}>
                        <div
                          className={styles.row}
                          style={
                            {
                              "--accent": space.accent,
                              "--accent2": space.accent2,
                            } as CSSProperties
                          }
                        >
                          <Link to={spaceUrl(space.id)} className={styles.rowLink}>
                            <span className={styles.swash} aria-hidden="true" />
                            <span className={styles.rowMain}>
                              <span className={styles.rowTitle}>{space.name}</span>
                              <span className={styles.rowMeta}>{space.tagline}</span>
                            </span>
                            <span className={styles.rowAction} aria-hidden="true">
                              →
                            </span>
                          </Link>
                          <FavouriteStar
                            kind="space"
                            id={space.id}
                            className={styles.removeStar}
                            size={18}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {showDemos && favouriteDemos.length > 0 && (
                <section className={styles.section} aria-labelledby="fav-demos-heading">
                  <h2 id="fav-demos-heading" className={styles.sectionTitle}>
                    Demos
                  </h2>
                  <ul className={styles.list}>
                    {favouriteDemos.map((demo) => {
                      const spaceId = primarySpaceId(demo);
                      const space = spaceById(spaceId);
                      return (
                        <li key={demo.id} className={styles.item}>
                          <div
                            className={styles.row}
                            style={
                              space
                                ? ({
                                    "--accent": space.accent,
                                    "--accent2": space.accent2,
                                  } as CSSProperties)
                                : undefined
                            }
                          >
                            <Link to={demoSpaceUrl(spaceId, demo.id)} className={styles.rowLink}>
                              <span className={styles.swash} aria-hidden="true" />
                              <span className={styles.rowMain}>
                                <span className={styles.rowTitle}>{demo.title}</span>
                                <span className={styles.rowMeta}>
                                  {demoCategory(demo)}
                                  {space ? ` · ${space.name}` : ""}
                                </span>
                              </span>
                              <span className={styles.rowAction} aria-hidden="true">
                                →
                              </span>
                            </Link>
                            <FavouriteStar
                              kind="demo"
                              id={demo.id}
                              className={styles.removeStar}
                              size={18}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {visibleCount === 0 && (
                <p className={styles.emptyFilter}>
                  No favourites in this view. Try another filter.
                </p>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L12 17.9l-5.25 2.77 1-5.87L3.5 9.66l5.9-.86L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
