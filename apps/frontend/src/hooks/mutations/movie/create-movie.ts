import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createMovie } from "@/services/movie";

type UseCreateMovieProps = {
  onDone?: () => void;
};

export function useCreateMovie({
  onDone = () => {},
}: UseCreateMovieProps = {}) {
  return useMutation({
    mutationFn: createMovie,
    onSuccess() {
      toast.success("Filme adicionado com sucesso!");
      onDone();
    },
  });
}
