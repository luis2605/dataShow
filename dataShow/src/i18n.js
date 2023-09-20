import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json'; // English translations
import deTranslation from './de.json'; // German translations
import esTranslation from './es.json'; // Spanish translations

const resources = {
  en: {
    translation: enTranslation,
  },
  de: {
    translation: deTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the user's preferred language is not available
  interpolation: {
    escapeValue: false, // Not needed for React as it escapes by default
  },
});

export default i18n;
