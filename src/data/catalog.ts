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
    motions: ["future-proof-workplaces"],
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
  {
    id: "ai-factory-5-min",
    title: "AI factory in 5 minutes",
    type: "Guided",
    operationalType: "Instant",
    description:
      "A quick click-through of a secure AI factory end to end. See how GPU, fabric and policy come together before a longer session. Ideal for opening a customer conversation or a busy exec slot.",
    durationMins: 5,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Nexus 9000", "AI POD"],
    addedAt: "2026-06-02",
  },
  {
    id: "sovereign-ai-cluster",
    title: "Sovereign AI cluster",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Deploy a sovereign, policy-bound AI cluster on Cisco fabric. Walk the customer from bare metal to a governed training environment with clear data residency boundaries. Shows the full Secure AI Factory outcome without drilling into every component.",
    durationMins: 30,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Nexus 9000", "Intersight"],
    addedAt: "2026-06-18",
  },
  {
    id: "gpu-fabric-deep-dive",
    title: "GPU fabric deep dive",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Inside the non-blocking GPU fabric and congestion control. Explore how east-west AI traffic is scheduled, buffered and kept lossless at scale. Use when the customer’s architects want proof the network won’t bottleneck training runs.",
    durationMins: 45,
    spaceIds: ["secure-ai-factory"],
    products: ["Nexus 9000", "UCS"],
    addedAt: "2026-06-04",
  },
  {
    id: "ai-workload-isolation",
    title: "AI workload isolation",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Tenant isolation and guardrails for shared AI infrastructure. See how policies segment teams, models and data paths on a multi-tenant cluster. Pairs well after the Solution demo when security and compliance questions land.",
    durationMins: 40,
    spaceIds: ["secure-ai-factory"],
    products: ["Secure Firewall", "ThousandEyes"],
    addedAt: "2026-06-03",
  },
  {
    id: "build-secure-ai-pipeline",
    title: "Build a secure AI pipeline",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: wire up a hardened training-to-serving pipeline. Configure ingest, training, model registry and inference with security checkpoints at each stage. Best for SE-led workshops or a customer POV that must feel real.",
    durationMins: 90,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Splunk", "Secure Firewall"],
    addedAt: "2026-06-01",
  },

  // Secure Networking — campus & branch demos use Catalyst; DC/cloud demos use Nexus/ACI
  {
    id: "secure-networking-tour",
    title: "Secure networking tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "A guided campus and branch intro to zero-trust networking with Cisco. Touch identity, segmentation and visibility in one short story. Sets context before a deeper Solution or Deep-Dive session.",
    durationMins: 6,
    spaceIds: ["secure-networking"],
    products: ["Catalyst 9300", "Catalyst 9200", "ISE", "Meraki"],
    addedAt: "2026-06-06",
  },
  {
    id: "zero-trust-campus",
    title: "Zero-trust campus",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Identity-based segmentation across a live campus. Show users and devices gaining access based on who they are, not where they plug in. The anchor demo for Secure Networking — broad enough for AEs, credible for SEs.",
    durationMins: 30,
    spaceIds: ["secure-networking"],
    products: ["Catalyst 9300", "Catalyst 9500", "ISE", "Secure Firewall"],
    addedAt: "2026-06-07",
  },
  {
    id: "hybrid-mesh-fabric",
    title: "Hybrid mesh fabric",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Stitch DC, cloud and edge into one policy-driven mesh. Follow traffic as it crosses sites without losing consistent security posture. Use when the customer has hybrid footprint and wants one control model.",
    durationMins: 40,
    spaceIds: ["secure-networking", "unified-forwarding-architecture"],
    products: ["Nexus 9000", "Nexus 9300", "Cloud ACI"],
    addedAt: "2026-06-09",
  },
  {
    id: "segment-brownfield",
    title: "Segmenting a brownfield network",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on micro-segmentation on an existing campus estate. Apply ISE policies and Catalyst segmentation without a full rip-and-replace. Designed for customers who need proof on their own messy reality.",
    durationMins: 75,
    spaceIds: ["secure-networking"],
    products: ["Catalyst 9300", "Catalyst 9200", "ISE"],
    addedAt: "2026-06-05",
  },

  // Workplace Experiences
  {
    id: "smart-workspace-tour",
    title: "Smart workspace tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Walk a smart, sensor-aware hybrid workspace. See occupancy, environmental cues and collaboration touchpoints in one pass. A fast opener before room intelligence or platform demos.",
    durationMins: 5,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "Meraki", "Cisco Spaces"],
    addedAt: "2026-06-05",
  },
  {
    id: "hybrid-work-platform",
    title: "Hybrid work platform",
    type: "Solution",
    operationalType: "Instant",
    description:
      "One platform for meetings, devices and room intelligence. Show how Webex, endpoints and space analytics tie into a single hybrid-work story. The hero demo for Workplace Experiences — outcome-first for business buyers.",
    durationMins: 25,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "Webex Room Bar", "Desk Pro"],
    addedAt: "2026-06-04",
  },
  {
    id: "room-intelligence",
    title: "Room intelligence deep dive",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "How rooms sense, adapt and report on usage. Drill into sensors, booking integration and utilisation insights that drive real estate decisions. Follow the Solution demo when facilities or IT want the detail.",
    durationMins: 35,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "Cisco Spaces", "Meraki"],
    addedAt: "2026-06-03",
  },
  {
    id: "deploy-smart-space",
    title: "Deploy a smart space",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on provisioning of a smart meeting space. Stand up room kit, network and Spaces policies in a guided build. Strong for partner enablement or a customer try-it day.",
    durationMins: 80,
    spaceIds: ["workplace-experiences"],
    products: ["Webex Room Kit", "Meraki", "Cisco Spaces"],
    addedAt: "2026-06-02",
  },

  // Agentic Security Architecture
  {
    id: "agentic-soc-walkthru",
    title: "Agentic SOC walk-thru",
    type: "Guided",
    operationalType: "Guided",
    description:
      "See an AI-run SOC triage and contain an incident. Watch agents correlate signals, propose actions and execute with human oversight. A sharp five-minute story for security leaders new to agentic operations.",
    durationMins: 8,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Secure Firewall", "XDR"],
    addedAt: "2026-06-16",
  },
  {
    id: "autonomous-threat-response",
    title: "Autonomous threat response",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Agents detect, reason and respond across the stack. Follow an attack chain from first anomaly through containment and recovery. The flagship demo for Agentic Security — broad, visual and executive-friendly.",
    durationMins: 30,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Secure Firewall", "Talos"],
    addedAt: "2026-06-08",
  },
  {
    id: "agent-reasoning-internals",
    title: "Agent reasoning internals",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Inside the planning and tool-use loop of a security agent. See how context, playbooks and guardrails shape each decision step. For SOC architects who need to trust the automation, not just the slide.",
    durationMins: 45,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "XDR"],
    addedAt: "2026-06-06",
  },
  {
    id: "tune-security-agent",
    title: "Tune a security agent",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: shape an agent's policy and guardrails. Adjust thresholds, allowed actions and escalation paths in a live scenario. Ideal post-Solution when the customer wants to test their own runbooks.",
    durationMins: 90,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Secure Firewall"],
    addedAt: "2026-06-04",
  },

  // Digital Resilience Assurance
  {
    id: "resilience-overview",
    title: "Resilience overview",
    type: "Guided",
    operationalType: "Instant",
    description:
      "A quick tour of continuous resilience assurance. See how observability and synthetic checks keep SLOs honest between incidents. Opens the door to continuous assurance and game-day labs.",
    durationMins: 6,
    spaceIds: ["digital-resilience-assurance"],
    products: ["ThousandEyes", "Splunk"],
    addedAt: "2026-06-07",
  },
  {
    id: "continuous-assurance",
    title: "Continuous assurance",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Always-on validation that services meet their SLOs. Demonstrate proactive detection before users feel pain, with clear business impact framing. The anchor demo for Digital Resilience Assurance.",
    durationMins: 25,
    spaceIds: ["digital-resilience-assurance"],
    products: ["ThousandEyes", "Splunk", "AppDynamics"],
    addedAt: "2026-06-08",
  },
  {
    id: "chaos-engineering",
    title: "Chaos engineering deep dive",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Inject controlled failure across the DC fabric and watch the system hold. Observe reroute, telemetry and operator workflows under stress. Use with infrastructure teams planning game days or architecture reviews.",
    durationMins: 45,
    spaceIds: ["digital-resilience-assurance"],
    products: ["ThousandEyes", "Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-05",
  },
  {
    id: "resilience-game-day",
    title: "Resilience game-day",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on incident game-day against a live topology. Run the playbook as failures land and teams coordinate response. Built for customers who learn by doing, not watching.",
    durationMins: 120,
    spaceIds: ["digital-resilience-assurance"],
    products: ["Splunk", "ThousandEyes"],
    addedAt: "2026-06-12",
  },

  // Unified Forwarding Architecture
  {
    id: "unified-forwarding-intro",
    title: "Unified forwarding intro",
    type: "Guided",
    operationalType: "Instant",
    description:
      "One fabric for any workload — the quick tour. See how a single forwarding model simplifies operations across AI, storage and general traffic. A concise lead-in to the full Solution demo.",
    durationMins: 5,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-03",
  },
  {
    id: "one-fabric-any-workload",
    title: "One fabric, any workload",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Run AI, storage and general traffic on one fabric. Prove performance, policy and simplicity in a single end-to-end path. The hero demo for Unified Forwarding Architecture.",
    durationMins: 25,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9000", "UCS"],
    addedAt: "2026-06-02",
  },
  {
    id: "forwarding-plane-internals",
    title: "Forwarding plane internals",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Inside the unified forwarding plane and telemetry. Examine tables, buffers and instrumentation that keep workloads isolated yet efficient. For design workshops and deep technical validation.",
    durationMins: 40,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9300", "Nexus 9000"],
    addedAt: "2026-06-01",
  },

  // Cost-Effective Network Stack — DC fabric & compute (no campus Catalyst)
  {
    id: "cost-effective-tour",
    title: "Cost-effective stack tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Right-sizing the data centre stack without cutting corners. Compare footprint, power and capability trade-offs in a short guided pass. Sets up the value conversation before the Solution demo.",
    durationMins: 5,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9300", "Nexus 9200", "Intersight"],
    addedAt: "2026-06-02",
  },
  {
    id: "right-sized-stack",
    title: "Right-sized network stack",
    type: "Solution",
    operationalType: "Instant",
    description:
      "A reference DC fabric tuned for value and performance. Walk through a bill-of-materials mindset that still meets AI and storage demands. The anchor demo for Cost-Effective Network Stack.",
    durationMins: 25,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9300", "Nexus 9000", "UCS Fabric Interconnect"],
    addedAt: "2026-06-01",
  },
  {
    id: "tco-modelling-lab",
    title: "TCO modelling lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: model total cost across DC fabric options. Adjust scale, lifecycle and operations assumptions and see the impact live. Built for procurement-heavy deals and CFO conversations.",
    durationMins: 60,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9300", "Nexus 9200", "Intersight"],
    addedAt: "2026-05-30",
  },
  // Hub extras — revealed via "View all" on the logged-in landing
  {
    id: "gpu-fabric-telemetry",
    title: "GPU Fabric Telemetry & Capacity Planning",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Walk through live telemetry from a multi-rack GPU fabric — queue depth, NIC saturation and thermal headroom on one pane. See how capacity planners model burst AI training without over-provisioning spine bandwidth. Export a sizing snapshot your customer can take into their next design review.",
    durationMins: 35,
    spaceIds: ["secure-ai-factory"],
    products: ["Nexus 9000", "Nexus Dashboard"],
    addedAt: "2026-06-22",
    hubExtra: true,
  },
  {
    id: "agentic-playbook-builder",
    title: "Agentic Playbook Builder",
    type: "Guided",
    operationalType: "Guided",
    description:
      "Compose a response playbook where AI agents coordinate across firewall, identity and observability tools — no slide deck required. Trigger a simulated incident and watch agents propose, validate and execute containment steps with human-in-the-loop gates. Finish with an exportable runbook your SE can tailor per customer.",
    durationMins: 28,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Secure Firewall"],
    addedAt: "2026-06-23",
    hubExtra: true,
  },
  {
    id: "hybrid-room-intelligence",
    title: "Hybrid Room Intelligence",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Experience a conference room that senses occupancy, air quality and A/V health before anyone raises a ticket. Tie Webex endpoints, wireless and building sensors into a single operator view with proactive nudges for facilities and IT. Close with a customer-ready story on reducing ghost rooms and support calls.",
    durationMins: 40,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "Meraki MR", "Catalyst 9800"],
    addedAt: "2026-06-24",
    hubExtra: true,
  },
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
  return demos.filter((d) => d.spaceIds.includes(spaceId));
}

/** The anchor Solution Demo for a Space — one per Space in the prototype. */
export function solutionDemoForSpace(spaceId: string): Demo | undefined {
  return demosForSpace(spaceId).find((d) => d.type === "Solution");
}

/** Primary Space label for hub cards when a demo spans several. */
export function primarySpaceId(demo: Demo): string {
  return demo.spaceIds[0];
}

/** The newest demos first, regardless of type (the hub's flat "New Demos"). */
export function newestDemos(limit: number): Demo[] {
  return [...demos]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, limit);
}

/** Default hub rail plus optional extras behind "View all". */
export function hubNewDemos(showAll: boolean): Demo[] {
  const standard = demos
    .filter((d) => !d.hubExtra)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, 3);
  const extra = demos
    .filter((d) => d.hubExtra)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  return showAll ? [...standard, ...extra] : standard;
}

/** True when a Space contains at least one hub-extra demo (for the "New Content" badge). */
export function spaceHasNewContent(spaceId: string): boolean {
  return demos.some((d) => d.hubExtra && d.spaceIds.includes(spaceId));
}
