import styles from "./SolutionSpaceInfographic.module.css";

/**
 * Static infographic for the Help page — mirrors the Solution Space anatomy
 * canvas: anchor Solution Demo, surrounding demo types, seller journey.
 */
export function SolutionSpaceInfographic() {
  return (
    <figure className={styles.figure} aria-labelledby="infographic-title">
      <figcaption id="infographic-title" className={styles.caption}>
        How a Solution Space is structured
      </figcaption>

      <div className={styles.canvas}>
        <div className={styles.spaceShell}>
          <span className={styles.spaceLabel}>Solution Space</span>
          <span className={styles.spaceHint}>
            Focused hub for one GTM solution · typically one anchor demo
          </span>

          <div className={styles.anchor}>
            <span className={styles.anchorTag}>Solution Demo</span>
            <strong className={styles.anchorTitle}>Defines the Space</strong>
            <p className={styles.anchorDesc}>
              Wide, not deep · One Cisco end-to-end · usually one per Space
            </p>
          </div>

          <span className={styles.upstream}>Surrounding demos connect upstream</span>

          <div className={styles.orbit}>
            <OrbitCard
              title="Guided Demos"
              desc="Stage the conversation · intros · new products · AE slots"
              accent="guided"
            />
            <OrbitCard
              title="Deep Dive Demos"
              desc="Subset of the Solution Demo · deep on one area · same UX"
              accent="deep"
            />
            <OrbitCard
              title="Labs"
              desc="Fully configured sandbox · or mostly blank hands-on build"
              accent="lab"
            />
          </div>
        </div>
      </div>
    </figure>
  );
}

function OrbitCard({
  title,
  desc,
  accent,
}: {
  title: string;
  desc: string;
  accent: "guided" | "deep" | "lab";
}) {
  return (
    <div className={styles.orbitCard} data-accent={accent}>
      <strong>{title}</strong>
      <p>{desc}</p>
    </div>
  );
}
