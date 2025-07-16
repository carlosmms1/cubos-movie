import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string("A senha é obrigatória!").min(8, "Senha muito curta!"),
});
export type SignInFormSchema = z.infer<typeof signInFormSchema>;
