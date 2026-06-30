import { useState, type CSSProperties } from "react";
import { COMMUNITY_TOPICS } from "@/data/communityCatalog";
import { demoCategory } from "@/lib/demoLabels";
import {
  activeCommunityFilterCount,
  emptyCommunitySearchFilters,
  hasActiveCommunityFilters,
  type CommunitySearchFilters,
  type CommunitySearchHit,
} from "@/lib/communitySearch";
import { DEMO_CATEGORY_FILTERS } from "@/lib/search";
import type { DemoCategory } from "@/lib/demoLabels";
import type { CommunityTopic } from "@/data/communityCatalog";
import type { DemoType } from "@/lib/types";
import searchStyles from "@/components/SearchPalette/SearchPalette.module.css";
import styles from "./CommunitySearchPanel.module.css";

const TYPE_COLOR: Record<DemoType, string> = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
};

export function CommunitySearchPanel({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  hits,
  onSelectDemo,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  filters: CommunitySearchFilters;
  onFiltersChange: (filters: CommunitySearchFilters) => void;
  hits: CommunitySearchHit[];
  onSelectDemo: (demoId: string) => void;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const trimmed = query.trim();
  const filterCount = activeCommunityFilterCount(filters);
  const showResults = trimmed !== "" || hasActiveCommunityFilters(filters);
  const showBody = showResults || filtersOpen;

  function selectCategory(category: DemoCategory) {
    onFiltersChange({
      ...filters,
      demoCategories: selectExclusive(filters.demoCategories, category),
    });
  }

  function toggleTopic(topic: CommunityTopic) {
    onFiltersChange({
      ...filters,
      topics: toggleListItem(filters.topics, topic),
    });
  }

  function clearFilters() {
    onFiltersChange(emptyCommunitySearchFilters());
  }

  return (
    <div className={`${searchStyles.panel} ${searchStyles.panelInline}`}>
      <div className={searchStyles.inputRow}>
        <span className={searchStyles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          className={searchStyles.input}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              if (filtersOpen) {
                setFiltersOpen(false);
                return;
              }
              onQueryChange("");
            }
          }}
          placeholder="Search community demos, products, contributors, topics…"
          aria-label="Search community content"
          aria-expanded={showResults}
          aria-controls="community-search-results"
          autoComplete="off"
          spellCheck={false}
        />
        <div className={searchStyles.filterWrap}>
          <button
            type="button"
            className={`${searchStyles.filterBtn} ${filtersOpen ? searchStyles.filterBtnOpen : ""} ${filterCount > 0 ? searchStyles.filterBtnActive : ""}`}
            onClick={() => setFiltersOpen((open) => !open)}
            aria-label={filtersOpen ? "Hide filters" : "Show filters"}
            aria-expanded={filtersOpen}
            aria-controls="community-search-filters"
          >
            <FilterIcon />
            {filterCount > 0 && (
              <span className={searchStyles.filterBadge} aria-hidden="true">
                {filterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {showBody && (
        <div className={`${searchStyles.body} ${filtersOpen ? searchStyles.bodyWithFilters : ""}`}>
          <div className={searchStyles.mainPane}>
            {showResults ? (
              <div
                id="community-search-results"
                className={`${searchStyles.results} ${searchStyles.resultsInline} ${styles.results}`}
                role="listbox"
                aria-label="Community search results"
              >
                {hits.length === 0 ? (
                  <p className={searchStyles.empty}>
                    {trimmed
                      ? `No community demos for “${trimmed}”${filterCount > 0 ? " with these filters" : ""}`
                      : "No demos match these filters"}
                  </p>
                ) : (
                  <ul className={styles.hitList}>
                    {hits.map(({ demo, matchFields }) => (
                      <li key={demo.id}>
                        <button
                          type="button"
                          className={styles.hitBtn}
                          style={{ "--type": TYPE_COLOR[demo.type] } as CSSProperties}
                          onClick={() => onSelectDemo(demo.id)}
                        >
                          <span className={styles.hitType}>{demoCategory(demo)}</span>
                          <span className={styles.hitTitle}>{demo.title}</span>
                          <span className={styles.hitMeta}>
                            {demo.contributor}
                            {matchFields.length > 0 && (
                              <span className={styles.hitMatch}>
                                · matched {matchFields.join(", ")}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className={searchStyles.browseHint}>
                <p>Select demo type or topic filters to narrow the list.</p>
              </div>
            )}
          </div>

          {filtersOpen && (
            <aside
              id="community-search-filters"
              className={searchStyles.filterRail}
              aria-label="Community search filters"
            >
              <div className={searchStyles.filterHead}>
                <span className={searchStyles.filterTitle}>Filters</span>
                <div className={searchStyles.filterHeadActions}>
                  {filterCount > 0 && (
                    <button type="button" className={searchStyles.filterClear} onClick={clearFilters}>
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    className={searchStyles.filterClose}
                    onClick={() => setFiltersOpen(false)}
                    aria-label="Close filters"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div className={searchStyles.filterGroup}>
                <span className={searchStyles.filterLabel}>Demo type</span>
                <div className={searchStyles.filterChips}>
                  {DEMO_CATEGORY_FILTERS.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`${searchStyles.filterChip} ${filters.demoCategories.includes(category) ? searchStyles.filterChipActive : ""}`}
                      style={
                        filters.demoCategories.includes(category)
                          ? ({ "--type": demoCategoryColor(category) } as CSSProperties)
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

              <div className={searchStyles.filterGroup}>
                <span className={searchStyles.filterLabel}>Topics</span>
                <div className={searchStyles.filterChips}>
                  {COMMUNITY_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className={`${searchStyles.filterChip} ${filters.topics.includes(topic) ? searchStyles.filterChipActive : ""}`}
                      onClick={() => toggleTopic(topic)}
                      aria-pressed={filters.topics.includes(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}

function toggleListItem<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function selectExclusive<T>(list: T[], value: T): T[] {
  return list.includes(value) ? [] : [value];
}

function demoCategoryColor(category: DemoCategory): string {
  switch (category) {
    case "Solution Demo":
      return TYPE_COLOR.Solution;
    case "Guided Demo":
      return TYPE_COLOR.Guided;
    case "Lab":
      return TYPE_COLOR.Lab;
    case "Instant Demo":
      return TYPE_COLOR["Deep-Dive"];
  }
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
