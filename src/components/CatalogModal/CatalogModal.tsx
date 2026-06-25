import { useNavigate } from "react-router-dom";
import {
  catalogs,
  setActiveCatalogId,
  type Catalog,
} from "@/lib/catalogs";
import styles from "./CatalogModal.module.css";

export function CatalogModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  function selectCatalog(catalog: Catalog) {
    setActiveCatalogId(catalog.id);
    navigate(catalog.homeRoute);
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalog-modal-title"
      >
        <header className={styles.header}>
          <div>
            <h2 id="catalog-modal-title" className={styles.title}>
              Catalogs
            </h2>
            <p className={styles.subtitle}>
              The main catalog stays focused on GTM solutions. Switch to a
              specialised catalog when you need event, CX or community content.
            </p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </header>

        <ul className={styles.grid}>
          {catalogs.map((catalog) => (
            <li key={catalog.id}>
              <button
                type="button"
                className={styles.card}
                onClick={() => selectCatalog(catalog)}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardName}>{catalog.name}</span>
                  {catalog.isPrimary && (
                    <span className={styles.primaryBadge}>Main</span>
                  )}
                </div>
                <p className={styles.cardDesc}>{catalog.description}</p>
                <span className={styles.cardAction}>
                  {catalog.isPrimary ? "Go to hub" : "Open catalog →"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
