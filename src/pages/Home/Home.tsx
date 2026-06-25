import { useState } from "react";
import type { CSSProperties } from "react";
import { TopBar } from "@/components/TopBar/TopBar";
import { SpaceCard } from "@/components/SpaceCard/SpaceCard";
import { getUser } from "@/lib/auth";
import {
  hubNewDemos,
  mySpaces,
  primarySpaceId,
  solutionSpaces,
  spaceById,
} from "@/data/catalog";
import styles from "./Home.module.css";

const HUB_SPACE_LIMIT = 6;

/**
 * Logged-in hub. Calm and spacious per the Cloud Control north-star: a soft
 * greeting, the Solution Spaces grid as the lead, a flat New Demos rail, and a
 * low-key My Spaces strip. Gamification is intentionally absent here.
 */
export function Home() {
  const user = getUser();
  const firstName = (user?.name ?? "there").split(" ")[0];
  const [showAllSpaces, setShowAllSpaces] = useState(false);
  const [showAllDemos, setShowAllDemos] = useState(false);

  const visibleSpaces = showAllSpaces
    ? solutionSpaces
    : solutionSpaces.slice(0, HUB_SPACE_LIMIT);
  const hasMoreSpaces = solutionSpaces.length > HUB_SPACE_LIMIT;
  const demos = hubNewDemos(showAllDemos);
  const hasMoreDemos = hubNewDemos(true).length > hubNewDemos(false).length;

  return (
    <div className={styles.page}>
      <TopBar />

      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />
        <h1 className={styles.greet}>
          Hi, <span className="gradient-text">{firstName}</span>
        </h1>
        <p className={styles.sub}>Welcome to Cisco dCloud</p>
      </section>

      <div className={styles.content}>
        <section className={styles.block}>
          <div className={styles.head}>
            <h2 className={styles.title}>Solution Spaces</h2>
            {hasMoreSpaces && (
              <button
                type="button"
                className={styles.viewAll}
                onClick={() => setShowAllSpaces((v) => !v)}
                aria-expanded={showAllSpaces}
              >
                {showAllSpaces ? "Show less" : "View all"}
              </button>
            )}
          </div>
          <div className={styles.spaces}>
            {visibleSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.head}>
            <h2 className={styles.title}>New Demos</h2>
            {hasMoreDemos && (
              <button
                type="button"
                className={styles.viewAll}
                onClick={() => setShowAllDemos((v) => !v)}
                aria-expanded={showAllDemos}
              >
                {showAllDemos ? "Show less" : "View all"}
              </button>
            )}
          </div>
          <div className={styles.demos}>
            {demos.map((demo) => {
              const space = spaceById(primarySpaceId(demo));
              return (
                <article key={demo.id} className={styles.demo}>
                  {space && (
                    <div
                      className={styles.demoVisual}
                      style={
                        {
                          "--accent": space.accent,
                          "--accent2": space.accent2,
                        } as CSSProperties
                      }
                      aria-hidden="true"
                    />
                  )}
                  <span className={styles.newTag}>NEW</span>
                  <h3 className={styles.demoTitle}>{demo.title}</h3>
                  <span className={styles.demoSpace}>{space?.name}</span>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.mySpaces}>
          <span className={styles.msLabel}>My Spaces</span>
          {mySpaces.map((ms) => (
            <span key={ms.id} className={styles.msItem}>
              {ms.status === "expo-live" ? (
                <span className={styles.live} aria-hidden="true" />
              ) : (
                <PencilIcon />
              )}
              {ms.customer} · {ms.status === "expo-live" ? "eXpo live" : "draft"}
            </span>
          ))}
          <button className={styles.msNew}>
            <PlusIcon />
            New Space
          </button>
        </section>
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20h4l10-10-4-4L4 16v4zM14 6l4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
