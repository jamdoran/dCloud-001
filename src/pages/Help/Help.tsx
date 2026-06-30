import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { SolutionSpaceInfographic } from "@/components/SolutionSpaceInfographic/SolutionSpaceInfographic";
import styles from "./Help.module.css";

/**
 * Help guide — Solution Space anatomy and demo types.
 */
export function HelpPage() {
  return (
    <div className={styles.page}>
      <TopBar />

      <article className={styles.article}>
        <header className={styles.hero}>
          <Link to="/home" className={styles.crumb}>
            ← Home
          </Link>
          <h1 className={styles.title}>Understanding Solution Spaces</h1>
          <p className={styles.lede}>
            How demos are organised in dCloud — the anchor Solution Demo, the
            surrounding content, and the seller journey from first conversation to
            hands-on proof.
          </p>
        </header>

        <div className={styles.videoBlock}>
          <SolutionSpacesVideo />
        </div>

        <section className={styles.section} aria-labelledby="infographic-heading">
          <h2 id="infographic-heading" className={styles.sectionTitle}>
            At a glance
          </h2>
          <SolutionSpaceInfographic />
        </section>

        <section className={styles.section} aria-labelledby="space-heading">
          <h2 id="space-heading" className={styles.sectionTitle}>
            What is a Solution Space?
          </h2>
          <div className={styles.prose}>
            <p>
              A <strong>Solution Space</strong> is the marquee feature of the new
              dCloud. It is a focused, fully-connected hub for one GTM solution —
              Secure AI Factory, Secure Campus &amp; Branch, Secure Data Centre, and
              so on. Each Space has a distinct visual identity, a defined
              seller→buyer journey, and every demo inside it is connected upstream.
              Nothing is orphaned on a flat list.
            </p>
            <p>
              Spaces are how sellers are meant to navigate. Search is available when
              you need it, but the Space is the preferred path — calm, spacious,
              and oriented around the customer conversation rather than a catalogue
              of assets.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="solution-heading">
          <h2 id="solution-heading" className={styles.sectionTitle}>
            Solution Demo — the anchor
          </h2>
          <div className={styles.prose}>
            <p>
              Every Solution Space contains <strong>one or more Solution Demos</strong>{" "}
              — typically just <strong>one</strong>. The Solution Demo{" "}
              <em>defines</em> the Space. It is the hero demo at the top of every
              Space page — designed to <strong>show the outcome end to end</strong>.
            </p>
            <ul>
              <li>
                <strong>Wide, not deep</strong> — covers a lot of ground without
                drilling into every component.
              </li>
              <li>
                <strong>One Cisco, end to end</strong> — tells the full outcome story
                across the portfolio.
              </li>
              <li>
                <strong>Conversation-ready</strong> — credible for AEs opening the
                narrative and SEs who need the full picture before going technical.
              </li>
            </ul>
            <p>
              Deep Dives, Guided Demos, and Labs all connect back to this anchor.
              If a demo cannot trace its lineage to a Solution Demo, it should be
              flagged as orphaned in Admin.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="surrounding-heading">
          <h2 id="surrounding-heading" className={styles.sectionTitle}>
            Surrounding demos
          </h2>
          <div className={styles.prose}>
            <p>
              Beyond the Solution Demo, three demo types surround the anchor and
              complete the journey. Each appears as its own section inside the
              Space. Conversations typically flow in this order — though you can
              enter at whichever step fits the time and audience in the room.
            </p>
          </div>

          <div className={styles.typeGrid}>
            <TypeBlock
              label="1 · Guided Demo"
              tag="Set the scene in minutes"
              body="Click-through intros for customer conversations, new product launches, and AE-friendly five-minute slots. Light, fast, and designed to open the door — not replace the Solution Demo."
            />
            <TypeBlock
              label="3 · Deep Dive Demo"
              tag="Drill into what matters"
              body="A subset of the Solution Demo — networks, sites, WANs, security controls, fabric design. Same topology, same tooling, same visual language as the anchor demo. Minimum cognitive dissonance."
            />
            <TypeBlock
              label="4 · Lab / POV"
              tag="Prove it hands-on"
              body="Two modes: a fully configured sandbox where the customer can configure anything in service of the demo, or a mostly blank environment for a genuine hands-on build experience."
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="labs-heading">
          <h2 id="labs-heading" className={styles.sectionTitle}>
            Lab modes in detail
          </h2>
          <div className={styles.labModes}>
            <div className={styles.labMode}>
              <h3 className={styles.labTitle}>Fully configured</h3>
              <p>
                The environment is wired and ready. Services run, policies are in
                place, and the customer has absolute freedom to reconfigure,
                extend, or stress-test in service of the demo. Best for SE-led
                workshops, polished POVs, and customers who want to explore rather
                than build from scratch.
              </p>
            </div>
            <div className={styles.labMode}>
              <h3 className={styles.labTitle}>Mostly blank</h3>
              <p>
                A sparse starting point — the customer (or partner) performs the
                configuration themselves with guidance. Best for technical
                validation, enablement, and CPOC-style engagements where doing the
                work is the proof.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="principles-heading">
          <h2 id="principles-heading" className={styles.sectionTitle}>
            Key principles
          </h2>
          <ul className={styles.principles}>
            <li>Everything connects upstream — no orphaned demos.</li>
            <li>Deep Dives inherit the Solution Demo environment and UX.</li>
            <li>Search always opens a demo inside its Solution Space context.</li>
            <li>Navigation via Spaces is preferred over raw catalogue browsing.</li>
            <li>Each Space has a unique visual identity — not a reskin of the old dCloud.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

function SolutionSpacesVideo() {
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
        src="/videos/solution-spaces.mp4"
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
          aria-label="Play Solution Spaces overview"
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

function TypeBlock({
  label,
  tag,
  body,
}: {
  label: string;
  tag: string;
  body: string;
}) {
  return (
    <div className={styles.typeCard}>
      <span className={styles.typeLabel}>{label}</span>
      <strong className={styles.typeTag}>{tag}</strong>
      <p>{body}</p>
    </div>
  );
}
