import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Home, Layers, FolderKanban, Mail, type LucideIcon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation, type Page } from "../contexts/NavigationContext";
import { MagneticButton } from "./MagneticButton";

const navLinks: { label: string; page: Page; icon: LucideIcon }[] = [
  { label: "Home", page: "home", icon: Home },
  { label: "Services", page: "services", icon: Layers },
  { label: "Projects", page: "projects", icon: FolderKanban },
  { label: "Contact", page: "contact", icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { page, navigate } = useNavigation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const textColor = isDark ? "#8892b0" : "#6271a0";
  const logoText = isDark ? "#f0f4ff" : "#0d0f1e";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";

  const pillBg = isDark
    ? scrolled ? "rgba(10,14,30,0.65)" : "rgba(10,14,30,0.4)"
    : scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)";
  const pillBorder = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.6)";
  const pillShadow = isDark
    ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 8px 32px rgba(100,113,160,0.18), inset 0 1px 0 rgba(255,255,255,0.9)";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-3 sm:pt-4"
    >
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
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 select-none"
          style={{ cursor: "pointer", background: "none", border: "none" }}
        >
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #3AE5B2 0%, #6C63FF 100%)",
              boxShadow: isDark ? "0 0 16px rgba(58,229,178,0.35)" : "0 4px 12px rgba(15,164,126,0.3)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 13, color: "#04050d" }}>DX</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em", color: logoText }}>DTECHEX</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = page === link.page;
            const Icon = link.icon;
            return (
              <li key={link.page}>
                <motion.button
                  onClick={() => navigate(link.page)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{ color: isActive ? (isDark ? "#f0f4ff" : "#0d0f1e") : textColor, fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = isDark ? "#f0f4ff" : "#0d0f1e"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = textColor; }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.8)"}`,
                        boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "0 2px 8px rgba(100,113,160,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                  <Icon size={15} style={{ position: "relative", zIndex: 1, color: isActive ? cyan : "inherit" }} />
                  <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme toggle */}
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
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = cyan;
              (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(58,229,178,0.3)" : "rgba(15,164,126,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = isDark ? "#8892b0" : "#6271a0";
              (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon size={15} /> : <Sun size={15} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Login */}
          <button
            onClick={() => navigate("login")}
            className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: "transparent",
              color: isDark ? "#8892b0" : "#6271a0",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = isDark ? "#f0f4ff" : "#0d0f1e";
              (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = isDark ? "#8892b0" : "#6271a0";
              (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
            }}
          >
            Log In
          </button>

          <MagneticButton
            onClick={() => navigate("dashboard")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #3AE5B2, #6C63FF)",
              color: "#04050d",
              boxShadow: isDark ? "0 0 20px rgba(58,229,178,0.3)" : "0 4px 20px rgba(15,164,126,0.35)",
            }}
          >
            Dashboard
          </MagneticButton>
        </div>

        {/* Mobile */}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
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
              const isActive = page === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.page); setMobileOpen(false); }}
                  className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium text-left"
                  style={{
                    color: isActive ? (isDark ? "#f0f4ff" : "#0d0f1e") : textColor,
                    background: isActive ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)") : "none",
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? cyan : "inherit" }} />
                  {link.label}
                </button>
              );
            })}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => { navigate("login"); setMobileOpen(false); }}
                className="flex-1 rounded-full py-2.5 text-sm font-semibold"
                style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`, color: isDark ? "#f0f4ff" : "#0d0f1e" }}
              >
                Log In
              </button>
              <button
                onClick={() => { navigate("dashboard"); setMobileOpen(false); }}
                className="flex-1 rounded-full py-2.5 text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", color: "#04050d" }}
              >
                Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
