import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
      },
    },
  },
});

export default i18n;
