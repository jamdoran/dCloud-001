import { useNavigate } from "react-router-dom";
import { CiscoLogo, CiscoMark } from "@/components/CiscoLogo/CiscoLogo";
import { SpiralLogo } from "@/components/SpiralLogo/SpiralLogo";
import { login } from "@/lib/auth";
import styles from "./Landing.module.css";

/**
 * Logged-out landing — the only public, crawlable page in the app.
 * Everything else lives behind the simulated Cisco SSO.
 */

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
          Welcome to <span className="gradient-text">Cisco dCloud</span>
        </h1>

        <p className={styles.tagline}>
          Where <span className="gradient-text">solutions</span> come to life
        </p>
      </section>

      <div className={styles.footerMark}>
        <CiscoLogo size={96} />
      </div>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Cisco dCloud — prototype</span>
        <span className={styles.footerDim}>For Cisco &amp; Partner sellers</span>
      </footer>
    </main>
  );
}
