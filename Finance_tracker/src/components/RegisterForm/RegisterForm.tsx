import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  registerFormSchema,
  type RegisterFormData,
} from "./RegisterForm.types";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

// Shadcn UI components
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

const RegisterForm = () => {
  const { t } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!recaptchaRef.current) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const res = await fetch(
        "https://jqqkpjvlrvzcevfdahxn.supabase.co/functions/v1/reCaptchaCheck",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recaptchaToken: token }),
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        console.error(
          "reCAPTCHA verification failed:",
          result.error || result.message
        );
        setMessage(
          t("recaptchaFailed", { error: result.error || t("unknownError") })
        );
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        console.error(
          "Supabase registration/OTP send failed:",
          authError.message
        );
        setMessage(t("registrationFailed", { error: authError.message }));
      } else {
        // console.log("Supabase signup/OTP email sent successfully!", authData);
        setMessage(t("registrationSuccessOtpSent"));

        navigate(
          "/register/verification?email=" + encodeURIComponent(data.email)
        );
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      setMessage(t("unexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
      <Card className="w-full relative max-w-md shadow-lg border-[#bf6629] shadow-[#bf6629]/50 gap-y-2 md:gap-y-6">
        <Link to="/auth">
          <MoveLeft className="absolute top-2 left-2" />
        </Link>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("submitRegistration")}
            </Button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes(t("failed")) || message.includes(t("error"))
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
