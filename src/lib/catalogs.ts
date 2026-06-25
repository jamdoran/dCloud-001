/**
 * Multi-catalog model. The GTM Solutions catalog stays lean on the hub; other
 * catalogs surface specialised content without cluttering the main journey.
 */

export type CatalogId = "gtm" | "events" | "cx" | "community";

export interface Catalog {
  id: CatalogId;
  name: string;
  description: string;
  homeRoute: string;
  /** The primary seller-facing catalog — Solution Spaces and connected demos. */
  isPrimary?: boolean;
}

export const catalogs: Catalog[] = [
  {
    id: "gtm",
    name: "GTM Solutions",
    description:
      "The core dCloud catalog — curated Solution Spaces aligned to Cisco GTM motions, with connected demos, labs and guided journeys. Kept intentionally focused on what sellers need every day.",
    homeRoute: "/home",
    isPrimary: true,
  },
  {
    id: "events",
    name: "Events",
    description:
      "Demos and labs tied to Cisco and partner events — Cisco Live, roadshows, executive briefings and regional showcases. Time-bound content you can run on the show floor or in a customer meeting the week after.",
    homeRoute: "/catalogs/events",
  },
  {
    id: "cx",
    name: "CX",
    description:
      "Customer experience outcomes — collaboration, contact centre, hybrid work and service assurance demos that speak to business buyers. Story-led content for AEs and CX specialists, not just the network stack.",
    homeRoute: "/catalogs/cx",
  },
  {
    id: "community",
    name: "Community Content",
    description:
      "Seller-contributed demos, field favourites and enablement assets from the dCloud community. Peer-rated, tagged and moderated — the long tail that never belongs on the main GTM catalog.",
    homeRoute: "/catalogs/community",
  },
];

const STORAGE_KEY = "dcloud.catalog";

export function getActiveCatalogId(): CatalogId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && catalogs.some((c) => c.id === raw)) return raw as CatalogId;
  } catch {
    /* ignore */
  }
  return "gtm";
}

export function setActiveCatalogId(id: CatalogId): void {
  localStorage.setItem(STORAGE_KEY, id);
}

export function catalogById(id: CatalogId): Catalog | undefined {
  return catalogs.find((c) => c.id === id);
}
