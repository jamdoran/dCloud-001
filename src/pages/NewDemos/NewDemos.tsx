import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { TopBar } from "@/components/TopBar/TopBar";
import { gtmMotionColor, gtmMotions, spaceById, primarySpaceId, demoById } from "@/data/catalog";
import { communityDemoById } from "@/data/communityCatalog";
import {
  architectureColor,
  CISCO_ARCHITECTURES,
  type CiscoArchitectureId,
} from "@/lib/ciscoArchitectures";
import { formatPublishedDate } from "@/lib/demoFreshness";
import type { DemoCategory } from "@/lib/demoLabels";
import {
  emptyNewDemoFilters,
  hasActiveNewDemoFilters,
  NEW_DEMO_CATALOG_OPTIONS,
  NEW_DEMO_CATEGORY_OPTIONS,
  newDemosByCatalog,
  totalNewDemoCount,
  totalUnfilteredNewDemoCount,
  type NewDemoCatalog,
  type NewDemoFilters,
} from "@/lib/newDemos";
import type { GtmMotionId } from "@/lib/types";
import styles from "./NewDemos.module.css";

const TYPE_COLOR = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
} as const;

const CATEGORY_COLOR: Record<DemoCategory, string> = {
  "Solution Demo": TYPE_COLOR.Solution,
  "Guided Demo": TYPE_COLOR.Guided,
  "Instant Demo": TYPE_COLOR["Deep-Dive"],
  Lab: TYPE_COLOR.Lab,
};

