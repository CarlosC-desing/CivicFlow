import { useQuery } from "@tanstack/react-query";
import { getCiudadanoById } from "../../services/ciudadanos";

export const useCiudadano = (id: string) => {
  return useQuery({
    queryKey: ["ciudadano", id],
    queryFn: () => getCiudadanoById(id),
    enabled: !!id,
  });
};
