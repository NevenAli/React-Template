import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { IntlProvider } from "react-intl";
import arMessages from "@/locales/ar.json";
import enMessages from "@/locales/en.json";
import { getStorage, setStorage } from "@/utils/local-storage";
import type { LocaleType } from "@/types/custom";

interface LocalizationContextType {
  locale: LocaleType;
  setLocale: (lang: LocaleType) => void;
  isRTL: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined,
);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleType>(
    () => getStorage<LocaleType>("app-locale") ?? "ar",
  );

  const isRTL = useMemo(() => locale === "ar", [locale]);

  const setLocale = useCallback((newLocale: LocaleType) => {
    setLocaleState(newLocale);
    setStorage("app-locale", newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [isRTL, locale]);

  const messages = useMemo(
    () => (locale === "ar" ? arMessages : enMessages),
    [locale],
  );

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, isRTL }}>
      <IntlProvider locale={locale} messages={messages} defaultLocale="ar">
        {children}
      </IntlProvider>
    </LocalizationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context)
    throw new Error("useLocalization must be used within LocalizationProvider");
  return context;
};
