import { z } from "zod";

export const restorePasswordFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "fieldRequired" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "invalidEmail",
    }),
});

export type RestorePasswordFormData = z.infer<typeof restorePasswordFormSchema>;
