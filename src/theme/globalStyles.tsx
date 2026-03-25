import { GlobalStyles as MUIGlobalStyles } from "@mui/material";

export const globalStyles = (
  <MUIGlobalStyles
    styles={(theme) => ({
      // 1. scrollbar settings
      "::-webkit-scrollbar": {
        width: 6,
        height: 6,
      },
      "::-webkit-scrollbar-track": {
        background: theme.palette.background.neutral, // use the neutral color we added
        borderRadius: 10,
      },
      "::-webkit-scrollbar-thumb": {
        background: theme.palette.grey[500],
        borderRadius: 10,
        "&:hover": {
          background: theme.palette.grey[600],
        },
      },

      // 2. main page settings
      "html, body": {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      "#root": {
        width: "100%",
        height: "100%",
      },

      // 3. additional rules
      "*": {
        boxSizing: "border-box",
      },
      ":root": {
        touchAction: "pan-x pan-y",
      },
    })}
  />
);
