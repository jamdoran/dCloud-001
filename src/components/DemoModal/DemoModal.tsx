import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { FavouriteStar } from "@/components/FavouriteStar/FavouriteStar";
import { getDemoDetail } from "@/data/demoDetails";
import { spaceById } from "@/data/catalog";
import { demoActionLabel, demoCategory } from "@/lib/demoLabels";
import { demoTrials } from "@/lib/demoTrials";
import {
  getDemoFeedback,
  getExtraLaunchCount,
  recordDemoLaunch,
  submitDemoFeedback,
} from "@/lib/demoFeedback";
import { formatPublishedDate } from "@/lib/demoFreshness";
import type { Demo, DemoType, SolutionSpace } from "@/lib/types";
import { TopologyDiagram } from "./TopologyDiagram";
import styles from "./DemoModal.module.css";

const TYPE_COLOR: Record<DemoType, string> = {
  Solution: "#00e0ff",
  "Deep-Dive": "#7b5cff",
  Guided: "#18e0c8",
  Lab: "#ffb347",
};

export function DemoModal({
  demo,
  space,
  onClose,
}: {
  demo: Demo;
  space?: SolutionSpace;
  onClose: () => void;
}) {
  const resolvedSpace = space ?? (demo.spaceIds[0] ? spaceById(demo.spaceIds[0]) : undefined);
  const detail = useMemo(() => getDemoDetail(demo), [demo]);
  const [productsOpen, setProductsOpen] = useState(false);
  const [launchCount, setLaunchCount] = useState(
    () => detail.launchCount + getExtraLaunchCount(demo.id),
  );
  const [feedbackList, setFeedbackList] = useState(() => getDemoFeedback(demo.id));
  const [draftRating, setDraftRating] = useState(0);
  const [draftComment, setDraftComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const feedbackTotal = detail.feedbackCount + feedbackList.length;
  const cta = demoActionLabel(demo);
  const isLab = demo.type === "Lab";
  const trials = useMemo(() => demoTrials(demo), [demo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function handleLaunch() {
    recordDemoLaunch(demo.id);
    setLaunchCount((n) => n + 1);
  }

  function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault();
    if (draftRating < 1) return;
    const entry = submitDemoFeedback(demo.id, draftRating, draftComment);
    setFeedbackList((prev) => [entry, ...prev]);
    setDraftRating(0);
    setDraftComment("");
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 2400);
  }

  const accent = resolvedSpace?.accent ?? "#2e7bff";
  const accent2 = resolvedSpace?.accent2 ?? "#7b5cff";

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        style={{ "--type": TYPE_COLOR[demo.type], "--accent": accent } as CSSProperties}
      >
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.headerTags}>
              <span className={styles.typePill}>{demoCategory(demo)}</span>
              {trials.length > 0 && (
                <span className={styles.trialAvailablePill}>Trial Available</span>
              )}
            </div>
            <h2 id="demo-modal-title" className={styles.title}>
              <FavouriteStar kind="demo" id={demo.id} className={styles.favourite} size={20} />
              <span>{demo.title}</span>
            </h2>
            {resolvedSpace && (
              <p className={styles.spaceLine}>
                Solution Space · <strong>{resolvedSpace.name}</strong>
              </p>
            )}
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.main}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>About this demo</h3>
              <p className={styles.description}>{demo.description}</p>
            </section>

            <section className={styles.section}>
              <TopologyDiagram demoId={demo.id} accent={accent} accent2={accent2} />
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Demo scripts &amp; instructions</h3>
              <ul className={styles.scriptList}>
                {detail.scriptLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={styles.scriptLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DocIcon />
                      <span className={styles.scriptText}>
                        <span className={styles.scriptLabel}>{link.label}</span>
                        {link.fileType && (
                          <span className={styles.scriptType}>{link.fileType}</span>
                        )}
                      </span>
                      <span className={styles.scriptArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <div className={styles.feedbackHeader}>
                <ChatIcon />
                <h3 className={styles.feedbackTitle}>Community Feedback ({feedbackTotal})</h3>
              </div>

              <div className={styles.feedbackCard}>
                <h4 className={styles.feedbackCardTitle}>Share your experience</h4>

                <form className={styles.feedbackForm} onSubmit={handleSubmitFeedback}>
                  <fieldset className={styles.ratingField}>
                    <legend className={styles.ratingLegend}>Rate this demo</legend>
                    <StarInput value={draftRating} onChange={setDraftRating} />
                  </fieldset>

                  <label className={styles.commentLabel} htmlFor="demo-feedback-comment">
                    Leave a comment (optional)
                  </label>
                  <textarea
                    id="demo-feedback-comment"
                    className={styles.commentInput}
                    rows={4}
                    placeholder="Share your thoughts about this demo…"
                    value={draftComment}
                    onChange={(e) => setDraftComment(e.target.value)}
                  />

                  <button
                    type="submit"
                    className={styles.feedbackSubmit}
                    disabled={draftRating < 1}
                  >
                    {submitted ? "Thanks — feedback saved" : "Submit feedback"}
                  </button>
                </form>

                {feedbackList.length > 0 && (
                  <ul className={styles.feedbackList}>
                    {feedbackList.slice(0, 4).map((entry, i) => (
                      <li key={`${entry.submittedAt}-${i}`} className={styles.feedbackItem}>
                        <div className={styles.feedbackItemHead}>
                          <StarDisplay value={entry.rating} size={14} />
                          <span className={styles.feedbackAuthor}>{entry.author}</span>
                        </div>
                        {entry.comment && (
                          <p className={styles.feedbackComment}>{entry.comment}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Demo information</h3>

              <div className={styles.statGrid}>
                <Stat label="Published date" value={formatPublishedDate(detail.publishedAt)} />
                <Stat label="Launches" value={launchCount.toLocaleString()} />
                <Stat
                  label="Rating"
                  value={
                    <span className={styles.ratingStat}>
                      <StarDisplay value={Math.round(detail.avgRating)} size={14} />
                      <span>{detail.avgRating.toFixed(1)}</span>
                    </span>
                  }
                />
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.primaryAction} onClick={handleLaunch}>
                  {cta}
                </button>
                {!isLab && (
                  <button type="button" className={styles.secondaryAction}>
                    Schedule
                  </button>
                )}
              </div>

              {trials.length > 0 && (
                <InfoGroup icon={<TrialIcon />} label="Available trials">
                  <div className={styles.trialRow}>
                    {trials.map((trial) => (
                      <span key={trial.id} className={styles.trialPill}>
                        {trial.label}
                      </span>
                    ))}
                  </div>
                </InfoGroup>
              )}
            </div>

            <div className={styles.sidebarCard}>
              <InfoGroup icon={<BoltIcon />} label="Demo type">
                <span className={styles.typePill}>{demoCategory(demo)}</span>
              </InfoGroup>

              <InfoGroup icon={<LayersIcon />} label="Categories">
                <div className={styles.tagRow}>
                  {detail.categories.map((cat) => (
                    <span key={cat} className={styles.tagPrimary}>
                      {cat}
                    </span>
                  ))}
                </div>
              </InfoGroup>

              {detail.tagGroups.length > 0 && (
                <InfoGroup icon={<TreeIcon />} label="Subcategories">
                  <div className={styles.subcatGroups}>
                    {detail.tagGroups.map((group) => (
                      <div key={group.category} className={styles.subcatGroup}>
                        <span className={styles.subcatCategory}>{group.category}</span>
                        <div className={styles.tagRow}>
                          {group.tags.map((tag) => (
                            <span key={tag} className={styles.tagSecondary}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoGroup>
              )}
            </div>

            <div className={styles.sidebarCard}>
              <button
                type="button"
                className={styles.productsToggle}
                onClick={() => setProductsOpen((o) => !o)}
                aria-expanded={productsOpen}
              >
                <span>{productsOpen ? "Hide products" : "Show products"}</span>
                <span className={styles.productsCount}>({demo.products.length})</span>
                <ChevronIcon open={productsOpen} />
              </button>
              {productsOpen && (
                <ul className={styles.productList}>
                  {demo.products.map((product) => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  valueClass,
  valueStyle,
}: {
  label: string;
  value: ReactNode;
  valueClass?: string;
  valueStyle?: CSSProperties;
}) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={`${styles.statValue} ${valueClass ?? ""}`} style={valueStyle}>
        {value}
      </span>
    </div>
  );
}

function InfoGroup({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.infoGroup}>
      <div className={styles.infoHead}>
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

function StarDisplay({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className={styles.starDisplay} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={star <= value ? styles.starFilled : styles.starEmpty}
        >
          <path
            d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L12 17.9l-5.25 2.77 1-5.87L3.5 9.66l5.9-.86L12 3.5z"
            fill={star <= value ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div
      className={styles.starInput}
      role="radiogroup"
      aria-label="Rate this demo"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          className={styles.starBtn}
          onMouseEnter={() => setHover(star)}
          onClick={() => onChange(star)}
        >
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={star <= active ? styles.starFilled : styles.starEmpty}
          >
            <path
              d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L12 17.9l-5.25 2.77 1-5.87L3.5 9.66l5.9-.86L12 3.5z"
              fill={star <= active ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
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

function DocIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TreeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3v4M18 3v4M12 8v4M6 15v4M18 15v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="6" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TrialIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 4v5c0 4.5-3 8.5-7 9-4-.5-7-4.5-7-9V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={open ? styles.chevronOpen : styles.chevron}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
