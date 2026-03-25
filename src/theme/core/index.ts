import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { components } from "./components";
import type { ThemeMode, LocaleType } from "@/types/custom";

/** Single source of truth: locale → direction + fontFamily (add new locales here). */
export function getLocaleThemeOptions(locale: LocaleType) {
  return {
    direction: locale === "ar" ? ("rtl" as const) : ("ltr" as const),
    fontFamily:
      locale === "ar"
        ? "'IBM Plex Sans Arabic', sans-serif"
        : "'Inter', sans-serif",
  };
}

/**
 * Builds the app theme. When switching mode/locale at runtime, memoize in the provider:
 * const theme = useMemo(() => createAppTheme(mode, locale), [mode, locale]);
 */
export function createAppTheme(mode: ThemeMode, locale: LocaleType) {
  const { direction, fontFamily } = getLocaleThemeOptions(locale);
  const themeOptions: ThemeOptions = {
    palette: palette(mode),
    direction,
    typography: {
      ...typography,
      fontFamily,
    },
    shape: { borderRadius: 8 },
    components,
  };
  return createTheme(themeOptions);
}
