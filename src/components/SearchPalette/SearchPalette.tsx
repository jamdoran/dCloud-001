import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { spaceById } from "@/data/catalog";
import {
  demoSpaceUrl,
  hasSearchResults,
  search,
  searchHitPath,
  searchHitVenue,
  spaceHitPath,
  spaceUrl,
  type DemoSearchHit,
  type SpaceSearchHit,
} from "@/lib/search";
import type { DemoType } from "@/lib/types";
import styles from "./SearchPalette.module.css";

const TYPE_COLOR: Record<DemoType, string> = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
};

export function SearchPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => search(query), [query]);
  const trimmed = query.trim();

  function goToSpace(hit: SpaceSearchHit) {
    navigate(spaceUrl(hit.space.id));
    onClose();
  }

  function goToDemo(hit: DemoSearchHit) {
    navigate(demoSpaceUrl(hit.space.id, hit.demo.id));
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className={styles.inputRow}>
          <SearchIcon />
          <input
            ref={inputRef}
            className={styles.input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search demos, products, spaces, or GTM motions…"
            aria-label="Search"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.esc}>Esc</kbd>
        </div>

        <p className={styles.hint}>
          Solution Spaces and GTM motions appear first; demos always open in the
          context of a Space.
        </p>

        <div className={styles.results} role="listbox" aria-label="Search results">
          {trimmed === "" ? (
            <p className={styles.empty}>
              Try a GTM motion, Space, or product — e.g. Future Proof Workplaces,
              Secure Networking, Catalyst 9300
            </p>
          ) : !hasSearchResults(results) ? (
            <p className={styles.empty}>No results for &ldquo;{trimmed}&rdquo;</p>
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
                          className={styles.spaceHit}
                          onClick={() => goToSpace(hit)}
                          role="option"
                        >
                          <span
                            className={styles.spacePill}
                            style={{
                              "--accent": hit.space.accent,
                              "--accent2": hit.space.accent2,
                            } as CSSProperties}
                          >
                            {hit.space.name}
                          </span>
                          <span className={styles.spaceTagline}>{hit.space.tagline}</span>
                          <div className={styles.breadcrumb}>{spaceHitPath(hit)}</div>
                          {hit.matchReason === "gtm-motion" && hit.matchedMotion && (
                            <div className={styles.matchNote}>
                              Matched GTM motion: <strong>{hit.matchedMotion}</strong>
                            </div>
                          )}
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
                            className={styles.hit}
                            onClick={() => goToDemo(hit)}
                            role="option"
                          >
                            <div className={styles.hitTop}>
                              <span
                                className={styles.typePill}
                                style={
                                  { "--type": TYPE_COLOR[hit.demo.type] } as CSSProperties
                                }
                              >
                                {hit.demo.type}
                              </span>
                              <span className={styles.duration}>
                                {hit.demo.durationMins} min
                              </span>
                            </div>

                            <span className={styles.hitTitle}>{hit.demo.title}</span>
                            <span className={styles.hitDesc}>{hit.demo.description}</span>

                            <div className={styles.context}>
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

                            <div className={styles.breadcrumb}>{searchHitPath(hit)}</div>

                            <div className={styles.motions}>
                              <span className={styles.motion}>{searchHitVenue(hit)}</span>
                            </div>

                            {hit.matchedProduct && (
                              <div className={styles.matchNote}>
                                Matched product: <strong>{hit.matchedProduct}</strong>
                              </div>
                            )}

                            {otherSpaces.length > 0 && (
                              <div className={styles.multiSpace}>
                                Also in: {otherSpaces.join(" · ")} — pick the Space that
                                fits your customer.
                              </div>
                            )}
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
      </div>
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
