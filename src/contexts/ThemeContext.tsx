"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = (resolvedTheme ?? theme ?? "dark") as Theme;

  return {
    theme: current,
    isDark: mounted ? current === "dark" : true,
    mounted,
    toggle: () => setTheme(current === "dark" ? "light" : "dark"),
  };
}
