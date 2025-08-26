import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabaseClient";
import {
  setNewPasswordFormSchema,
  type SetNewPasswordFormData,
} from "./NewPasswordForm.types";

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

const NewPasswordForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event == "PASSWORD_RECOVERY") {
        setShowForm(true);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(setNewPasswordFormSchema),
  });

  const onSubmit = async (data: SetNewPasswordFormData) => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setMessage(t("errorDuringPasswordReset", { error: error.message }));
    } else {
      setMessage(t("restorePasswordSuccess"));

      setTimeout(() => {
        navigate("/personal");
      }, 2000);
    }
    setIsSubmitting(false);
  };

  if (!showForm) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
        <div>
          <p className="text-center mb-4 font-semibold border-2 border-red-500 rounded-md p-4 bg-red-100">
            {t("invalidOrExpiredLink")}
          </p>
          <Link to="/">
            <Button
              variant="outline"
              className="w-full border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
              onClick={() => setShowForm(true)}
            >
              {t("homeButton")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <Label className="mb-1" htmlFor="password">
                {t("newPassword")}
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

export default NewPasswordForm;
