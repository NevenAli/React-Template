import type { TypographyVariantsOptions } from "@mui/material/styles";
import { breakpoints, fontSize, BASE_FONT_SIZE_PX } from "../tokens";

export function pxToRem(value: number): string {
  return `${value / BASE_FONT_SIZE_PX}rem`;
}

/** Responsive font sizes using design-token breakpoints (single source of truth). */
function responsiveFontSizes(config: {
  base: number;
  sm: number;
  md: number;
  lg: number;
}): Record<string, { fontSize: string }> {
  const { values } = breakpoints;
  return {
    [`@media (min-width:${values.sm}px)`]: { fontSize: pxToRem(config.sm) },
    [`@media (min-width:${values.md}px)`]: { fontSize: pxToRem(config.md) },
    [`@media (min-width:${values.lg}px)`]: { fontSize: pxToRem(config.lg) },
  };
}

export const typography: TypographyVariantsOptions = {
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(fontSize.h1.base),
    ...responsiveFontSizes(fontSize.h1),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(fontSize.h2.base),
    ...responsiveFontSizes(fontSize.h2),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(fontSize.h3.base),
    ...responsiveFontSizes(fontSize.h3),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(fontSize.h6.base),
    ...responsiveFontSizes(fontSize.h6),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(fontSize.subtitle1),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(fontSize.body1),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(fontSize.body2),
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(fontSize.button),
    textTransform: "none",
  },
};
