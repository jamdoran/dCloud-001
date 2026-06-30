import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "@/pages/Landing/Landing";
import { Home } from "@/pages/Home/Home";
import { SpacePage } from "@/pages/Space/Space";
import { CatalogPage } from "@/pages/Catalog/Catalog";
import { CommunityCatalogPage } from "@/pages/CommunityCatalog/CommunityCatalog";
import { HelpPage } from "@/pages/Help/Help";
import { MetricsPage } from "@/pages/Metrics/Metrics";
import { FavouritesPage } from "@/pages/Favourites/Favourites";
import { NewDemosPage } from "@/pages/NewDemos/NewDemos";
import { RequireAuth } from "@/components/RequireAuth";
import { SearchProvider } from "@/components/SearchPalette/SearchContext";

export default function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/spaces/:spaceId"
          element={
            <RequireAuth>
              <SpacePage />
            </RequireAuth>
          }
        />
        <Route
          path="/new-demos"
          element={
            <RequireAuth>
              <NewDemosPage />
            </RequireAuth>
          }
        />
        <Route
          path="/favourites"
          element={
            <RequireAuth>
              <FavouritesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/metrics"
          element={
            <RequireAuth>
              <MetricsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/help"
          element={
            <RequireAuth>
              <HelpPage />
            </RequireAuth>
          }
        />
        <Route
          path="/catalogs/events"
          element={
            <RequireAuth>
              <CatalogPage catalogId="events" />
            </RequireAuth>
          }
        />
        <Route
          path="/catalogs/cx"
          element={
            <RequireAuth>
              <CatalogPage catalogId="cx" />
            </RequireAuth>
          }
        />
        <Route
          path="/catalogs/community"
          element={
            <RequireAuth>
              <CommunityCatalogPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}
