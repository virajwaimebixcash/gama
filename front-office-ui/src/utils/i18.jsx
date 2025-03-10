import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const languages = ["ar", "en", "id", "vi", "th"];

const getLng = async function () {
  try {
    const res = await fetch("http://localhost:8000/api/lng");
    const data = await res.json();
    const { lng } = data;
    return lng;
  } catch (err) {
    console.log(err);
    return "en";
  }
};

const initializeI18n = async () => {
  let lng = await getLng();

  if (!languages.includes(lng)) {
    lng = "en";
  }

  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      lng,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: (lng) => `http://localhost:8000/api/translations/${lng}`,
      },
    });

  const updatePageDirection = (lng) => {
    if (lng === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  };

  i18n.on("languageChanged", (lng) => {
    updatePageDirection(lng);
  });

  updatePageDirection(i18n.language);
};

initializeI18n();

export default i18n;
