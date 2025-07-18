import { api } from "@/lib/connection";
import type { Movie } from ".";

export async function updateMovie(
  id: string,
  data: Partial<Movie>
): Promise<Movie> {
  const { data: updated } = await api.patch<Movie>(`/movies/${id}`, data);
  return updated;
}
