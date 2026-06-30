import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { TopBar } from "@/components/TopBar/TopBar";
import { SearchPanel } from "@/components/SearchPalette/SearchPanel";
import { SpaceCard } from "@/components/SpaceCard/SpaceCard";
import { getUser } from "@/lib/auth";
import { demoSpaceUrl } from "@/lib/search";
import {
  hubNewDemos,
  primarySpaceId,
  solutionSpaces,
  spaceById,
} from "@/data/catalog";
import styles from "./Home.module.css";

/**
 * Logged-in hub. Calm and spacious per the Cloud Control north-star: a soft
 * greeting, the Solution Spaces grid as the lead, and a flat New Demos rail.
 * Gamification is intentionally absent here.
 */
export function Home() {
  const user = getUser();
  const firstName = (user?.name ?? "there").split(" ")[0];
  const demos = hubNewDemos(false);

  return (
    <div className={styles.page}>
      <div className={styles.pageGlow} aria-hidden="true" />
      <TopBar />

      <section className={styles.hero}>
        <h1 className={styles.greet}>
          Hi, <span className="gradient-text">{firstName}</span>
        </h1>
        <p className={styles.sub}>Welcome to Cisco dCloud</p>
      </section>

      <section className={styles.search} aria-label="Search">
        <SearchPanel variant="inline" />
      </section>

      <div className={styles.content}>
        <section className={styles.block}>
          <div className={styles.head}>
            <h2 className={styles.title}>Solution Spaces</h2>
          </div>
          <div className={styles.spaces}>
            {solutionSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.head}>
            <h2 className={styles.title}>New Demos</h2>
          </div>
          <div className={styles.demos}>
            {demos.map((demo) => {
              const space = spaceById(primarySpaceId(demo));
              return (
                <Link
                  key={demo.id}
                  to={demoSpaceUrl(primarySpaceId(demo), demo.id)}
                  className={styles.demo}
                >
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
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
