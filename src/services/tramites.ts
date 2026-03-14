import { apiCiciv } from "../api/apiClient";
import type { Ciudadano } from "../types/ciudadano";

export interface ResumenTramites {
  total: number;
  finalizados: number;
  pendientes: number;
  enProceso: number;
  mostPopular: string;
}

export const getResumeTramites = async (): Promise<ResumenTramites> => {
  try {
    const r = await apiCiciv.get<Ciudadano[]>("/ciudadanos");
    const data = r.data;

    const conteo = data.reduce((acc: Record<string, number>, c) => {
      const nombreTramite = c.tramite;
      acc[nombreTramite] = (acc[nombreTramite] || 0) + 1;
      return acc;
    }, {});

    const mostPopular = Object.keys(conteo).reduce(
      (a, b) => (conteo[a] > conteo[b] ? a : b),
      "Ninguno",
    );

    return {
      total: data.length,
      finalizados: data.filter((t) => t.estado === "Finalizado").length,
      pendientes: data.filter((t) => t.estado === "Pendiente").length,
      enProceso: data.filter((t) => t.estado === "En Proceso").length,
      mostPopular: mostPopular,
    };
  } catch (error) {
    console.error("🚨 Error capturado en el Service:", error);
    throw error;
  }
};

export const changeStatus = async (id: string, newStatus: string) => {
  const r = await apiCiciv.patch(`/ciudadanos/${id}`, { estado: newStatus });
  return r.data;
};
