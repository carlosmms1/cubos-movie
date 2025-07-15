import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string("O nome é obrigatório!").min(1, "Insira um nome válido!"),
    email: z.email("E-mail inválido!"),
    password: z
      .string("A senha é obrigatória!")
      .min(8, "A senha deve ter no mínimo 8 caracteres!"),
    confirmPassword: z
      .string("A senha é obrigatória!")
      .min(8, "A senha deve ter no mínimo 8 caracteres!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais!",
    path: ["confirmPassword"],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
