import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { FavouriteStar } from "@/components/FavouriteStar/FavouriteStar";
import { SpaceBackground } from "@/components/SpaceBackground/SpaceBackground";
import { DemoCard } from "@/components/DemoCard/DemoCard";
import { DemoModal } from "@/components/DemoModal/DemoModal";
import { demosForSpace, gtmMotionColor, motionName, solutionDemoForSpace, spaceById } from "@/data/catalog";
import { assetsForSpace } from "@/data/spaceAssets";
import type { DemoType, SpaceAsset } from "@/lib/types";
import styles from "./Space.module.css";

/**
 * A Solution Space page — the marquee feature. Each Space has a distinct
 * background, and its connected content grouped by demo type. Kept deliberately clean.
 */

const SECTION_LIMIT = 3;

/** Demo sections below the hero Solution demo, in display order. */
const DEMO_SECTIONS: {
  type: Exclude<DemoType, "Solution">;
  title: string;
  sectionId: string;
}[] = [
  { type: "Guided", title: "Guided demos", sectionId: "section-guided" },
  { type: "Deep-Dive", title: "Deep dives", sectionId: "section-deep-dive" },
  { type: "Lab", title: "Labs", sectionId: "section-lab" },
];

const SECTION_SOLUTION = "section-solution";
const SECTION_ASSETS = "section-assets";

interface TocItem {
  id: string;
  label: string;
}

function buildTocItems(
  spaceDemos: ReturnType<typeof demosForSpace>,
  hasSolutionDemo: boolean,
  hasAssets: boolean,
): TocItem[] {
  const items: TocItem[] = [];
  if (hasSolutionDemo) {
    items.push({ id: SECTION_SOLUTION, label: "Solution demo" });
  }
  for (const { type, title, sectionId } of DEMO_SECTIONS) {
    if (spaceDemos.some((d) => d.type === type)) {
      items.push({ id: sectionId, label: title });
    }
  }
  if (hasAssets) {
    items.push({ id: SECTION_ASSETS, label: "Additional assets" });
  }
  return items;
}

/** Whether a demo sits beyond the collapsed section limit and needs "View all". */
function demoNeedsSectionExpand(
  demos: ReturnType<typeof demosForSpace>,
  demoId: string,
  type: DemoType,
): boolean {
  if (type === "Solution") return false;
  const index = demos
    .filter((d) => d.type === type)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .findIndex((d) => d.id === demoId);
  return index >= SECTION_LIMIT;
}

