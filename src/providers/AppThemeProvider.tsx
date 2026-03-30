import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// @ts-expect-error stylis does not ship TypeScript types
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { useLocalization } from "./LocalizationProvider";
import { getStorage, setStorage } from "@/utils/local-storage";
import { createAppTheme, globalStyles } from "@/theme";
import type { ThemeMode } from "@/types/custom";

const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLTR = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { locale, isRTL } = useLocalization();

  const [mode, setMode] = useState<ThemeMode>(
    () => getStorage<ThemeMode>("app-theme-mode") ?? "light",
  );

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      setStorage("app-theme-mode", newMode);
      return newMode;
    });
  }, []);

  const theme = useMemo(() => createAppTheme(mode, locale), [mode, locale]);

  return (
    <CacheProvider value={isRTL ? cacheRTL : cacheLTR}>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <MuiThemeProvider theme={theme}>
          {globalStyles} {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context;
};
