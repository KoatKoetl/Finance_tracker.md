import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { supabase } from "../../lib/supabaseClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, type AuthFormData } from "./AuthForm.types";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const onSubmit = async (data: AuthFormData) => {
    if (!recaptchaRef.current) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const recaptchaRes = await fetch(
        "https://jqqkpjvlrvzcevfdahxn.supabase.co/functions/v1/reCaptchaCheck",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recaptchaToken: token }),
        }
      );

      const recaptchaResult = await recaptchaRes.json();

      if (!recaptchaRes.ok || !recaptchaResult.success) {
        console.error(
          "reCAPTCHA verification failed:",
          recaptchaResult.error || recaptchaResult.message
        );
        setMessage(
          t("recaptchaFailed", {
            error: recaptchaResult.error || t("unknownError"),
          })
        );
        return;
      }

      const passwordCheckRes = await fetch(
        "https://jqqkpjvlrvzcevfdahxn.supabase.co/functions/v1/passwordCheck",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const passwordCheckResult = await passwordCheckRes.json();

      if (!passwordCheckRes.ok || !passwordCheckResult.success) {
        console.error(
          "Password check failed:",
          passwordCheckResult.error || passwordCheckResult.message
        );
        setMessage(
          t("passwordCheckFailed", {
            error: passwordCheckResult.error || t("unknownError"),
          })
        );
        return;
      }

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: data.email,
      });

      if (otpError) {
        throw otpError;
      } else {
        setMessage(t("loginSuccess"));
        navigate("/auth/verification", {
          state: { email: data.email },
        });
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setMessage(t("loginFailed", { error: t(error.code) }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
      <Card className="w-full max-w-md shadow-lg border-[#bf6629] shadow-[#bf6629]/50 gap-y-2 md:gap-y-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{t("login")}</CardTitle>
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

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              size="invisible"
              ref={recaptchaRef}
            />

            <Button
              type="submit"
              variant="outline"
              className="w-full mb-4 border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("submitLogin")}
            </Button>
          </form>

          <Link to="/register">
            <Button
              variant="outline"
              className="w-full border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
            >
              {t("register")}
            </Button>
          </Link>
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

export default AuthForm;
