import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import z from "zod";

dayjs.extend(customParseFormat);

export const filtersFormSchema = z.object({
  duration: z.string().optional(),
  releaseStart: z
    .string()
    .refine(
      (val) => val === "" || dayjs(val, "DD/MM/YYYY", true).isValid(),
      "Data inválida!"
    )
    .transform((val) =>
      val === ""
        ? ""
        : dayjs(val, "DD/MM/YYYY", true).format("YYYY-MM-DD").toString()
    )
    .optional(),
  releaseEnd: z
    .string()
    .refine(
      (val) => val === "" || dayjs(val, "DD/MM/YYYY", true).isValid(),
      "Data inválida!"
    )
    .transform((val) =>
      val === ""
        ? ""
        : dayjs(val, "DD/MM/YYYY", true).format("YYYY-MM-DD").toString()
    )
    .optional(),
  director: z.string().optional(),
  status: z.enum(["RELEASED", "UPCOMING"]).optional(),
});
export type FiltersFormSchema = z.infer<typeof filtersFormSchema>;
