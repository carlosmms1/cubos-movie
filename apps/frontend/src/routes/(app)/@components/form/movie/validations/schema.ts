import z from "zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const movieFormSchema = z.object({
  coverImage: z
    .instanceof(File, { error: "Capa do filme é obrigatória!" })
    .refine((file) => file.size > 0, { message: "Arquivo inválido!" }),
  title: z
    .string({ error: "Título obrigatório!" })
    .min(1, "Título obrigatório!"),
  originalTitle: z
    .string({ error: "Título original é obrigatório!" })
    .min(1, "Título original é obrigatório!"),
  description: z
    .string({ error: "Descrição obrigatória!" })
    .min(1, "Descrição obrigatória!"),
  release: z
    .string()
    .refine((val) => dayjs(val, "DD/MM/YYYY", true).isValid(), "Data inválida!")
    .transform((val) => dayjs(val, "DD/MM/YYYY").toISOString()),
  duration: z
    .number({ error: "Duração obrigatória!" })
    .int()
    .min(1, "Duração obrigatória!"),
  genre: z
    .array(z.string({ error: "Genêro obrigatório!" }), {
      error: "Genêro obrigatório!",
    })
    .min(1, "É necessário ao menos um gênero!"),
  languages: z
    .array(z.string({ error: "Idioma obrigatório!" }), {
      error: "Idioma obrigatório!",
    })
    .min(1, "É necessário ao menos um gênero!"),
  director: z
    .string({ error: "Diretor obrigatório!" })
    .min(1, "Diretor obrigatório!"),
  cast: z
    .string({ error: "Elenco obrigatório!" })
    .min(1, "Elenco obrigatório!"),
  budget: z.string().optional(),
  revenue: z.string().optional(),
  profit: z.string().optional(),
  trailerUrl: z.url({ error: "URL inválida!" }).optional(),
  status: z.enum(["UPCOMING", "RELEASED"]).optional(),
  popularity: z.number().int().optional(),
  voteCount: z.number().int().optional(),
});
export type MovieFormSchema = z.infer<typeof movieFormSchema>;
