import { demos, solutionSpaces, spaceById, primarySpaceId } from "@/data/catalog";

export type DemoRankPeriod = "week" | "month" | "quarter" | "year";
export type UserHistoryPeriod = "week" | "month" | "quarter" | "ytd";

export interface WeeklyPlatformDemo {
  label: string;
  count: number;
}

export interface MonthlyUserDemo {
  label: string;
  count: number;
}

export interface QuarterlyPlatformDemo {
  label: string;
  count: number;
  isCurrent: boolean;
}

export interface RankedDemo {
  rank: number;
  demoId: string;
  title: string;
  spaceName: string;
  runs: number;
}

export interface RankedSpace {
  rank: number;
  spaceId: string;
  name: string;
  visits: number;
}

export interface UserDemoHistoryEntry {
  id: string;
  demoId: string;
  spaceId: string;
  ranAt: string;
  demoTitle: string;
  spaceName: string;
  demoType: string;
  durationMins: number;
}

export interface LeaderboardRank {
  position: number;
  totalUsers: number;
  label: string;
}

export interface MetricsSnapshot {
  platformYtdTotal: number;
  platformThisWeek: number;
  platformThisQuarter: number;
  userYtdTotal: number;
  userPercentile: number;
  platformWeekly: WeeklyPlatformDemo[];
  platformQuarterly: QuarterlyPlatformDemo[];
  userMonthly: MonthlyUserDemo[];
  annualLeaderboard: LeaderboardRank;
  allTimeLeaderboard: LeaderboardRank;
}

const PLATFORM_YTD_TOTAL = 743_000;
const PLATFORM_Y_MIN = 12_000;
const PLATFORM_Y_MAX = 15_000;
const USER_MONTHLY_MIN = 5;
const USER_MONTHLY_MAX = 10;
const YTD_WEEKS = 26;

function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (Math.imul(31, h) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededUnit(seed: string, index: number): number {
  return (hashString(`${seed}:${index}`) % 10_000) / 10_000;
}

export function formatMetricCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) {
    const k = n / 1_000;
    return Number.isInteger(k) ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return n.toLocaleString();
}

/** Fiscal-year quarters (Jul–Jun) that sum to the platform YTD total. */
function platformQuarterlyTotals(): QuarterlyPlatformDemo[] {
  const quarters = [
    { label: "Q1", share: 0.212 },
    { label: "Q2", share: 0.244 },
    { label: "Q3", share: 0.263 },
    { label: "Q4", share: 0.281 },
  ];

  let allocated = 0;
  return quarters.map((q, i) => {
    const isLast = i === quarters.length - 1;
    const count = isLast
      ? PLATFORM_YTD_TOTAL - allocated
      : Math.round(PLATFORM_YTD_TOTAL * q.share);
    if (!isLast) allocated += count;

    return {
      label: q.label,
      count,
      isCurrent: i === quarters.length - 1,
    };
  });
}

export function metricsSnapshot(userEmail: string): MetricsSnapshot {
  const platformWeekly: WeeklyPlatformDemo[] = [];

  for (let i = 0; i < YTD_WEEKS; i++) {
    const count = Math.round(
      PLATFORM_Y_MIN + seededUnit("platform-ytd", i) * (PLATFORM_Y_MAX - PLATFORM_Y_MIN),
    );
    platformWeekly.push({ label: `W${i + 1}`, count });
  }

  const monthNames = [
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ];

  const userMonthly = monthNames.map((label, i) => ({
    label,
    count: Math.round(
      USER_MONTHLY_MIN + seededUnit(userEmail || "guest", i) * (USER_MONTHLY_MAX - USER_MONTHLY_MIN),
    ),
  }));

  const userYtdTotal = userMonthly.reduce((sum, m) => sum + m.count, 0);
  const userPercentile = 5 + (hashString(`${userEmail}:percentile`) % 14);

  const annualPosition =
    180 + (hashString(`${userEmail}:annual-rank`) % 420);
  const allTimePosition =
    620 + (hashString(`${userEmail}:alltime-rank`) % 2800);

  const platformQuarterly = platformQuarterlyTotals();
  const currentQuarter = platformQuarterly.find((q) => q.isCurrent);

  return {
    platformYtdTotal: PLATFORM_YTD_TOTAL,
    platformThisWeek: platformWeekly[platformWeekly.length - 1]?.count ?? 0,
    platformThisQuarter: currentQuarter?.count ?? 0,
    userYtdTotal,
    userPercentile,
    platformWeekly,
    platformQuarterly,
    userMonthly,
    annualLeaderboard: {
      position: annualPosition,
      totalUsers: 12_400,
      label: "Annual leaderboard",
    },
    allTimeLeaderboard: {
      position: allTimePosition,
      totalUsers: 89_200,
      label: "All-time leaderboard",
    },
  };
}

const PERIOD_SCALE: Record<DemoRankPeriod, number> = {
  week: 1,
  month: 4.2,
  quarter: 11,
  year: 38,
};

export function topDemosForPeriod(
  period: DemoRankPeriod,
  userEmail: string,
): RankedDemo[] {
  const scale = PERIOD_SCALE[period];
  const pool = [...demos]
    .map((demo, i) => {
      const base = 120 + seededUnit(`${userEmail}:demo-rank`, i) * 880;
      const runs = Math.round(base * scale);
      const space = spaceById(primarySpaceId(demo));
      return {
        demoId: demo.id,
        title: demo.title,
        spaceName: space?.name ?? "—",
        runs,
      };
    })
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 10);

  return pool.map((item, i) => ({ rank: i + 1, ...item }));
}

