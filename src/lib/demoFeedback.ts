import { getUser } from "@/lib/auth";

export interface DemoFeedbackEntry {
  rating: number;
  comment: string;
  submittedAt: string;
  author: string;
}

const LAUNCH_KEY = "dcloud.demo-launches";
const FEEDBACK_KEY_PREFIX = "dcloud.demo-feedback.";

function launchStore(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(LAUNCH_KEY) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

export function getExtraLaunchCount(demoId: string): number {
  return launchStore()[demoId] ?? 0;
}

export function recordDemoLaunch(demoId: string): void {
  const store = launchStore();
  store[demoId] = (store[demoId] ?? 0) + 1;
  localStorage.setItem(LAUNCH_KEY, JSON.stringify(store));
}

function feedbackKey(): string | null {
  const user = getUser();
  return user ? `${FEEDBACK_KEY_PREFIX}${user.email}` : null;
}

function loadAllFeedback(): Record<string, DemoFeedbackEntry[]> {
  const key = feedbackKey();
  if (!key) return {};
  try {
    return JSON.parse(localStorage.getItem(key) ?? "{}") as Record<
      string,
      DemoFeedbackEntry[]
    >;
  } catch {
    return {};
  }
}

export function getDemoFeedback(demoId: string): DemoFeedbackEntry[] {
  return loadAllFeedback()[demoId] ?? [];
}

export function submitDemoFeedback(
  demoId: string,
  rating: number,
  comment: string,
): DemoFeedbackEntry {
  const user = getUser();
  const entry: DemoFeedbackEntry = {
    rating,
    comment: comment.trim(),
    submittedAt: new Date().toISOString(),
    author: user?.name ?? "Anonymous",
  };

  const key = feedbackKey();
  if (key) {
    const all = loadAllFeedback();
    const list = all[demoId] ?? [];
    all[demoId] = [entry, ...list];
    localStorage.setItem(key, JSON.stringify(all));
  }

  return entry;
}
