import { motion } from "motion/react";
import { Twitter, Linkedin, Github, Youtube, ArrowUpRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const footerLinks = {
  Company: ["About Us", "Careers", "Blog", "Press", "Partners"],
  Services: ["AI Solutions", "Cloud Services", "Web Development", "Mobile Apps", "UI/UX Design"],
  Solutions: ["Enterprise CRM", "Healthcare AI", "FinTech Analytics", "E-Commerce", "Process Automation"],
  Resources: ["Case Studies", "Documentation", "API Reference", "Changelog", "Status"],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const { isDark } = useTheme();
  const bg = isDark ? "#04050d" : "#e8ecf7";
  const borderTop = isDark ? "1px solid rgba(0,229,255,0.1)" : "1px solid rgba(0,149,191,0.1)";
  const glowGradient = isDark 
    ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), rgba(108,99,255,0.4), transparent)"
    : "linear-gradient(90deg, transparent, rgba(0,149,191,0.3), rgba(108,99,255,0.3), transparent)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const ctaBg = isDark ? "rgba(0,229,255,0.04)" : "rgba(0,149,191,0.04)";
  const ctaBorder = isDark ? "1px solid rgba(0,229,255,0.15)" : "1px solid rgba(0,149,191,0.15)";
  const linkBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)";
  const linkHoverBg = isDark ? "rgba(0,229,255,0.1)" : "rgba(0,149,191,0.1)";
  const linkHoverColor = isDark ? "#00E5FF" : "#0095bf";

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: bg,
        borderTop: borderTop,
      }}
    >
      {/* Top separator glow */}
      <div
        className="absolute top-0 left-[20%] right-[20%] h-px"
        style={{ background: glowGradient }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Top: Brand + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)",
                  boxShadow: "0 0 20px rgba(0,229,255,0.3)",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 15, color: "#04050d" }}>DX</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, color: fg, letterSpacing: "-0.01em" }}>DTECHEX</div>
                <div style={{ fontSize: 11, color: muted }}>Doon Technology Expert</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: muted, maxWidth: 280, lineHeight: 1.7 }}>
              AI-first technology partner for forward-thinking enterprises. Building intelligent solutions since 2018.
            </p>
          </div>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl"
            style={{ background: ctaBg, border: ctaBorder }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: fg, marginBottom: 4 }}>Ready to transform your business?</div>
              <div style={{ fontSize: 13, color: muted }}>Join 150+ companies already scaling with DTECHEX.</div>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d", whiteSpace: "nowrap" }}
            >
              Get Started
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: labelColor,
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                {section.toUpperCase()}
              </div>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: muted }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(108,99,255,0.1)" }}
        >
          <div style={{ fontSize: 12, color: muted }}>
            © 2024 DTECHEX — Doon Technology Expert. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: linkBg, color: muted }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = linkHoverBg;
                  (e.currentTarget as HTMLElement).style.color = linkHoverColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = linkBg;
                  (e.currentTarget as HTMLElement).style.color = muted;
                }}
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: muted }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
