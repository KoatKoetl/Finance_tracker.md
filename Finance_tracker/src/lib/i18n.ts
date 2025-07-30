import type { error } from "console";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { success } from "zod";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        appName: "Finance Tracker",
        welcome: "Welcome",
        registration: "Registration",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        submitRegistration: "Register",
        submitting: "Submitting",
        fieldRequired: "This field is required",
        passwordsDoNotMatch: "Passwords do not match",
        invalidEmail: "Error: Invalid email address",
        passwordTooShort: "Password must be at least 6 characters long",
        recaptchaFailed: "Error: reCAPTCHA verification failed {{error}}",
        unknownError: "An unknown error occurred",
        registrationFailed: "Error: Registration failed",
        registrationSuccessOtpSent:
          "Registration successful. Verification code sent to your email address.",
        unexpectedError: "An unexpected error occurred",
        failed: "Failed",
        error: "Error",
        resendingOtp: "Resending verification code...",
        otpResentSuccess: "Verification code resent to your email address.",
        otpResentFailed: "Error: Failed to resend verification code: {{error}}",
        verifyOtp: "Verify code",
        otpSentTo: "Verification code sent to {{email}}",
        otpCode: "Verification code",
        verifying: "Verifying...",
        verifyCode: "Verify code",
        resending: "Resending...",
        resendOtp: "Resend code",
        missingEmailForVerification: "Error: Missing email for verification",
        otpVerifiedAndSignedIn: "Verification code verified and signed in",
      },
    },
    ro: {
      translation: {
        appName: "Finance Tracker",
        welcome: "Bine ai venit",
        registration: "Înregistrare",
        email: "Email",
        password: "Parolă",
        confirmPassword: "Confirmă Parola",
        submitRegistration: "Înregistrează-te",
        submitting: "Trimitere",
        fieldRequired: "Acest câmp este obligatoriu",
        passwordsDoNotMatch: "Parolele nu se potrivesc",
        invalidEmail: "Eroare: Adresă de email invalidă",
        passwordTooShort: "Parola trebuie să aibă cel puțin 6 caractere",
        recaptchaFailed: "Eroare: Verificarea reCAPTCHA a esuat {{error}}",
        unknownError: "A aparut o eroare necunoscuta",
        registrationFailed: "Eroare la inregistrare",
        registrationSuccessOtpSent:
          "Inregistrare reusita. Cod de verificare trimis la adresa de email.",
        unexpectedError: "A aparut o eroare necunoscuta",
        failed: "Eroare",
        error: "Eroare",
        resendingOtp: "Trimite din nou codul de verificare...",
        otpResentSuccess:
          "Codul de verificare a fost trimis din nou la adresa de email.",
        otpResentFailed:
          "Eroare: Nu s-a putut trimite din nou codul de verificare: {{error}}",
        verifyOtp: "Verificare cod",
        otpSentTo: "Codul de verificare a fost trimis la {{email}}",
        otpCode: "Cod de verificare",
        verifying: "Verificare...",
        verifyCode: "Verificare cod",
        resending: "Trimite din nou...",
        resendOtp: "Trimite din nou codul de verificare",
        missingEmailForVerification:
          "Eroare: Adresa de email lipsă pentru verificare",
        otpVerifiedAndSignedIn:
          "Codul de verificare a fost verificat si autentificat",
      },
    },
    ru: {
      translation: {
        appName: "Finance Tracker",
        welcome: "Добро пожаловать",
        registration: "Регистрация",
        email: "Электронная почта",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        submitRegistration: "Зарегистрироваться",
        submitting: "Отправка",
        fieldRequired: "Это поле обязательно для заполнения",
        passwordsDoNotMatch: "Пароли не совпадают",
        invalidEmail: "Ошибка: Недопустимый адрес электронной почты",
        passwordTooShort: "Пароль должен содержать не менее 6 символов",
        recaptchaFailed: "Проверка reCAPTCHA не удалась {{error}}",
        unknownError: "Произошла неизвестная ошибка",
        registrationFailed: "Ошибка при регистрации",
        registrationSuccessOtpSent:
          "Регистрация прошла успешно. Проверочный код отправлен на ваш адрес электронной почты.",
        unexpectedError: "Произошла неизвестная ошибка",
        failed: "Ошибка",
        error: "Ошибка",
        resendingOtp: "Повторная отправка проверочного кода...",
        otpResentSuccess:
          "Проверочный код повторно отправлен на ваш адрес электронной почты.",
        otpResentFailed:
          "Ошибка: Не удалось повторно отправить проверочный код: {{error}}",
        verifyOtp: "Проверка кода",
        otpSentTo: "Проверочный код отправлен на {{email}}",
        otpCode: "Проверочный код",
        verifying: "Проверка...",
        verifyCode: "Проверка кода",
        resending: "Повторная отправка...",
        resendOtp: "Повторная отправка проверочного кода",
        missingEmailForVerification:
          "Ошибка: Отсутствует адрес электронной почты для проверки",
        otpVerifiedAndSignedIn:
          "Проверочный код успешно проверен и авторизован",
      },
    },
  },
});

export default i18n;
