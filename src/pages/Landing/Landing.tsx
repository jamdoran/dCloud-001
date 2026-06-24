import { useNavigate } from "react-router-dom";
import { SpiralLogo } from "@/components/SpiralLogo/SpiralLogo";
import { login } from "@/lib/auth";
import styles from "./Landing.module.css";

/**
 * Logged-out landing — the only public, crawlable page in the app.
 * Everything else lives behind the simulated Cisco SSO.
 */

const HIGHLIGHTS = [
  {
    title: "Organised by solution",
    body: "Demos live inside the GTM solutions you actually sell — not one flat, endless list.",
  },
  {
    title: "Solution Zones",
    body: "Enter a zone and everything connects: guided intro, deep-dive demo, lab and docs in one place.",
  },
  {
    title: "A real journey",
    body: "Take the customer from a five-minute click-thru to a hands-on proof of value — no dead ends.",
  },
];

export function Landing() {
  const navigate = useNavigate();

  function handleLogin() {
    login();
    navigate("/home");
  }

  return (
    <main className={styles.page}>
      {/* Ambient gradient glow behind the hero */}
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {/* Auth actions — top right */}
      <header className={styles.topbar}>
        <div className={styles.authStack}>
          <button className={styles.cta} onClick={handleLogin}>
            <CiscoMark />
            Log in with Cisco
          </button>
          <a
            className={styles.secondary}
            href="https://id.cisco.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a Cisco.com account
          </a>
          <span className={styles.ssoNote}>Simulated SSO</span>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.logoWrap}>
          <SpiralLogo size={168} />
        </div>

        <h1 className={styles.title}>
          Welcome to <span className="gradient-text">dCloud</span>
        </h1>

        <p className={styles.lede}>
          Every Cisco demo, connected and organised around the solutions you
          sell. Find the right Solution Zone, walk your customer through a
          guided story, then go as deep as the conversation needs.
        </p>
      </section>

      <section className={styles.highlights} aria-label="What's different">
        {HIGHLIGHTS.map((h) => (
          <article key={h.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{h.title}</h2>
            <p className={styles.cardBody}>{h.body}</p>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Cisco dCloud — prototype</span>
        <span className={styles.footerDim}>For Cisco &amp; Partner sellers</span>
      </footer>
    </main>
  );
}

function CiscoMark() {
  // Simple Cisco-style "soundwave" mark in the brand gradient.
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 44 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ciscoMarkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--cyan)" />
          <stop offset="1" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      <g stroke="url(#ciscoMarkGrad)" strokeWidth="3" strokeLinecap="round">
        <path d="M3 18 v-4" />
        <path d="M11 24 v-16" />
        <path d="M19 28 v-24" />
        <path d="M27 22 v-12" />
        <path d="M35 26 v-20" />
        <path d="M43 18 v-4" />
      </g>
    </svg>
  );
}
