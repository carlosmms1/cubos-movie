import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/services/auth";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

export function useSignIn() {
  const { setToken } = useAuth.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      setToken(data.accessToken);
      navigate({ to: "/" });
    },
  });
}
