import type { Demo } from "@/lib/types";

/** Mutually exclusive demo category shown on cards and in search. */
export type DemoCategory = "Solution Demo" | "Guided Demo" | "Instant Demo" | "Lab";

export function demoCategory(demo: Pick<Demo, "type">): DemoCategory {
  if (demo.type === "Solution") return "Solution Demo";
  if (demo.type === "Guided") return "Guided Demo";
  if (demo.type === "Lab") return "Lab";
  return "Instant Demo";
}

export function demoActionLabel(demo: Pick<Demo, "type">): string {
  switch (demoCategory(demo)) {
    case "Solution Demo":
      return "Launch Now";
    case "Lab":
      return "Schedule Demo";
    case "Guided Demo":
    case "Instant Demo":
      return "Launch Demo";
  }
}
