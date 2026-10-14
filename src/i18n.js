import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./locales/zh.json";
import en from "./locales/en.json";

// 語言完全由網址決定（/en 開頭＝英文，其餘＝中文），不再依賴 localStorage，
// 這樣才能直接分享單一語言版本的連結給別人
const getInitialLang = () =>
  window.location.pathname === "/en" || window.location.pathname.startsWith("/en/")
    ? "en"
    : "zh";

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
  },
  lng: getInitialLang(),
  fallbackLng: "zh",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
