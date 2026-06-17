import { createContext, useContext, useState, type ReactNode } from "react";

export type Page =
  | "home"
  | "services"
  | "projects"
  | "contact"
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "verify-email"
  | "2fa"
  | "dashboard";

interface NavCtx {
  page: Page;
  navigate: (p: Page) => void;
}

const NavigationContext = createContext<NavCtx>({
  page: "home",
  navigate: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("home");
  return (
    <NavigationContext.Provider value={{ page, navigate: setPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
