import { supabase } from "../../lib/supabaseClient";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { otpFormSchema, type otpFormData } from "./OTP_Verification_Form.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Shadcn UI components
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

const OTP_Verification_Form = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<otpFormData>({
    resolver: zodResolver(otpFormSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      setMessage(t("otpSentTo", { email: emailFromUrl }));
    } else {
      setMessage(t("missingEmailForVerification", { error: "missing email" }));
      console.warn(
        "Email not found in URL. Please ensure email is passed to OTP verification page."
      );
    }
  }, [t]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setMessage(
            t("otpVerifiedAndSignedIn", { email: session.user.email })
          );
          // console.log("User signed in after OTP verification:", session.user);
          navigate("/");
        } else if (event === "SIGNED_OUT") {
          setMessage(t("signedOut"));
        }
      }
    );

    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, [t, navigate]);

  const onSubmit: SubmitHandler<otpFormData> = async (data) => {
    if (!email) {
      setMessage(t("missingEmailForVerification", { error: "missing email" }));
      return;
    }

    setIsVerifying(true);
    setMessage("");

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: email,
        token: data.otp,
        type: "signup",
      });

      if (verifyError) {
        console.error("OTP verification failed:", verifyError.message);
        setMessage(t("otpVerificationFailed", { error: verifyError.message }));
      } else {
        console.log("OTP verification successful, awaiting session update.");
      }
    } catch (err) {
      console.error("Unexpected error during OTP verification:", err);
      setMessage(t("unexpectedErrorOtp"));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setMessage(t("missingEmailForResend"));
      return;
    }

    setIsResending(true);
    setMessage(t("resendingOtp"));

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
        },
      });
      if (error) throw error;
      setMessage(t("otpResentSuccess"));
    } catch (error: any) {
      console.error("Error resending OTP:", error.message);
      setMessage(t("otpResentFailed", { error: error.message }));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
      <Card className="w-full max-w-md shadow-lg border-[#bf6629] shadow-[#bf6629]/50 gap-y-2 md:gap-y-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {t("verifyOtp")}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {email && (
              <p className="text-center text-sm text-gray-600 mb-4">
                {t("otpSentTo", { email: email })}
              </p>
            )}

            <div>
              <Label className="mb-1" htmlFor="otp">
                {t("otpCode")}
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="••••••"
                className="focus-visible:ring-2"
                {...register("otp")}
                disabled={isVerifying}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">
                  {t(errors.otp.message || "fieldRequired")}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="outline"
              className="w-full border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
              disabled={isVerifying}
            >
              {isVerifying ? t("verifying") : t("verifyCode")}
            </Button>
          </form>

          <Button
            variant="link"
            onClick={handleResendOtp}
            disabled={isVerifying || isResending || !email}
            className="w-full mt-2 text-primaryOrange hover:text-[#a05522]"
          >
            {isResending ? t("resending") : t("resendOtp")}
          </Button>

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

export default OTP_Verification_Form;
