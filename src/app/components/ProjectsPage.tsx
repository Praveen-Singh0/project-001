import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AuroraBackground } from "./AuroraBackground";
import { ParticleField } from "./ParticleField";
import content from "../data/content.json";

export function ProjectsPage() {
  const { isDark } = useTheme();
  const data = content.projects;
  const [active, setActive] = useState("All");

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const accent = isDark ? "#3AE5B2" : "#0FA47E";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.7)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const pageBg = isDark
    ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.07) 0%, transparent 55%), #04050d"
    : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,164,126,0.05) 0%, transparent 55%), #e8ecf7";

  const filtered = active === "All" ? data.items : data.items.filter((p) => p.tags.includes(active));

  return (
    <div style={{ background: pageBg, fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <AuroraBackground />
      <ParticleField />
      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-36 pb-12 px-6 md:px-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}
          >
            <Star size={11} color={accent} />
            <span style={{ fontSize: 11, color: accent, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>{data.hero.badge}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-balance mx-auto"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: fg, maxWidth: 760 }}
          >
            {data.hero.title.split(data.hero.highlight)[0]}
            <span style={{ background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {data.hero.highlight}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-pretty mx-auto mt-6"
            style={{ fontSize: 16, color: muted, lineHeight: 1.7, maxWidth: 560 }}
          >
            {data.hero.subtitle}
          </motion.p>
        </section>

        {/* Stats */}
        <section className="relative max-w-5xl mx-auto px-6 md:px-10 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="rounded-2xl p-5 text-center"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: "blur(10px)" }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 800, background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {data.filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: isActive ? "linear-gradient(135deg, #3AE5B2, #6C63FF)" : cardBg,
                    color: isActive ? "#04050d" : muted,
                    border: `1px solid ${isActive ? "transparent" : cardBorder}`,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-24">
          <div className="flex flex-col gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden transition-all duration-300 group ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: "blur(10px)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}38`;
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 30px 80px rgba(0,0,0,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className={`relative overflow-hidden ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`} style={{ minHeight: 280 }}>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ minHeight: 280 }}
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(${i % 2 === 1 ? "270deg" : "90deg"}, rgba(4,5,13,0) 50%, ${isDark ? "rgba(4,5,13,0.8)" : "rgba(232,236,247,0.6)"} 100%)` }} />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}44`, color: project.accent, backdropFilter: "blur(10px)" }}>
                      {project.category}
                    </div>
                  </div>

                  <div className={`p-8 flex flex-col justify-center gap-5 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: fg, marginBottom: 10, letterSpacing: "-0.01em" }}>{project.title}</h3>
                      <p style={{ fontSize: 14, color: muted, lineHeight: 1.7 }}>{project.desc}</p>
                    </div>
                    <div className="flex gap-6">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: project.accent }}>{m.value}</div>
                          <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded text-xs" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: `1px solid ${cardBorder}`, color: muted, fontFamily: "var(--font-mono)" }}>{tech}</span>
                      ))}
                    </div>
                    <button
                      className="self-start flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                      style={{ color: project.accent }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "8px"; }}
                    >
                      View Case Study <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
