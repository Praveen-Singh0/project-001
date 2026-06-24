"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Home, Layers, FolderKanban, Mail, Briefcase, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks: { label: string; path: string; icon: LucideIcon }[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Layers },
  { label: "Careers", path: "/careers", icon: Briefcase },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Contact", path: "/contact", icon: Mail },
];

const logoFilter =
  "brightness(0) saturate(100%) invert(79%) sepia(30%) saturate(934%) hue-rotate(103deg) brightness(94%) contrast(90%)";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const textColor = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";

  const pillBg = isDark
    ? scrolled ? "rgba(10,14,30,0.65)" : "rgba(10,14,30,0.4)"
    : scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)";
  const pillBorder = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.6)";
  const pillShadow = isDark
    ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 8px 32px rgba(100,113,160,0.18), inset 0 1px 0 rgba(255,255,255,0.9)";

  const isLinkActive = (path: string) =>
    pathname === path || (path === "/" && pathname === "/home");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-3 sm:pt-4">
      <div
        className="mx-auto flex items-center justify-between gap-4 pl-3 pr-3 sm:pl-5 sm:pr-3"
        style={{
          maxWidth: 1180,
          height: 64,
          background: pillBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: pillBorder,
          borderRadius: 999,
          boxShadow: pillShadow,
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <Link href="/" className="flex items-center select-none">
          <Image
            src="/assets/img/logo.png"
            alt="DTechEx"
            width={140}
            height={56}
            className="h-14 w-auto object-contain"
            style={{ filter: logoFilter }}
            priority
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.path);
            const Icon = link.icon;
            return (
              <li key={link.path}>
                <Link href={link.path}>
                  <span
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-transform duration-200 hover:scale-105 active:scale-95"
                    style={{
                      color: isActive ? (isDark ? "#f0f4ff" : "#0d0f1e") : textColor,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.8)"}`,
                          boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "0 2px 8px rgba(100,113,160,0.15)",
                        }}
                      />
                    )}
                    <Icon size={15} style={{ position: "relative", zIndex: 1, color: isActive ? cyan : "inherit" }} />
                    <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: 36,
              height: 36,
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              color: isDark ? "#8892b0" : "#6271a0",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-full"
            style={{ color: isDark ? "#8892b0" : "#6271a0" }}
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            className="p-2"
            style={{ color: isDark ? "#f0f4ff" : "#0d0f1e" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="flex flex-col gap-1 mt-2 px-5 py-4 lg:hidden"
          style={{
            background: isDark ? "rgba(10,14,30,0.85)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.6)",
            borderRadius: 24,
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(100,113,160,0.18)",
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isLinkActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium text-left"
                style={{
                  color: isActive ? (isDark ? "#f0f4ff" : "#0d0f1e") : textColor,
                  background: isActive ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)") : "none",
                }}
              >
                <Icon size={16} style={{ color: isActive ? cyan : "inherit" }} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
