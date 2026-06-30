import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { CommunityDemoCard } from "@/components/CommunityDemoCard/CommunityDemoCard";
import { DemoModal } from "@/components/DemoModal/DemoModal";
import { COMMUNITY_TOPICS, communityDemoAsDemo, communityDemoById, communityDemosSorted, communityNewDemos } from "@/data/communityCatalog";
import {
  architectureColor,
  CISCO_ARCHITECTURES,
  type CiscoArchitectureId,
} from "@/lib/ciscoArchitectures";
import type { DemoCategory } from "@/lib/demoLabels";
import {
  emptyCommunitySearchFilters,
  hasActiveCommunityFilters,
  searchCommunity,
  type CommunitySearchFilters,
} from "@/lib/communitySearch";
import { DEMO_CATEGORY_FILTERS } from "@/lib/search";
import type { CommunityTopic } from "@/data/communityCatalog";
import type { DemoType } from "@/lib/types";
import styles from "./CommunityCatalog.module.css";

const TYPE_COLOR: Record<DemoType, string> = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
};

const CATEGORY_COLOR: Record<DemoCategory, string> = {
  "Solution Demo": TYPE_COLOR.Solution,
  "Guided Demo": TYPE_COLOR.Guided,
  "Instant Demo": TYPE_COLOR["Deep-Dive"],
  Lab: TYPE_COLOR.Lab,
};

/**
 * Community Content catalog — seller-contributed demos outside the GTM /
 * Solution Space hierarchy. Flat browse, new highlights, scoped search.
 */
export function CommunityCatalogPage() {
  const [searchParams] = useSearchParams();
  const focusDemoId = searchParams.get("demo");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<CommunitySearchFilters>(emptyCommunitySearchFilters());
  const [modalDemoId, setModalDemoId] = useState<string | null>(null);

  const hits = useMemo(() => searchCommunity(query, filters), [query, filters]);
  const filterActive = query.trim() !== "" || hasActiveCommunityFilters(filters);
  const isFiltering = filterActive;
  const listDemos = isFiltering ? hits.map((h) => h.demo) : communityDemosSorted();
  const newDemos = communityNewDemos(4);
  const totalCount = communityDemosSorted().length;

  const modalDemo = modalDemoId ? communityDemoById(modalDemoId) : undefined;

  useEffect(() => {
    if (!focusDemoId) return;
    const el = document.getElementById(`demo-${focusDemoId}`);
    if (!el) return;

    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);

    return () => clearTimeout(timer);
  }, [focusDemoId, listDemos.length]);

  function openDemoModal(id: string) {
    setModalDemoId(id);
  }

  function selectCategory(category: DemoCategory) {
    setFilters((prev) => ({
      ...prev,
      demoCategories: selectExclusive(prev.demoCategories, category),
    }));
  }

  function toggleTopic(topic: CommunityTopic) {
    setFilters((prev) => ({
      ...prev,
      topics: toggleListItem(prev.topics, topic),
    }));
  }

  function toggleArchitecture(id: CiscoArchitectureId) {
    setFilters((prev) => ({
      ...prev,
      architectures: toggleListItem(prev.architectures, id),
    }));
  }

  function clearFilters() {
    setQuery("");
    setFilters(emptyCommunitySearchFilters());
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <TopBar />

      <header className={styles.hero}>
        <Link to="/home" className={styles.crumb}>
          ← GTM Solutions hub
        </Link>
        <p className={styles.eyebrow}>Catalog</p>
        <h1 className={styles.title}>Community Content</h1>
        <p className={styles.lede}>
          Seller-contributed demos, field favourites and enablement assets — peer-rated
          and tagged, with no Solution Space context. Search or browse the flat catalog.
        </p>
      </header>

      <div className={styles.browse}>
        <div className={styles.searchRow}>
          <span className={styles.searchIcon} aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search community demos, products, contributors, topics…"
            aria-label="Search community content"
          />
          {filterActive && (
            <button type="button" className={styles.clearBtn} onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Filter community demos">
            <div className={styles.sidebarHead}>
              <span className={styles.sidebarTitle}>Filters</span>
              {filterActive && (
                <button type="button" className={styles.sidebarClear} onClick={clearFilters}>
                  Clear all
                </button>
              )}
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
              <span className={styles.filterLabel}>Topics</span>
              <div className={styles.filterChips}>
                {COMMUNITY_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`${styles.filterChip} ${filters.topics.includes(topic) ? styles.filterChipActive : ""}`}
                    onClick={() => toggleTopic(topic)}
                    aria-pressed={filters.topics.includes(topic)}
                  >
                    {topic}
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
                ? `${listDemos.length} of ${totalCount} demos`
                : `${totalCount} demos`}
            </p>
          </aside>

          <main className={styles.main}>
            {!isFiltering && (
              <section className={styles.block} aria-labelledby="community-new-heading">
                <div className={styles.blockHead}>
                  <h2 id="community-new-heading" className={styles.blockTitle}>
                    New from the community
                  </h2>
                </div>
                <div className={styles.newGrid}>
                  {newDemos.map((demo) => (
                    <CommunityDemoCard
                      key={demo.id}
                      demo={demo}
                      compact
                      highlighted={focusDemoId === demo.id}
                      onOpen={(d) => openDemoModal(d.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className={styles.block} aria-labelledby="community-all-heading">
              <div className={styles.blockHead}>
                <h2 id="community-all-heading" className={styles.blockTitle}>
                  {isFiltering ? "Matching demos" : "All community demos"}
                </h2>
                <span className={styles.count}>{listDemos.length}</span>
              </div>

              {listDemos.length === 0 ? (
                <p className={styles.empty}>
                  Nothing matches your search. Try fewer filters or a broader query.
                </p>
              ) : (
                <div className={styles.grid}>
                  {listDemos.map((demo) => (
                    <CommunityDemoCard
                      key={demo.id}
                      demo={demo}
                      highlighted={focusDemoId === demo.id}
                      onOpen={(d) => openDemoModal(d.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      {modalDemo && (
        <DemoModal
          demo={communityDemoAsDemo(modalDemo)}
          onClose={() => setModalDemoId(null)}
        />
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

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
