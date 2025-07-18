import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MovieForm } from ".";
import { useUpdateMovie } from "@/hooks/mutations/movie";
import { useGetMovie } from "@/hooks/queries/movie";

type UpdateMovieProps = {
  movieId: string;
};

dayjs.extend(customParseFormat);

export function UpdateMovie({ movieId }: UpdateMovieProps) {
  const [open, setOpen] = useState(false);

  const { data: movie, isPending: isMoviePending } = useGetMovie(movieId);
  const { mutate: updateMovie, isPending: isUpdateMoviePending } =
    useUpdateMovie({
      onDone() {
        setOpen(false);
      },
    });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Editar</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Filme</SheetTitle>
          <SheetDescription>
            Preencha as informações abaixo para editar o filme
          </SheetDescription>
        </SheetHeader>

        <div className="h-full overflow-y-scroll p-3">
          {!isMoviePending ? (
            <MovieForm
              onSubmit={({ coverImage, ...data }) => {
                updateMovie({
                  id: movieId,
                  data,
                });
              }}
              isPending={isUpdateMoviePending}
              defaultValues={{
                ...movie,
                release: dayjs(movie?.release).format("DD/MM/YYYY"),
                coverImage: movie?.coverImageFile,
              }}
            />
          ) : (
            <div className="w-full h-9 rounded-xs bg-input animate-pulse" />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
