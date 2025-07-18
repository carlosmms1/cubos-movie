import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decodeJwt } from "jose";
import { router } from "@/lib/router";

export interface AuthState {
  creatorId: string | null;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      creatorId: null,
      token: null,
      setToken: (token) => {
        try {
          const payload = decodeJwt(token);
          set({ token, creatorId: payload.sub });
        } catch (error) {
          console.error(error);
          router.navigate({ to: "/sign-in" });
        }
      },
      logout: () => set({ token: null, creatorId: null }),
    }),
    { name: "cubos-auth" }
  )
);
