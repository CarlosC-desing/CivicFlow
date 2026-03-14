import React from "react";
import { useCiudadanos } from "../../hooks/queries/useCiudadanos";
import type { Ciudadano } from "../../types/ciudadano";
import "./RecentActivity.scss";

interface RecentActivityProps {
  ciudadanos?: Ciudadano[];
  isLoading?: boolean;
  isError?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  ciudadanos,
  isLoading,
  isError,
}) => {
  const {
    data: ciudadanosData,
    isLoading: loadingCiudadanos,
    isError: errorCiudadanos,
  } = useCiudadanos();

  const list = ciudadanos ?? ciudadanosData ?? [];
  const loading = isLoading ?? loadingCiudadanos;
  const error = isError ?? errorCiudadanos;

  const recent = [...list]
    .sort(
      (a, b) =>
        new Date(b.fechaRegistro).getTime() -
        new Date(a.fechaRegistro).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="recent-activity">
      <header className="recent-activity__header">
        <h2 className="recent-activity__title">Actividad reciente</h2>
        <p className="recent-activity__subtitle">
          Últimos trámites registrados
        </p>
      </header>

      {loading ? (
        <div className="recent-activity__state">Cargando...</div>
      ) : error ? (
        <div className="recent-activity__state recent-activity__state--error">
          No se pudieron cargar los registros.
        </div>
      ) : (
        <div className="recent-activity__table-wrapper">
          <table className="recent-activity__table">
            <thead>
              <tr>
                <th>Ciudadano</th>
                <th>Tipo de Trámite</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((c) => (
                <tr key={c.id}>
                  <td>{`${c.nombre} ${c.apellido}`}</td>
                  <td>{c.tramite}</td>
                  <td>{c.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {recent.length === 0 && (
            <div className="recent-activity__empty">
              No hay trámites recientes.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
