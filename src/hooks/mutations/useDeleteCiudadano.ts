import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCiudadano } from "../../services/ciudadanos";

export const useDeleteCiudadano = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCiudadano(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ciudadanos"] });
      queryClient.invalidateQueries({ queryKey: ["tramites"] });
    },
  });
};
