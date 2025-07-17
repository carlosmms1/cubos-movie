import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
  filtersFormSchema,
  type FiltersFormSchema,
} from "./validations/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { maskDate } from "@/lib/masks/date";

dayjs.extend(customParseFormat);

type FiltersFormProps = {
  onApplyFilters?: () => void;
};

export function FiltersForm({ onApplyFilters = () => {} }: FiltersFormProps) {
  const searchParams = useSearch({ strict: false });
  const navigate = useNavigate();

  const filtersForm = useForm<FiltersFormSchema>({
    resolver: zodResolver(filtersFormSchema),
    defaultValues: {
      duration: searchParams.duration?.toString(),
      releaseStart: searchParams.releaseStart
        ? dayjs(searchParams.releaseStart).format("DD/MM/YYYY").toString()
        : "",
      releaseEnd: searchParams.releaseEnd
        ? dayjs(searchParams.releaseEnd).format("DD/MM/YYYY").toString()
        : "",
      director: searchParams.director,
      status: searchParams.status,
    },
  });

  return (
    <Form {...filtersForm}>
      <form
        onSubmit={filtersForm.handleSubmit((data) => {
          navigate({
            to: "/",
            search: (prev) => ({
              ...prev,
              duration: data.duration?.length ? data.duration : undefined,
              releaseStart: data.releaseStart?.length
                ? data.releaseStart
                : undefined,
              releaseEnd: data.releaseEnd?.length ? data.releaseEnd : undefined,
              director: data.director?.length ? data.director : undefined,
              status: data.status,
            }),
          });
          onApplyFilters();
        })}
        className="space-y-4"
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={filtersForm.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração (minutos)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="120"
                    type="number"
                    inputMode="numeric"
                  />
                </FormControl>
                <FormDescription>
                  O filtro irá buscar filmes com duração igual ou menor que o
                  valor inserido
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <FormField
              control={filtersForm.control}
              name="releaseStart"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Data de Início</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(maskDate(e.target.value));
                      }}
                      placeholder="dd/mm/aaaa"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={filtersForm.control}
              name="releaseEnd"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Data de Fim</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(maskDate(e.target.value));
                      }}
                      placeholder="dd/mm/aaaa"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={filtersForm.control}
            name="director"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diretor</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex:. Martin Scorsese" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={filtersForm.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situação</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="RELEASED">Lançado</SelectItem>
                    <SelectItem value="UPCOMING">
                      Aguardando Lançamento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="bg-primary/20 hover:bg-primary/30">
              Cancelar
            </Button>
          </DialogClose>
          <Button>Aplicar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