export function topSolutionSpaces(userEmail: string): RankedSpace[] {
  return [...solutionSpaces]
    .map((space, i) => ({
      spaceId: space.id,
      name: space.name,
      visits: Math.round(
        2400 +
          seededUnit(`${userEmail}:space-rank`, i) * 18_000 +
          space.demoCount * 120,
      ),
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10)
    .map((item, i) => ({ rank: i + 1, ...item }));
}

export function leaderboardTopPercent(rank: LeaderboardRank): number {
  return Math.max(1, Math.round((rank.position / rank.totalUsers) * 100));
}

const HISTORY_COUNT: Record<UserHistoryPeriod, number> = {
  week: 7,
  month: 22,
  quarter: 48,
  ytd: 86,
};

const HISTORY_DAYS: Record<UserHistoryPeriod, number> = {
  week: 7,
  month: 31,
  quarter: 92,
  ytd: 180,
};

const DEMO_TYPE_LABEL: Record<string, string> = {
  Solution: "Solution Demo",
  "Deep-Dive": "Deep Dive",
  Guided: "Guided Demo",
  Lab: "Lab",
};

function formatHistoryDate(daysAgo: number): string {
  const d = new Date("2026-06-25T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: daysAgo > 60 ? "numeric" : undefined,
  });
}

const DEMO_TYPES = ["Guided", "Solution", "Deep-Dive", "Lab"] as const;

/** Round-robin across space × type buckets so history spans the full catalog. */
function pickMixedHistoryDemos(
  count: number,
  userEmail: string,
  period: UserHistoryPeriod,
): (typeof demos)[number][] {
  const buckets: (typeof demos)[number][][] = [];

  for (const space of solutionSpaces) {
    for (const type of DEMO_TYPES) {
      const matches = demos.filter(
        (d) => primarySpaceId(d) === space.id && d.type === type,
      );
      if (matches.length > 0) {
        buckets.push([...matches].sort((a, b) => a.id.localeCompare(b.id)));
      }
    }
  }

  const bucketOrder = buckets
    .map((_, i) => i)
    .sort(
      (a, b) =>
        seededUnit(`${userEmail}:${period}:bucket-order`, a) -
        seededUnit(`${userEmail}:${period}:bucket-order`, b),
    );

  const picked: (typeof demos)[number][] = [];
  let round = 0;

  while (picked.length < count) {
    for (const bucketIdx of bucketOrder) {
      if (picked.length >= count) break;
      const bucket = buckets[bucketIdx];
      const pickIdx = Math.floor(
        seededUnit(`${userEmail}:${period}:demo-pick`, round * bucketOrder.length + bucketIdx) *
          bucket.length,
      );
      picked.push(bucket[pickIdx]);
    }
    round++;
  }

  return picked.slice(0, count);
}

/** One demo per calendar day — evenly spaced across the window with light jitter. */
function spreadHistoryDays(
  count: number,
  maxDays: number,
  userEmail: string,
  period: UserHistoryPeriod,
): number[] {
  const span = maxDays - 1;
  const slots: number[] = [];

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const jitter =
      Math.floor(seededUnit(`${userEmail}:${period}:day-jitter`, i) * 3) - 1;
    const day = Math.max(0, Math.min(span, Math.round(t * span) + jitter));
    slots.push(day);
  }

  slots.sort((a, b) => a - b);

  const used = new Set<number>();
  return slots.map((day) => {
    let d = day;
    if (used.has(d)) {
      for (let delta = 1; delta < maxDays; delta++) {
        if (d + delta < maxDays && !used.has(d + delta)) {
          d = d + delta;
          break;
        }
        if (d - delta >= 0 && !used.has(d - delta)) {
          d = d - delta;
          break;
        }
      }
    }
    used.add(d);
    return d;
  });
}

/** Demos the current user has run in the selected window. */
export function userDemoHistory(
  period: UserHistoryPeriod,
  userEmail: string,
): UserDemoHistoryEntry[] {
  const count = HISTORY_COUNT[period];
  const maxDays = HISTORY_DAYS[period];
  const selectedDemos = pickMixedHistoryDemos(count, userEmail, period);
  const days = spreadHistoryDays(count, maxDays, userEmail, period);

  return selectedDemos
    .map((demo, i) => {
      const space = spaceById(primarySpaceId(demo));
      const daysAgo = days[i];

      return {
        daysAgo,
        id: `${period}-${demo.id}-${i}`,
        demoId: demo.id,
        spaceId: primarySpaceId(demo),
        demoTitle: demo.title,
        spaceName: space?.name ?? "—",
        demoType: DEMO_TYPE_LABEL[demo.type] ?? demo.type,
        durationMins: demo.durationMins,
      };
    })
    .sort((a, b) => a.daysAgo - b.daysAgo)
    .map(({ daysAgo, ...entry }) => ({
      ...entry,
      ranAt: formatHistoryDate(daysAgo),
    }));
}

export function userDemoHistoryTotal(period: UserHistoryPeriod): number {
  return HISTORY_COUNT[period];
}
