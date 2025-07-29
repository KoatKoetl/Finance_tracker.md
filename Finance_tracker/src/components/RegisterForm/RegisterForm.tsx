import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  registerFormSchema,
  type RegisterFormData,
} from "./RegisterForm.types";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

// Shadcn UI components
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

const RegisterForm = () => {
  const { t } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!recaptchaRef.current) return;

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const res = await fetch(
        "https://jqqkpjvlrvzcevfdahxn.supabase.co/functions/v1/reCaptchaCheck",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, recaptchaToken: token }),
        }
      );

      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      const result = await res.json();
      console.log("Response body:", result);

      if (!res.ok) {
        console.error("Registration failed:", result.error || result.message);
        // TODO: Show error message to user
        return;
      }

      console.log("User registered successfully:", result.user);
      // TODO: Redirect user or show success UI
    } catch (err) {
      console.error("Unexpected error:", err);
      // TODO: Show fallback error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
      <Card className="w-full max-w-md shadow-lg border-[#bf6629] shadow-[#bf6629]/50 gap-y-2 md:gap-y-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {t("registration")}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="mb-1" htmlFor="email">
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="focus-visible:ring-2"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {t(errors.email.message || "fieldRequired")}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-1" htmlFor="password">
                {t("password")}
              </Label>
              <Input
                id="password"
                type="password"
                className="focus-visible:ring-2"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {t(errors.password.message || "fieldRequired")}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-1" htmlFor="confirmPassword">
                {t("confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="focus-visible:ring-2"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {t(errors.confirmPassword.message || "fieldRequired")}
                </p>
              )}
            </div>

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              size="invisible"
              ref={recaptchaRef}
            />

            <Button
              type="submit"
              variant="outline"
              className="w-full border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
            >
              {t("submitRegistration")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
