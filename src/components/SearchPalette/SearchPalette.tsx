import { SearchPanel } from "./SearchPanel";
import styles from "./SearchPalette.module.css";

export function SearchPalette({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <SearchPanel variant="modal" autoFocus onNavigate={onClose} />
      </div>
    </div>
  );
}
