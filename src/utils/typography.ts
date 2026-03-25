const SYSTEM_FONTS = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

/**
 * combines the main font with the system's fallback fonts
 */
export function setFont(fontName?: string) {
  return fontName ? `"${fontName}", ${SYSTEM_FONTS}` : SYSTEM_FONTS;
}