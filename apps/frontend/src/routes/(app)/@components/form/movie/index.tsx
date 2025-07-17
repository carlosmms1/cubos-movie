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
import { FileUpload } from "@/components/file-upload";
import { FacetedInput } from "@/components/faceted-input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { SheetClose } from "@/components/ui/sheet";
import { maskDate } from "@/lib/masks/date";

type MovieFormProps = {
  onSubmit?: (data: MovieFormSchema) => void;
  isPending?: boolean;
};

export function MovieForm({
  onSubmit = () => {},
  isPending = false,
}: MovieFormProps) {
  const form = useForm<MovieFormSchema>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      status: "UPCOMING",
    },
  });
  const control = form.control;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Capa do Filme</FormLabel>
              <FormControl>
                <FileUpload
                  options={{
                    onFilesChange(files) {
                      const file = files[0]?.file;
                      field.onChange(file);
                    },
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Título</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Título do filme"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="originalTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Título Original</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Título original do filme"
                  {...field}
                />
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
              <FormLabel required>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
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
            name="release"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel required>Data de Lançamento</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="dd/mm/aaaa"
                    onChange={(e) => {
                      field.onChange(maskDate(e.target.value));
                    }}
                  />
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
                <FormLabel required>Duração (minutos)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="number"
                    placeholder="120"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value, 10));
                    }}
                  />
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
              <FormLabel required>Gênero</FormLabel>
              <FormControl>
                <FacetedInput
                  disabled={isPending}
                  value={field.value}
                  onChange={(data) => {
                    field.onChange(data);
                  }}
                  placeholder="Ação, Drama, Comédia..."
                  options={[
                    { id: "action", title: "Ação" },
                    { id: "adventure", title: "Aventura" },
                    { id: "animation", title: "Animação" },
                    { id: "comedy", title: "Comédia" },
                    { id: "crime", title: "Crime" },
                    { id: "documentary", title: "Documentário" },
                    { id: "drama", title: "Drama" },
                    { id: "family", title: "Família" },
                    { id: "fantasy", title: "Fantasia" },
                    { id: "history", title: "História" },
                    { id: "horror", title: "Terror" },
                    { id: "music", title: "Música" },
                    { id: "mystery", title: "Mistério" },
                    { id: "romance", title: "Romance" },
                    { id: "science-fiction", title: "Ficção Científica" },
                    { id: "thriller", title: "Suspense" },
                    { id: "war", title: "Guerra" },
                    { id: "western", title: "Faroeste" },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Idiomas</FormLabel>
              <FormControl>
                <FacetedInput
                  disabled={isPending}
                  value={field.value}
                  onChange={(data) => {
                    field.onChange(data);
                  }}
                  placeholder="Português, Inglês, Espanhol..."
                  options={[
                    { id: "pt", title: "Português" },
                    { id: "en", title: "Inglês" },
                    { id: "es", title: "Espanhol" },
                    { id: "fr", title: "Francês" },
                    { id: "it", title: "Italiano" },
                    { id: "de", title: "Alemão" },
                    { id: "ja", title: "Japonês" },
                    { id: "ko", title: "Coreano" },
                    { id: "zh", title: "Chinês" },
                    { id: "ru", title: "Russo" },
                    { id: "hi", title: "Hindi" },
                    { id: "ar", title: "Árabe" },
                    { id: "tr", title: "Turco" },
                    { id: "sv", title: "Sueco" },
                    { id: "nl", title: "Holandês" },
                  ]}
                />
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
              <FormLabel required>Diretor</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Nome do diretor"
                  {...field}
                />
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
              <FormLabel required>Elenco principal</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
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
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orçamento</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="$8M" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receita</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="$205M" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="profit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lucro</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="$197M" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="trailerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Trailer</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="https://" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Situação</FormLabel>
              <Select
                disabled={isPending}
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UPCOMING">
                    Aguardando Lançamento
                  </SelectItem>
                  <SelectItem value="RELEASED">Lançado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="popularity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Popularidade</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="number"
                  placeholder="10498"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value, 10));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="voteCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votos</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="number"
                  placeholder="5074"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value, 10));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center space-x-2 mt-4">
          <SheetClose asChild>
            <Button
              disabled={isPending}
              type="button"
              className="bg-primary/20 hover:bg-primary/30"
            >
              Cancelar
            </Button>
          </SheetClose>
          <Button disabled={isPending}>Adicionar Filme</Button>
        </div>
      </form>
    </Form>
  );
}
