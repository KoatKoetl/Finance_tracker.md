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
        fieldRequired: "This field is required",
        passwordsDoNotMatch: "Passwords do not match",
        invalidEmail: "Invalid email address",
        passwordTooShort: "Password must be at least 6 characters long",
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
        fieldRequired: "Acest câmp este obligatoriu",
        passwordsDoNotMatch: "Parolele nu se potrivesc",
        invalidEmail: "Adresă de email invalidă",
        passwordTooShort: "Parola trebuie să aibă cel puțin 6 caractere",
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
        fieldRequired: "Это поле обязательно для заполнения",
        passwordsDoNotMatch: "Пароли не совпадают",
        invalidEmail: "Недопустимый адрес электронной почты",
        passwordTooShort: "Пароль должен содержать не менее 6 символов",
      },
    },
  },
});

export default i18n;
