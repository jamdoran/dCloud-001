import { Link, useParams } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { SpaceBackground } from "@/components/SpaceBackground/SpaceBackground";
import { DemoCard } from "@/components/DemoCard/DemoCard";
import { demosForSpace, motionName, spaceById } from "@/data/catalog";
import type { DemoType } from "@/lib/types";
import styles from "./Space.module.css";

/**
 * A Solution Space page — the marquee feature. Each Space has a distinct
 * background, a clear seller→buyer journey, and its connected content grouped
 * by demo type. Kept deliberately clean.
 */

const JOURNEY = [
  { label: "Guided demos", hint: "Set the scene in minutes" },
  { label: "Solution demo", hint: "Show the outcome end to end" },
  { label: "Deep dives", hint: "Drill into what matters" },
  { label: "Lab / POV", hint: "Prove it hands-on" },
];

/** Order content by the natural journey path; tags convey the type per card. */
const TYPE_RANK: Record<DemoType, number> = {
  Guided: 0,
  Solution: 1,
  "Deep-Dive": 2,
  Lab: 3,
};

export function SpacePage() {
  const { spaceId } = useParams();
  const space = spaceId ? spaceById(spaceId) : undefined;

  if (!space) {
    return (
      <div className={styles.page}>
        <div className={styles.fg}>
          <TopBar />
          <div className={styles.missing}>
            <p>That Solution Space doesn’t exist.</p>
            <Link to="/home" className={styles.crumb}>
              ← Back to hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const spaceDemos = [...demosForSpace(space.id)].sort(
    (a, b) => TYPE_RANK[a.type] - TYPE_RANK[b.type],
  );
  const labCount = spaceDemos.filter((d) => d.type === "Lab").length;
  const demoCount = spaceDemos.length - labCount;

  return (
    <div className={styles.page}>
      <SpaceBackground space={space} />

      <div className={styles.fg}>
        <TopBar />

        <header className={styles.hero}>
          <Link to="/home" className={styles.crumb}>
            ← Solution Spaces
          </Link>
          <div className={styles.motions}>
            {space.motions.map((m) => (
              <span key={m} className={styles.motionPill}>
                {motionName(m)}
              </span>
            ))}
          </div>
          <h1 className={styles.title}>{space.name}</h1>
          <p className={styles.tagline}>{space.tagline}</p>
          <div className={styles.meta}>
            <span>{demoCount} demos</span>
            <span className={styles.metaDot} />
            <span>
              {labCount} {labCount === 1 ? "lab" : "labs"}
            </span>
          </div>
          <div className={styles.actions}>
            <button className={styles.primary}>Start the guided tour</button>
            <button className={styles.secondary}>Book a session</button>
          </div>
        </header>

        <section className={styles.journey} aria-label="The journey">
          <h2 className={styles.journeyTitle}>The journey</h2>
          <ol className={styles.steps}>
            {JOURNEY.map((step, i) => (
              <li key={step.label} className={styles.step}>
                <span className={styles.stepNo}>{i + 1}</span>
                <span className={styles.stepBody}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepHint}>{step.hint}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <main className={styles.content}>
          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Demos &amp; labs</h3>
            <div className={styles.grid}>
              {spaceDemos.map((demo) => (
                <DemoCard key={demo.id} demo={demo} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
