import { api } from "@/lib/connection";

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export async function signUp(payload: SignUpPayload) {
  return await api.post("/users", payload).then((res) => res.data);
}
