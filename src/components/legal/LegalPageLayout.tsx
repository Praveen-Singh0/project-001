"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";

export function LegalPageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { isDark } = useTheme();
  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";

  return (
    <div style={{ background: bg, fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ color: fg, letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        <div className="space-y-6 text-sm leading-relaxed" style={{ color: muted }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
