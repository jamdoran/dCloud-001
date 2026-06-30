import type { CommunityDemo, Demo } from "@/lib/types";
import { isRecentlyPublished } from "@/lib/demoFreshness";
import { communityDemosBulk } from "./communityCatalogBulk";

/**
 * Community Content catalog — seller-contributed demos with no Solution Space
 * linkage. Entirely separate seed set from the GTM catalog in catalog.ts.
 */

export const COMMUNITY_TOPICS = [
  "Security",
  "Collaboration",
  "Networking",
  "Compute",
  "Observability",
  "Partner",
  "Competitive",
  "Enablement",
  "Regional",
] as const;

export type CommunityTopic = (typeof COMMUNITY_TOPICS)[number];

export const communityDemos: CommunityDemo[] = [
  {
    id: "comm-mss-sse-bridge",
    title: "MSS to SSE — field bridge demo",
    type: "Guided",
    operationalType: "Guided",
    description:
      "A 20-minute guided walkthrough that connects legacy MSS talking points to Cisco SSE outcomes. Built for AEs who need a credible migration story without opening the full Secure Networking Space.",
    durationMins: 20,
    products: ["Secure Access", "Umbrella", "Meraki MX"],
    addedAt: "2026-06-18",
    updatedAt: "2026-06-20",
    contributor: "Jordan Reyes · Global Security SE",
    topics: ["Security", "Enablement"],
    rating: 4.5,
  },
  {
    id: "comm-meraki-aruba-takeout",
    title: "Meraki vs Aruba — competitive teardown",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Side-by-side campus and branch comparison with live Meraki dashboard moments and objection handlers. Contributed after Cisco Live — tuned for partner-led competitive situations.",
    durationMins: 35,
    products: ["Meraki", "Catalyst 9300", "ThousandEyes"],
    addedAt: "2026-06-12",
    contributor: "Priya Nair · Partner SE, EMEA",
    topics: ["Competitive", "Networking", "Partner"],
    rating: 4.7,
  },
  {
    id: "comm-splunk-15min-win",
    title: "Splunk — 15-minute security quick win",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Minimal Splunk Enterprise Security storyline: ingest, notable event, investigation, response. Designed to land in a first meeting when the customer already runs Splunk but hasn't seen Cisco integration.",
    durationMins: 15,
    products: ["Splunk", "Secure Firewall", "ISE"],
    addedAt: "2026-06-10",
    contributor: "Marcus Chen · Splunk Specialist",
    topics: ["Security", "Observability"],
    rating: 4.4,
  },
  {
    id: "comm-webex-calling-pov",
    title: "Webex Calling POV — business buyer edition",
    type: "Solution",
    operationalType: "Scheduled",
    description:
      "Story-led Webex Calling proof-of-value for AEs: hybrid work, PSTN, contact centre handoff and IT admin simplicity. No deep technical rabbit holes — outcomes first.",
    durationMins: 25,
    products: ["Webex", "Webex Contact Center"],
    addedAt: "2026-06-05",
    updatedAt: "2026-06-08",
    contributor: "Elena Voss · Collaboration AE",
    topics: ["Collaboration", "Enablement"],
    rating: 4.6,
  },
  {
    id: "comm-wifi7-field-kit",
    title: "Wi‑Fi 7 field kit — Catalyst demo in a box",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on lab script for running Catalyst Wi‑Fi 7 in a customer briefing centre or trunk demo. Includes setup checklist, failover scenario and 'wow' throughput moment.",
    durationMins: 45,
    products: ["Catalyst 9100", "Catalyst 9800", "DNA Center"],
    addedAt: "2026-05-28",
    contributor: "Sam Okonkwo · Wireless SE",
    topics: ["Networking", "Enablement"],
    rating: 4.3,
  },
  {
    id: "comm-ise-guest-simplified",
    title: "ISE guest access — simplified storyline",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Strip ISE guest flows down to three screens and one policy story. Popular with new SEs who need a repeatable campus security intro without the full Zero Trust Space journey.",
    durationMins: 18,
    products: ["ISE", "Catalyst 9200", "Meraki MR"],
    addedAt: "2026-05-22",
    contributor: "Alex Turner · Campus SE, Americas",
    topics: ["Security", "Networking"],
    rating: 4.2,
  },
  {
    id: "comm-thousandeyes-rca",
    title: "ThousandEyes RCA — five-minute outage story",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Pinpoint an ISP brownout, prove it isn't the firewall, and show the fix — all in under five minutes of live ThousandEyes. A field favourite for resilience conversations.",
    durationMins: 12,
    products: ["ThousandEyes", "Secure Firewall"],
    addedAt: "2026-05-15",
    contributor: "Rina Patel · Observability SE",
    topics: ["Observability", "Networking"],
    rating: 4.8,
  },
  {
    id: "comm-firewall-audit-sprint",
    title: "Firewall rule audit sprint",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Lab-style demo that walks through policy hygiene on Secure Firewall — unused rules, shadowed permits and compliance export. Contributed by a financial services SE guild.",
    durationMins: 40,
    products: ["Secure Firewall", "Secure Workload"],
    addedAt: "2026-05-08",
    contributor: "Financial Services SE Guild",
    topics: ["Security", "Regional"],
    rating: 4.1,
  },
  {
    id: "comm-ucs-blade-101",
    title: "UCS blade basics — new hire enablement",
    type: "Guided",
    operationalType: "Guided",
    description:
      "Onboarding-friendly UCS walkthrough: service profiles, firmware, Intersight hook-up and one live workload move. Not tied to any GTM Space — pure compute fundamentals.",
    durationMins: 30,
    products: ["UCS", "Intersight"],
    addedAt: "2026-04-30",
    contributor: "Compute Enablement Team",
    topics: ["Compute", "Enablement"],
    rating: 4.0,
  },
  {
    id: "comm-ai-pod-sizing",
    title: "AI pod sizing — whiteboard to bill of materials",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Community-contributed sizing flow for a mid-size AI pod: GPU count, fabric oversubscription, power and cooling talking points. Uses NVIDIA + Nexus without the full Secure AI Factory journey.",
    durationMins: 28,
    products: ["NVIDIA", "Nexus 9300", "UCS"],
    addedAt: "2026-04-22",
    contributor: "Tomás Herrera · AI Infrastructure SE",
    topics: ["Compute", "Networking"],
    rating: 4.5,
  },
  {
    id: "comm-partner-margin-story",
    title: "Partner margin story — services attach",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Partner-facing guided demo on recurring services attach: Smart Net Total Care, lifecycle services and CX motions. Built for partner sellers, not end-customer POVs.",
    durationMins: 22,
    products: ["Intersight", "ThousandEyes", "Webex"],
    addedAt: "2026-04-14",
    contributor: "Partner Success · Global",
    topics: ["Partner", "Enablement"],
    rating: 4.2,
  },
  {
    id: "comm-apac-banking-ref",
    title: "APAC banking reference architecture",
    type: "Solution",
    operationalType: "Scheduled",
    description:
      "Regional reference story for a tier‑2 bank: segmented campus, hybrid cloud connectivity and Splunk SOC integration. Anonymised customer patterns from APAC field wins.",
    durationMins: 32,
    products: ["ACI", "Secure Firewall", "Splunk", "ISE"],
    addedAt: "2026-04-05",
    contributor: "APAC Financial SE Council",
    topics: ["Regional", "Security", "Networking"],
    rating: 4.6,
  },
  {
    id: "comm-demo-env-reset",
    title: "Demo environment reset — SE cheat sheet",
    type: "Lab",
    operationalType: "Instant",
    description:
      "Practical lab that documents how to reset a shared dCloud pod between customer meetings. Includes validation steps and a five-minute smoke test — meta, but saves hours in the field.",
    durationMins: 15,
    products: ["Intersight", "DNA Center"],
    addedAt: "2026-03-28",
    contributor: "Field Demo Ops · dCloud community",
    topics: ["Enablement"],
    rating: 4.9,
  },
  {
    id: "comm-sdwan-three-slide",
    title: "SD‑WAN in three slides (+ one live screen)",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Ultra-short SD‑WAN storyline for executive briefings: business case, architecture sketch, one vManage policy change. No Solution Space context required.",
    durationMins: 10,
    products: ["Catalyst 8000", "vManage", "ThousandEyes"],
    addedAt: "2026-03-20",
    contributor: "Morgan Blake · Enterprise Networking AE",
    topics: ["Networking", "Enablement"],
    rating: 4.3,
  },
  {
    id: "comm-collab-room-kit",
    title: "Room Kit setup — customer briefing centre",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Step-by-step Room Kit Pro install for briefing centres: mounting, Webex Device onboarding, calendar integration and a sample join-from-laptop failover.",
    durationMins: 50,
    products: ["Webex Room Kit Pro", "Webex Control Hub"],
    addedAt: "2026-03-12",
    contributor: "Workplace Experiences Champions",
    topics: ["Collaboration", "Enablement"],
    rating: 4.4,
  },
  {
    id: "comm-observability-bundle",
    title: "Observability bundle — AppDynamics + ThousandEyes",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Connect application traces to path visibility in one storyline. Community pack for cross-sell between observability SKUs without opening Digital Resilience Assurance.",
    durationMins: 26,
    products: ["ThousandEyes", "AppDynamics"],
    addedAt: "2026-03-05",
    contributor: "Observability Guild · AMER",
    topics: ["Observability"],
    rating: 4.5,
  },
  {
    id: "comm-zero-trust-elevator",
    title: "Zero trust elevator pitch — 90 seconds",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Memorisable 90-second zero trust pitch with one optional live ISE screen. Perfect for lobby conversations and podcast-style enablement sessions.",
    durationMins: 5,
    products: ["ISE", "Secure Access"],
    addedAt: "2026-02-28",
    contributor: "Security Storytellers · EMEA",
    topics: ["Security", "Enablement"],
    rating: 4.7,
  },
  {
    id: "comm-hyperfabric-intro",
    title: "Hyperfabric intro — field-first narrative",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Early community narrative for Cisco Hyperfabric: AI cluster networking, operational model and where it sits vs classic leaf-spine. Independent of the GTM Secure AI Factory packaging.",
    durationMins: 24,
    products: ["Nexus 9000", "NVIDIA", "Intersight"],
    addedAt: "2026-02-18",
    contributor: "AI Field Advisory Board",
    topics: ["Networking", "Compute"],
    rating: 4.4,
  },
  {
    id: "comm-sdwan-vmanage-templates",
    title: "vManage policy templates — field playbook",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Reusable vManage feature and device templates for rolling SD‑WAN to dozens of branches. Community script for SEs who need a repeatable first meeting without the full Secure Campus journey.",
    durationMins: 18,
    products: ["vManage", "Catalyst 8000", "Meraki MX"],
    addedAt: "2026-06-24",
    contributor: "Branch SE Guild · AMER",
    topics: ["Networking", "Enablement"],
    rating: 4.5,
  },
  {
    id: "comm-sdwan-branch-failover",
    title: "SD‑WAN branch failover — live proof",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Pull the primary circuit, watch sub-second failover and app-aware path selection on vManage dashboards. A field favourite when customers doubt SD‑WAN resilience vs MPLS.",
    durationMins: 22,
    products: ["Catalyst 8000", "vManage", "ThousandEyes"],
    addedAt: "2026-06-23",
    contributor: "Morgan Blake · Enterprise Networking AE",
    topics: ["Networking"],
    rating: 4.7,
  },
  {
    id: "comm-sdwan-thousandeyes-path",
    title: "SD‑WAN + ThousandEyes path intelligence",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "Correlate vManage tunnel health with ThousandEyes path metrics — prove whether an app slowdown is WAN, ISP or local LAN. Contributed after a retail customer win.",
    durationMins: 28,
    products: ["vManage", "ThousandEyes", "Catalyst 8000"],
    addedAt: "2026-06-22",
    contributor: "Rina Patel · Observability SE",
    topics: ["Networking", "Observability"],
    rating: 4.6,
  },
  {
    id: "comm-sdwan-mpls-migration",
    title: "MPLS to SD‑WAN migration story",
    type: "Solution",
    operationalType: "Scheduled",
    description:
      "Phased migration narrative: dual-homed branches, policy parity with legacy MPLS and cost-out timeline. Business-outcome led for AEs selling WAN refresh without a six-month POV.",
    durationMins: 30,
    products: ["Catalyst 8000", "vManage", "Secure Firewall"],
    addedAt: "2026-06-21",
    updatedAt: "2026-06-24",
    contributor: "WAN Transformation Council",
    topics: ["Networking", "Partner"],
    rating: 4.4,
  },
  {
    id: "comm-sdwan-cpoc-lab",
    title: "SD‑WAN branch CPOC lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on lab: onboard two branch routers, apply templates, simulate link failure and export a customer-ready runbook. Designed for briefing centres and partner enablement weeks.",
    durationMins: 90,
    products: ["Catalyst 8000", "vManage", "Meraki MX"],
    addedAt: "2026-06-20",
    contributor: "Field Demo Ops · dCloud community",
    topics: ["Networking", "Enablement"],
    rating: 4.3,
  },
  {
    id: "comm-nvidia-gpu-field-tour",
    title: "NVIDIA GPU cluster — five-minute field tour",
    type: "Guided",
    operationalType: "Instant",
    description:
      "Quick guided path across GPU inventory, job queue and fabric utilisation on a live NVIDIA cluster. Opens AI conversations without the full Secure AI Factory or Full Stack AI Space.",
    durationMins: 8,
    products: ["NVIDIA", "UCS", "Intersight"],
    addedAt: "2026-06-24",
    contributor: "Tomás Herrera · AI Infrastructure SE",
    topics: ["Compute", "Enablement"],
    rating: 4.6,
  },
  {
    id: "comm-nvidia-inference-ucs",
    title: "NVIDIA inference on UCS — POV storyline",
    type: "Solution",
    operationalType: "Instant",
    description:
      "Production inference on validated UCS + NVIDIA: model serving, autoscaling and operator visibility. Community POV script for customers past the training hype who need a deployable inference stack.",
    durationMins: 26,
    products: ["NVIDIA", "UCS", "Intersight"],
    addedAt: "2026-06-23",
    contributor: "AI Field Advisory Board",
    topics: ["Compute"],
    rating: 4.5,
  },
  {
    id: "comm-nvidia-nvlink-deep-dive",
    title: "NVLink & GPU fabric topology",
    type: "Deep-Dive",
    operationalType: "Scheduled",
    description:
      "Inside NVLink domains, NIC placement and east-west GPU traffic on Nexus — for architects who need proof the network won't bottleneck multi-node training.",
    durationMins: 40,
    products: ["NVIDIA", "Nexus 9000", "Nexus 9300"],
    addedAt: "2026-06-22",
    contributor: "GPU Fabric Working Group",
    topics: ["Compute", "Networking"],
    rating: 4.8,
  },
  {
    id: "comm-nvidia-ai-observability",
    title: "NVIDIA workload observability with Splunk",
    type: "Deep-Dive",
    operationalType: "Instant",
    description:
      "GPU utilisation, thermal headroom and job failure signals in Splunk dashboards — the ops story platform teams ask for after the first AI cluster goes live.",
    durationMins: 32,
    products: ["NVIDIA", "Splunk", "Intersight"],
    addedAt: "2026-06-21",
    contributor: "Marcus Chen · Splunk Specialist",
    topics: ["Compute", "Observability"],
    rating: 4.4,
  },
  {
    id: "comm-nvidia-training-lab",
    title: "NVIDIA training cluster lab",
    type: "Lab",
    operationalType: "Scheduled",
    description:
      "Hands-on: submit a distributed training job, monitor GPU fabric telemetry and checkpoint a model. Contributed for SE workshops and NVIDIA partner bootcamps.",
    durationMins: 110,
    products: ["NVIDIA", "UCS", "Nexus 9000"],
    addedAt: "2026-06-20",
    contributor: "Compute Enablement Team",
    topics: ["Compute", "Enablement"],
    rating: 4.7,
  },
  ...communityDemosBulk,
];

export function communityDemoById(id: string): CommunityDemo | undefined {
  return communityDemos.find((d) => d.id === id);
}

/** Map a community demo to the shared Demo shape for modal reuse. */
export function communityDemoAsDemo(demo: CommunityDemo): Demo {
  return {
    id: demo.id,
    title: demo.title,
    type: demo.type,
    operationalType: demo.operationalType,
    description: demo.description,
    durationMins: demo.durationMins,
    spaceIds: [],
    products: demo.products,
    addedAt: demo.addedAt,
    updatedAt: demo.updatedAt,
  };
}

export function isCommunityDemoNew(demo: CommunityDemo): boolean {
  return isRecentlyPublished(demo.addedAt);
}

/** Newest community demos for the highlight strip. */
export function communityNewDemos(limit = 4): CommunityDemo[] {
  return [...communityDemos]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, limit);
}

/** Flat browse list — newest first. */
export function communityDemosSorted(): CommunityDemo[] {
  return [...communityDemos].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}
