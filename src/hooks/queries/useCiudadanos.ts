import { useQuery } from '@tanstack/react-query';
import { getCiudadanos } from '../../services/ciudadanos';

export const useCiudadanos = () => {
  return useQuery({
    queryKey: ['ciudadanos'],
    queryFn: getCiudadanos,
  });
};