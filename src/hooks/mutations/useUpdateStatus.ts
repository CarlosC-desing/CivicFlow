import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "../../services/tramites";

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: string }) =>
      changeStatus(id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ciudadanos"] });
      queryClient.invalidateQueries({ queryKey: ["tramites"] });
    },
  });
};
