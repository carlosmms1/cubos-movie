import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { movieFormSchema, type MovieFormSchema } from "./validations/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function MovieForm() {
  const form = useForm<MovieFormSchema>({
    resolver: zodResolver(movieFormSchema),
  });
  const control = form.control;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título do filme" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  className="w-full min-h-[80px] rounded-xs border border-border/70 bg-transparent px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                  placeholder="Sinopse ou descrição do filme"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={control}
            name="releaseYear"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Ano de lançamento</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="duration"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Duração (minutos)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="120" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <Input placeholder="Ação, Drama, Comédia..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="director"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diretor</FormLabel>
              <FormControl>
                <Input placeholder="Nome do diretor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="cast"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elenco principal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Atores principais, separados por vírgula"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem/Capa (URL)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center space-x-2 mt-4">
          <Button className="bg-primary/20 hover:bg-primary/30">
            Cancelar
          </Button>
          <Button>Adicionar Filme</Button>
        </div>
      </form>
    </Form>
  );
}
