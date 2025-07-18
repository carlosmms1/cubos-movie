import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Button } from "@/components/ui/button";
import { useGetMovie } from "@/hooks/queries/movie";
import { Badge } from "@/components/ui/badge";
import { languagesTitles } from "@/utils/languages";
import { genresTitles } from "@/utils/genres";

dayjs.extend(customParseFormat);

export const Route = createFileRoute("/(app)/_layout/$movieId")({
  component: MoviePage,
});

const status = {
  RELEASED: "Lançado",
  UPCOMING: "Aguardando Lançamento",
} as const;

function MoviePage() {
  const { movieId } = Route.useParams();
  const { data: movie } = useGetMovie(movieId);

  return (
    <div className="overflow-hidden">
      <section className="relative p-8 space-y-4">
        <div className="absolute top-4 left-4 -z-10 h-[596px] w-full">
          <img
            src={movie?.coverImage}
            alt={movie?.title}
            className="h-full w-full object-cover opacity-30 backdrop-blur-md rounded-xs"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.95) 10%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        <div className="flex items-start justify-between">
          <div className="leading-tight">
            <h1 className="text-[32px] font-semibold text-primary-foreground">
              {movie?.title}
            </h1>
            <h2 className="text-[16px] text-primary-foreground/80">
              Título original: {movie?.originalTitle}
            </h2>
          </div>

          <div className="space-x-4">
            <Button className="bg-primary/20 hover:bg-primary/30">
              Deletar
            </Button>
            <Button>Editar</Button>
          </div>
        </div>

        <div className="flex space-x-4">
          <img
            src={movie?.coverImage}
            alt={movie?.title}
            className="h-[542px] w-[374px] rounded-xs shadow hover:scale-[101%] transition-[scale]"
          />

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-end gap-4">
              <section className="p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                <p className="uppercase text-xs font-semibold text-secondary-foreground">
                  POPULARIDADE
                </p>
                <span className="text-sm text-primary-foreground font-bold">
                  {movie?.popularity ?? 0}
                </span>
              </section>

              <section className="p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                <p className="uppercase text-xs font-semibold text-secondary-foreground">
                  VOTOS
                </p>
                <span className="text-sm text-primary-foreground font-bold">
                  {movie?.voteCount ?? 0}
                </span>
              </section>
            </div>

            <div className="grid grid-cols-6 gap-4">
              <section className="col-span-3 row-span-4 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                <p className="uppercase text-xs font-semibold text-secondary-foreground">
                  SINOPSE
                </p>
                <span className="text-[16px] text-primary-foreground">
                  {movie?.description ?? "⎯"}
                </span>
              </section>
              <div className="col-span-3 flex gap-4">
                <section className="flex-1 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                  <p className="uppercase text-xs font-semibold text-secondary-foreground">
                    LANÇAMENTO
                  </p>
                  <span className="text-sm text-primary-foreground font-bold">
                    {movie?.release
                      ? dayjs(movie.release).format("DD/MM/YYYY")
                      : "⎯"}
                  </span>
                </section>
                <section className="flex-1 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                  <p className="uppercase text-xs font-semibold text-secondary-foreground">
                    DURAÇÃO
                  </p>
                  <span className="text-sm text-primary-foreground font-bold">
                    {movie?.duration
                      ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}min`
                      : "0h 0min"}
                  </span>
                </section>
              </div>

              <div className="col-span-3 flex gap-4">
                <section className="flex-1 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                  <p className="uppercase text-xs font-semibold text-secondary-foreground">
                    SITUAÇÃO
                  </p>
                  <span className="text-sm text-primary-foreground font-bold">
                    {movie?.status ? status[movie.status] : "⎯"}
                  </span>
                </section>
                <section className="flex-1 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                  <p className="uppercase text-xs font-semibold text-secondary-foreground">
                    IDIOMA
                  </p>
                  <span className="text-sm text-primary-foreground font-bold space-x-2">
                    {movie?.languages.map((language) => (
                      <Badge className="rounded-xs px-1 font-normal">
                        {
                          languagesTitles[
                            language as keyof typeof languagesTitles
                          ]
                        }
                      </Badge>
                    ))}
                  </span>
                </section>
              </div>

              <div className="col-span-3 flex gap-4">
                <section className="flex-1 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                  <p className="uppercase text-xs font-semibold text-secondary-foreground">
                    ORÇAMENTO
                  </p>
                  <span className="text-sm text-primary-foreground font-bold">
                    {movie?.budget?.length ? movie.budget : "⎯"}
                  </span>
                </section>

                <section className="flex-1 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                  <p className="uppercase text-xs font-semibold text-secondary-foreground">
                    RECEITA
                  </p>
                  <span className="text-sm text-primary-foreground font-bold">
                    {movie?.revenue?.length ? movie.revenue : "⎯"}
                  </span>
                </section>

                <section className="flex-1 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                  <p className="uppercase text-xs font-semibold text-secondary-foreground">
                    LUCRO
                  </p>
                  <span className="text-sm text-primary-foreground font-bold">
                    {movie?.profit?.length ? movie.profit : "⎯"}
                  </span>
                </section>
              </div>

              <section className="row-start-5 col-span-3 p-4 rounded-xs bg-secondary/50 space-y-2 backdrop-blur-sm">
                <p className="uppercase text-xs font-semibold text-secondary-foreground">
                  GÊNEROS
                </p>
                <span className="text-sm text-primary-foreground font-bold space-x-2">
                  {movie?.genre.map((genre) => (
                    <Badge className="rounded-xs px-1 font-normal">
                      {genresTitles[genre as keyof typeof genresTitles]}
                    </Badge>
                  ))}
                </span>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="p-8 space-y-4">
        <h1 className="text-2xl font-semibold text-primary-foreground">
          Trailer
        </h1>

        {/* TODO: Implement embbed trailer video */}
      </section>
    </div>
  );
}
