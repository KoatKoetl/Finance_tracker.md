import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "../locales/en.json";
import roTranslation from "../locales/ro.json";
import ruTranslation from "../locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    supportedLngs: ["en", "ro", "ru"],
    nonExplicitSupportedLngs: true,
    resources: {
      en: {
        translation: enTranslation,
      },
      ro: {
        translation: roTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
    },
  });

export default i18n;
