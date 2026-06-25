import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CatalogModal } from "@/components/CatalogModal/CatalogModal";
import { SpiralLogo } from "@/components/SpiralLogo/SpiralLogo";
import { useSearch } from "@/components/SearchPalette/SearchContext";
import { getUser, logout } from "@/lib/auth";
import styles from "./TopBar.module.css";

/**
 * Persistent top bar for every logged-in page. Home returns to the hub;
 * Catalogs opens a modal for switching between content catalogs.
 */

const PLACEHOLDER_NAV = ["Solutions", "My Spaces", "Scheduled", "History"];

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openSearch } = useSearch();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const user = getUser();
  const initials = (user?.name ?? "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onHome = location.pathname === "/home";

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setCatalogOpen(false);
    }
    if (catalogOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [catalogOpen]);

  function handleSignOut() {
    logout();
    navigate("/");
  }

  return (
    <>
      <header className={styles.bar}>
        <Link to="/home" className={styles.brand}>
          <SpiralLogo size={26} animated={false} />
          dCloud
        </Link>

        <nav className={styles.nav}>
          <Link
            to="/home"
            className={`${styles.navItem} ${onHome ? styles.active : ""}`}
          >
            Home
          </Link>
          <button
            type="button"
            className={`${styles.navItem} ${styles.navBtn}`}
            onClick={() => setCatalogOpen(true)}
          >
            Catalogs
          </button>
          {PLACEHOLDER_NAV.map((item) => (
            <span key={item} className={styles.navItem}>
              {item}
            </span>
          ))}
        </nav>

        <div className={styles.right}>
          <button className={styles.iconBtn} aria-label="Favourites">
            <StarIcon />
          </button>
          <button className={styles.kbd} aria-label="Search" onClick={openSearch}>
            <SearchIcon />
            <span>⌘K</span>
          </button>
          <button
            className={styles.avatar}
            onClick={handleSignOut}
            title="Sign out"
            aria-label="Account"
          >
            {initials || "?"}
          </button>
        </div>
      </header>

      {catalogOpen && <CatalogModal onClose={() => setCatalogOpen(false)} />}
    </>
  );
}

function StarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L12 17.9l-5.25 2.77 1-5.87L3.5 9.66l5.9-.86L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
