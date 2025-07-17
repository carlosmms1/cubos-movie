import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import searchIcon from "@/assets/icons/search.svg";
import { AddMovie } from "./form/movie/add-movie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiltersForm } from "./form/filters";

dayjs.extend(customParseFormat);

export function Filters() {
  const navigate = useNavigate();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const debounceDelay = 800;
    const handler = setTimeout(() => {
      navigate({
        to: "/",
        search: (prev) => ({
          ...prev,
          ...(searchTitle.length
            ? { title: searchTitle }
            : { title: undefined }),
        }),
      });
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTitle]);

  return (
    <section className="flex justify-end items-center space-x-3">
      <div className="relative max-w-[488px] w-full">
        <Input
          id="search"
          placeholder="Pesquise por filmes"
          className="w-full"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
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

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary/20 hover:bg-primary/30">Filtros</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Filtros</DialogTitle>
            <DialogDescription>
              Selecione os filtros abaixo para aplicar
            </DialogDescription>
          </DialogHeader>

          <FiltersForm
            onApplyFilters={() => {
              setFiltersOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <AddMovie />
    </section>
  );
}
