import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "usernameTooShort" })
      .max(50, { message: "usernameTooLong" }),
    email: z
      .string()
      .nonempty({ message: "fieldRequired" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "invalidEmail",
      }),
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

export type RegisterFormData = z.infer<typeof registerFormSchema>;
