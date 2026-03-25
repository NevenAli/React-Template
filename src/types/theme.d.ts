import "@mui/material/styles";

declare module "@mui/material/styles" {
  // add lighter and darker to the palette colors
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  // add neutral and sidebar to the background colors
  interface TypeBackground {
    neutral: string;
  }

  // add tertiary to the text colors
  interface TypeText {
    tertiary?: string;
  }
}
