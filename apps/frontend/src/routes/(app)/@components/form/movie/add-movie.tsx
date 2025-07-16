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

export function AddMovie() {
  return (
    <Sheet>
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

        <div className="p-3">
          <MovieForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
