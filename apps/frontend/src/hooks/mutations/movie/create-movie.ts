import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createMovie } from "@/services/movie";

type UseCreateMovieProps = {
  onDone?: () => void;
};

export function useCreateMovie({
  onDone = () => {},
}: UseCreateMovieProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovie,
    onSuccess() {
      toast.success("Filme adicionado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
      onDone();
    },
  });
}
