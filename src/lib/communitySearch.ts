import { communityDemos, type CommunityTopic } from "@/data/communityCatalog";
import { demoArchitectures, type CiscoArchitectureId } from "@/lib/ciscoArchitectures";
import { demoCategory, type DemoCategory } from "@/lib/demoLabels";
import type { CommunityDemo } from "@/lib/types";

export interface CommunitySearchFilters {
  demoCategories: DemoCategory[];
  topics: CommunityTopic[];
  architectures: CiscoArchitectureId[];
}

export interface CommunitySearchHit {
  demo: CommunityDemo;
  matchFields: ("title" | "description" | "product" | "contributor" | "topic")[];
}

export function emptyCommunitySearchFilters(): CommunitySearchFilters {
  return { demoCategories: [], topics: [], architectures: [] };
}

export function hasActiveCommunityFilters(filters: CommunitySearchFilters): boolean {
  return (
    filters.demoCategories.length > 0 ||
    filters.topics.length > 0 ||
    filters.architectures.length > 0
  );
}

export function activeCommunityFilterCount(filters: CommunitySearchFilters): number {
  return (
    filters.demoCategories.length +
    filters.topics.length +
    filters.architectures.length
  );
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function tokens(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

function fieldMatches(text: string, queryTokens: string[]): boolean {
  const hay = normalize(text);
  return queryTokens.every((t) => hay.includes(t));
}

function demoMatchesFilters(demo: CommunityDemo, filters: CommunitySearchFilters): boolean {
  if (
    filters.demoCategories.length > 0 &&
    !filters.demoCategories.includes(demoCategory(demo))
  ) {
    return false;
  }
  if (
    filters.topics.length > 0 &&
    !filters.topics.some((topic) => demo.topics.includes(topic))
  ) {
    return false;
  }
  if (
    filters.architectures.length > 0 &&
    !filters.architectures.some((arch) => demoArchitectures(demo).includes(arch))
  ) {
    return false;
  }
  return true;
}

function scoreDemo(demo: CommunityDemo, queryTokens: string[]): CommunitySearchHit | null {
  const matchFields: CommunitySearchHit["matchFields"] = [];

  if (fieldMatches(demo.title, queryTokens)) matchFields.push("title");
  if (fieldMatches(demo.description, queryTokens)) matchFields.push("description");
  if (fieldMatches(demo.contributor, queryTokens)) matchFields.push("contributor");
  if (demo.products.some((p) => fieldMatches(p, queryTokens))) matchFields.push("product");
  if (demo.topics.some((t) => fieldMatches(t, queryTokens))) matchFields.push("topic");

  if (matchFields.length === 0) return null;
  return { demo, matchFields };
}

export function searchCommunity(
  query: string,
  filters: CommunitySearchFilters = emptyCommunitySearchFilters(),
): CommunitySearchHit[] {
  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;
  const hasFilters = hasActiveCommunityFilters(filters);

  if (!hasQuery && !hasFilters) {
    return communityDemos
      .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
      .map((demo) => ({ demo, matchFields: [] as CommunitySearchHit["matchFields"] }));
  }

  const queryTokens = tokens(trimmed);
  const hits: CommunitySearchHit[] = [];

  for (const demo of communityDemos) {
    if (!demoMatchesFilters(demo, filters)) continue;

    if (!hasQuery) {
      hits.push({ demo, matchFields: [] });
      continue;
    }

    const hit = scoreDemo(demo, queryTokens);
    if (hit) hits.push(hit);
  }

  return hits.sort((a, b) => b.demo.addedAt.localeCompare(a.demo.addedAt));
}

export function hasCommunitySearchResults(hits: CommunitySearchHit[]): boolean {
  return hits.length > 0;
}
