import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie, type Movie } from "@/services/movie";

export function useUpdateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Movie> }) =>
      updateMovie(id, data),
    onSuccess: (updatedMovie) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", updatedMovie.id] });
    },
  });
}
