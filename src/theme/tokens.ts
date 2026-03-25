/**
 * Design tokens — single source of truth for colors, breakpoints, and typography scale.
 * Refactor palette and typography to use these so design changes are centralized.
 */

// ----- Breakpoints (align with MUI default; use in typography responsiveFontSizes) -----
export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;

export const breakpointKeys = ["xs", "sm", "md", "lg", "xl"] as const;

// ----- Base font size for rem conversion (accessibility) -----
export const BASE_FONT_SIZE_PX = 16;

// ----- Typography scale (px) — used by responsiveFontSizes -----
export const fontSize = {
  h1: { base: 40, sm: 52, md: 58, lg: 64 },
  h2: { base: 32, sm: 40, md: 44, lg: 48 },
  h3: { base: 24, sm: 26, md: 30, lg: 32 },
  h6: { base: 17, sm: 18, md: 18, lg: 18 },
  subtitle1: 16,
  body1: 16,
  body2: 14,
  button: 14,
} as const;

// ----- Color tokens: semantic names → hex (no raw hex in palette/component code) -----
export const colorTokens = {
  // Status
  error: {
    light: {
      main: "#C62828",
      lighter: "#FFEBEE",
      dark: "#B71C1C",
      darker: "#8B0000",
    },
    dark: {
      main: "#EF5350",
      lighter: "#5A1A13",
      dark: "#C62828",
      darker: "#B71C1C",
    },
  },
  warning: {
    light: {
      main: "#FFAB00",
      lighter: "#FFF5CC",
      dark: "#B76E00",
      darker: "#7A4100",
    },
    dark: {
      main: "#FFD54F",
      lighter: "#4F3A00",
      dark: "#FFE082",
      darker: "#FFECB3",
    },
  },
  success: {
    light: {
      main: "#22C55E",
      lighter: "#D3FCD2",
      dark: "#118D57",
      darker: "#065E49",
    },
    dark: {
      main: "#66BB6A",
      lighter: "#1B4631",
      dark: "#81C784",
      darker: "#C2F2D2",
    },
  },
  info: {
    light: {
      main: "#105DFB",
      lighter: "#CAFDF5",
      dark: "#006C9C",
      darker: "#003768",
    },
    dark: {
      main: "#105DFB",
      lighter: "#103F5B",
      dark: "#81D4FA",
      darker: "#B3ECFF",
    },
  },
  // Brand
  primary: {
    light: {
      main: "#394B6A",
      lighter: "#EBF0F6",
      dark: "#2D3B54",
      darker: "#1C1F35",
    },
    dark: {
      main: "#394B6A",
      lighter: "#1C1F35",
      dark: "#8FA3BC",
      darker: "#EBF0F6",
    },
  },
  secondary: {
    light: {
      main: "#81716C",
      lighter: "#F2EFEE",
      dark: "#635652",
      darker: "#453C39",
    },
    dark: {
      main: "#81716C",
      lighter: "#453C39",
      dark: "#B0A5A2",
      darker: "#F2EFEE",
    },
  },
  // Surfaces & text
  surface: {
    light: {
      backgroundDefault: "#F8F9FA",
      backgroundPaper: "#FFFFFF",
      backgroundNeutral: "#F0F2F5",
      divider: "rgba(0, 0, 0, 0.12)",
    },
    dark: {
      backgroundDefault: "#121212",
      backgroundPaper: "#1E1E1E",
      backgroundNeutral: "rgba(145, 158, 171, 0.12)",
      divider: "rgba(255, 255, 255, 0.12)",
    },
  },
  text: {
    light: {
      primary: "#2C2C2C",
      secondary: "#575757",
      disabled: "#8E8E8E",
    },
    dark: {
      primary: "#E2E2E2",
      secondary: "#A0A0A0",
      disabled: "#737373",
    },
  },
  action: {
    light: {
      active: "#637381",
      hoverAlpha: 0.08,
      selectedAlpha: 0.16,
    },
    dark: {
      active: "#919EAB",
      hoverAlpha: 0.08,
      selectedAlpha: 0.16,
    },
  },
  // Grey used for overlays (e.g. Backdrop)
  grey900: "#919EAB",
} as const;
