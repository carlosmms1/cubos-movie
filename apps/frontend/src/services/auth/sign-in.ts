import { api } from "@/lib/connection";

interface SignInPaylod {
  email: string;
  password: string;
}

export async function signIn(payload: SignInPaylod) {
  return await api
    .post<{ accessToken: string }>("/auth/login", payload)
    .then((res) => res.data);
}
