import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCiudadano } from "../../services/ciudadanos";
import type { Ciudadano } from "../../types/ciudadano";

export const useCreateCiudadano = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nuevoCiudadano: Omit<Ciudadano, "id">) =>
      createCiudadano(nuevoCiudadano),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ciudadanos"] });
      queryClient.invalidateQueries({ queryKey: ["tramites"] });
    },
  });
};
