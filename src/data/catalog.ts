import type {
  Demo,
  GtmMotion,
  GtmMotionId,
  MySpace,
  SolutionSpace,
} from "@/lib/types";

/**
 * File-based seed content (no backend). Edit here to change what the prototype
 * shows. Solution Spaces are the seven from the brief; each carries two
 * signature accents (used for its unique background) and a tagline.
 */

export const gtmMotions: GtmMotion[] = [
  { id: "ai-ready-dc", name: "AI Ready Data Centres" },
  { id: "future-proof-workplaces", name: "Future Proof Workplaces" },
  { id: "digital-resilience", name: "Digital Resilience" },
];

export const solutionSpaces: SolutionSpace[] = [
  {
    id: "secure-ai-factory",
    name: "Secure AI Factory",
    motions: ["ai-ready-dc"],
    accent: "#7b5cff",
    accent2: "#00e0ff",
    tagline: "Stand up trusted AI infrastructure, from GPU fabric to guardrails.",
    demoCount: 8,
    labCount: 2,
  },
  {
    id: "secure-networking",
    name: "Secure Networking",
    motions: ["ai-ready-dc"],
    accent: "#00e0ff",
    accent2: "#2e7bff",
    tagline: "Zero-trust connectivity across campus, data centre and cloud.",
    demoCount: 6,
    labCount: 1,
  },
  {
    id: "workplace-experiences",
    name: "Workplace Experiences",
    motions: ["future-proof-workplaces"],
    accent: "#18e0c8",
    accent2: "#34d399",
    tagline: "Hybrid work that feels effortless in every room and on every device.",
    demoCount: 7,
    labCount: 1,
  },
  {
    id: "agentic-security-architecture",
    name: "Agentic Security Architecture",
    motions: ["digital-resilience"],
    accent: "#d65cff",
    accent2: "#ff5c7a",
    tagline: "AI agents that detect, reason and respond across the security stack.",
    demoCount: 5,
    labCount: 1,
  },
  {
    id: "digital-resilience-assurance",
    name: "Digital Resilience Assurance",
    motions: ["digital-resilience"],
    accent: "#2e7bff",
    accent2: "#7b5cff",
    tagline: "Prove services stay up — continuously, under real-world stress.",
    demoCount: 6,
    labCount: 2,
  },
  {
    id: "unified-forwarding-architecture",
    name: "Unified Forwarding Architecture",
    motions: ["ai-ready-dc"],
    accent: "#34d399",
    accent2: "#18e0c8",
    tagline: "One forwarding fabric for any workload, anywhere.",
    demoCount: 4,
    labCount: 0,
  },
  {
    id: "cost-effective-network-stack",
    name: "Cost-Effective Network Stack",
    motions: ["ai-ready-dc"],
    accent: "#ffb347",
    accent2: "#d65cff",
    tagline: "Right-sized networking that lowers TCO without cutting corners.",
    demoCount: 4,
    labCount: 1,
  },
];

