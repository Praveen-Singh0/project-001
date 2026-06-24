"use client";

import Link from "next/link";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function ITConsulting() {
  const { isDark } = useTheme();

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const glowGradient = isDark
    ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)"
    : "linear-gradient(90deg, transparent, rgba(0,149,191,0.2), transparent)";
  const glowBg = isDark
    ? "radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, transparent 70%)"
    : "radial-gradient(ellipse, rgba(0,149,191,0.03) 0%, transparent 70%)";
  const accentColor = "#0FA47E";

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: bg }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: glowGradient }}
      />
      <div
        className="absolute top-[50%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: glowBg, filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Content */}
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
                border: isDark
                  ? "1px solid rgba(0,229,255,0.2)"
                  : "1px solid rgba(0,149,191,0.2)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: labelColor,
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                IT CONSULTING
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: fg,
                marginBottom: 16,
              }}
            >
              Strategic Technology{" "}
              <span
                className="inline-block bg-gradient-to-r from-[#3AE5B2] via-[#6C63FF] to-[#00E5FF] bg-clip-text text-transparent"
              >
                Guidance
              </span>
            </h2>

            <p
              style={{
                fontSize: 15,
                color: muted,
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 450,
              }}
            >
              Transform your business with strategic IT consulting. Our expert consultants assess your current infrastructure, identify optimization opportunities, and design scalable solutions tailored to your growth trajectory.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Digital transformation roadmap",
                "Infrastructure optimization",
                "Cloud migration strategy",
                "Technology stack evaluation",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: accentColor }}
                  />
                  <span style={{ fontSize: 14, color: muted }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/staff-augmentation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
                color: "#fff",
              }}
            >
              Explore Services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Right: Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="rounded-2xl p-8"
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              backdropFilter: "blur(20px)",
            }}
          >
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: fg,
                marginBottom: 24,
              }}
            >
              Ready to Consult?
            </h3>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 135 000 0000",
                  color: "#6C63FF",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "consulting@dtechex.com",
                  color: "#00E5FF",
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.label === "Phone" ? "tel:+911350000000" : "mailto:consulting@dtechex.com"}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.4)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${contact.color}15`,
                      border: `1px solid ${contact.color}25`,
                    }}
                  >
                    <contact.icon size={18} color={contact.color} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: contact.color,
                        fontFamily: "var(--font-mono)",
                        marginBottom: 2,
                      }}
                    >
                      {contact.label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: fg }}>
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <button
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Schedule Consultation
            </button>

            <p
              style={{
                fontSize: 12,
                color: muted,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              Response within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
