import { getUser } from "@/lib/auth";

export type FavouriteKind = "demo" | "space";

export interface FavouritesSnapshot {
  demos: Set<string>;
  spaces: Set<string>;
}

const listeners = new Set<() => void>();

function storageKey(): string | null {
  const user = getUser();
  return user ? `dcloud.favourites.${user.email}` : null;
}

function load(): FavouritesSnapshot {
  const key = storageKey();
  if (!key) return { demos: new Set(), spaces: new Set() };
  try {
    const raw = JSON.parse(localStorage.getItem(key) ?? "{}") as {
      demos?: string[];
      spaces?: string[];
    };
    return {
      demos: new Set(raw.demos ?? []),
      spaces: new Set(raw.spaces ?? []),
    };
  } catch {
    return { demos: new Set(), spaces: new Set() };
  }
}

let snapshot = load();

function persist(state: FavouritesSnapshot): void {
  const key = storageKey();
  if (!key) return;
  localStorage.setItem(
    key,
    JSON.stringify({
      demos: [...state.demos],
      spaces: [...state.spaces],
    }),
  );
}

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function getFavouritesSnapshot(): FavouritesSnapshot {
  return snapshot;
}

export function subscribeFavourites(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isFavourite(kind: FavouriteKind, id: string): boolean {
  return kind === "demo" ? snapshot.demos.has(id) : snapshot.spaces.has(id);
}

/** Toggle favourite; returns the new favourited state. */
export function toggleFavourite(kind: FavouriteKind, id: string): boolean {
  snapshot = load();
  const set = kind === "demo" ? snapshot.demos : snapshot.spaces;
  const next = !set.has(id);
  if (next) set.add(id);
  else set.delete(id);
  persist(snapshot);
  notify();
  return next;
}
