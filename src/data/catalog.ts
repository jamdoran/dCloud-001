import type {
  Demo,
  GtmMotion,
  GtmMotionId,
  SolutionSpace,
} from "@/lib/types";
import { newSolutionSpaces, newSpaceDemos } from "./catalogNewSpaces";

/**
 * File-based seed content (no backend). Edit here to change what the prototype
 * shows. Solution Spaces each carry two signature accents (used for its unique
 * background) and a tagline.
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
    accent: "#9333ea",
    accent2: "#22d3ee",
    tagline: "Stand up trusted AI infrastructure, from GPU fabric to guardrails.",
    demoCount: 11,
    labCount: 3,
  },
  {
    id: "secure-networking",
    name: "Secure Networking",
    motions: ["future-proof-workplaces"],
    accent: "#0ea5e9",
    accent2: "#6366f1",
    tagline: "Zero-trust connectivity across campus, data centre and cloud.",
    demoCount: 9,
    labCount: 3,
  },
  {
    id: "workplace-experiences",
    name: "Workplace Experiences",
    motions: ["future-proof-workplaces"],
    accent: "#14b8a6",
    accent2: "#a3e635",
    tagline: "Hybrid work that feels effortless in every room and on every device.",
    demoCount: 10,
    labCount: 3,
  },
  {
    id: "agentic-security-architecture",
    name: "Agentic Security Architecture",
    motions: ["digital-resilience"],
    accent: "#e879f9",
    accent2: "#fb7185",
    tagline: "AI agents that detect, reason and respond across the security stack.",
    demoCount: 8,
    labCount: 3,
  },
  {
    id: "digital-resilience-assurance",
    name: "Digital Resilience Assurance",
    motions: ["digital-resilience"],
    accent: "#3b82f6",
    accent2: "#a78bfa",
    tagline: "Prove services stay up — continuously, under real-world stress.",
    demoCount: 8,
    labCount: 3,
  },
  {
    id: "unified-forwarding-architecture",
    name: "Unified Forwarding Architecture",
    motions: ["ai-ready-dc"],
    accent: "#10b981",
    accent2: "#06b6d4",
    tagline: "One forwarding fabric for any workload, anywhere.",
    demoCount: 7,
    labCount: 3,
  },
  {
    id: "cost-effective-network-stack",
    name: "Cost-Effective Network Stack",
    motions: ["ai-ready-dc"],
    accent: "#f59e0b",
    accent2: "#ec4899",
    tagline: "Right-sized networking that lowers TCO without cutting corners.",
    demoCount: 8,
    labCount: 3,
  },
  {
    id: "secure-campus-branch",
    name: "Secure Campus & Branch",
    motions: ["future-proof-workplaces"],
    accent: "#2563eb",
    accent2: "#2dd4bf",
    tagline: "Consistent security and connectivity from headquarters to every branch and store.",
    demoCount: 11,
    labCount: 3,
  },
  {
    id: "cisco-data-center",
    name: "Secure Data Centre",
    motions: ["ai-ready-dc"],
    accent: "#06b6d4",
    accent2: "#22c55e",
    tagline: "Compute, storage and fabric as one automated, secure data centre platform.",
    demoCount: 11,
    labCount: 3,
  },
  ...newSolutionSpaces,
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
    title: "Cisco Secure AI Factory with NVIDIA",
    type: "Solution",
    operationalType: "Instant",
    description:
      "The anchor Solution demo for Secure AI Factory — Cisco and NVIDIA together. See how validated compute, high-performance fabric and security guardrails let teams stand up production AI without trading speed for trust. Broad enough for a first customer meeting; credible for platform and security architects. " +
      "Walk from NVIDIA GPU clusters through Cisco Nexus AI-ready fabric to policy, observability and workload isolation on UCS and Intersight. Training and inference share the same governed stack — not a bolt-on security layer after the GPUs are live. " +
      "Pause on how tenancy, data classification and model approval gate every workload before it runs. Close with the joint Cisco–NVIDIA reference outcome: faster time to first model, clear operator roles and a path to deep-dives on fabric, isolation and hands-on labs.",
    durationMins: 30,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Nexus 9000", "Intersight", "NVIDIA"],
    addedAt: "2026-06-18",
  },
  {
    id: "gpu-fabric-deep-dive",
    title: "GPU fabric deep dive with NVIDIA",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Inside the non-blocking GPU fabric and congestion control with NVIDIA accelerators. Explore how east-west AI traffic is scheduled, buffered and kept lossless at scale. Use when the customer’s architects want proof the network won’t bottleneck training runs. " +
      "The session opens on a saturated spine during an all-reduce burst, then steps through buffer accounting, PFC/ECN behaviour and how telemetry surfaces hot spots before jobs fail. Compare a naive oversubscribed design with a tuned AI-ready leaf-spine so the trade-offs are obvious. " +
      "Drill into queue depth, pause frames and NIC credit exhaustion with live counters your SE can tie back to the customer’s expected GPU count. Finish with sizing guidance and a checklist for design reviews.",
    durationMins: 45,
    spaceIds: ["secure-ai-factory"],
    products: ["Nexus 9000", "UCS", "NVIDIA"],
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
      "Identity-based segmentation across a live campus. Show users and devices gaining access based on who they are, not where they plug in. The anchor demo for Secure Networking — broad enough for AEs, credible for SEs. " +
      "Follow a contractor laptop, a corporate phone and a shared printer as each requests access — policies follow the identity, not the VLAN. Highlight how ISE posture checks and Secure Firewall rules align so security teams see one story, not three consoles. " +
      "Include a quick recovery path when a device is compromised: quarantine, notify and re-admit only after remediation. This is the demo to run when the customer says their flat network ‘works fine’ until something moves sideways.",
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
      "One platform for meetings, devices and room intelligence. Show how Webex, endpoints and space analytics tie into a single hybrid-work story. The hero demo for Workplace Experiences — outcome-first for business buyers. " +
      "Start in a ghost meeting room that auto-releases when nobody checks in, then pivot to a busy huddle space where environmental sensors nudge facilities before users complain. Tie desk booking, room kit health and utilisation dashboards into one operator view. " +
      "Land the business outcome: fewer wasted square metres, fewer ‘AV didn’t work’ tickets, and a credible path to measuring hybrid work without survey fatigue. Strong for CHRO, facilities and IT in the same session.",
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
      "Agents detect, reason and respond across the stack. Follow an attack chain from first anomaly through containment and recovery. The flagship demo for Agentic Security — broad, visual and executive-friendly. " +
      "Watch correlated signals move from EDR, firewall and identity into an agent planner that proposes containment steps with human approval gates. See how playbooks adapt when the attacker pivots — the agent re-plans instead of blindly running a static script. " +
      "Close on the audit trail: every tool invocation, every approval and every rollback is captured for the SOC lead. Use this when the buyer wants ‘automation’ but is nervous about blind robots in production.",
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
      "Inject controlled failure across the DC fabric and watch the system hold. Observe reroute, telemetry and operator workflows under stress. Use with infrastructure teams planning game days or architecture reviews. " +
      "Begin with a clean baseline SLO dashboard, then kill a top-of-rack uplink while AI training and storage traffic compete for the same spine. ThousandEyes and fabric telemetry show whether reroute is fast enough and whether operators get actionable context, not alarm noise. " +
      "Run a second fault on a control-plane dependency to show blast-radius containment. Debrief with a short list of architectural changes — redundant supervisors, traffic engineering tweaks — that came out of the exercise.",
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
      "Hands-on incident game-day against a live topology. Run the playbook as failures land and teams coordinate response. Built for customers who learn by doing, not watching. " +
      "Participants rotate roles — network, app owner, comms — as injects arrive on a shared timeline. Splunk and ThousandEyes feeds stay live so decisions are based on evidence, not slides. " +
      "The exercise ends with a scored debrief: time-to-detect, time-to-mitigate and gaps in runbooks. Bring this lab when the customer has maturity but has never stress-tested cross-team coordination at scale.",
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
      "A reference DC fabric tuned for value and performance. Walk through a bill-of-materials mindset that still meets AI and storage demands. The anchor demo for Cost-Effective Network Stack. " +
      "Compare three BOM paths side by side — lean, balanced and performance headroom — with power, rack units and five-year TCO surfaced in the same view. Show where customers over-buy optics and where skimping creates hidden ops cost. " +
      "Tie each tier back to workload mix: general compute, east-west storage and bursty GPU traffic. Leave them with a worksheet they can re-run with their own assumptions after the session.",
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

  // ---- Expanded catalogue — richer per-Space grids behind "View all" ----

  // Secure AI Factory
  {
    id: "ai-policy-walkthru",
    title: "AI policy walk-thru",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Click through how model approval, data classification and residency rules gate every workload on a shared AI cluster. A fast opener before the sovereign cluster Solution demo.",
    durationMins: 6,
    spaceIds: ["secure-ai-factory"],
    products: ["Intersight", "Secure Firewall"],
    addedAt: "2026-06-10",
  },
  {
    id: "model-serving-intro",
    title: "Model serving intro",
    type: "Guided",
    operationalType: "Instant",
    description:
      "See inference endpoints spin up behind the same guardrails used for training — ideal for a five-minute slot with ML platform owners.",
    durationMins: 7,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Nexus 9000"],
    addedAt: "2026-06-11",
  },
  {
    id: "gpu-scheduling-tour",
    title: "GPU scheduling tour",
    type: "Guided",
    operationalType: "Guided",
    description:
      "Watch jobs queue, pre-empt and burst across a shared GPU pool with clear fairness and chargeback signals for platform teams.",
    durationMins: 8,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Intersight"],
    addedAt: "2026-06-12",
  },
  {
    id: "inference-acceleration",
    title: "Inference acceleration",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Compare latency and throughput paths for real-time inference on Cisco AI fabric — batching, RDMA and NIC offload in one session.",
    durationMins: 38,
    spaceIds: ["secure-ai-factory"],
    products: ["Nexus 9000", "UCS"],
    addedAt: "2026-06-13",
  },
  {
    id: "data-governance-controls",
    title: "Data governance controls",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Trace lineage from ingest to model artefact with policy checkpoints your compliance lead can sign off on.",
    durationMins: 42,
    spaceIds: ["secure-ai-factory"],
    products: ["Splunk", "Secure Firewall"],
    addedAt: "2026-06-14",
  },
  {
    id: "nvlink-topology",
    title: "NVLink topology planning",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Size GPU islands, leaf uplinks and congestion domains for large training runs without surprise east-west bottlenecks.",
    durationMins: 50,
    spaceIds: ["secure-ai-factory"],
    products: ["Nexus 9000", "UCS"],
    addedAt: "2026-06-15",
  },
  {
    id: "model-registry-lab",
    title: "Model registry lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: publish, sign and promote model versions through a governed registry tied to your cluster policies.",
    durationMins: 85,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Intersight", "Splunk"],
    addedAt: "2026-06-16",
  },
  {
    id: "ai-factory-cpoc",
    title: "AI factory CPOC",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Multi-day customer proof: stand up training, serving and observability on a reference Secure AI Factory stack.",
    durationMins: 240,
    spaceIds: ["secure-ai-factory"],
    products: ["UCS", "Nexus 9000", "Secure Firewall"],
    addedAt: "2026-06-17",
  },

  // Secure Networking
  {
    id: "identity-first-access",
    title: "Identity-first access",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Follow a user session from login to segmented access without VLAN gymnastics — a crisp campus opener.",
    durationMins: 6,
    spaceIds: ["secure-networking"],
    products: ["ISE", "Catalyst 9300"],
    addedAt: "2026-06-10",
  },
  {
    id: "branch-zero-trust",
    title: "Branch zero-trust tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "See SD-WAN, identity and firewall policy align at a branch before you dive into the campus Solution demo.",
    durationMins: 7,
    spaceIds: ["secure-networking"],
    products: ["Meraki", "Secure Firewall", "ISE"],
    addedAt: "2026-06-11",
  },
  {
    id: "sda-segmentation",
    title: "SDA segmentation deep dive",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Walk virtual networks, SGTs and policy enforcement points on Catalyst switching for brownfield campuses.",
    durationMins: 40,
    spaceIds: ["secure-networking"],
    products: ["Catalyst 9300", "Catalyst 9500", "ISE"],
    addedAt: "2026-06-12",
  },
  {
    id: "firewall-policy-hygiene",
    title: "Firewall policy hygiene",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Audit noisy rules, shadowed permits and over-broad objects — then show automated cleanup your security team can trust.",
    durationMins: 35,
    spaceIds: ["secure-networking"],
    products: ["Secure Firewall", "SecureX"],
    addedAt: "2026-06-13",
  },
  {
    id: "cloud-onramp-security",
    title: "Cloud on-ramp security",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Extend consistent policy from campus to cloud VPCs and SaaS egress without re-architecting every app team.",
    durationMins: 45,
    spaceIds: ["secure-networking"],
    products: ["Cloud ACI", "Secure Firewall", "ThousandEyes"],
    addedAt: "2026-06-14",
  },
  {
    id: "east-west-inspection",
    title: "East-west inspection",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Insert scalable inspection for lateral movement without melting the spine — service chaining and policy in one pass.",
    durationMins: 38,
    spaceIds: ["secure-networking"],
    products: ["Nexus 9000", "Secure Firewall"],
    addedAt: "2026-06-15",
  },
  {
    id: "sd-wan-secure-wan",
    title: "SD-WAN secure WAN",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Application-aware SD-WAN with integrated security from branch to cloud. Follow path selection, encrypted overlays and firewall inspection as one policy story — not three bolted-on boxes. " +
      "Open at a branch where voice and SaaS compete on a constrained uplink, then show Catalyst SD-WAN Manager steering traffic while Secure Firewall policies travel with the session. " +
      "Cover cloud on-ramp options, split tunneling for trusted SaaS and full inspection for sensitive apps. Run this when the customer is refreshing MPLS or wants secure internet breakout without losing visibility.",
    durationMins: 40,
    spaceIds: ["secure-networking"],
    products: ["Catalyst SD-WAN Manager", "Secure Firewall", "ThousandEyes"],
    addedAt: "2026-06-22",
    updatedAt: "2026-06-18",
  },
  {
    id: "ise-posture-lab",
    title: "ISE posture lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: define posture checks, quarantine VLANs and re-admission flows for unmanaged endpoints.",
    durationMins: 70,
    spaceIds: ["secure-networking"],
    products: ["ISE", "Catalyst 9200", "Catalyst 9300"],
    addedAt: "2026-06-16",
  },
  {
    id: "zero-trust-cpoc",
    title: "Zero-trust CPOC",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Customer proof: micro-segment a live campus estate with identity, switching and firewall working as one system.",
    durationMins: 180,
    spaceIds: ["secure-networking"],
    products: ["ISE", "Catalyst 9300", "Secure Firewall"],
    addedAt: "2026-06-17",
  },

  // Workplace Experiences
  {
    id: "webex-desk-tour",
    title: "Webex desk tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Personal collaboration in three minutes — desk pro, headset and calendar intelligence without the full platform story.",
    durationMins: 5,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "Desk Pro"],
    addedAt: "2026-06-10",
  },
  {
    id: "hybrid-collab-intro",
    title: "Hybrid collab intro",
    type: "Guided",
    operationalType: "Guided",
    description:
      "See how remote and in-room participants share one equitable meeting experience before the hybrid platform demo.",
    durationMins: 6,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "Webex Room Bar"],
    addedAt: "2026-06-11",
  },
  {
    id: "device-fleet-health",
    title: "Device fleet health",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Monitor endpoints, room kits and wireless from one pane — catch firmware drift and ghost rooms before users complain.",
    durationMins: 32,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "Meraki", "Intersight"],
    addedAt: "2026-06-12",
  },
  {
    id: "meeting-quality-analytics",
    title: "Meeting quality analytics",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Drill into MOS, packet loss and CPU spikes across hybrid meetings with actionable fixes for IT and facilities.",
    durationMins: 36,
    spaceIds: ["workplace-experiences"],
    products: ["Webex", "ThousandEyes"],
    addedAt: "2026-06-13",
  },
  {
    id: "space-booking-flow",
    title: "Space booking flow",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Integrate calendars, sensors and release policies so booked rooms actually get used — and data feeds real-estate decisions.",
    durationMins: 34,
    spaceIds: ["workplace-experiences"],
    products: ["Cisco Spaces", "Webex"],
    addedAt: "2026-06-14",
  },
  {
    id: "environmental-sensing",
    title: "Environmental sensing",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Air quality, occupancy and noise cues routed to facilities before helpdesk tickets — tied back to Meraki and Spaces.",
    durationMins: 30,
    spaceIds: ["workplace-experiences"],
    products: ["Meraki", "Cisco Spaces"],
    addedAt: "2026-06-15",
  },
  {
    id: "hybrid-work-cpoc",
    title: "Hybrid work CPOC",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Customer proof: deploy room kit, wireless and analytics for a floor of hybrid workspaces in a guided build.",
    durationMins: 160,
    spaceIds: ["workplace-experiences"],
    products: ["Webex Room Kit", "Meraki", "Cisco Spaces"],
    addedAt: "2026-06-16",
  },
  {
    id: "room-analytics-lab",
    title: "Room analytics lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: wire sensors, dashboards and utilisation alerts for a smart meeting space your customer can replicate.",
    durationMins: 75,
    spaceIds: ["workplace-experiences"],
    products: ["Cisco Spaces", "Webex"],
    addedAt: "2026-06-17",
  },

  // Agentic Security Architecture
  {
    id: "incident-triage-quickstart",
    title: "Incident triage quickstart",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Watch an alert become a ranked incident with agent-suggested next steps — five minutes for SOC managers new to automation.",
    durationMins: 6,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "XDR"],
    addedAt: "2026-06-10",
  },
  {
    id: "tool-use-guardrails",
    title: "Tool-use guardrails",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "See how agents are constrained to approved tools, scopes and approval gates before touching production systems.",
    durationMins: 40,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Secure Firewall"],
    addedAt: "2026-06-11",
  },
  {
    id: "cross-domain-correlation",
    title: "Cross-domain correlation",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Follow identity, endpoint and network signals merge into one agent context — fewer swivel-chair hops for tier-2 analysts.",
    durationMins: 42,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "XDR", "ISE"],
    addedAt: "2026-06-12",
  },
  {
    id: "false-positive-tuning",
    title: "False-positive tuning",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Adjust thresholds, enrichment and human feedback loops so agents escalate signal, not noise.",
    durationMins: 38,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Talos"],
    addedAt: "2026-06-13",
  },
  {
    id: "purple-team-lab",
    title: "Purple-team lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: run attack injects against agent playbooks and measure time-to-contain with your customer's runbooks.",
    durationMins: 100,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Secure Firewall", "XDR"],
    addedAt: "2026-06-14",
  },
  {
    id: "agent-rollback-lab",
    title: "Agent rollback lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Practice safe rollback when an agent action misfires — audit trail, blast-radius checks and human override paths.",
    durationMins: 80,
    spaceIds: ["agentic-security-architecture"],
    products: ["Splunk", "Secure Firewall"],
    addedAt: "2026-06-15",
  },

  // Digital Resilience Assurance
  {
    id: "slo-dashboard-tour",
    title: "SLO dashboard tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Scan burn rates, error budgets and user-journey SLOs in one calm view — sets up the continuous assurance demo.",
    durationMins: 5,
    spaceIds: ["digital-resilience-assurance"],
    products: ["ThousandEyes", "AppDynamics"],
    addedAt: "2026-06-10",
  },
  {
    id: "synthetic-user-journey",
    title: "Synthetic user journey",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Follow scripted transactions across apps and networks to catch regressions before the Monday stand-up.",
    durationMins: 7,
    spaceIds: ["digital-resilience-assurance"],
    products: ["ThousandEyes"],
    addedAt: "2026-06-11",
  },
  {
    id: "cross-cloud-path-analysis",
    title: "Cross-cloud path analysis",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Trace latency and loss hop-by-hop across SaaS, on-prem and cloud egress — the evidence pack for architecture reviews.",
    durationMins: 40,
    spaceIds: ["digital-resilience-assurance"],
    products: ["ThousandEyes", "Splunk"],
    addedAt: "2026-06-12",
  },
  {
    id: "dependency-mapping",
    title: "Dependency mapping",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Build a live service map from telemetry and synthetics so game-day injects hit the right blast radius.",
    durationMins: 38,
    spaceIds: ["digital-resilience-assurance"],
    products: ["AppDynamics", "Splunk"],
    addedAt: "2026-06-13",
  },
  {
    id: "alert-noise-reduction",
    title: "Alert noise reduction",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Correlate floods of alerts into actionable incidents with SLO context — fewer pages, faster mean time to understand.",
    durationMins: 36,
    spaceIds: ["digital-resilience-assurance"],
    products: ["Splunk", "ThousandEyes"],
    addedAt: "2026-06-14",
  },
  {
    id: "failover-fabric-lab",
    title: "Failover fabric lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: trigger link and supervisor failures on a DC fabric and validate reroute meets the customer's RTO.",
    durationMins: 90,
    spaceIds: ["digital-resilience-assurance"],
    products: ["Nexus 9000", "ThousandEyes"],
    addedAt: "2026-06-15",
  },
  {
    id: "slo-burn-rate-lab",
    title: "SLO burn-rate lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Configure error budgets, alerting policies and executive dashboards for a critical customer-facing service.",
    durationMins: 70,
    spaceIds: ["digital-resilience-assurance"],
    products: ["AppDynamics", "ThousandEyes"],
    addedAt: "2026-06-16",
  },

  // Unified Forwarding Architecture
  {
    id: "traffic-class-tour",
    title: "Traffic-class tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "See AI, storage and general traffic share one fabric with distinct classes — a quick lead-in to the Solution demo.",
    durationMins: 5,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-10",
  },
  {
    id: "multi-workload-routing",
    title: "Multi-workload routing",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Follow three workload types across the same spine without policy sprawl or surprise oversubscription.",
    durationMins: 6,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9300"],
    addedAt: "2026-06-11",
  },
  {
    id: "buffer-architecture",
    title: "Buffer architecture",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Deep dive on shared buffer pools, headroom and lossless modes when AI and storage bursts coincide.",
    durationMins: 42,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-12",
  },
  {
    id: "ecn-marking-tuning",
    title: "ECN marking tuning",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Tune ECN thresholds and queue thresholds for mixed workloads — fewer pause storms, predictable latency.",
    durationMins: 44,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9300"],
    addedAt: "2026-06-13",
  },
  {
    id: "fabric-build-lab",
    title: "Fabric build lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: stand up a leaf-spine reference with unified forwarding policies your SE can reuse in workshops.",
    durationMins: 120,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9300", "Nexus 9000"],
    addedAt: "2026-06-14",
  },
  {
    id: "workload-placement-lab",
    title: "Workload placement lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Place AI, storage and VM traffic on one fabric and validate isolation, telemetry and failover behaviour.",
    durationMins: 90,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9000", "UCS"],
    addedAt: "2026-06-15",
  },
  {
    id: "telemetry-troubleshoot-lab",
    title: "Telemetry troubleshoot lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Use streaming telemetry to debug congestion and mis-policed flows during a guided fault injection exercise.",
    durationMins: 75,
    spaceIds: ["unified-forwarding-architecture"],
    products: ["Nexus 9300", "Nexus Dashboard"],
    addedAt: "2026-06-16",
  },

  // Cost-Effective Network Stack
  {
    id: "bom-comparison-tour",
    title: "BOM comparison tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Compare lean, balanced and performance BOMs in five minutes — primes the right-sized stack conversation.",
    durationMins: 5,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9300", "Intersight"],
    addedAt: "2026-06-10",
  },
  {
    id: "power-efficiency-intro",
    title: "Power efficiency intro",
    type: "Guided",
    operationalType: "Instant",
    description:
      "See how optics, ASIC generation and port utilisation shift power draw — without sacrificing AI-ready headroom.",
    durationMins: 6,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9200", "Nexus 9300"],
    addedAt: "2026-06-11",
  },
  {
    id: "optics-cost-tradeoffs",
    title: "Optics cost trade-offs",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Model transceiver strategies across reach, power and sparing — where customers overspend without knowing it.",
    durationMins: 35,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9300", "Nexus 9200"],
    addedAt: "2026-06-12",
  },
  {
    id: "spine-leaf-sizing",
    title: "Spine-leaf sizing",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Size uplinks and spine tiers for bursty GPU traffic while keeping port utilisation in the value sweet spot.",
    durationMins: 40,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-13",
  },
  {
    id: "lifecycle-refresh-model",
    title: "Lifecycle refresh model",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Project refresh cycles, support costs and power savings across five years — the CFO-friendly deep dive.",
    durationMins: 38,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Intersight", "Nexus 9300"],
    addedAt: "2026-06-14",
  },
  {
    id: "ops-automation-savings",
    title: "Ops automation savings",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Quantify day-2 savings from automated provisioning, telemetry and closed-loop remediation on Nexus.",
    durationMins: 32,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus Dashboard", "Intersight"],
    addedAt: "2026-06-15",
  },
  {
    id: "refresh-planning-lab",
    title: "Refresh planning lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: build a phased refresh plan with downtime windows, BOM deltas and TCO exports for procurement.",
    durationMins: 80,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9300", "Intersight"],
    addedAt: "2026-06-16",
  },
  {
    id: "greenfield-bom-lab",
    title: "Greenfield BOM lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Model a net-new DC fabric from workload assumptions through BOM, power and rack layout in one session.",
    durationMins: 95,
    spaceIds: ["cost-effective-network-stack"],
    products: ["Nexus 9000", "Nexus 9300", "UCS"],
    addedAt: "2026-06-17",
  },

  // Secure Campus & Branch
  {
    id: "campus-branch-tour",
    title: "Campus & branch tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "A five-minute click-through from HQ switching to SD-WAN branch — identity, wireless and policy follow the user, not the site code.",
    durationMins: 5,
    spaceIds: ["secure-campus-branch"],
    products: ["Catalyst 9300", "Meraki MX", "ISE"],
    addedAt: "2026-06-19",
  },
  {
    id: "sd-wan-quickstart",
    title: "SD-WAN quickstart",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Stand up secure branch connectivity in minutes — overlay, application-aware routing and cloud on-ramp without a forklift upgrade.",
    durationMins: 6,
    spaceIds: ["secure-campus-branch"],
    products: ["Meraki MX", "Catalyst SD-WAN Manager"],
    addedAt: "2026-06-19",
  },
  {
    id: "iot-onboarding-tour",
    title: "IoT onboarding tour",
    type: "Guided",
    operationalType: "Guided",
    description:
      "See cameras, sensors and building systems join the network with device-type policies — no flat VLANs for everything.",
    durationMins: 7,
    spaceIds: ["secure-campus-branch"],
    products: ["Catalyst 9200", "ISE", "Catalyst Center"],
    addedAt: "2026-06-20",
  },
  {
    id: "guest-access-walkthru",
    title: "Guest access walk-thru",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Sponsor-driven guest Wi‑Fi with posture checks and automatic expiry — the story facilities and security both sign off on.",
    durationMins: 5,
    spaceIds: ["secure-campus-branch"],
    products: ["ISE", "Catalyst 9800", "Meraki MR"],
    addedAt: "2026-06-20",
  },
  {
    id: "secure-campus-branch-solution",
    title: "Secure campus and branch",
    type: "Solution",
    operationalType: "Instant",
    description:
      "One architecture for HQ, regional offices and retail edge — unified identity, segmentation and observability without re-architecting every site. " +
      "Follow a roaming executive, a branch POS system and a warehouse scanner as each gets the right access from Catalyst, Meraki and ISE working together. " +
      "Show how SD-WAN steers SaaS locally while sensitive traffic stays inspected, and how Catalyst Center gives operators one pane for firmware, templates and compliance across the estate.",
    durationMins: 30,
    spaceIds: ["secure-campus-branch"],
    products: ["Catalyst 9300", "Meraki MX", "ISE", "Catalyst Center"],
    addedAt: "2026-06-21",
  },
  {
    id: "catalyst-center-automation",
    title: "Catalyst Center automation",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Template-driven campus rollout — golden images, compliance checks and drift remediation before users notice.",
    durationMins: 38,
    spaceIds: ["secure-campus-branch"],
    products: ["Catalyst Center", "Catalyst 9300"],
    addedAt: "2026-06-19",
  },
  {
    id: "meraki-branch-stack",
    title: "Meraki branch stack",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "MX, MR and MS at the branch with centralized policy — failover, content filtering and VPN in one dashboard.",
    durationMins: 35,
    spaceIds: ["secure-campus-branch"],
    products: ["Meraki MX", "Meraki MR", "Meraki MS"],
    addedAt: "2026-06-20",
  },
  {
    id: "wireless-roaming-scale",
    title: "Wireless roaming at scale",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "802.11 roaming, RF optimization and client analytics across a multi-building campus without sticky clients.",
    durationMins: 40,
    spaceIds: ["secure-campus-branch"],
    products: ["Catalyst 9800", "Meraki MR"],
    addedAt: "2026-06-21",
  },
  {
    id: "sd-wan-failover",
    title: "SD-WAN failover deep dive",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Simulate dual-uplink loss at a branch and validate application steering, voice quality and security service chaining.",
    durationMins: 42,
    spaceIds: ["secure-campus-branch"],
    products: ["Meraki MX", "Catalyst SD-WAN Manager"],
    addedAt: "2026-06-21",
  },
  {
    id: "retail-edge-segmentation",
    title: "Retail edge segmentation",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Isolate POS, back-office and guest Wi‑Fi on the same compact branch stack — PCI-friendly without three physical networks.",
    durationMins: 36,
    spaceIds: ["secure-campus-branch"],
    products: ["Meraki MX", "ISE", "Catalyst 9200"],
    addedAt: "2026-06-22",
  },
  {
    id: "branch-rollout-lab",
    title: "Branch rollout lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: provision a greenfield branch with SD-WAN, wireless and ISE policies from templates your customer can reuse.",
    durationMins: 90,
    spaceIds: ["secure-campus-branch"],
    products: ["Meraki MX", "Meraki MR", "ISE"],
    addedAt: "2026-06-20",
  },
  {
    id: "campus-segmentation-cpoc",
    title: "Campus segmentation CPOC",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Customer proof: segment a live campus with SGTs, ISE and Catalyst switching — brownfield-friendly, no big-bang cutover.",
    durationMins: 180,
    spaceIds: ["secure-campus-branch"],
    products: ["Catalyst 9300", "ISE", "Catalyst Center"],
    addedAt: "2026-06-21",
  },
  {
    id: "guest-access-lab",
    title: "Guest access lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Build sponsor portals, sponsor approval flows and automatic guest teardown for a multi-site retail customer.",
    durationMins: 70,
    spaceIds: ["secure-campus-branch"],
    products: ["ISE", "Catalyst 9800"],
    addedAt: "2026-06-22",
  },

  // Secure Data Centre
  {
    id: "dc-quick-tour",
    title: "Data centre quick tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Compute, storage and fabric in five minutes — the lead-in before a full Secure Data Centre Solution session.",
    durationMins: 5,
    spaceIds: ["cisco-data-center"],
    products: ["UCS", "Nexus 9000", "Intersight"],
    addedAt: "2026-06-19",
  },
  {
    id: "ucs-compute-intro",
    title: "UCS compute intro",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Service profiles, stateless blades and firmware consistency without the manual spreadsheet tracking.",
    durationMins: 6,
    spaceIds: ["cisco-data-center"],
    products: ["UCS", "Intersight"],
    addedAt: "2026-06-19",
  },
  {
    id: "storage-fabric-intro",
    title: "Storage fabric intro",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Lossless Ethernet for storage and converged traffic — a quick tour before the deep dives on VPC and SAN.",
    durationMins: 7,
    spaceIds: ["cisco-data-center"],
    products: ["Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-20",
  },
  {
    id: "intersight-ops-tour",
    title: "Intersight ops tour",
    type: "Guided",
    operationalType: "Guided",
    description:
      "Fleet visibility, firmware orchestration and policy drift alerts across UCS and Nexus from one SaaS console.",
    durationMins: 8,
    spaceIds: ["cisco-data-center"],
    products: ["Intersight", "UCS", "Nexus 9000"],
    addedAt: "2026-06-20",
  },
  {
    id: "cisco-data-center-solution",
    title: "Modern secure data centre",
    type: "Solution",
    operationalType: "Instant",
    description:
      "End-to-end data centre as a programmable platform — compute, storage networking and automation aligned for cloud-scale operations. " +
      "Walk from bare-metal rack to workload-ready in one narrative: UCS service profiles, Nexus VPC fabric and Intersight keeping firmware and config consistent. " +
      "Show how ACI or Nexus-centric designs both fit the same operational model, and close with the business outcome — faster rollout, fewer snowflakes and audit-ready change control.",
    durationMins: 30,
    spaceIds: ["cisco-data-center"],
    products: ["UCS", "Nexus 9000", "Intersight", "Cloud ACI"],
    addedAt: "2026-06-21",
  },
  {
    id: "aci-policy-model",
    title: "ACI policy model",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Application-centric contracts, EPGs and service graphs — how policy follows the workload, not the subnet.",
    durationMins: 45,
    spaceIds: ["cisco-data-center"],
    products: ["Cloud ACI", "Nexus 9000"],
    addedAt: "2026-06-19",
  },
  {
    id: "ucs-service-profiles",
    title: "UCS service profiles",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Stateless compute, boot policies and SAN connectivity in one profile — replace hardware without re-installing OS stacks.",
    durationMins: 40,
    spaceIds: ["cisco-data-center"],
    products: ["UCS", "Intersight"],
    addedAt: "2026-06-20",
  },
  {
    id: "nexus-vpc-design",
    title: "Nexus vPC design",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Dual-homed servers, peer-link sizing and failure scenarios — the reference architecture your DC architects expect.",
    durationMins: 42,
    spaceIds: ["cisco-data-center"],
    products: ["Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-21",
  },
  {
    id: "intersight-fleet-ops",
    title: "Intersight fleet operations",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Firmware baselines, server persona assignment and drift remediation across hundreds of blades without weekend marathons.",
    durationMins: 38,
    spaceIds: ["cisco-data-center"],
    products: ["Intersight", "UCS"],
    addedAt: "2026-06-21",
  },
  {
    id: "san-fc-integration",
    title: "SAN & FC integration",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Fibre Channel, FCoE and NVMe-oF paths on Nexus — when to converge and when to keep storage traffic dedicated.",
    durationMins: 44,
    spaceIds: ["cisco-data-center"],
    products: ["Nexus 9000", "UCS"],
    addedAt: "2026-06-22",
  },
  {
    id: "greenfield-dc-lab",
    title: "Greenfield DC lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: stand up a leaf-spine fabric, UCS domain and Intersight inventory for a reference data centre pod.",
    durationMins: 120,
    spaceIds: ["cisco-data-center"],
    products: ["Nexus 9300", "UCS", "Intersight"],
    addedAt: "2026-06-20",
  },
  {
    id: "aci-tenant-lab",
    title: "ACI tenant lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Build tenants, contracts and L4–L7 service graphs in ACI — the workshop app teams ask for before production cutover.",
    durationMins: 85,
    spaceIds: ["cisco-data-center"],
    products: ["Cloud ACI", "Nexus 9000"],
    addedAt: "2026-06-21",
  },
  {
    id: "ucs-cpoc",
    title: "UCS CPOC",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Multi-day customer proof: deploy UCS blades, service profiles and firmware policy with Intersight orchestration.",
    durationMins: 200,
    spaceIds: ["cisco-data-center"],
    products: ["UCS", "Intersight", "Nexus 9000"],
    addedAt: "2026-06-22",
  },

  ...newSpaceDemos,

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

const motionsById = new Map(gtmMotions.map((m) => [m.id, m]));
const spacesById = new Map(solutionSpaces.map((s) => [s.id, s]));
const demosById = new Map(demos.map((d) => [d.id, d]));

export function motionName(id: GtmMotionId): string {
  return motionsById.get(id)?.name ?? id;
}

/** GTM motion pill accent — shared across search and Space headers. */
export const gtmMotionColor: Record<GtmMotionId, string> = {
  "ai-ready-dc": "var(--orange)",
  "future-proof-workplaces": "var(--orange)",
  "digital-resilience": "var(--orange)",
};

export function spaceById(id: string): SolutionSpace | undefined {
  return spacesById.get(id);
}

export function demoById(id: string): Demo | undefined {
  return demosById.get(id);
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
