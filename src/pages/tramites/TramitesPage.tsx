import { useCiudadanos } from "../../hooks/queries/useCiudadanos";
import { useResume } from "../../hooks/queries/useResume";
import { StatCard } from "../../components/StatCard/StatCard";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { TableTramites } from "../../components/TableTramites/TableTramites";
import "./TramitesPage.scss";

export const TramitesPage = () => {
  const {
    data: ciudadanos,
    isLoading: loadingCiudadanos,
    isError: errorCiudadanos,
  } = useCiudadanos();

  const {
    data: tramites,
    isLoading: loadingResume,
    isError: errorResume,
  } = useResume();

  if (loadingCiudadanos || loadingResume) return <div>Cargando...</div>;
  if (errorCiudadanos || errorResume) return <div>Error al cargar</div>;

  return (
    <>
      <div className="page-container--tramites">
        <div className="dashboard-grid">
          <div className="dashboard__stats">
            <StatCard
              title="Total Ciudadanos"
              value={tramites?.total ?? 0}
              icon={Users}
            />
            <StatCard
              title="Finalizados"
              value={tramites?.finalizados ?? 0}
              icon={CheckCircle}
            />
            <StatCard
              title="Pendientes"
              value={tramites?.pendientes ?? 0}
              icon={Clock}
            />
            <StatCard
              title="Trámite más solicitado"
              value={tramites?.mostPopular ?? "Ninguno"}
              icon={TrendingUp}
            />
          </div>
        </div>
        <TableTramites data={ciudadanos} />
      </div>
    </>
  );
};
