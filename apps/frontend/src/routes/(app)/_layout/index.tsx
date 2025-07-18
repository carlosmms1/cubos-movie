import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

export const movieSearchSchema = z.object({
  title: z.string().optional(),
  status: z.enum(["RELEASED", "UPCOMING"]).optional(),
  director: z.string().optional(),
  duration: z.coerce.number().int().min(1).optional(),
  releaseStart: z.string().optional(),
  releaseEnd: z.string().optional(),
  page: z.coerce.number().int().min(1).catch(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).catch(10).optional(),
});
export type MovieSearchParams = z.infer<typeof movieSearchSchema>;

import { Filters } from "../@components/filters";
import { useListMovies } from "@/hooks/queries/movie/use-movies";
import { MovieCard, MovieCardPlaceholder } from "../@components/movie-card";
import { MoviePagination } from "../@components/pagination";

export const Route = createFileRoute("/(app)/_layout/")({
  validateSearch: zodValidator(movieSearchSchema),
  component: AppHomePage,
});

function AppHomePage() {
  const { page, title, duration, releaseStart, releaseEnd, director, status } =
    Route.useSearch();
  const { data: movies, isPending: isMoviesPending } = useListMovies({
    page,
    title,
    duration,
    releaseStart,
    releaseEnd,
    director,
    status,
  });

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <Filters />

      <section className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 rounded-xs bg-secondary/70 backdrop-blur-sm p-6 shadow">
        {isMoviesPending &&
          Array.from({ length: 10 }).map((_, idx) => (
            <MovieCardPlaceholder key={idx} />
          ))}
        {movies?.data.map((movie) => (
          <MovieCard
            key={movie.id}
            coverImage={movie.coverImage}
            title={movie.title}
            genre={movie.genre}
            creatorId={movie.creatorId}
            to="/$movieId"
            params={{ movieId: movie.id }}
          />
        ))}
        {!movies?.data.length && !isMoviesPending && (
          <span className="col-span-12 text-muted-foreground">
            {`Lamentamos, mas não encontramos nenhum filme cadastrado... :(`}
          </span>
        )}
      </section>

      <footer className="flex items-center justify-center">
        <MoviePagination
          currentPage={page ?? 1}
          totalPages={movies?.meta.totalPages ?? 0}
        />
      </footer>
    </div>
  );
}
