import { apiCiciv } from "../api/apiClient";
import type { Ciudadano } from "../types/ciudadano";

export const getCiudadanos = async (): Promise<Ciudadano[]> => {
  const r = await apiCiciv.get<Ciudadano[]>("/ciudadanos");
  return r.data;
};

export const deleteCiudadano = async (id: string): Promise<void> => {
  await apiCiciv.delete(`/ciudadanos/${id}`);
};

export const getCiudadanoById = async (id: string): Promise<Ciudadano> => {
  const r = await apiCiciv.get<Ciudadano>(`/ciudadanos/${id}`);
  return r.data;
};

export const createCiudadano = async (
  nuevoCiudadano: Omit<Ciudadano, "id">,
): Promise<Ciudadano> => {
  const r = await apiCiciv.post<Ciudadano>("/ciudadanos", nuevoCiudadano);
  return r.data;
};
