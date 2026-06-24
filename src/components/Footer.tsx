"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github, Youtube, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Services: [
    { label: "AI Solutions", href: "/services" },
    { label: "Staff Augmentation", href: "/staff-augmentation" },
    { label: "Web Development", href: "/services" },
    { label: "Mobile Apps", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
  ],
  Solutions: [
    { label: "Enterprise CRM", href: "/projects" },
    { label: "Healthcare AI", href: "/projects" },
    { label: "FinTech Analytics", href: "/projects" },
    { label: "E-Commerce", href: "/projects" },
    { label: "Process Automation", href: "/services" },
  ],
  Resources: [
    { label: "Case Studies", href: "/projects" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const logoFilter =
  "brightness(0) saturate(100%) invert(79%) sepia(30%) saturate(934%) hue-rotate(103deg) brightness(94%) contrast(90%)";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
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
      <div
        className="absolute top-0 left-[20%] right-[20%] h-px"
        style={{ background: glowGradient }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/img/logo.png"
                alt="DTechEx"
                width={160}
                height={64}
                className="h-16 w-auto object-contain"
                style={{ filter: logoFilter }}
              />
            </div>
            <p style={{ fontSize: 13, color: muted, maxWidth: 280, lineHeight: 1.7 }}>
              AI-first technology partner for forward-thinking enterprises. Building intelligent solutions since 2018.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl"
            style={{ background: ctaBg, border: ctaBorder }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: fg, marginBottom: 4 }}>Ready to transform your business?</div>
              <div style={{ fontSize: 13, color: muted }}>Join 150+ companies already scaling with DTECHEX.</div>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300"
              style={{ background: "linear-gradient(105deg, #259f80ff, #25999fff)", color: "#04050d", whiteSpace: "nowrap" }}
            >
              Get Started
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

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
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: muted }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs transition-colors duration-200"
                style={{ color: muted }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
