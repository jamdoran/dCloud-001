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
  /** ISO date, used to surface the newest. */
  addedAt: string;
  /** When true, hidden on the hub until "View all" in New Demos. */
  hubExtra?: boolean;
}

export type MySpaceStatus = "draft" | "expo-live";

/** A seller's own custom Space, scoped to a customer; can be published as an eXpo. */
export interface MySpace {
  id: string;
  customer: string;
  /** The Solution Space this custom Space draws from. */
  baseSpaceId: string;
  status: MySpaceStatus;
}
