import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import {
  LocalizationProvider,
  AppThemeProvider,
  NotificationsProvider,
} from "@/providers";

export default function App() {
  return (
    <LocalizationProvider>
      <AppThemeProvider>
        <NotificationsProvider>
          <CssBaseline />
          <Outlet />
        </NotificationsProvider>
      </AppThemeProvider>
    </LocalizationProvider>
  );
}
