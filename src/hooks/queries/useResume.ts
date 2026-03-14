import { useQuery } from "@tanstack/react-query";
import { getResumeTramites } from "../../services/tramites";
import type { ResumenTramites } from "../../services/tramites";

export const useResume = () => {
  return useQuery<ResumenTramites>({
    queryKey: ['tramites'],
    queryFn: getResumeTramites,
  })
}