import { useTranslation } from "react-i18next";
import {
  type RestorePasswordFormData,
  restorePasswordFormSchema,
} from "./RestorePasswordForm.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

const RestorePasswordForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestorePasswordFormData>({
    resolver: zodResolver(restorePasswordFormSchema),
  });

  const onSubmit = async (data: RestorePasswordFormData) => {
    setIsSubmitting(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:5173/restore-password/new-password",
      });
      if (error) throw error;

      setMessage(t("restorePasswordMessageSent"));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error sending password reset email:", error.message);
      setMessage(t("errorDuringPasswordReset", { error: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
      <Card className="w-full relative max-w-md shadow-lg border-[#bf6629] shadow-[#bf6629]/50 gap-y-2 md:gap-y-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {t("restorePassword")}
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
            <Button
              type="submit"
              variant="outline"
              className="w-full border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
            >
              {isSubmitting ? t("loading") : t("submitRestorePassword")}
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

export default RestorePasswordForm;
