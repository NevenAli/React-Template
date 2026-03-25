import { alpha, type PaletteOptions } from "@mui/material/styles";
import type { ThemeMode } from "@/types/custom";
import { colorTokens } from "../tokens";

export const palette = (mode: ThemeMode): PaletteOptions => {
  const isLight = mode === "light";
  const status = isLight ? "light" : "dark";
  const surface = colorTokens.surface[status];
  const text = colorTokens.text[status];
  const action = colorTokens.action[status];

  return {
    mode,
    primary: isLight ? colorTokens.primary.light : colorTokens.primary.dark,
    secondary: isLight
      ? colorTokens.secondary.light
      : colorTokens.secondary.dark,
    error: isLight ? colorTokens.error.light : colorTokens.error.dark,
    warning: isLight ? colorTokens.warning.light : colorTokens.warning.dark,
    info: isLight ? colorTokens.info.light : colorTokens.info.dark,
    success: isLight ? colorTokens.success.light : colorTokens.success.dark,

    background: {
      default: surface.backgroundDefault,
      paper: surface.backgroundPaper,
      neutral: surface.backgroundNeutral,
    },

    text: {
      primary: text.primary,
      secondary: text.secondary,
      disabled: text.disabled,
    },

    divider: surface.divider,

    action: {
      active: action.active,
      hover: alpha(colorTokens.grey900, action.hoverAlpha),
      selected: alpha(colorTokens.grey900, action.selectedAlpha),
    },
  };
};
