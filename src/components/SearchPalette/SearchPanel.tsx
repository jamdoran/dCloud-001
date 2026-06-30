import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { gtmMotionColor, gtmMotions, motionName, solutionSpaces, spaceById } from "@/data/catalog";
import {
  architectureColor,
  CISCO_ARCHITECTURES,
  type CiscoArchitectureId,
} from "@/lib/ciscoArchitectures";
import { demoCategory, type DemoCategory } from "@/lib/demoLabels";
import {
  activeSearchFilterCount,
  DEMO_CATEGORY_FILTERS,
  demoSpaceUrl,
  emptySearchFilters,
  hasActiveSearchFilters,
  hasSearchResults,
  search,
  spaceUrl,
  type DemoSearchHit,
  type SearchFilters,
  type SpaceSearchHit,
} from "@/lib/search";
import type { DemoType, GtmMotionId } from "@/lib/types";
import { useSearch } from "./SearchContext";
import styles from "./SearchPalette.module.css";

const TYPE_COLOR: Record<DemoType, string> = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
};

export function SearchPanel({
  variant = "modal",
  autoFocus = false,
  onNavigate,
}: {
  variant?: "modal" | "inline";
  autoFocus?: boolean;
  /** Called after a result is chosen — e.g. to close the ⌘K overlay. */
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const { openSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(emptySearchFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const results = useMemo(() => search(query, filters), [query, filters]);
  const trimmed = query.trim();
  const filterCount = activeSearchFilterCount(filters);
  const showResults = trimmed !== "" || hasActiveSearchFilters(filters);

  function toggleMotion(id: GtmMotionId) {
    setFilters((prev) => ({
      ...prev,
      motions: toggleListItem(prev.motions, id),
    }));
  }

  function toggleSpace(id: string) {
    setFilters((prev) => ({
      ...prev,
      spaceIds: toggleListItem(prev.spaceIds, id),
    }));
  }

  function selectDemoCategory(category: DemoCategory) {
    setFilters((prev) => ({
      ...prev,
      demoCategories: selectExclusive(prev.demoCategories, category),
    }));
  }

  function toggleArchitecture(id: CiscoArchitectureId) {
    setFilters((prev) => ({
      ...prev,
      architectures: toggleListItem(prev.architectures, id),
    }));
  }

  function clearFilters() {
    setFilters(emptySearchFilters());
  }

  function setMatchAll(matchAll: boolean) {
    setFilters((prev) => ({ ...prev, matchAll }));
  }

  function finishNavigate() {
    onNavigate?.();
    if (variant === "inline") {
      setQuery("");
      inputRef.current?.blur();
    }
  }

  function goToSpace(hit: SpaceSearchHit) {
    navigate(spaceUrl(hit.space.id));
    finishNavigate();
  }

  function goToDemo(hit: DemoSearchHit) {
    navigate(demoSpaceUrl(hit.space.id, hit.demo.id));
    finishNavigate();
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (filtersOpen) {
        setFiltersOpen(false);
        return;
      }
      setQuery("");
      inputRef.current?.blur();
    }
  }

  const panelClass =
    variant === "inline" ? `${styles.panel} ${styles.panelInline}` : styles.panel;

  const showBody = showResults || filtersOpen;

  return (
    <div className={panelClass}>
      <div className={styles.inputRow}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder="Search demos, products, spaces, or GTM motions…"
          aria-label="Search"
          aria-expanded={showResults}
          aria-controls="search-results"
          autoComplete="off"
          spellCheck={false}
        />
        <div className={styles.filterWrap}>
          <button
            type="button"
            className={`${styles.filterBtn} ${filtersOpen ? styles.filterBtnOpen : ""} ${filterCount > 0 ? styles.filterBtnActive : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setFiltersOpen((open) => !open);
            }}
            aria-label={filtersOpen ? "Hide filters" : "Show filters"}
            aria-expanded={filtersOpen}
            aria-controls="search-filters"
          >
            <FilterIcon />
            {filterCount > 0 && (
              <span className={styles.filterBadge} aria-hidden="true">
                {filterCount}
              </span>
            )}
          </button>
        </div>
        {variant === "modal" ? (
          <kbd className={styles.esc}>Esc</kbd>
        ) : (
          <button
            type="button"
            className={styles.kbdBtn}
            onClick={openSearch}
            aria-label="Open search palette"
          >
            ⌘K
          </button>
        )}
      </div>

      {showBody && (
        <div className={`${styles.body} ${filtersOpen ? styles.bodyWithFilters : ""}`}>
          <div className={styles.mainPane}>
            {showResults ? (
              <div
                id="search-results"
                className={
                  variant === "inline" ? `${styles.results} ${styles.resultsInline}` : styles.results
                }
                role="listbox"
                aria-label="Search results"
              >
                {!hasSearchResults(results) ? (
                  <p className={styles.empty}>
                    {trimmed
                      ? `No results for “${trimmed}”${filterCount > 0 ? " with these filters" : ""}`
                      : "No results match these filters"}
                  </p>
                ) : (
                  <>
                    {results.spaces.length > 0 && (
                      <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Solution Spaces</h3>
                        <ul className={styles.sectionList}>
                          {results.spaces.map((hit) => (
                            <li key={hit.space.id}>
                              <button
                                type="button"
                                className={`${styles.resultItem} ${styles.spaceHit}`}
                                onClick={() => goToSpace(hit)}
                                role="option"
                              >
                                <div className={styles.resultBody}>
                                  <span
                                    className={styles.spacePill}
                                    style={{
                                      "--accent": hit.space.accent,
                                      "--accent2": hit.space.accent2,
                                    } as CSSProperties}
                                  >
                                    {hit.space.name}
                                  </span>
                                  <p className={styles.spaceTagline}>{hit.space.tagline}</p>
                                  {hit.matchReason === "gtm-motion" && hit.matchedMotion && (
                                    <p className={styles.resultExtra}>
                                      Matched GTM motion: <strong>{hit.matchedMotion}</strong>
                                    </p>
                                  )}
                                </div>
                                <div className={styles.resultFoot}>
                                  <GtmMotionPills motionIds={hit.space.motions} />
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {results.demos.length > 0 && (
                      <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Demos</h3>
                        <ul className={styles.sectionList}>
                          {results.demos.map((hit) => {
                            const otherSpaces = hit.demo.spaceIds
                              .filter((id) => id !== hit.space.id)
                              .map((id) => spaceById(id)?.name)
                              .filter(Boolean);

                            return (
                              <li key={`${hit.demo.id}-${hit.space.id}`}>
                                <button
                                  type="button"
                                  className={`${styles.resultItem} ${styles.hit}`}
                                  onClick={() => goToDemo(hit)}
                                  role="option"
                                >
                                  <div className={styles.resultBody}>
                                    <div className={styles.hitTop}>
                                      <div className={styles.hitTopLeft}>
                                        <span className={styles.contextLabel}>Opens in</span>
                                        <span
                                          className={styles.spacePillSmall}
                                          style={{
                                            "--accent": hit.space.accent,
                                            "--accent2": hit.space.accent2,
                                          } as CSSProperties}
                                        >
                                          {hit.space.name}
                                        </span>
                                      </div>
                                      <div className={styles.hitTopRight}>
                                        <span
                                          className={styles.typePill}
                                          style={
                                            { "--type": TYPE_COLOR[hit.demo.type] } as CSSProperties
                                          }
                                        >
                                          {demoCategory(hit.demo)}
                                        </span>
                                      </div>
                                    </div>

                                    <span className={styles.hitTitle}>{hit.demo.title}</span>
                                    <p className={styles.hitDesc}>{hit.demo.description}</p>

                                    {(hit.matchedProduct || otherSpaces.length > 0) && (
                                      <p className={styles.resultExtra}>
                                        {hit.matchedProduct && (
                                          <>
                                            Matched product: <strong>{hit.matchedProduct}</strong>
                                          </>
                                        )}
                                        {hit.matchedProduct && otherSpaces.length > 0 && " · "}
                                        {otherSpaces.length > 0 && (
                                          <>Also in: {otherSpaces.join(" · ")}</>
                                        )}
                                      </p>
                                    )}
                                  </div>

                                  <div className={styles.resultFoot}>
                                    <GtmMotionPills motionIds={hit.space.motions} />
                                  </div>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className={styles.browseHint}>
                <p>Select one or more filters to browse the catalog.</p>
              </div>
            )}
          </div>

          {filtersOpen && (
            <SearchFiltersRail
              filters={filters}
              filterCount={filterCount}
              onClear={clearFilters}
              onClose={() => setFiltersOpen(false)}
              onToggleMotion={toggleMotion}
              onToggleSpace={toggleSpace}
              onToggleDemoCategory={selectDemoCategory}
              onToggleArchitecture={toggleArchitecture}
              onSetMatchAll={setMatchAll}
            />
          )}
        </div>
      )}
    </div>
  );
}

function SearchFiltersRail({
  filters,
  filterCount,
  onClear,
  onClose,
  onToggleMotion,
  onToggleSpace,
  onToggleDemoCategory,
  onToggleArchitecture,
  onSetMatchAll,
}: {
  filters: SearchFilters;
  filterCount: number;
  onClear: () => void;
  onClose: () => void;
  onToggleMotion: (id: GtmMotionId) => void;
  onToggleSpace: (id: string) => void;
  onToggleDemoCategory: (category: DemoCategory) => void;
  onToggleArchitecture: (id: CiscoArchitectureId) => void;
  onSetMatchAll: (matchAll: boolean) => void;
}) {
  const multiSelect =
    filters.motions.length > 1 ||
    filters.spaceIds.length > 1 ||
    filters.architectures.length > 1;

  return (
    <aside id="search-filters" className={styles.filterRail} aria-label="Search filters">
      <div className={styles.filterHead}>
        <span className={styles.filterTitle}>Filters</span>
        <div className={styles.filterHeadActions}>
          {filterCount > 0 && (
            <button type="button" className={styles.filterClear} onClick={onClear}>
              Clear all
            </button>
          )}
          <button type="button" className={styles.filterClose} onClick={onClose} aria-label="Close filters">
            <CloseIcon />
          </button>
        </div>
      </div>

      {multiSelect && (
        <div className={styles.matchMode}>
          <span className={styles.filterLabel}>Multiple selections</span>
          <div className={styles.matchModeToggle} role="group" aria-label="Filter match mode">
            <button
              type="button"
              className={`${styles.matchModeBtn} ${!filters.matchAll ? styles.matchModeBtnActive : ""}`}
              aria-pressed={!filters.matchAll}
              onClick={() => onSetMatchAll(false)}
            >
              Any
            </button>
            <button
              type="button"
              className={`${styles.matchModeBtn} ${filters.matchAll ? styles.matchModeBtnActive : ""}`}
              aria-pressed={filters.matchAll}
              onClick={() => onSetMatchAll(true)}
            >
              All
            </button>
          </div>
          <p className={styles.matchModeHint}>
            {filters.matchAll
              ? "Results must match every selected filter in each group."
              : "Results can match any selected filter in each group."}
          </p>
        </div>
      )}

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
              onClick={() => onToggleMotion(motion.id)}
              aria-pressed={filters.motions.includes(motion.id)}
            >
              {motion.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Solution Spaces</span>
        <div className={styles.filterChips}>
          {solutionSpaces.map((space) => (
            <button
              key={space.id}
              type="button"
              className={`${styles.filterChip} ${filters.spaceIds.includes(space.id) ? styles.filterChipActive : ""}`}
              style={
                filters.spaceIds.includes(space.id)
                  ? ({
                      "--accent": space.accent,
                      "--accent2": space.accent2,
                    } as CSSProperties)
                  : undefined
              }
              onClick={() => onToggleSpace(space.id)}
              aria-pressed={filters.spaceIds.includes(space.id)}
            >
              {space.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Demo type</span>
        <div className={styles.filterChips}>
          {DEMO_CATEGORY_FILTERS.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filterChip} ${filters.demoCategories.includes(category) ? styles.filterChipActive : ""}`}
              style={
                filters.demoCategories.includes(category)
                  ? ({ "--type": demoCategoryColor(category) } as CSSProperties)
                  : undefined
              }
              onClick={() => onToggleDemoCategory(category)}
              aria-pressed={filters.demoCategories.includes(category)}
            >
              {category}
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
              onClick={() => onToggleArchitecture(arch.id)}
              aria-pressed={filters.architectures.includes(arch.id)}
            >
              {arch.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
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

function GtmMotionPills({ motionIds }: { motionIds: SpaceSearchHit["space"]["motions"] }) {
  if (motionIds.length === 0) return null;

  return (
    <div className={styles.gtmRow}>
      {motionIds.map((id) => (
        <span
          key={id}
          className={styles.gtmPill}
          style={{ "--gtm": gtmMotionColor[id] } as CSSProperties}
        >
          {motionName(id)}
        </span>
      ))}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M20 20l-3.2-3.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