export function NewDemosPage() {
  const [filters, setFilters] = useState<NewDemoFilters>(emptyNewDemoFilters());
  const groups = useMemo(() => newDemosByCatalog(filters), [filters]);
  const total = totalNewDemoCount(filters);
  const unfilteredTotal = totalUnfilteredNewDemoCount();
  const filterActive = hasActiveNewDemoFilters(filters);

  function toggleCatalog(id: NewDemoCatalog) {
    setFilters((prev) => ({
      ...prev,
      catalogs: toggleListItem(prev.catalogs, id),
    }));
  }

  function selectCategory(category: DemoCategory) {
    setFilters((prev) => ({
      ...prev,
      demoCategories: selectExclusive(prev.demoCategories, category),
    }));
  }

  function toggleMotion(id: GtmMotionId) {
    setFilters((prev) => ({
      ...prev,
      motions: toggleListItem(prev.motions, id),
    }));
  }

  function toggleArchitecture(id: CiscoArchitectureId) {
    setFilters((prev) => ({
      ...prev,
      architectures: toggleListItem(prev.architectures, id),
    }));
  }

  function clearFilters() {
    setFilters(emptyNewDemoFilters());
  }

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.content}>
        <header className={styles.hero}>
          <Link to="/home" className={styles.crumb}>
            ← Home
          </Link>
          <h1 className={styles.title}>New Demos</h1>
          <p className={styles.lede}>
            Demos published in the last 45 days across all catalogs. GTM demos open in
            their Solution Space; community demos are highlighted in the Community
            catalog.
          </p>
        </header>

        <div className={styles.searchRow}>
          <span className={styles.searchIcon} aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            type="search"
            value={filters.query}
            onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            placeholder="Search new demos, spaces, products…"
            aria-label="Search new demos"
          />
          {filterActive && (
            <button type="button" className={styles.clearBtn} onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Filter new demos">
            <div className={styles.sidebarHead}>
              <span className={styles.sidebarTitle}>Filters</span>
              {filterActive && (
                <button type="button" className={styles.sidebarClear} onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Catalog</span>
              <div className={styles.filterChips}>
                {NEW_DEMO_CATALOG_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.filterChip} ${filters.catalogs.includes(option.id) ? styles.filterChipActive : ""}`}
                    onClick={() => toggleCatalog(option.id)}
                    aria-pressed={filters.catalogs.includes(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Demo type</span>
              <div className={styles.filterChips}>
                {NEW_DEMO_CATEGORY_OPTIONS.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`${styles.filterChip} ${filters.demoCategories.includes(category) ? styles.filterChipActive : ""}`}
                    style={
                      filters.demoCategories.includes(category)
                        ? ({ "--type": CATEGORY_COLOR[category] } as CSSProperties)
                        : undefined
                    }
                    onClick={() => selectCategory(category)}
                    aria-pressed={filters.demoCategories.includes(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>GTM motions</span>
              <div className={styles.filterChips}>
                {gtmMotions.map((motion) => (
                  <button
                    key={motion.id}
                    type="button"
                    className={`${styles.filterChip} ${filters.motions.includes(motion.id) ? styles.filterChipActive : ""}`}
                    style={
                      filters.motions.includes(motion.id)
                        ? ({ "--gtm": gtmMotionColor[motion.id] } as CSSProperties)
                        : undefined
                    }
                    onClick={() => toggleMotion(motion.id)}
                    aria-pressed={filters.motions.includes(motion.id)}
                  >
                    {motion.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Cisco architectures</span>
              <div className={styles.filterChips}>
                {CISCO_ARCHITECTURES.map((arch) => (
                  <button
                    key={arch.id}
                    type="button"
                    className={`${styles.filterChip} ${filters.architectures.includes(arch.id) ? styles.filterChipActive : ""}`}
                    style={
                      filters.architectures.includes(arch.id)
                        ? ({ "--arch": architectureColor[arch.id] } as CSSProperties)
                        : undefined
                    }
                    onClick={() => toggleArchitecture(arch.id)}
                    aria-pressed={filters.architectures.includes(arch.id)}
                  >
                    {arch.name}
                  </button>
                ))}
              </div>
            </div>

            <p className={styles.resultCount}>
              {filterActive
                ? `${total} of ${unfilteredTotal} demos`
                : `${unfilteredTotal} demos`}
            </p>
          </aside>

          <main className={styles.main}>
            {unfilteredTotal === 0 ? (
              <p className={styles.empty}>No new demos right now — check back soon.</p>
            ) : total === 0 ? (
              <p className={styles.empty}>
                No demos match your search or filters. Try broadening your query.
              </p>
            ) : (
              groups.map((group) => (
                <section
                  key={group.catalogLabel}
                  className={styles.section}
                  aria-labelledby={`new-${group.catalogLabel}`}
                >
                  <h2 id={`new-${group.catalogLabel}`} className={styles.sectionTitle}>
                    {group.catalogLabel}
                  </h2>
                  <ul className={styles.list}>
                    {group.items.map((item) => {
                      const gtmDemo =
                        item.catalog === "gtm" ? demoById(item.id) : undefined;
                      const space =
                        gtmDemo != null ? spaceById(primarySpaceId(gtmDemo)) : undefined;
                      const communityDemo =
                        item.catalog === "community"
                          ? communityDemoById(item.id)
                          : undefined;
                      const typeColor = TYPE_COLOR[item.demoType];

                      return (
                        <li key={item.id}>
                          <div
                            className={styles.row}
                            style={
                              space
                                ? ({
                                    "--accent": space.accent,
                                    "--accent2": space.accent2,
                                  } as CSSProperties)
                                : communityDemo
                                  ? ({
                                      "--accent": typeColor,
                                      "--accent2": "#7b5cff",
                                    } as CSSProperties)
                                  : undefined
                            }
                          >
                            <Link to={item.href} className={styles.rowLink}>
                              <span className={styles.swash} aria-hidden="true" />
                              <span className={styles.rowMain}>
                                <span className={styles.rowTitle}>{item.title}</span>
                                <span className={styles.rowMeta}>
                                  {item.demoCategory} · {item.contextLabel}
                                </span>
                              </span>
                              <span className={styles.published}>
                                Published {formatPublishedDate(item.publishedAt)}
                              </span>
                              <span className={styles.rowAction} aria-hidden="true">
                                →
                              </span>
                            </Link>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function toggleListItem<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function selectExclusive<T>(list: T[], value: T): T[] {
  return list.includes(value) ? [] : [value];
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
