import { useQuery } from "@tanstack/react-query";
import {
  listMovies,
  type ListMoviesParams,
  type ListMoviesResponse,
} from "@/services/movie";

export function useListMovies(params: ListMoviesParams = {}) {
  return useQuery<ListMoviesResponse>({
    queryKey: ["movies", params],
    queryFn: () => listMovies(params),
    placeholderData: (prev) => prev,
  });
}
