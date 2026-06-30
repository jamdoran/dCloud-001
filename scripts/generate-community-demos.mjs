/**
 * One-off generator for community catalog bulk seed data.
 * Run: node scripts/generate-community-demos.mjs
 */

import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET = 162; // 18 hand-picked + 162 = 180 (10×)

const types = ["Solution", "Deep-Dive", "Guided", "Lab"];
const operational = ["Instant", "Scheduled", "Guided"];

const topicPairs = [
  ["Security", "Enablement"],
  ["Collaboration", "Enablement"],
  ["Networking", "Partner"],
  ["Compute", "Networking"],
  ["Observability", "Security"],
  ["Competitive", "Networking"],
  ["Regional", "Security"],
  ["Partner", "Enablement"],
  ["Security", "Networking"],
  ["Collaboration", "Regional"],
  ["Observability", "Networking"],
  ["Compute", "Enablement"],
  ["Security", "Competitive"],
  ["Networking", "Enablement"],
  ["Collaboration", "Partner"],
  ["Regional", "Networking"],
  ["Observability", "Enablement"],
  ["Compute", "Regional"],
];

const contributors = [
  "Jordan Reyes · Global Security SE",
  "Priya Nair · Partner SE, EMEA",
  "Marcus Chen · Splunk Specialist",
  "Elena Voss · Collaboration AE",
  "Sam Okonkwo · Wireless SE",
  "Alex Turner · Campus SE, Americas",
  "Rina Patel · Observability SE",
  "Financial Services SE Guild",
  "Compute Enablement Team",
  "Tomás Herrera · AI Infrastructure SE",
  "Partner Success · Global",
  "APAC Financial SE Council",
  "Field Demo Ops · dCloud community",
  "Morgan Blake · Enterprise Networking AE",
  "Workplace Experiences Champions",
  "Observability Guild · AMER",
  "Security Storytellers · EMEA",
  "AI Field Advisory Board",
  "LATAM SE Collective",
  "Public Sector Demo Guild",
  "Healthcare SE Council",
  "Retail & Hospitality Champions",
  "Service Provider SE Forum",
  "CX Specialist Network",
  "Campus & Branch Guild · APJC",
  "Data Centre Field Advisors",
  "Splunk Community SEs",
  "Meraki Master SEs",
  "New Hire Demo Academy",
  "Executive Briefing Centre Team",
];

const productSets = [
  ["Secure Firewall", "ISE"],
  ["Meraki", "Umbrella"],
  ["Webex", "Webex Contact Center"],
  ["Catalyst 9300", "DNA Center"],
  ["ThousandEyes", "AppDynamics"],
  ["Splunk", "Secure Workload"],
  ["UCS", "Intersight"],
  ["Nexus 9300", "ACI"],
  ["Secure Access", "Duo"],
  ["Catalyst 9100", "Catalyst 9800"],
  ["NVIDIA", "Nexus 9000"],
  ["Webex Room Kit Pro", "Webex Control Hub"],
  ["vManage", "Catalyst 8000"],
  ["Meraki MR", "Meraki MX"],
  ["Secure Firewall", "ThousandEyes"],
  ["ISE", "Catalyst 9200"],
  ["Intersight", "UCS"],
  ["Splunk", "Secure Firewall", "ISE"],
  ["Webex", "ThousandEyes"],
  ["ACI", "Nexus 9300", "Intersight"],
];

const titleStems = [
  "Field playbook",
  "Customer win replay",
  "Objection handler pack",
  "Briefing centre script",
  "Partner enablement walkthrough",
  "Regional reference story",
  "Competitive battlecard demo",
  "Executive storyline",
  "Hands-on lab sprint",
  "Quick technical win",
  "POV accelerator",
  "SE cheat sheet",
  "Industry vertical snapshot",
  "Migration bridge narrative",
  "Day-in-the-life scenario",
  "Troubleshooting clinic",
  "Architecture whiteboard",
  "Services attach storyline",
  "Podcast-style intro",
  "Show-floor favourite",
  "Anonymised customer pattern",
  "Cross-sell connector",
  "New hire essentials",
  "Five-minute wow moment",
  "Workshop-in-a-box",
  "Brownfield retrofit story",
  "Greenfield landing zone",
  "Compliance talking points",
  "ROI calculator walkthrough",
  "Live troubleshooting replay",
];

