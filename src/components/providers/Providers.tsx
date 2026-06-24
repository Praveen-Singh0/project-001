"use client";

import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AppShell } from "@/components/AppShell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppShell>{children}</AppShell>
    </ThemeProvider>
  );
}
