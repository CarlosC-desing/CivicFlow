import { useResume } from "../../hooks/queries/useResume";
import { useCiudadanos } from "../../hooks/queries/useCiudadanos";
import { StatCard } from "../../components/StatCard/StatCard";
import { StatusChart } from "../../components/StatusChart/StatusChart";
import { EffectivenessChart } from "../../components/EffectivenessChart/EffectivenessChart";
import { RecentActivity } from "../../components/RecentActivity/RecentActivity";
import "./DashboardPage.scss";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

export const Dashboard = () => {
  const { data: tramites, isLoading, isError } = useResume();
  const {
    data: ciudadanos,
    isLoading: cargandoCiudadanos,
    isError: errorCiudadanos,
  } = useCiudadanos();

  const loading = isLoading || cargandoCiudadanos;
  const error = isError || errorCiudadanos;

  if (loading)
    return (
      <div className="dashboard dashboard--state">
        <div className="dashboard__state">
          <div className="dashboard__spinner" />
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="dashboard dashboard--state">
        <div className="dashboard__state">
          <p className="dashboard__error">No se pudieron cargar los datos.</p>
          <p>Intenta recargar la página o vuelve a intentarlo más tarde.</p>
        </div>
      </div>
    );

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="header__title">Dashboard</h1>
        <p className="header__paragraph">
          Resumen general de trámites ciudadanos
        </p>
      </div>

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

      <div className="dashboard__charts">
        <div className="dashboard__chart">
          <StatusChart
            data={{
              finalizados: tramites?.finalizados ?? 0,
              pendientes: tramites?.pendientes ?? 0,
              enProceso: tramites?.enProceso ?? 0,
            }}
          />
        </div>

        <div className="dashboard__chart">
          <EffectivenessChart
            total={tramites?.total ?? 0}
            finalizados={tramites?.finalizados ?? 0}
            target={80}
          />
        </div>
      </div>

      <div className="dashboard__activity">
        <RecentActivity ciudadanos={ciudadanos} />
      </div>
    </div>
  );
};
