import type { Demo, GtmMotionId } from "@/lib/types";
import { spaceById } from "@/data/catalog";

export type CiscoArchitectureId =
  | "networking"
  | "security"
  | "collab"
  | "data-centre"
  | "ai"
  | "cloud"
  | "iiot"
  | "compute";

export interface CiscoArchitecture {
  id: CiscoArchitectureId;
  name: string;
}

export const CISCO_ARCHITECTURES: CiscoArchitecture[] = [
  { id: "networking", name: "Networking" },
  { id: "security", name: "Security" },
  { id: "collab", name: "Collab" },
  { id: "data-centre", name: "Data Centre" },
  { id: "ai", name: "AI" },
  { id: "cloud", name: "Cloud" },
  { id: "iiot", name: "IIOT" },
  { id: "compute", name: "Compute" },
];

/** Chip accent for architecture filters. */
export const architectureColor: Record<CiscoArchitectureId, string> = {
  networking: "var(--cyan)",
  security: "var(--violet)",
  collab: "var(--teal)",
  "data-centre": "var(--blue)",
  ai: "var(--magenta)",
  cloud: "#5b9dff",
  iiot: "var(--orange)",
  compute: "var(--gold)",
};

type DemoLike = Pick<Demo, "products" | "title" | "description">;

function architecturesFromProduct(product: string): CiscoArchitectureId[] {
  const p = product.toLowerCase();
  const out = new Set<CiscoArchitectureId>();

  if (/cloud aci|multicloud|intercloud/i.test(p)) out.add("cloud");
  if (/nexus|catalyst|dna|thousandeyes|vmanage|meraki|sd-wan|routing|switching|wan|wireless|wifi|9800|9300|9200|9100|8000|aci\b/i.test(p)) {
    out.add("networking");
  }
  if (/nexus|aci\b|ucs|intersight|data centre|datacenter|pod/i.test(p)) {
    out.add("data-centre");
  }
  if (/ise|firewall|splunk|xdr|talos|duo|umbrella|secure access|secure workload|securex|ai defense|defense/i.test(p)) {
    out.add("security");
  }
  if (/webex|room kit|room bar|desk pro|contact center|collab/i.test(p)) {
    out.add("collab");
  }
  if (/nvidia|ai pod|ai agent|gpu|machine learning|inference|training/i.test(p)) {
    out.add("ai");
  }
  if (/ucs|compute|server|blade|hyperflex/i.test(p)) {
    out.add("compute");
  }
  if (/iot|iiot|industrial|ot sensor|building system|badge|camera/i.test(p)) {
    out.add("iiot");
  }

  return [...out];
}

/** Cisco architecture pillars inferred from products and demo copy. */
export function demoArchitectures(demo: DemoLike): CiscoArchitectureId[] {
  const set = new Set<CiscoArchitectureId>();
  for (const product of demo.products) {
    for (const arch of architecturesFromProduct(product)) {
      set.add(arch);
    }
  }

  const text = `${demo.title} ${demo.description}`.toLowerCase();
  if (/iot|iiot|industrial ot|building system|sensor|badge|camera/i.test(text)) {
    set.add("iiot");
  }
  if (/data centre|datacenter|fabric|leaf-spine|aci/i.test(text)) {
    set.add("data-centre");
  }
  if (/\bai\b|gpu|inference|training|llm/i.test(text)) {
    set.add("ai");
  }

  return [...set];
}

/** GTM motions connected upstream via the demo's Solution Space(s). */
export function demoMotionIds(demo: Pick<Demo, "spaceIds">): GtmMotionId[] {
  const set = new Set<GtmMotionId>();
  for (const spaceId of demo.spaceIds) {
    const space = spaceById(spaceId);
    for (const motion of space?.motions ?? []) {
      set.add(motion);
    }
  }
  return [...set];
}
