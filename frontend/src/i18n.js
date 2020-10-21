import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import translations from './common/locales'

const ns = {
  namespaces: ['common', 'home', 'form', 'tournament']
}

i18n
  .use(initReactI18next)
  .init({
    lng: window.localStorage.getItem('language') || navigator.language.slice(0, 2),
    fallbackLng: 'en',
    // debug: true,
    ns,
    defaultNS: 'common',
    resources: translations,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
