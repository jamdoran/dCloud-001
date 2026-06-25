import {
  demos,
  demosForSpace,
  gtmMotions,
  motionName,
  solutionSpaces,
  spaceById,
} from "@/data/catalog";
import type { Demo, SolutionSpace } from "@/lib/types";

export type DemoSearchMatchField =
  | "title"
  | "description"
  | "product"
  | "type";

export type SpaceSearchMatchReason = "space-name" | "gtm-motion";

export type ProductFamily = "catalyst" | "nexus" | "other";

/** A Solution Space matched by name or upstream GTM motion. */
export interface SpaceSearchHit {
  space: SolutionSpace;
  matchReason: SpaceSearchMatchReason;
  /** GTM motion label when matched via motion rather than space name. */
  matchedMotion?: string;
}

/** One navigable demo hit — placed inside a specific Solution Space. */
export interface DemoSearchHit {
  demo: Demo;
  space: SolutionSpace;
  matchFields: DemoSearchMatchField[];
  /** Product label that matched the query, when applicable. */
  matchedProduct?: string;
  /** Included because its Solution Space (or GTM motion) matched the query. */
  fromSpaceMatch?: boolean;
}

export interface SearchResults {
  spaces: SpaceSearchHit[];
  demos: DemoSearchHit[];
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function tokens(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

/** Catalyst and Nexus share model numbers (e.g. 9300) — family must be explicit. */
export function productFamily(product: string): ProductFamily {
  const p = normalize(product);
  if (p.startsWith("catalyst")) return "catalyst";
  if (p.startsWith("nexus")) return "nexus";
  return "other";
}

/** When the query names a product line, only match that line's products. */
function queryImpliedFamily(query: string): ProductFamily | null {
  const q = normalize(query);
  if (/\bcatalyst\b/.test(q)) return "catalyst";
  if (/\bnexus\b/.test(q)) return "nexus";
  return null;
}

function fieldMatches(text: string, queryTokens: string[]): boolean {
  const hay = normalize(text);
  return queryTokens.every((t) => hay.includes(t));
}

function productMatchesQuery(
  product: string,
  queryTokens: string[],
  impliedFamily: ProductFamily | null,
): boolean {
  if (!fieldMatches(product, queryTokens)) return false;
  const family = productFamily(product);
  if (impliedFamily && family !== "other" && family !== impliedFamily) return false;
  return true;
}

function matchingProduct(
  products: string[],
  queryTokens: string[],
  impliedFamily: ProductFamily | null,
): string | undefined {
  return products.find((p) => productMatchesQuery(p, queryTokens, impliedFamily));
}

function demoHasFamilyProduct(demo: Demo, family: ProductFamily): boolean {
  return demo.products.some((p) => productFamily(p) === family);
}

function demoHitKey(demoId: string, spaceId: string): string {
  return `${demoId}::${spaceId}`;
}

function scoreDemoHit(hit: DemoSearchHit): number {
  let score = hit.matchFields.length * 10;
  if (hit.fromSpaceMatch) score += 50;
  if (hit.matchFields.includes("title")) score += 20;
  if (hit.matchFields.includes("product")) score += 15;
  if (hit.matchFields.includes("type")) score += 5;
  return score;
}

function scoreSpaceHit(hit: SpaceSearchHit): number {
  return hit.matchReason === "space-name" ? 100 : 80;
}

function searchSpaces(queryTokens: string[]): SpaceSearchHit[] {
  const hits: SpaceSearchHit[] = [];
  const seen = new Set<string>();

  for (const space of solutionSpaces) {
    const nameMatch = fieldMatches(space.name, queryTokens);
    const taglineMatch = fieldMatches(space.tagline, queryTokens);
    const motionMatch = space.motions.find((m) =>
      fieldMatches(motionName(m), queryTokens),
    );

    if (nameMatch || taglineMatch) {
      hits.push({ space, matchReason: "space-name" });
      seen.add(space.id);
      continue;
    }

    if (motionMatch) {
      hits.push({
        space,
        matchReason: "gtm-motion",
        matchedMotion: motionName(motionMatch),
      });
      seen.add(space.id);
    }
  }

  for (const motion of gtmMotions) {
    if (!fieldMatches(motion.name, queryTokens)) continue;

    for (const space of solutionSpaces) {
      if (!space.motions.includes(motion.id) || seen.has(space.id)) continue;
      hits.push({
        space,
        matchReason: "gtm-motion",
        matchedMotion: motion.name,
      });
      seen.add(space.id);
    }
  }

  return hits.sort(
    (a, b) =>
      scoreSpaceHit(b) - scoreSpaceHit(a) ||
      a.space.name.localeCompare(b.space.name),
  );
}

function searchDemos(
  queryTokens: string[],
  matchedSpaceIds: Set<string>,
  impliedFamily: ProductFamily | null,
): DemoSearchHit[] {
  const hits = new Map<string, DemoSearchHit>();

  for (const spaceId of matchedSpaceIds) {
    const space = spaceById(spaceId);
    if (!space) continue;

    for (const demo of demosForSpace(spaceId)) {
      if (impliedFamily && !demoHasFamilyProduct(demo, impliedFamily)) continue;

      hits.set(demoHitKey(demo.id, spaceId), {
        demo,
        space,
        matchFields: [],
        fromSpaceMatch: true,
      });
    }
  }

  for (const demo of demos) {
    const titleHit = fieldMatches(demo.title, queryTokens);
    const descHit = fieldMatches(demo.description, queryTokens);
    const typeHit = fieldMatches(demo.type, queryTokens);
    const product = matchingProduct(demo.products, queryTokens, impliedFamily);

    if (!titleHit && !descHit && !typeHit && !product) continue;

    const matchFields: DemoSearchMatchField[] = [];
    if (titleHit) matchFields.push("title");
    if (descHit) matchFields.push("description");
    if (product) matchFields.push("product");
    if (typeHit) matchFields.push("type");

    for (const spaceId of demo.spaceIds) {
      const space = spaceById(spaceId);
      if (!space) continue;

      const key = demoHitKey(demo.id, spaceId);
      const existing = hits.get(key);

      hits.set(key, {
        demo,
        space,
        matchFields: existing
          ? [...new Set([...existing.matchFields, ...matchFields])]
          : matchFields,
        matchedProduct: product ?? existing?.matchedProduct,
        fromSpaceMatch: existing?.fromSpaceMatch,
      });
    }
  }

  return [...hits.values()].sort((a, b) => {
    const spaceBoost = Number(b.fromSpaceMatch) - Number(a.fromSpaceMatch);
    if (spaceBoost !== 0) return spaceBoost;
    return scoreDemoHit(b) - scoreDemoHit(a);
  });
}

/** Search Solution Spaces, GTM motions, and demos within the hierarchy. */
export function search(query: string): SearchResults {
  const queryTokens = tokens(query);
  if (queryTokens.length === 0) {
    return { spaces: [], demos: [] };
  }

  const impliedFamily = queryImpliedFamily(query);
  const spaces = searchSpaces(queryTokens);
  const matchedSpaceIds = new Set(spaces.map((h) => h.space.id));
  const demos = searchDemos(queryTokens, matchedSpaceIds, impliedFamily);

  return { spaces, demos };
}

/** Venue label — product line beats GTM motion when the hit matched a product. */
export function searchHitVenue(hit: DemoSearchHit): string {
  if (hit.matchedProduct) {
    const family = productFamily(hit.matchedProduct);
    if (family === "catalyst") return "Campus & Branch";
    if (family === "nexus") return "Data Centre";
  }
  return hit.space.motions.map((m) => motionName(m)).join(" · ");
}

/** Breadcrumb path shown on a demo search result. */
export function searchHitPath(hit: DemoSearchHit): string {
  return `${searchHitVenue(hit)} → ${hit.space.name}`;
}

/** Breadcrumb path for a Solution Space result. */
export function spaceHitPath(hit: SpaceSearchHit): string {
  const motion = hit.space.motions.map((m) => motionName(m)).join(" · ");
  return motion;
}

export function spaceUrl(spaceId: string): string {
  return `/spaces/${spaceId}`;
}

/** Deep link into a Solution Space with a demo highlighted. */
export function demoSpaceUrl(spaceId: string, demoId: string): string {
  return `/spaces/${spaceId}?demo=${encodeURIComponent(demoId)}`;
}

export function hasSearchResults(results: SearchResults): boolean {
  return results.spaces.length > 0 || results.demos.length > 0;
}

/** Group demo hits by matched product when 9300-style ambiguity applies. */
export function groupDemosByProduct(demoHits: DemoSearchHit[]): Map<string, DemoSearchHit[]> {
  const groups = new Map<string, DemoSearchHit[]>();
  for (const hit of demoHits) {
    const key = hit.matchedProduct ?? hit.demo.title;
    const list = groups.get(key) ?? [];
    list.push(hit);
    groups.set(key, list);
  }
  return groups;
}
