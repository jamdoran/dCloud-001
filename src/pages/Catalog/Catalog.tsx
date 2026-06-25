import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { catalogById, type CatalogId } from "@/lib/catalogs";
import styles from "./Catalog.module.css";

/** Placeholder hub for non-GTM catalogs until their modules are built. */
export function CatalogPage({ catalogId }: { catalogId: CatalogId }) {
  const catalog = catalogById(catalogId);

  if (!catalog) {
    return (
      <div className={styles.page}>
        <TopBar />
        <main className={styles.main}>
          <p>That catalog doesn&apos;t exist.</p>
          <Link to="/home" className={styles.back}>
            ← Back to hub
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <TopBar />
      <main className={styles.main}>
        <p className={styles.eyebrow}>Catalog</p>
        <h1 className={styles.title}>{catalog.name}</h1>
        <p className={styles.desc}>{catalog.description}</p>
        <p className={styles.soon}>
          This catalog is scaffolded — content and browsing will land here without
          touching the main GTM hub.
        </p>
        <Link to="/home" className={styles.back}>
          ← GTM Solutions hub
        </Link>
      </main>
    </div>
  );
}
