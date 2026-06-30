/** Reference "today" for the prototype — keeps seed dates stable. */
export const PROTOTYPE_TODAY = new Date("2026-06-25T12:00:00Z");

export const NEW_DEMO_DAYS = 45;

export function isRecentlyPublished(
  addedAt: string,
  now: Date = PROTOTYPE_TODAY,
): boolean {
  const added = new Date(`${addedAt}T12:00:00Z`);
  const diffMs = now.getTime() - added.getTime();
  return diffMs >= 0 && diffMs <= NEW_DEMO_DAYS * 24 * 60 * 60 * 1000;
}

export function demoPublishedDate(demo: { addedAt: string }): string {
  return demo.addedAt;
}

export function formatPublishedDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
