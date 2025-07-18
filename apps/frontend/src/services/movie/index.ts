export type Status = "RELEASED" | "UPCOMING";
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
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export { createMovie, type CreateMoviePayload } from "./create-movie";
export {
  listMovies,
  type ListMoviesParams,
  type ListMoviesResponse,
} from "./list-movies";
export { getMovie } from "./get-movie";
export { deleteMovie } from "./delete-movie";
