import { api } from "@/lib/connection";

type Status = "RELEASED" | "UPCOMING";

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

export interface Movie {
  id: string;
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
  status: Status;
  popularity: number;
  voteCount: number;
  coverImage: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
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
