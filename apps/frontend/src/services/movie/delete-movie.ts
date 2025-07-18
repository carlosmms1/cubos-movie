import { api } from "@/lib/connection";

export async function deleteMovie(id: string): Promise<void> {
  await api.delete(`/movies/${id}`);
}
