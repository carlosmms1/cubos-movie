import { api } from "@/lib/connection";
import type { Movie } from ".";

async function fileFromUrl(
  url: string,
  filename: string,
  mimeType?: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  // O tipo pode ser sobrescrito se necessário
  const type = mimeType || blob.type;
  return new File([blob], filename, { type });
}

export async function getMovie(id: string) {
  let movie = await api.get<Movie>(`/movies/${id}`).then((res) => res.data);
  const coverImageFile = await fileFromUrl(
    movie.coverImage,
    `${movie.id}-${movie.title}`
  );

  movie.coverImageFile = coverImageFile;

  return movie;
}
