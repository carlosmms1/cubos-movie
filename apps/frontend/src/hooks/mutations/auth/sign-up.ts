import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { signUp } from "@/services/auth";
import { useNavigate } from "@tanstack/react-router";

export function useSignUp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess() {
      toast.success("Sua conta foi criada com sucesso!", {
        description:
          "Te enviamos uma mensagem para seu email, confirme sua conta agora mesmo.",
      });
      navigate({ to: "/sign-in" });
    },
  });
}