const subjectStems = [
  "zero trust campus refresh",
  "SSE consolidation",
  "Wi‑Fi 7 upgrade path",
  "Splunk SOC integration",
  "Webex Calling migration",
  "SD‑WAN branch rollout",
  "AI inference cluster sizing",
  "UCS firmware hygiene",
  "Meraki dashboard deep dive",
  "ThousandEyes outage proof",
  "ISE guest simplification",
  "firewall policy audit",
  "hybrid work room standard",
  "contact centre deflection",
  "observability cross-sell",
  "secure remote access",
  "data centre leaf-spine refresh",
  "partner margin conversation",
  "MSSP transition story",
  "OT segmentation basics",
  "cloud interconnect resilience",
  "AppDynamics business transaction",
  "Intersight day-2 ops",
  "Nexus ACI policy model",
  "Duo step-up authentication",
  "Secure Workload micro-segmentation",
  "campus refresh for universities",
  "retail POS resilience",
  "healthcare clinician mobility",
  "public sector IL5 patterns",
  "service provider 5G edge",
  "manufacturing plant floor Wi‑Fi",
  "financial trading floor latency",
  "energy sector remote sites",
  "media live event networking",
  "legal firm confidentiality controls",
  "hospitality guest Wi‑Fi",
  "logistics warehouse scanning",
  "automotive connected factory",
  "insurance claims centre uptime",
];

function pick(arr, i) {
  return arr[i % arr.length];
}

function dateForIndex(i) {
  const start = new Date("2025-06-01");
  const dayOffset = Math.floor((i * 17) % 390);
  const d = new Date(start);
  d.setDate(d.getDate() + dayOffset);
  return d.toISOString().slice(0, 10);
}

function ratingForIndex(i) {
  return Math.round((3.8 + (i % 12) * 0.08) * 10) / 10;
}

const demos = [];

for (let i = 0; i < TARGET; i++) {
  const type = pick(types, i + 3);
  const op = type === "Lab" ? "Scheduled" : type === "Guided" ? pick(["Guided", "Instant"], i) : pick(operational, i);
  const titleStem = pick(titleStems, i);
  const subject = pick(subjectStems, i + 7);
  const title = `${titleStem} — ${subject}`;
  const id = `comm-gen-${String(i + 1).padStart(3, "0")}`;
  const products = productSets[i % productSets.length];
  const topics = topicPairs[i % topicPairs.length];
  const contributor = pick(contributors, i + 11);
  const addedAt = dateForIndex(i);
  const durationMins = [8, 12, 15, 18, 22, 25, 30, 35, 40, 45, 50][i % 11];
  const desc = `Community-contributed ${type.toLowerCase()} focused on ${subject}. A seller-built asset for ${topics.join(" and ").toLowerCase()} conversations — standalone content outside the GTM Solution Space catalog. Includes live moments with ${products.slice(0, 2).join(" and ")}.`;

  demos.push({
    id,
    title,
    type,
    operationalType: op,
    description: desc,
    durationMins,
    products,
    addedAt,
    ...(i % 5 === 0 ? { updatedAt: dateForIndex(i + 2) } : {}),
    contributor,
    topics,
    rating: ratingForIndex(i),
  });
}

const lines = demos.map((d) => {
  const updated = d.updatedAt ? `\n    updatedAt: "${d.updatedAt}",` : "";
  return `  {
    id: "${d.id}",
    title: ${JSON.stringify(d.title)},
    type: "${d.type}",
    operationalType: "${d.operationalType}",
    description: ${JSON.stringify(d.description)},
    durationMins: ${d.durationMins},
    products: ${JSON.stringify(d.products)},
    addedAt: "${d.addedAt}",${updated}
    contributor: ${JSON.stringify(d.contributor)},
    topics: ${JSON.stringify(d.topics)},
    rating: ${d.rating},
  },`;
});

const out = `import type { CommunityDemo } from "@/lib/types";

/** Bulk-generated community demos — ${TARGET} entries (see scripts/generate-community-demos.mjs). */
export const communityDemosBulk: CommunityDemo[] = [
${lines.join("\n")}
];
`;

const outPath = join(__dirname, "../src/data/communityCatalogBulk.ts");
writeFileSync(outPath, out, "utf8");
console.log(`Wrote ${TARGET} demos to ${outPath}`);
