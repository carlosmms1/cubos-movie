import { api } from "@/lib/connection";
import type { Movie } from ".";

export async function getMovie(id: string) {
  return await api.get<Movie>(`/movies/${id}`).then((res) => res.data);
}
