import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// NOTE for contributors:
// - Add a new file under src/locales/<lang>.json (e.g., es.json, fr.json)
// - Import it below and add it to the resources map
// - Add an <option> in the Navbar switcher to expose it in the UI

import en from './locales/en.json';
import hi from './locales/hi.json';

const STORAGE_KEY = 'language';
const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng: saved || 'en', // default UI language
    fallbackLng: 'en',  // fallback if key missing
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    defaultNS: 'translation',
    debug: false,
  });

// Persist language changes for future sessions
try {
  i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lng);
    }
  });
} catch {}

export default i18n;


