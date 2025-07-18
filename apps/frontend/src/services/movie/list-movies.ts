import { api } from "@/lib/connection";
import type { Movie, Status } from ".";

export interface ListMoviesParams {
  title?: string;
  status?: Status;
  director?: string;
  duration?: number;
  releaseStart?: string; // ISO string
  releaseEnd?: string; // ISO string
  page?: number;
  pageSize?: number;
}

export interface ListMoviesResponse {
  data: Movie[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export async function listMovies(params: ListMoviesParams = {}) {
  const { data } = await api.get<ListMoviesResponse>("/movies", { params });
  return data;
}
