/**
 * Core domain types for the dCloud connectivity hierarchy:
 *   GTM Motions → Solution Spaces → Demos/Labs.
 * Connections are explicit (managed in Admin later), never auto-derived, and
 * nothing below a Solution Space is ever orphaned.
 */

export type GtmMotionId =
  | "ai-ready-dc"
  | "future-proof-workplaces"
  | "digital-resilience";

export interface GtmMotion {
  id: GtmMotionId;
  name: string;
}

export interface SolutionSpace {
  id: string;
  name: string;
  /** A Space connects upstream to one or more GTM Motions. */
  motions: GtmMotionId[];
  /** Signature colours — a quiet hint on the hub; the full background lives inside the Space. */
  accent: string;
  accent2: string;
  /** One-line value statement shown in the Space hero. */
  tagline: string;
  demoCount: number;
  labCount: number;
}

export type DemoType = "Solution" | "Deep-Dive" | "Guided" | "Lab";
export type OperationalType = "Scheduled" | "Instant" | "Guided";

export interface Demo {
  id: string;
  title: string;
  type: DemoType;
  operationalType: OperationalType;
  description: string;
  durationMins: number;
  /** Solution Space(s) this demo belongs to — a product demo may span more than one. */
  spaceIds: string[];
  /** Product names and aliases used for search (e.g. "Catalyst 9300", "Splunk"). */
  products: string[];
  /** ISO date — publication date shown on demo cards. */
  addedAt: string;
  /** Optional legacy field; cards use addedAt as published date. */
  updatedAt?: string;
  /** When true, hidden on the hub until "View all" in New Demos. */
  hubExtra?: boolean;
}

/** Seller-contributed demo in the Community Content catalog — no Solution Space linkage. */
export interface CommunityDemo {
  id: string;
  title: string;
  type: DemoType;
  operationalType: OperationalType;
  description: string;
  durationMins: number;
  products: string[];
  /** ISO date — used for "New" highlights and sort order. */
  addedAt: string;
  updatedAt?: string;
  /** Person or team who contributed the demo. */
  contributor: string;
  /** Topic / BE tags for browse filters (e.g. Security, Partner). */
  topics: string[];
  /** Optional peer rating seed for display. */
  rating?: number;
}

export interface DemoScriptLink {
  label: string;
  href: string;
  fileType?: string;
}

export interface DemoTagGroup {
  category: string;
  tags: string[];
}

/** Rich detail surfaced in the demo modal — seed defaults generated per demo. */
export interface DemoDetail {
  publishedAt: string;
  scriptLinks: DemoScriptLink[];
  categories: string[];
  tagGroups: DemoTagGroup[];
  launchCount: number;
  avgRating: number;
  feedbackCount: number;
}

export type SpaceAssetKind = "video" | "document";

/** Supporting video or document linked from a Solution Space page. */
export interface SpaceAsset {
  id: string;
  spaceId: string;
  kind: SpaceAssetKind;
  title: string;
  description?: string;
  href: string;
  /** Shown on video cards (e.g. "4 min"). */
  durationLabel?: string;
  /** Shown on document cards (e.g. "PDF"). */
  fileType?: string;
}
