import i18n from 'i18next';
import { en } from './locales/en';

i18n.init({
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      common: en,
    },
  },
  react: {
    wait: true,
    useSuspense: false,
  },
  ns: ['common'],
  defaultNS: 'common',
});

export default i18n;
