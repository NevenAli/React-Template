export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface UseAuthResult {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export function useAuth(): UseAuthResult {
  const isAuthenticated = true;

  const user: AuthUser | null = isAuthenticated
    ? {
        id: "mock-user-id",
        name: "Mock User",
        email: "mock.user@example.com",
      }
    : null;

  return { isAuthenticated, user };
}
