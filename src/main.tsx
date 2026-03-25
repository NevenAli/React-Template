import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { LocalizationProvider, AppThemeProvider } from "@/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </LocalizationProvider>
  </StrictMode>,
);
