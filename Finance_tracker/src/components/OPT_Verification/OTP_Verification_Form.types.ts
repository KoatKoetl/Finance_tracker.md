import { z } from "zod";

export const otpFormSchema = z.object({
  otp: z
    .string()
    .nonempty("fieldRequired")
    .min(6, "OTP_must_be_6_characters")
    .max(6, "OTP_must_be_6_characters"),
});

export type otpFormData = z.infer<typeof otpFormSchema>;
