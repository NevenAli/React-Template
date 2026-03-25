/**
 * Global app configuration.
 */

const env = import.meta.env;

type Mode = "development" | "production" | string;

export const CONFIG = {
  APP: {
    NAME: env.VITE_APP_NAME ?? "My Professional Template",
    BASE_URL:
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : (env.VITE_APP_BASE_URL ?? ""),
  },

  API: {
    BASE_URL: env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1",
    TIMEOUT: 30_000,
  },

  ENV: {
    IS_DEV: env.DEV,
    IS_PROD: env.PROD,
    MODE: env.MODE as Mode,
  },
} as const;
