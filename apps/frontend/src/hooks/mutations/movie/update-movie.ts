import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateMovie, type Movie } from "@/services/movie";

type UseUpdateMovieProps = {
  onDone?: () => void;
};

export function useUpdateMovie({ onDone = () => {} }: UseUpdateMovieProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Movie> }) =>
      updateMovie(id, data),
    onSuccess: (updatedMovie) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", updatedMovie.id] });
      toast.success("Filme editado com sucesso!");
      onDone();
    },
  });
}
