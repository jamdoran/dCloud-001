import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { SpaceBackground } from "@/components/SpaceBackground/SpaceBackground";
import { DemoCard } from "@/components/DemoCard/DemoCard";
import { demosForSpace, motionName, solutionDemoForSpace, spaceById } from "@/data/catalog";
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

/** Demo sections below the hero Solution demo, in journey order. */
const DEMO_SECTIONS: { type: Exclude<DemoType, "Solution">; title: string }[] = [
  { type: "Guided", title: "Guided demos" },
  { type: "Deep-Dive", title: "Deep dives" },
  { type: "Lab", title: "Labs" },
];

export function SpacePage() {
  const { spaceId } = useParams();
  const [searchParams] = useSearchParams();
  const focusDemoId = searchParams.get("demo");
  const scrolledRef = useRef(false);
  const space = spaceId ? spaceById(spaceId) : undefined;

  useEffect(() => {
    scrolledRef.current = false;
  }, [focusDemoId, spaceId]);

  useEffect(() => {
    if (!focusDemoId || scrolledRef.current) return;
    const el = document.getElementById(`demo-${focusDemoId}`);
    if (!el) return;
    scrolledRef.current = true;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [focusDemoId, spaceId]);

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

  const spaceDemos = demosForSpace(space.id);
  const solutionDemo = solutionDemoForSpace(space.id);
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

          <div className={styles.heroBody}>
            <div className={styles.heroMain}>
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
            </div>

            <aside className={styles.heroVideo} aria-label="Solution overview video">
              <SolutionOverviewVideo />
              <span className={styles.videoLabel}>Solution overview</span>
            </aside>
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
          {solutionDemo && (
            <section className={styles.typeSection}>
              <h3 className={styles.typeHeader}>Solution demo</h3>
              <div className={styles.heroDemo}>
                <DemoCard
                  demo={solutionDemo}
                  variant="hero"
                  highlighted={focusDemoId === solutionDemo.id}
                />
              </div>
            </section>
          )}

          {DEMO_SECTIONS.map(({ type, title }) => {
            const sectionDemos = spaceDemos.filter((d) => d.type === type);
            if (sectionDemos.length === 0) return null;

            return (
              <section key={type} className={styles.typeSection}>
                <h3 className={styles.typeHeader}>{title}</h3>
                <div className={styles.grid}>
                  {sectionDemos.map((demo) => (
                    <DemoCard
                      key={demo.id}
                      demo={demo}
                      highlighted={focusDemoId === demo.id}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}

function SolutionOverviewVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    void videoRef.current?.play();
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  return (
    <div className={styles.videoWrap}>
      <video
        ref={videoRef}
        className={styles.video}
        playsInline
        preload="metadata"
        src="/videos/hyperspace.mp4"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        Your browser does not support embedded video.
      </video>

      {!playing && (
        <button
          type="button"
          className={styles.playBtn}
          onClick={play}
          aria-label="Play solution overview"
        >
          <span className={styles.playIcon} aria-hidden="true">
            <PlayIcon />
          </span>
        </button>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l11.04-6.86a1 1 0 0 0 0-1.7L9.54 4.3A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
