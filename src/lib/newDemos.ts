import { demos, primarySpaceId, spaceById } from "@/data/catalog";
import { communityDemos } from "@/data/communityCatalog";
import {
  demoArchitectures,
  demoMotionIds,
  type CiscoArchitectureId,
} from "@/lib/ciscoArchitectures";
import { demoCategory, type DemoCategory } from "@/lib/demoLabels";
import { demoSpaceUrl } from "@/lib/search";
import { demoPublishedDate, isRecentlyPublished } from "@/lib/demoFreshness";
import type { DemoType, GtmMotionId } from "@/lib/types";

export type NewDemoCatalog = "gtm" | "community";

export interface NewDemoListing {
  id: string;
  title: string;
  catalog: NewDemoCatalog;
  catalogLabel: string;
  publishedAt: string;
  demoType: DemoType;
  demoCategory: DemoCategory;
  contextLabel: string;
  products: string[];
  motionIds: GtmMotionId[];
  architectureIds: CiscoArchitectureId[];
  href: string;
}

export interface NewDemoFilters {
  query: string;
  catalogs: NewDemoCatalog[];
  demoCategories: DemoCategory[];
  motions: GtmMotionId[];
  architectures: CiscoArchitectureId[];
}

export const NEW_DEMO_CATALOG_OPTIONS: { id: NewDemoCatalog; label: string }[] = [
  { id: "gtm", label: "GTM Solutions" },
  { id: "community", label: "Community Content" },
];

export const NEW_DEMO_CATEGORY_OPTIONS: DemoCategory[] = [
  "Solution Demo",
  "Guided Demo",
  "Instant Demo",
  "Lab",
];

export function emptyNewDemoFilters(): NewDemoFilters {
  return {
    query: "",
    catalogs: [],
    demoCategories: [],
    motions: [],
    architectures: [],
  };
}

export function hasActiveNewDemoFilters(filters: NewDemoFilters): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.catalogs.length > 0 ||
    filters.demoCategories.length > 0 ||
    filters.motions.length > 0 ||
    filters.architectures.length > 0
  );
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function listingMatchesQuery(item: NewDemoListing, query: string): boolean {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = [
    item.title,
    item.contextLabel,
    item.catalogLabel,
    item.demoCategory,
    ...item.products,
  ]
    .join(" ")
    .toLowerCase();

  return tokens.every((token) => haystack.includes(token));
}

function listingMatchesFilters(item: NewDemoListing, filters: NewDemoFilters): boolean {
  if (filters.catalogs.length > 0 && !filters.catalogs.includes(item.catalog)) {
    return false;
  }
  if (
    filters.demoCategories.length > 0 &&
    !filters.demoCategories.includes(item.demoCategory)
  ) {
    return false;
  }
  if (
    filters.motions.length > 0 &&
    !filters.motions.some((motion) => item.motionIds.includes(motion))
  ) {
    return false;
  }
  if (
    filters.architectures.length > 0 &&
    !filters.architectures.some((arch) => item.architectureIds.includes(arch))
  ) {
    return false;
  }
  if (!listingMatchesQuery(item, filters.query)) {
    return false;
  }
  return true;
}

export function communityDemoUrl(demoId: string): string {
  return `/catalogs/community?demo=${encodeURIComponent(demoId)}`;
}

function gtmNewDemos(): NewDemoListing[] {
  return demos
    .filter((demo) => isRecentlyPublished(demo.addedAt))
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .map((demo) => {
      const spaceId = primarySpaceId(demo);
      const space = spaceById(spaceId);
      return {
        id: demo.id,
        title: demo.title,
        catalog: "gtm" as const,
        catalogLabel: "GTM Solutions",
        publishedAt: demoPublishedDate(demo),
        demoType: demo.type,
        demoCategory: demoCategory(demo),
        contextLabel: space?.name ?? "Solution Space",
        products: demo.products,
        motionIds: demoMotionIds(demo),
        architectureIds: demoArchitectures(demo),
        href: demoSpaceUrl(spaceId, demo.id),
      };
    });
}

function communityNewDemoListings(): NewDemoListing[] {
  return communityDemos
    .filter((demo) => isRecentlyPublished(demo.addedAt))
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .map((demo) => ({
      id: demo.id,
      title: demo.title,
      catalog: "community" as const,
      catalogLabel: "Community Content",
      publishedAt: demoPublishedDate(demo),
      demoType: demo.type,
      demoCategory: demoCategory(demo),
      contextLabel: demo.contributor,
      products: demo.products,
      motionIds: [] as GtmMotionId[],
      architectureIds: demoArchitectures(demo),
      href: communityDemoUrl(demo.id),
    }));
}

export function allNewDemoListings(): NewDemoListing[] {
  return [...gtmNewDemos(), ...communityNewDemoListings()];
}

/** New demos grouped by catalog — GTM first, optionally filtered. */
export function newDemosByCatalog(
  filters: NewDemoFilters = emptyNewDemoFilters(),
): { catalogLabel: string; items: NewDemoListing[] }[] {
  const gtm = gtmNewDemos().filter((item) => listingMatchesFilters(item, filters));
  const community = communityNewDemoListings().filter((item) =>
    listingMatchesFilters(item, filters),
  );
  const groups: { catalogLabel: string; items: NewDemoListing[] }[] = [];

  if (gtm.length > 0) {
    groups.push({ catalogLabel: "GTM Solutions", items: gtm });
  }
  if (community.length > 0) {
    groups.push({ catalogLabel: "Community Content", items: community });
  }

  return groups;
}

export function totalNewDemoCount(
  filters: NewDemoFilters = emptyNewDemoFilters(),
): number {
  return newDemosByCatalog(filters).reduce((sum, group) => sum + group.items.length, 0);
}

export function totalUnfilteredNewDemoCount(): number {
  return gtmNewDemos().length + communityNewDemoListings().length;
}
