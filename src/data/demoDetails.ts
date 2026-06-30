import type { Demo, DemoDetail, DemoTagGroup } from "@/lib/types";
import { demoCategory } from "@/lib/demoLabels";

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Product → BE category for tag generation. */
const PRODUCT_CATEGORIES: Record<string, string> = {
  UCS: "Cisco Compute",
  Intersight: "Cisco Compute",
  "Nexus 9000": "Enterprise Networking",
  "Nexus 9300": "Enterprise Networking",
  "Catalyst 9300": "Enterprise Switching",
  "Catalyst 9200": "Enterprise Switching",
  ISE: "Security",
  Meraki: "Wireless",
  "Secure Firewall": "Security",
  Splunk: "Splunk",
  ThousandEyes: "Network Assurance",
  Webex: "Collaboration",
  NVIDIA: "AI",
  ACI: "Enterprise Networking",
  DNA: "Enterprise Networking",
  "AI POD": "AI",
};

const DETAIL_OVERRIDES: Partial<Record<string, Partial<DemoDetail>>> = {
  "sovereign-ai-cluster": {
    categories: ["AI", "Security", "Enterprise Networking", "Cisco Compute"],
    tagGroups: [
      { category: "AI", tags: ["GPU fabric", "Model serving", "Training & inference"] },
      { category: "Security", tags: ["Workload isolation", "Policy guardrails"] },
      { category: "Enterprise Networking", tags: ["AI-ready leaf-spine", "Lossless fabric"] },
      { category: "Cisco Compute", tags: ["UCS for AI", "Intersight automation"] },
    ],
    scriptLinks: [
      {
        label: "SE runbook — Secure AI Factory with NVIDIA",
        href: "https://www.cisco.com",
        fileType: "PDF",
      },
      {
        label: "Demo script — joint Cisco & NVIDIA storyline",
        href: "https://www.cisco.com",
        fileType: "DOCX",
      },
      {
        label: "Customer-facing talk track",
        href: "https://www.cisco.com",
        fileType: "PDF",
      },
    ],
    launchCount: 2847,
    avgRating: 4.6,
    feedbackCount: 42,
  },
  "zero-trust-campus": {
    categories: ["Security", "Enterprise Switching", "Wireless", "Collaboration"],
    tagGroups: [
      { category: "Security", tags: ["Zero trust", "ISE policy", "Secure Access"] },
      { category: "Enterprise Switching", tags: ["Campus segmentation", "Catalyst switching"] },
      { category: "Wireless", tags: ["Meraki & Catalyst Wi‑Fi"] },
    ],
    scriptLinks: [
      {
        label: "Demo script — Zero-trust campus",
        href: "https://www.cisco.com",
        fileType: "PDF",
      },
      {
        label: "SE setup guide — ISE & Catalyst",
        href: "https://www.cisco.com",
        fileType: "PDF",
      },
    ],
    launchCount: 4120,
    avgRating: 4.4,
    feedbackCount: 38,
  },
  "gpu-fabric-deep-dive": {
    categories: ["AI", "Enterprise Networking", "Observability"],
    tagGroups: [
      { category: "AI", tags: ["GPU scheduling", "East-west traffic"] },
      { category: "Enterprise Networking", tags: ["PFC/ECN", "Leaf-spine sizing"] },
      { category: "Observability", tags: ["Buffer telemetry", "Congestion signals"] },
    ],
    launchCount: 1563,
    avgRating: 4.7,
    feedbackCount: 19,
  },
};

function categoriesForDemo(demo: Demo): string[] {
  const fromProducts = [
    ...new Set(
      demo.products
        .map((p) => PRODUCT_CATEGORIES[p])
        .filter((c): c is string => Boolean(c)),
    ),
  ];
  if (fromProducts.length > 0) return fromProducts.slice(0, 5);
  if (demo.type === "Lab") return ["Security", "Enterprise Networking"];
  return ["Enterprise Networking", "Security"];
}

function tagGroupsForDemo(demo: Demo, categories: string[]): DemoTagGroup[] {
  return categories.slice(0, 4).map((category, i) => ({
    category,
    tags: demo.products.slice(i * 2, i * 2 + 2).length
      ? demo.products.slice(i * 2, i * 2 + 2)
      : [`${category} use case`],
  }));
}

function defaultScriptLinks(demo: Demo): DemoDetail["scriptLinks"] {
  const cat = demoCategory(demo);
  return [
    {
      label: `Demo script — ${demo.title}`,
      href: "https://www.cisco.com",
      fileType: "PDF",
    },
    {
      label: `SE instructions — ${cat.toLowerCase()}`,
      href: "https://www.cisco.com",
      fileType: "PDF",
    },
  ];
}

/** Resolve full modal detail for a demo — merges seed overrides with generated defaults. */
export function getDemoDetail(demo: Demo): DemoDetail {
  const h = hashId(demo.id);
  const override = DETAIL_OVERRIDES[demo.id];
  const categories = override?.categories ?? categoriesForDemo(demo);

  return {
    publishedAt: override?.publishedAt ?? demo.addedAt,
    scriptLinks: override?.scriptLinks ?? defaultScriptLinks(demo),
    categories,
    tagGroups: override?.tagGroups ?? tagGroupsForDemo(demo, categories),
    launchCount: override?.launchCount ?? 800 + (h % 9200),
    avgRating: override?.avgRating ?? 3.8 + (h % 12) / 10,
    feedbackCount: override?.feedbackCount ?? h % 65,
  };
}
