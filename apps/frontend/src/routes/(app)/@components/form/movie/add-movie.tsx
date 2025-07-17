import { useState } from "react";

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
import { useCreateMovie } from "@/hooks/mutations/movie";

export function AddMovie() {
  const [open, setOpen] = useState(false);

  const { mutate: createMovie, isPending: isCreateMoviePending } =
    useCreateMovie({
      onDone() {
        setOpen(false);
      },
    });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Adicionar Filme</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Filme</SheetTitle>
          <SheetDescription>
            Preencha as informações abaixo para adicionar um novo filme
          </SheetDescription>
        </SheetHeader>

        <div className="h-full overflow-y-scroll p-3">
          <MovieForm onSubmit={createMovie} isPending={isCreateMoviePending} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