export function SpacePage() {
  const { spaceId } = useParams();
  const [searchParams] = useSearchParams();
  const focusDemoId = searchParams.get("demo");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [modalDemoId, setModalDemoId] = useState<string | null>(null);
  const space = spaceId ? spaceById(spaceId) : undefined;

  useEffect(() => {
    setExpandedSections({});
    setModalDemoId(null);
  }, [spaceId]);

  useEffect(() => {
    if (!focusDemoId || !space) return;
    const demos = demosForSpace(space.id);
    const focused = demos.find((d) => d.id === focusDemoId);
    if (!focused || !demoNeedsSectionExpand(demos, focusDemoId, focused.type)) return;
    setExpandedSections((prev) =>
      prev[focused.type] ? prev : { ...prev, [focused.type]: true },
    );
  }, [focusDemoId, space]);

  useEffect(() => {
    if (!focusDemoId || !space) return;
    const demos = demosForSpace(space.id);
    const focused = demos.find((d) => d.id === focusDemoId);
    if (!focused) return;
    if (
      demoNeedsSectionExpand(demos, focusDemoId, focused.type) &&
      !expandedSections[focused.type]
    ) {
      return;
    }

    const el = document.getElementById(`demo-${focusDemoId}`);
    if (!el) return;

    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);

    return () => clearTimeout(timer);
  }, [focusDemoId, spaceId, space, expandedSections]);

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
  const assets = assetsForSpace(space.id);
  const tocItems = buildTocItems(spaceDemos, Boolean(solutionDemo), assets.length > 0);
  const modalDemo = modalDemoId
    ? spaceDemos.find((d) => d.id === modalDemoId)
    : undefined;

  function openDemoModal(demoId: string) {
    setModalDemoId(demoId);
  }

  function closeDemoModal() {
    setModalDemoId(null);
  }

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
                  <span
                    key={m}
                    className={styles.motionPill}
                    style={{ "--gtm": gtmMotionColor[m] } as CSSProperties}
                  >
                    {motionName(m)}
                  </span>
                ))}
              </div>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{space.name}</h1>
                <FavouriteStar kind="space" id={space.id} size={22} className={styles.favourite} />
              </div>
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

        {tocItems.length > 0 && (
          <nav className={styles.toc} aria-label="On this page">
            {tocItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.tocLink}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <main className={styles.content}>
          {solutionDemo && (
            <section id={SECTION_SOLUTION} className={styles.typeSection}>
              <h3 className={styles.typeHeader}>Solution demo</h3>
              <div className={styles.heroDemo}>
                <DemoCard
                  demo={solutionDemo}
                  variant="hero"
                  highlighted={focusDemoId === solutionDemo.id}
                  onOpen={(demo) => openDemoModal(demo.id)}
                />
              </div>
            </section>
          )}

          {DEMO_SECTIONS.map(({ type, title, sectionId }) => {
            const sectionDemos = spaceDemos
              .filter((d) => d.type === type)
              .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
            if (sectionDemos.length === 0) return null;

            const expanded = expandedSections[type] ?? false;
            const hasMore = sectionDemos.length > SECTION_LIMIT;
            const visibleDemos = expanded
              ? sectionDemos
              : sectionDemos.slice(0, SECTION_LIMIT);

            return (
              <section key={type} id={sectionId} className={styles.typeSection}>
                <div className={styles.typeHead}>
                  <h3 className={styles.typeHeader}>{title}</h3>
                  {hasMore && (
                    <button
                      type="button"
                      className={styles.viewAll}
                      onClick={() =>
                        setExpandedSections((prev) => ({ ...prev, [type]: !expanded }))
                      }
                      aria-expanded={expanded}
                    >
                      {expanded ? "Show less" : "View all"}
                    </button>
                  )}
                </div>
                <div className={styles.grid}>
                  {visibleDemos.map((demo) => (
                    <DemoCard
                      key={demo.id}
                      demo={demo}
                      highlighted={focusDemoId === demo.id}
                      onOpen={(d) => openDemoModal(d.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {assets.length > 0 && (
            <section id={SECTION_ASSETS} className={styles.typeSection}>
              <h3 className={styles.typeHeader}>Additional assets</h3>
              <div className={styles.assetsGrid}>
                {assets.map((asset) =>
                  asset.kind === "video" ? (
                    <AssetVideoCard
                      key={asset.id}
                      asset={asset}
                      accent={space.accent}
                      accent2={space.accent2}
                    />
                  ) : (
                    <AssetDocumentCard
                      key={asset.id}
                      asset={asset}
                      accent={space.accent}
                      accent2={space.accent2}
                    />
                  ),
                )}
              </div>
            </section>
          )}
        </main>

        {modalDemo && (
          <DemoModal demo={modalDemo} space={space} onClose={closeDemoModal} />
        )}
      </div>
    </div>
  );
}

function AssetVideoCard({
  asset,
  accent,
  accent2,
}: {
  asset: SpaceAsset;
  accent: string;
  accent2: string;
}) {
  const posterStyle = {
    "--accent": accent,
    "--accent2": accent2,
  } as CSSProperties;

  return (
    <a
      href={asset.href}
      className={styles.assetVideo}
      style={posterStyle}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.assetVideoPoster}>
        <div className={styles.assetVideoGlow} aria-hidden="true" />
        <span className={styles.assetVideoBrand}>Cisco Cloud Control</span>
        <span className={styles.assetPlayIcon} aria-hidden="true">
          <PlayIcon />
        </span>
      </div>
      <div className={styles.assetBody}>
        <h4 className={styles.assetTitle}>{asset.title}</h4>
        {asset.description && <p className={styles.assetDesc}>{asset.description}</p>}
        <span className={styles.assetVideoCta}>Watch on cisco.com</span>
      </div>
    </a>
  );
}

function AssetDocumentCard({
  asset,
  accent,
  accent2,
}: {
  asset: SpaceAsset;
  accent: string;
  accent2: string;
}) {
  const cardStyle = {
    "--accent": accent,
    "--accent2": accent2,
  } as CSSProperties;

  return (
    <a
      href={asset.href}
      className={styles.assetDoc}
      style={cardStyle}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.assetDocHeader}>
        <div className={styles.assetDocGlow} aria-hidden="true" />
        {asset.fileType && (
          <span className={styles.assetDocType}>{asset.fileType}</span>
        )}
        <span className={styles.assetDocGraphic} aria-hidden="true">
          <DocIcon />
        </span>
      </div>
      <div className={styles.assetBody}>
        <h4 className={styles.assetTitle}>{asset.title}</h4>
        <span className={styles.assetDocCta}>Read on cisco.com</span>
      </div>
    </a>
  );
}

function DocIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M8 13h8M8 17h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
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
