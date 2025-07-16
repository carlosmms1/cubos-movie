import z from "zod";

export const movieFormSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  releaseYear: z.coerce.number().int().min(1888, "Ano inválido"),
  duration: z.coerce.number().int().min(1, "Duração obrigatória"),
  genre: z.string().min(1, "Gênero obrigatório"),
  director: z.string().min(1, "Diretor obrigatório"),
  cast: z.string().min(1, "Elenco obrigatório"),
  coverImage: z.url("URL da imagem inválida"),
});
export type MovieFormSchema = z.input<typeof movieFormSchema>;
