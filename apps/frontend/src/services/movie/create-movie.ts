import { api } from "@/lib/connection";

export interface CreateMoviePayload {
  coverImage: File;
  title: string;
  originalTitle: string;
  description: string;
  release: string;
  duration: number;
  genre: string[];
  languages: string[];
  director: string;
  cast: string;
  budget?: string;
  revenue?: string;
  profit?: string;
  trailerUrl?: string;
  status?: "RELEASED" | "UPCOMING";
  popularity?: number;
  voteCount?: number;
}

export async function createMovie(payload: CreateMoviePayload) {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("originalTitle", payload.originalTitle);
  formData.append("description", payload.description);
  formData.append("release", payload.release);
  formData.append("duration", String(payload.duration));
  formData.append("director", payload.director);
  formData.append("cast", payload.cast);
  formData.append("budget", payload.budget ?? "");
  formData.append("revenue", payload.revenue ?? "");
  formData.append("profit", payload.profit ?? "");
  formData.append("trailerUrl", payload.trailerUrl ?? "");
  formData.append("status", payload.status ?? "UPCOMING");
  formData.append("popularity", String(payload.popularity ?? 0));
  formData.append("voteCount", String(payload.voteCount ?? 0));

  payload.genre.forEach((genre) => {
    formData.append("genre[]", genre);
  });

  payload.languages.forEach((language) => {
    formData.append("languages[]", language);
  });

  if (payload.coverImage instanceof File) {
    formData.append("coverImage", payload.coverImage);
  }

  return await api
    .post("/movies", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}
