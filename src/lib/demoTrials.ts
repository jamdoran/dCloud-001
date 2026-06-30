import type { Demo } from "@/lib/types";

export type DemoTrialId =
  | "thousandeyes"
  | "webex"
  | "duo"
  | "umbrella"
  | "secure-firewall"
  | "meraki"
  | "ai-defense";

export interface DemoTrial {
  id: DemoTrialId;
  label: string;
}

export const DEMO_TRIALS: DemoTrial[] = [
  { id: "thousandeyes", label: "Trial of ThousandEyes" },
  { id: "webex", label: "Trial of Webex" },
  { id: "duo", label: "Trial of Duo" },
  { id: "umbrella", label: "Trial of Umbrella" },
  { id: "secure-firewall", label: "Trial of Secure Firewall" },
  { id: "meraki", label: "Trial of Meraki" },
  { id: "ai-defense", label: "Trial of AI Defense" },
];

const TRIAL_BY_ID = new Map(DEMO_TRIALS.map((trial) => [trial.id, trial]));

/** Explicit trial links where the storyline warrants a trial beyond product inference. */
const DEMO_TRIAL_OVERRIDES: Partial<Record<string, DemoTrialId[]>> = {
  "zero-trust-campus": ["duo", "umbrella"],
  "autonomous-threat-response": ["ai-defense", "secure-firewall"],
  "sovereign-ai-cluster": ["ai-defense"],
};

const TRIAL_PRODUCT_MATCHERS: { id: DemoTrialId; test: (product: string) => boolean }[] = [
  { id: "thousandeyes", test: (p) => /thousandeyes/i.test(p) },
  { id: "webex", test: (p) => /webex/i.test(p) },
  { id: "duo", test: (p) => /\bduo\b/i.test(p) },
  { id: "umbrella", test: (p) => /umbrella/i.test(p) },
  { id: "secure-firewall", test: (p) => /secure firewall/i.test(p) },
  { id: "meraki", test: (p) => /meraki/i.test(p) },
  { id: "ai-defense", test: (p) => /ai defense/i.test(p) },
];

/** Demos where a product is listed but a trial would not be appropriate. */
const TRIAL_EXCLUSIONS: Partial<Record<string, DemoTrialId[]>> = {};

function trialEligibleForProduct(demo: Demo, productIndex: number): boolean {
  if (demo.type === "Solution" || demo.type === "Deep-Dive" || demo.type === "Lab") {
    return true;
  }
  // Guided demos: trial only when the product is featured (first two slots).
  return productIndex < 2;
}

function inferredTrials(demo: Demo): DemoTrialId[] {
  const set = new Set<DemoTrialId>();
  const exclusions = new Set(TRIAL_EXCLUSIONS[demo.id] ?? []);

  demo.products.forEach((product, index) => {
    if (!trialEligibleForProduct(demo, index)) return;
    for (const { id, test } of TRIAL_PRODUCT_MATCHERS) {
      if (exclusions.has(id)) continue;
      if (test(product)) set.add(id);
    }
  });

  return [...set];
}

/** Product trials available from this GTM demo — multiple trials may apply. */
export function demoTrials(demo: Demo): DemoTrial[] {
  const ids = new Set<DemoTrialId>([
    ...inferredTrials(demo),
    ...(DEMO_TRIAL_OVERRIDES[demo.id] ?? []),
  ]);

  for (const excluded of TRIAL_EXCLUSIONS[demo.id] ?? []) {
    ids.delete(excluded);
  }

  return DEMO_TRIALS.filter((trial) => ids.has(trial.id));
}

export function demoHasTrials(demo: Demo): boolean {
  return demoTrials(demo).length > 0;
}

export function trialLabel(id: DemoTrialId): string {
  return TRIAL_BY_ID.get(id)?.label ?? id;
}
