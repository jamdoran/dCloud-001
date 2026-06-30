import type { SpaceAsset } from "@/lib/types";

/**
 * Supporting videos and documents per Solution Space — file-based seed data.
 * Videos link to Cisco Cloud Control; documents link to Cisco What's new.
 */

const DOCUMENT_HREF = "https://www.cisco.com/site/us/en/about/whats-new.html";
const VIDEO_HREF =
  "https://www.cisco.com/site/us/en/solutions/artificial-intelligence/agentic-ops/cisco-cloud-control/index.html";

export const spaceAssets: SpaceAsset[] = [
  // Secure AI Factory
  {
    id: "saf-architecture-overview",
    spaceId: "secure-ai-factory",
    kind: "video",
    title: "AI factory architecture overview",
    description: "How GPU fabric, networking and guardrails fit together.",
    href: VIDEO_HREF,
  },
  {
    id: "saf-customer-story",
    spaceId: "secure-ai-factory",
    kind: "video",
    title: "Customer story — standing up an AI cluster",
    href: VIDEO_HREF,
  },
  {
    id: "saf-solution-brief",
    spaceId: "secure-ai-factory",
    kind: "document",
    title: "Secure AI Factory solution brief",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },
  {
    id: "saf-reference-architecture",
    spaceId: "secure-ai-factory",
    kind: "document",
    title: "Reference architecture guide",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Secure Networking
  {
    id: "sn-zero-trust-video",
    spaceId: "secure-networking",
    kind: "video",
    title: "Zero-trust networking in practice",
    href: VIDEO_HREF,
  },
  {
    id: "sn-sase-overview",
    spaceId: "secure-networking",
    kind: "video",
    title: "SASE and secure access overview",
    href: VIDEO_HREF,
  },
  {
    id: "sn-design-guide",
    spaceId: "secure-networking",
    kind: "document",
    title: "Campus and WAN design guide",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Workplace Experiences
  {
    id: "we-hybrid-work",
    spaceId: "workplace-experiences",
    kind: "video",
    title: "Hybrid work experience walkthrough",
    href: VIDEO_HREF,
  },
  {
    id: "we-collab-stack",
    spaceId: "workplace-experiences",
    kind: "document",
    title: "Collaboration stack overview",
    href: DOCUMENT_HREF,
    fileType: "PPTX",
  },
  {
    id: "we-room-design",
    spaceId: "workplace-experiences",
    kind: "document",
    title: "Meeting room design checklist",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Agentic Security Architecture
  {
    id: "asa-agentic-demo",
    spaceId: "agentic-security-architecture",
    kind: "video",
    title: "Agentic security in action",
    href: VIDEO_HREF,
  },
  {
    id: "asa-xdr-brief",
    spaceId: "agentic-security-architecture",
    kind: "document",
    title: "XDR and AI-assisted response brief",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },
  {
    id: "asa-soc-playbook",
    spaceId: "agentic-security-architecture",
    kind: "document",
    title: "SOC automation playbook",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Digital Resilience Assurance
  {
    id: "dra-observability",
    spaceId: "digital-resilience-assurance",
    kind: "video",
    title: "Continuous assurance and observability",
    href: VIDEO_HREF,
  },
  {
    id: "dra-sla-guide",
    spaceId: "digital-resilience-assurance",
    kind: "document",
    title: "SLA and resilience planning guide",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Unified Forwarding Architecture
  {
    id: "ufa-fabric-video",
    spaceId: "unified-forwarding-architecture",
    kind: "video",
    title: "Unified forwarding fabric explained",
    href: VIDEO_HREF,
  },
  {
    id: "ufa-design-doc",
    spaceId: "unified-forwarding-architecture",
    kind: "document",
    title: "Forwarding architecture design document",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },
  {
    id: "ufa-migration",
    spaceId: "unified-forwarding-architecture",
    kind: "document",
    title: "Migration and coexistence guide",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Cost-Effective Network Stack
  {
    id: "cens-tco-video",
    spaceId: "cost-effective-network-stack",
    kind: "video",
    title: "TCO and right-sizing walkthrough",
    href: VIDEO_HREF,
  },
  {
    id: "cens-stack-brief",
    spaceId: "cost-effective-network-stack",
    kind: "document",
    title: "Cost-effective stack solution brief",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Secure Campus & Branch
  {
    id: "scb-campus-video",
    spaceId: "secure-campus-branch",
    kind: "video",
    title: "Campus and branch security overview",
    href: VIDEO_HREF,
  },
  {
    id: "scb-branch-video",
    spaceId: "secure-campus-branch",
    kind: "video",
    title: "Branch connectivity deep dive",
    href: VIDEO_HREF,
  },
  {
    id: "scb-design-guide",
    spaceId: "secure-campus-branch",
    kind: "document",
    title: "Campus and branch design guide",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },

  // Secure Data Centre
  {
    id: "cdc-platform-video",
    spaceId: "cisco-data-center",
    kind: "video",
    title: "Data centre platform overview",
    href: VIDEO_HREF,
  },
  {
    id: "cdc-nexus-brief",
    spaceId: "cisco-data-center",
    kind: "document",
    title: "Nexus and compute integration brief",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },
  {
    id: "cdc-automation",
    spaceId: "cisco-data-center",
    kind: "document",
    title: "Data centre automation white paper",
    href: DOCUMENT_HREF,
    fileType: "PDF",
  },
];

export function assetsForSpace(spaceId: string): SpaceAsset[] {
  return spaceAssets.filter((a) => a.spaceId === spaceId);
}
