import { useQuery } from "@tanstack/react-query";

import { getMovie } from "@/services/movie";

export function useGetMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    enabled: !!id,
  });
}
