import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { CiudadanosPage } from "./pages/ciudadanos/CiudadanosPage";
import { Dashboard } from "./pages/dashboard/DashboardPage";
import { TramitesPage } from "./pages/tramites/TramitesPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registros" element={<CiudadanosPage />} />
        <Route path="/tramites" element={<TramitesPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
