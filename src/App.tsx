import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "@/pages/Landing/Landing";
import { Home } from "@/pages/Home/Home";
import { SpacePage } from "@/pages/Space/Space";
import { RequireAuth } from "@/components/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
