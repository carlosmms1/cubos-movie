import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import searchIcon from "@/assets/icons/search.svg";

export function Filters() {
  return (
    <section className="flex justify-end items-center space-x-3">
      <div className="relative max-w-[488px] w-full">
        <Input
          id="search"
          placeholder="Pesquise por filmes"
          className="w-full"
        />
        <label
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-2 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={"Pesquise por filmes"}
          aria-controls="search"
          htmlFor="search"
        >
          <img src={searchIcon} aria-hidden={true} />
        </label>
      </div>
      <Button className="bg-primary/20 hover:bg-primary/30">Filtros</Button>
      <Button>Adicionar Filme</Button>
    </section>
  );
}
