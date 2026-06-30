import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { getUser } from "@/lib/auth";
import {
  formatMetricCount,
  leaderboardTopPercent,
  metricsSnapshot,
  topDemosForPeriod,
  topSolutionSpaces,
  userDemoHistory,
  userDemoHistoryTotal,
  type DemoRankPeriod,
  type QuarterlyPlatformDemo,
  type UserDemoHistoryEntry,
  type UserHistoryPeriod,
} from "@/lib/metricsData";
import { demoSpaceUrl } from "@/lib/search";
import styles from "./Metrics.module.css";

const PERIOD_OPTIONS: { id: DemoRankPeriod; label: string }[] = [
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "quarter", label: "Qtr" },
  { id: "year", label: "Year" },
];

const HISTORY_PERIOD_OPTIONS: { id: UserHistoryPeriod; label: string }[] = [
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "quarter", label: "Qtr" },
  { id: "ytd", label: "YTD" },
];

type MetricsTab = "platform" | "user";

const METRICS_TABS: { id: MetricsTab; label: string }[] = [
  { id: "platform", label: "dCloud Metrics" },
  { id: "user", label: "My Activity" },
];

export function MetricsPage() {
  const user = getUser();
  const email = user?.email ?? "guest";
  const [activeTab, setActiveTab] = useState<MetricsTab>("platform");
  const [demoPeriod, setDemoPeriod] = useState<DemoRankPeriod>("month");
  const [historyPeriod, setHistoryPeriod] = useState<UserHistoryPeriod>("month");

  const snapshot = useMemo(() => metricsSnapshot(email), [email]);
  const topDemos = useMemo(
    () => topDemosForPeriod(demoPeriod, email),
    [demoPeriod, email],
  );
  const topSpaces = useMemo(() => topSolutionSpaces(email), [email]);
  const demoHistory = useMemo(
    () => userDemoHistory(historyPeriod, email),
    [historyPeriod, email],
  );
  const historyTotal = userDemoHistoryTotal(historyPeriod);

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <Link to="/home" className={styles.crumb}>
              ← Home
            </Link>
            <h1 className={styles.title}>dCloud Metrics</h1>
            <p className={styles.lede}>
              Platform-wide usage and your personal demo activity.
            </p>
          </div>
          <div className={styles.headerMeta}>
            <span className={styles.metaLabel}>Signed in as</span>
            <span className={styles.metaValue}>{user?.name ?? "Guest"}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>{user?.role ?? "—"}</span>
          </div>
        </header>

        <MetricsTabs value={activeTab} onChange={setActiveTab} />

        <div
          className={styles.grid}
          role="tabpanel"
          id={`metrics-panel-${activeTab}`}
          aria-labelledby={`metrics-tab-${activeTab}`}
        >
          {activeTab === "platform" ? (
            <>
              <Panel className={styles.span4} title="Total dCloud demos" subtitle="Year To Date FY.27">
                <div className={styles.heroStat}>
                  <span className={styles.heroValue}>
                    {formatMetricCount(snapshot.platformYtdTotal)}
                  </span>
                  <span className={styles.heroUnit}>Demos delivered</span>
                </div>
                <div className={styles.statRow}>
                  <MiniStat
                    label="This quarter"
                    value={formatMetricCount(snapshot.platformThisQuarter)}
                  />
                  <MiniStat
                    label="This week"
                    value={formatMetricCount(snapshot.platformThisWeek)}
                  />
                </div>
              </Panel>

              <Panel
                className={styles.span8}
                title="Demos by quarter"
                subtitle="Fiscal year to date · Q4 in progress"
              >
                <PlatformQuarterChart data={snapshot.platformQuarterly} />
              </Panel>

              <Panel
                className={styles.span6}
                title="Top 10 demos"
                subtitle="Most-run demos across dCloud"
                action={
                  <PeriodSelector value={demoPeriod} onChange={setDemoPeriod} />
                }
              >
                <RankTable
                  headers={["#", "Demo", "Solution Space", "Runs"]}
                  rows={topDemos.map((d) => [
                    String(d.rank).padStart(2, "0"),
                    d.title,
                    d.spaceName,
                    d.runs.toLocaleString(),
                  ])}
                />
              </Panel>

              <Panel className={styles.span6} title="Top 10 solution spaces" subtitle="By visit volume">
                <RankTable
                  headers={["#", "Solution Space", "Visits"]}
                  rows={topSpaces.map((s) => [
                    String(s.rank).padStart(2, "0"),
                    s.name,
                    s.visits.toLocaleString(),
                  ])}
                />
              </Panel>
            </>
          ) : (
            <>
              <Panel className={styles.span4} title="Your demos" subtitle="Year to date">
                <div className={styles.heroStat}>
                  <span className={`${styles.heroValue} ${styles.heroValueAccent}`}>
                    {snapshot.userYtdTotal}
                  </span>
                  <span className={styles.heroUnit}>Demos delivered</span>
                </div>
                <div className={styles.statRowSingle}>
                  <MiniStat
                    label="Avg per month"
                    value={(
                      snapshot.userYtdTotal / Math.max(snapshot.userMonthly.length, 1)
                    ).toFixed(1)}
                    accent
                  />
                </div>
              </Panel>

              <Panel className={styles.span4} title="User rank" subtitle="Percentile">
                <div className={styles.percentileBlock}>
                  <span className={styles.percentileValue}>Top {snapshot.userPercentile}%</span>
                  <p className={styles.percentileCopy}>
                    You are in the top {snapshot.userPercentile} percentile of dCloud users
                    this year.
                  </p>
                </div>
              </Panel>

              <Panel className={styles.span4} title="Leaderboard" subtitle="Your position">
                <div className={styles.leaderRow}>
                  <LeaderboardRank
                    label="Annual"
                    position={snapshot.annualLeaderboard.position}
                    total={snapshot.annualLeaderboard.totalUsers}
                  />
                  <LeaderboardRank
                    label="All-time"
                    position={snapshot.allTimeLeaderboard.position}
                    total={snapshot.allTimeLeaderboard.totalUsers}
                  />
                </div>
              </Panel>

              <Panel
                className={styles.span12}
                title="Your demos by month"
                subtitle="Last 12 months · 5–10 runs per month"
              >
                <UserBarChart data={snapshot.userMonthly} />
              </Panel>

              <Panel
                className={styles.span12}
                title="Your demo history"
                subtitle="Demos you have run"
                action={
                  <HistoryPeriodSelector
                    value={historyPeriod}
                    onChange={setHistoryPeriod}
                  />
                }
              >
                <div className={styles.historySummary}>
                  <div>
                    <span className={styles.historyTotal}>{historyTotal}</span>
                    <span className={styles.historyTotalLabel}>
                      demos ·{" "}
                      {HISTORY_PERIOD_OPTIONS.find((p) => p.id === historyPeriod)?.label}
                    </span>
                  </div>
                </div>
                <DemoHistoryTable entries={demoHistory} />
              </Panel>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricsTabs({
  value,
  onChange,
}: {
  value: MetricsTab;
  onChange: (tab: MetricsTab) => void;
}) {
  return (
    <div
      className={styles.tabBar}
      role="tablist"
      aria-label="Metrics views"
    >
      {METRICS_TABS.map((tab) => {
        const selected = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`metrics-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`metrics-panel-${tab.id}`}
            className={`${styles.tabBtn} ${selected ? styles.tabActive : ""}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  action,
  className,
  children,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`${styles.panel} ${className ?? ""}`}>
      <div className={styles.panelHead}>
        <div>
          <h2 className={styles.panelTitle}>{title}</h2>
          <p className={styles.panelSub}>{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className={styles.miniStat}>
      <span className={styles.miniLabel}>{label}</span>
      <span className={`${styles.miniValue} ${accent ? styles.miniAccent : ""}`}>
        {value}
      </span>
    </div>
  );
}

function PeriodSelector({
  value,
  onChange,
}: {
  value: DemoRankPeriod;
  onChange: (p: DemoRankPeriod) => void;
}) {
  return (
    <div className={styles.period} role="group" aria-label="Ranking period">
      {PERIOD_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`${styles.periodBtn} ${value === opt.id ? styles.periodActive : ""}`}
          onClick={() => onChange(opt.id)}
          aria-pressed={value === opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function HistoryPeriodSelector({
  value,
  onChange,
}: {
  value: UserHistoryPeriod;
  onChange: (p: UserHistoryPeriod) => void;
}) {
  return (
    <div className={styles.period} role="group" aria-label="History period">
      {HISTORY_PERIOD_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`${styles.periodBtn} ${value === opt.id ? styles.periodActive : ""}`}
          onClick={() => onChange(opt.id)}
          aria-pressed={value === opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function LeaderboardRank({
  label,
  position,
  total,
}: {
  label: string;
  position: number;
  total: number;
}) {
  const topPct = leaderboardTopPercent({ position, totalUsers: total, label });
  const markerPos = Math.min(96, Math.max(4, (position / total) * 100));

  return (
    <div className={styles.rankCard}>
      <span className={styles.rankLabel}>{label}</span>
      <div className={styles.rankHeadline}>
        <span className={styles.rankNumber}>#{position.toLocaleString()}</span>
        <span className={styles.rankOf}>of {total.toLocaleString()}</span>
      </div>
      <div className={styles.rankTrack} aria-hidden="true">
        <span className={styles.rankTrackBase} />
        <span
          className={styles.rankTrackProgress}
          style={{ width: `${100 - markerPos}%` }}
        />
        <span className={styles.rankMarker} style={{ left: `${markerPos}%` }} />
      </div>
      <div className={styles.rankScale}>
        <span>#1</span>
        <span>Top {topPct}%</span>
      </div>
    </div>
  );
}

function PlatformQuarterChart({ data }: { data: QuarterlyPlatformDemo[] }) {
  const W = 680;
  const H = 248;
  const pad = { t: 30, r: 24, b: 44, l: 62 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const plotBottom = pad.t + plotH;
  const rawMax = Math.max(...data.map((d) => d.count));
  const max = Math.ceil(rawMax / 50_000) * 50_000;
  const gap = 18;
  const barW = (plotW - gap * (data.length - 1)) / data.length;
  const depth = 5;

  const yTicks: number[] = [];
  for (let v = 0; v <= max; v += max / 4) {
    yTicks.push(Math.round(v));
  }

  return (
    <div className={styles.chartFrame}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.chart}
        role="img"
        aria-label="Platform demo runs by fiscal quarter"
      >
        <defs>
          <linearGradient id="platform-q-bar-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="platform-q-bar-current" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--text)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="var(--cyan)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="platform-q-bar-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--bg)" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="platform-q-bar-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--text)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.2" />
          </linearGradient>
          <clipPath id="platform-q-plot-clip">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} rx={6} />
          </clipPath>
        </defs>

        <rect
          x={pad.l}
          y={pad.t}
          width={plotW}
          height={plotH}
          rx={6}
          className={styles.plotFrame}
        />

        {yTicks.map((tick) => {
          const y = pad.t + plotH - (tick / max) * plotH;
          return (
            <text
              key={`y-${tick}`}
              x={pad.l - 12}
              y={y + 4}
              className={styles.axisText}
              textAnchor="end"
            >
              {tick === 0 ? "0" : formatMetricCount(tick)}
            </text>
          );
        })}

        <g clipPath="url(#platform-q-plot-clip)">
          {yTicks.slice(1).map((tick) => {
            const y = pad.t + plotH - (tick / max) * plotH;
            return (
              <line
                key={`grid-${tick}`}
                x1={pad.l}
                y1={y}
                x2={W - pad.r}
                y2={y}
                className={styles.gridLine}
              />
            );
          })}
          {data.map((quarter, i) => {
            const h = Math.max(0, (quarter.count / max) * plotH);
            const x = pad.l + i * (barW + gap);
            const y = plotBottom - h;
            if (h < 1) return null;

            return (
              <g key={quarter.label}>
                <path
                  d={`M ${x + barW} ${y} L ${x + barW + depth} ${y - depth} L ${x + barW + depth} ${plotBottom - depth} L ${x + barW} ${plotBottom} Z`}
                  fill="url(#platform-q-bar-side)"
                  className={styles.barSide}
                />
                <path
                  d={`M ${x} ${y} L ${x + depth} ${y - depth} L ${x + barW + depth} ${y - depth} L ${x + barW} ${y} Z`}
                  fill="url(#platform-q-bar-top)"
                  className={styles.barTop}
                />
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  rx={3}
                  fill={
                    quarter.isCurrent
                      ? "url(#platform-q-bar-current)"
                      : "url(#platform-q-bar-front)"
                  }
                  className={
                    quarter.isCurrent ? styles.quarterBarCurrent : styles.barFront
                  }
                />
              </g>
            );
          })}
        </g>

        {data.map((quarter, i) => {
          const h = Math.max(0, (quarter.count / max) * plotH);
          const x = pad.l + i * (barW + gap);
          const y = plotBottom - h;
          const cx = x + barW / 2;

          return (
            <g key={`labels-${quarter.label}`}>
              <text
                x={cx}
                y={Math.max(pad.t + 10, y - 8)}
                className={styles.quarterValue}
                textAnchor="middle"
              >
                {formatMetricCount(quarter.count)}
              </text>
              <text x={cx} y={plotBottom + 22} className={styles.axisText} textAnchor="middle">
                {quarter.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function UserBarChart({ data }: { data: { label: string; count: number }[] }) {
  const W = 520;
  const H = 228;
  const pad = { t: 22, r: 20, b: 44, l: 52 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const plotBottom = pad.t + plotH;
  const max = 10;
  const gap = 7;
  const barW = (plotW - gap * (data.length - 1)) / data.length;
  const depth = 4;

  return (
    <div className={styles.chartFrame}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-label="Your demo runs by month">
        <defs>
          <linearGradient id="user-bar-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="user-bar-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--bg)" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="user-bar-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--text)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.15" />
          </linearGradient>
          <clipPath id="user-plot-clip">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} rx={6} />
          </clipPath>
        </defs>

        <rect
          x={pad.l}
          y={pad.t}
          width={plotW}
          height={plotH}
          rx={6}
          className={styles.plotFrame}
        />

        {[5, 10].map((tick) => {
          const y = pad.t + plotH - (tick / max) * plotH;
          return (
            <text
              key={`y-${tick}`}
              x={pad.l - 10}
              y={y + 4}
              className={styles.axisText}
              textAnchor="end"
            >
              {tick}
            </text>
          );
        })}

        <g clipPath="url(#user-plot-clip)">
          {[5, 10].map((tick) => {
            const y = pad.t + plotH - (tick / max) * plotH;
            return (
              <line
                key={`grid-${tick}`}
                x1={pad.l}
                y1={y}
                x2={W - pad.r}
                y2={y}
                className={styles.gridLine}
              />
            );
          })}
          {data.map((month, i) => {
            const h = Math.max(0, (month.count / max) * plotH);
            const x = pad.l + i * (barW + gap);
            const y = plotBottom - h;
            if (h < 1) return null;

            return (
              <g key={month.label}>
                <path
                  d={`M ${x + barW} ${y} L ${x + barW + depth} ${y - depth} L ${x + barW + depth} ${plotBottom - depth} L ${x + barW} ${plotBottom} Z`}
                  fill="url(#user-bar-side)"
                  className={styles.barSide}
                />
                <path
                  d={`M ${x} ${y} L ${x + depth} ${y - depth} L ${x + barW + depth} ${y - depth} L ${x + barW} ${y} Z`}
                  fill="url(#user-bar-top)"
                  className={styles.barTop}
                />
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  rx={2}
                  fill="url(#user-bar-front)"
                  className={styles.barFront}
                />
              </g>
            );
          })}
        </g>

        {data.map((month, i) => {
          const x = pad.l + i * (barW + gap);
          return (
            <text
              key={`label-${month.label}`}
              x={x + barW / 2}
              y={plotBottom + 22}
              className={styles.axisText}
              textAnchor="middle"
            >
              {month.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function DemoHistoryTable({ entries }: { entries: UserDemoHistoryEntry[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Demo</th>
            <th>Solution Space</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>
                <span className={styles.mono}>{entry.ranAt}</span>
              </td>
              <td>
                <Link
                  to={demoSpaceUrl(entry.spaceId, entry.demoId)}
                  className={styles.historyLink}
                >
                  {entry.demoTitle}
                </Link>
              </td>
              <td>
                <Link
                  to={`/spaces/${entry.spaceId}`}
                  className={styles.historyLinkSubtle}
                >
                  {entry.spaceName}
                </Link>
              </td>
              <td>
                <span className={styles.typePill}>{entry.demoType}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RankTable({
  headers,
  rows,
  renderCell,
}: {
  headers: string[];
  rows: string[][];
  renderCell?: (cell: string, colIndex: number, rowIndex: number) => ReactNode;
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  {renderCell ? (
                    renderCell(cell, j, i)
                  ) : (
                    <span
                      className={
                        j === 0 || j === row.length - 1 ? styles.mono : undefined
                      }
                    >
                      {cell}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
