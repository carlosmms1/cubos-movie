import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteMovie } from "@/services/movie";
import { useNavigate } from "@tanstack/react-router";

export function useDeleteMovie() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      toast.success("Filme deletado com sucesso!");
      navigate({ to: "/" });
    },
  });
}
