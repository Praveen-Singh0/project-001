import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "../contexts/NavigationContext";
import { MagneticButton } from "./MagneticButton";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technology", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { navigate } = useNavigation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const bg = isDark
    ? scrolled ? "rgba(4,5,13,0.9)" : "transparent"
    : scrolled ? "rgba(232,236,247,0.88)" : "transparent";

  const borderBottom = scrolled
    ? isDark ? "1px solid rgba(58,229,178,0.1)" : "1px solid rgba(108,99,255,0.12)"
    : "none";

  const textColor = isDark ? "#8892b0" : "#6271a0";
  const logoText = isDark ? "#f0f4ff" : "#0d0f1e";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16"
      style={{
        height: 68,
        background: bg,
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom,
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease",
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
      <ul className="hidden lg:flex items-center gap-7">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm transition-colors duration-200"
              style={{ color: textColor, fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cyan; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = textColor; }}
            >
              {link.label}
            </a>
          </li>
        ))}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 flex flex-col gap-1 px-6 py-4 lg:hidden"
            style={{
              background: isDark ? "rgba(4,5,13,0.97)" : "rgba(232,236,247,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: isDark ? "1px solid rgba(58,229,178,0.1)" : "1px solid rgba(108,99,255,0.12)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium border-b"
                style={{ color: textColor, borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
              >
                {link.label}
              </a>
            ))}
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
