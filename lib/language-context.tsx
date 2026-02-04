"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, Translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

// Default to 'en' to match server-side default and avoid hydration mismatch
const defaultContextValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: translations.en,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English to match server-side rendering
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Try to get saved language from localStorage
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "nl" || saved === "en")) {
      setLanguageState(saved);
    } 
    // If no saved language, detect browser language
    else if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      const detectedLang = browserLang.startsWith('nl') ? "nl" : "en";
      setLanguageState(detectedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem("language", lang);
    }
  };

  const t = translations[language];

  // Use default English until component is mounted to prevent hydration mismatch
  const value = {
    language: mounted ? language : "en",
    setLanguage,
    t: mounted ? t : translations.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
