/**
 * converts pixels to REM (the base is 16px)
 * used for fonts, spaces, and dimensions to ensure compatibility
 */
export function pxToRem(value: number): string {
  if (typeof value !== "number" || isNaN(value)) {
    // only show a warning in the console during development without breaking the app
    if (import.meta.env.DEV) {
      console.warn(
        `[Units Utils]: Invalid pixel value received: ${value}. Returning 0rem.`,
      );
    }
    return "0rem";
  }

  return `${value / 16}rem`;
}

/**
 * converts REM to pixels (for programming calculations)
 */
export function remToPx(value: string | number): number {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return Math.round(numericValue * 16);
}