export const demos: Demo[] = [
  // Secure AI Factory
  { id: "ai-factory-5-min", title: "AI factory in 5 minutes", type: "Guided", operationalType: "Instant", description: "A quick click-through of a secure AI factory end to end.", durationMins: 5, spaceId: "secure-ai-factory", addedAt: "2026-06-02" },
  { id: "sovereign-ai-cluster", title: "Sovereign AI cluster", type: "Solution", operationalType: "Instant", description: "Deploy a sovereign, policy-bound AI cluster on Cisco fabric.", durationMins: 30, spaceId: "secure-ai-factory", addedAt: "2026-06-18" },
  { id: "gpu-fabric-deep-dive", title: "GPU fabric deep dive", type: "Deep-Dive", operationalType: "Scheduled", description: "Inside the non-blocking GPU fabric and congestion control.", durationMins: 45, spaceId: "secure-ai-factory", addedAt: "2026-06-04" },
  { id: "ai-workload-isolation", title: "AI workload isolation", type: "Deep-Dive", operationalType: "Instant", description: "Tenant isolation and guardrails for shared AI infrastructure.", durationMins: 40, spaceId: "secure-ai-factory", addedAt: "2026-06-03" },
  { id: "build-secure-ai-pipeline", title: "Build a secure AI pipeline", type: "Lab", operationalType: "Scheduled", description: "Hands-on: wire up a hardened training-to-serving pipeline.", durationMins: 90, spaceId: "secure-ai-factory", addedAt: "2026-06-01" },

  // Secure Networking
  { id: "secure-networking-tour", title: "Secure networking tour", type: "Guided", operationalType: "Instant", description: "A guided intro to zero-trust networking with Cisco.", durationMins: 6, spaceId: "secure-networking", addedAt: "2026-06-06" },
  { id: "zero-trust-campus", title: "Zero-trust campus", type: "Solution", operationalType: "Instant", description: "Identity-based segmentation across a live campus.", durationMins: 30, spaceId: "secure-networking", addedAt: "2026-06-07" },
  { id: "hybrid-mesh-fabric", title: "Hybrid mesh fabric", type: "Deep-Dive", operationalType: "Instant", description: "Stitch DC, cloud and edge into one policy-driven mesh.", durationMins: 40, spaceId: "secure-networking", addedAt: "2026-06-09" },
  { id: "segment-brownfield", title: "Segmenting a brownfield network", type: "Lab", operationalType: "Scheduled", description: "Hands-on micro-segmentation on an existing estate.", durationMins: 75, spaceId: "secure-networking", addedAt: "2026-06-05" },

  // Workplace Experiences
  { id: "smart-workspace-tour", title: "Smart workspace tour", type: "Guided", operationalType: "Instant", description: "Walk a smart, sensor-aware hybrid workspace.", durationMins: 5, spaceId: "workplace-experiences", addedAt: "2026-06-05" },
  { id: "hybrid-work-platform", title: "Hybrid work platform", type: "Solution", operationalType: "Instant", description: "One platform for meetings, devices and room intelligence.", durationMins: 25, spaceId: "workplace-experiences", addedAt: "2026-06-04" },
  { id: "room-intelligence", title: "Room intelligence deep dive", type: "Deep-Dive", operationalType: "Instant", description: "How rooms sense, adapt and report on usage.", durationMins: 35, spaceId: "workplace-experiences", addedAt: "2026-06-03" },
  { id: "deploy-smart-space", title: "Deploy a smart space", type: "Lab", operationalType: "Scheduled", description: "Hands-on provisioning of a smart meeting space.", durationMins: 80, spaceId: "workplace-experiences", addedAt: "2026-06-02" },

  // Agentic Security Architecture
  { id: "agentic-soc-walkthru", title: "Agentic SOC walk-thru", type: "Guided", operationalType: "Guided", description: "See an AI-run SOC triage and contain an incident.", durationMins: 8, spaceId: "agentic-security-architecture", addedAt: "2026-06-16" },
  { id: "autonomous-threat-response", title: "Autonomous threat response", type: "Solution", operationalType: "Instant", description: "Agents detect, reason and respond across the stack.", durationMins: 30, spaceId: "agentic-security-architecture", addedAt: "2026-06-08" },
  { id: "agent-reasoning-internals", title: "Agent reasoning internals", type: "Deep-Dive", operationalType: "Scheduled", description: "Inside the planning and tool-use loop of a security agent.", durationMins: 45, spaceId: "agentic-security-architecture", addedAt: "2026-06-06" },
  { id: "tune-security-agent", title: "Tune a security agent", type: "Lab", operationalType: "Scheduled", description: "Hands-on: shape an agent's policy and guardrails.", durationMins: 90, spaceId: "agentic-security-architecture", addedAt: "2026-06-04" },

  // Digital Resilience Assurance
  { id: "resilience-overview", title: "Resilience overview", type: "Guided", operationalType: "Instant", description: "A quick tour of continuous resilience assurance.", durationMins: 6, spaceId: "digital-resilience-assurance", addedAt: "2026-06-07" },
  { id: "continuous-assurance", title: "Continuous assurance", type: "Solution", operationalType: "Instant", description: "Always-on validation that services meet their SLOs.", durationMins: 25, spaceId: "digital-resilience-assurance", addedAt: "2026-06-08" },
  { id: "chaos-engineering", title: "Chaos engineering deep dive", type: "Deep-Dive", operationalType: "Scheduled", description: "Inject controlled failure and watch the system hold.", durationMins: 45, spaceId: "digital-resilience-assurance", addedAt: "2026-06-05" },
  { id: "resilience-game-day", title: "Resilience game-day", type: "Lab", operationalType: "Scheduled", description: "Hands-on incident game-day against a live topology.", durationMins: 120, spaceId: "digital-resilience-assurance", addedAt: "2026-06-12" },

  // Unified Forwarding Architecture
  { id: "unified-forwarding-intro", title: "Unified forwarding intro", type: "Guided", operationalType: "Instant", description: "One fabric for any workload — the quick tour.", durationMins: 5, spaceId: "unified-forwarding-architecture", addedAt: "2026-06-03" },
  { id: "one-fabric-any-workload", title: "One fabric, any workload", type: "Solution", operationalType: "Instant", description: "Run AI, storage and general traffic on one fabric.", durationMins: 25, spaceId: "unified-forwarding-architecture", addedAt: "2026-06-02" },
  { id: "forwarding-plane-internals", title: "Forwarding plane internals", type: "Deep-Dive", operationalType: "Scheduled", description: "Inside the unified forwarding plane and telemetry.", durationMins: 40, spaceId: "unified-forwarding-architecture", addedAt: "2026-06-01" },

  // Cost-Effective Network Stack
  { id: "cost-effective-tour", title: "Cost-effective stack tour", type: "Guided", operationalType: "Instant", description: "Right-sizing the stack without cutting corners.", durationMins: 5, spaceId: "cost-effective-network-stack", addedAt: "2026-06-02" },
  { id: "right-sized-stack", title: "Right-sized network stack", type: "Solution", operationalType: "Instant", description: "A reference stack tuned for value and performance.", durationMins: 25, spaceId: "cost-effective-network-stack", addedAt: "2026-06-01" },
  { id: "tco-modelling-lab", title: "TCO modelling lab", type: "Lab", operationalType: "Scheduled", description: "Hands-on: model total cost across stack options.", durationMins: 60, spaceId: "cost-effective-network-stack", addedAt: "2026-05-30" },
];

export const mySpaces: MySpace[] = [
  { id: "acme-secure-ai", customer: "Acme Corp", baseSpaceId: "secure-ai-factory", status: "expo-live" },
  { id: "globex-workplace", customer: "Globex", baseSpaceId: "workplace-experiences", status: "draft" },
];

const motionsById = new Map(gtmMotions.map((m) => [m.id, m]));
const spacesById = new Map(solutionSpaces.map((s) => [s.id, s]));

export function motionName(id: GtmMotionId): string {
  return motionsById.get(id)?.name ?? id;
}

export function spaceById(id: string): SolutionSpace | undefined {
  return spacesById.get(id);
}

export function demosForSpace(spaceId: string): Demo[] {
  return demos.filter((d) => d.spaceId === spaceId);
}

/** The newest demos first, regardless of type (the hub's flat "New Demos"). */
export function newestDemos(limit: number): Demo[] {
  return [...demos]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, limit);
}
