import { useNavigate, useLocation } from "react-router";

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map current path to page name for compatibility
  const pathToPage: Record<string, string> = {
    "/": "home",
    "/home": "home",
    "/login": "login",
    "/signup": "signup",
    "/forgot-password": "forgot-password",
    "/reset-password": "reset-password",
    "/verify-email": "verify-email",
    "/2fa": "2fa",
    "/dashboard": "dashboard",
    "/services": "services",
    "/projects": "projects",
    "/contact": "contact",
  };

  const currentPage = pathToPage[location.pathname] || "home";

  return {
    page: currentPage,
    navigate: (page: string) => {
      const pageToPath: Record<string, string> = {
        home: "/",
        login: "/login",
        signup: "/signup",
        "forgot-password": "/forgot-password",
        "reset-password": "/reset-password",
        "verify-email": "/verify-email",
        "2fa": "/2fa",
        dashboard: "/dashboard",
        services: "/services",
        projects: "/projects",
        contact: "/contact",
      };
      navigate(pageToPath[page] || "/");
    },
  };
}
