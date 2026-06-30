/** Reference "today" for the prototype — keeps seed dates stable. */
const TODAY = new Date("2026-06-25T12:00:00Z");
const SIX_MONTHS_DAYS = 183;

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Deterministic ISO date within the past six months, spread by id. */
export function seededLastUpdated(id: string): string {
  const daysAgo = hashId(id) % (SIX_MONTHS_DAYS + 1);
  const d = new Date(TODAY);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export function demoLastUpdated(demo: { id: string; updatedAt?: string }): string {
  return demo.updatedAt ?? seededLastUpdated(demo.id);
}

export function formatLastUpdated(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
