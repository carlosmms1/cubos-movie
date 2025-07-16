import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(err) {
        let message = "Ocorreu um erro inesperado...";
        if (isAxiosError(err)) {
          message = err.response?.data.message;
        }
        toast.error(message);
      },
    },
  },
});
