import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: { cards: "Cards" },
  he: { _isRtl: true, cards: "כרטיסים" },
};

const langs = Object.keys(translations);

export default function LangProvider({ children }) {
  const { lang, setLang } = useState("en");
  const currentTranslations = translations[lang] || translations.en;

  const lTrans = (s) => {
    if (!s || typeof s !== "string") {
      return s;
    }
    const key = s.toLocaleLowerCase();
    let translation = currentTranslations[key];
    if (translation) {
      return translation;
    }
    console.log(`Missing translation for ${key}`);
    return s;
  };

  document.dir = currentTranslations._isRtl ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, langs }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useSnackbar must be used within a Provider");
  return context;
};
