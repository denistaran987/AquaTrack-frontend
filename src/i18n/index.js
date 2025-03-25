import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LOCALS } from './constants';
import { uk } from './translations/uk.js';
import { en } from './translations/en.js';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: LOCALS.EN,
        interpolation: { escapeValue: false },
        resources: {
            en,
            uk,
        },
    });

export default i18n;