import { useSyncExternalStore } from "react";
import {
  getFavouritesSnapshot,
  isFavourite,
  subscribeFavourites,
  toggleFavourite,
  type FavouriteKind,
} from "@/lib/favourites";

export function useFavouritesSnapshot() {
  return useSyncExternalStore(subscribeFavourites, getFavouritesSnapshot, getFavouritesSnapshot);
}

export function useFavourite(kind: FavouriteKind, id: string) {
  useFavouritesSnapshot();
  return {
    favourited: isFavourite(kind, id),
    toggle: () => toggleFavourite(kind, id),
  };
}
