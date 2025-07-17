import { createFileRoute } from "@tanstack/react-router";

import { Filters } from "../@components/filters";
import { useListMovies } from "@/hooks/queries/movie/use-movies";
import { MovieCard, MovieCardPlaceholder } from "../@components/movie-card";

export const Route = createFileRoute("/(app)/_layout/")({
  component: AppHomePage,
});

function AppHomePage() {
  const { data: movies, isPending: isMoviesPending } = useListMovies();

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <Filters />

      <section className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 rounded-xs bg-secondary/70 backdrop-blur-sm p-6">
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
          />
        ))}
      </section>

      <footer className="">pagination</footer>
    </div>
  );
}
