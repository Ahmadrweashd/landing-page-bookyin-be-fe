import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import AppProvider from './context/AppProvider.tsx';
import arLang from "./assets/languages/arabic.json";
import enLang from "./assets/languages/english.json";
import heLang from "./assets/languages/hebrew.json";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.scss'

const supportedLanguages = ['en', 'ar', 'he'] as const;
type SupportedLang = typeof supportedLanguages[number];

const getInitialLanguage = (): SupportedLang => {
  const localLang = localStorage.getItem('bookyin-landing-language');

  if (localLang && supportedLanguages.includes(localLang as SupportedLang)) {
    return localLang as SupportedLang;
  }

  const browserLang = navigator.language.split('-')[0];
  const fallbackLang: SupportedLang = supportedLanguages.includes(browserLang as SupportedLang)
    ? browserLang as SupportedLang
    : 'ar';

  localStorage.setItem('bookyin-landing-language', fallbackLang);
  return fallbackLang;
};

const applyBodyLangClass = (lang: string) => {
  document.body.classList.remove('en', 'ar', 'he');
  document.body.classList.add(lang);
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
};

const selectedLanguage = getInitialLanguage();
applyBodyLangClass(selectedLanguage);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    },
  },
});


i18next.init({
  interpolation: { escapeValue: false },
  lng: "ar",
  resources: {
    ar: {
      global: arLang,
    },
    en: {
      global: enLang,
    },
    he: {
      global: heLang,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18next}>
      <AppProvider>
        <App />
      </AppProvider>
    </I18nextProvider>
  </QueryClientProvider>
)