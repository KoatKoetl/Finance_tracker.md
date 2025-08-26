import { z } from "zod";

export const setNewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "fieldRequired" })
      .min(6, { message: "passwordTooShort" }),
    confirmPassword: z.string().nonempty({ message: "fieldRequired" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordsDoNotMatch",
    path: ["confirmPassword"],
  });

export type SetNewPasswordFormData = z.infer<typeof setNewPasswordFormSchema>;
