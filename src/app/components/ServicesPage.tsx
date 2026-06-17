import { motion } from "motion/react";
import {
  Brain, Cloud, Globe, Smartphone, Palette, Cog, Megaphone, Building2,
  ArrowUpRight, Check, ArrowRight, type LucideIcon,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "../contexts/NavigationContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AuroraBackground } from "./AuroraBackground";
import { ParticleField } from "./ParticleField";
import content from "../data/content.json";

const iconMap: Record<string, LucideIcon> = {
  Brain, Cloud, Globe, Smartphone, Palette, Cog, Megaphone, Building2,
};

export function ServicesPage() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();
  const data = content.services;

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const accent = isDark ? "#3AE5B2" : "#0FA47E";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.7)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const pageBg = isDark
    ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,229,178,0.07) 0%, transparent 55%), #04050d"
    : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,164,126,0.05) 0%, transparent 55%), #e8ecf7";

  return (
    <div style={{ background: pageBg, fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <AuroraBackground />
      <ParticleField />
      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-36 pb-16 px-6 md:px-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}
          >
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
            {data.hero.title.split(data.hero.highlight)[1]}
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

        {/* Services grid */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.items.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Brain;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300 overflow-hidden"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: "blur(10px)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                    (e.currentTarget as HTMLElement).style.borderColor = `${s.color}45`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.18), 0 0 25px ${s.color}14`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded" style={{ background: `${s.color}18`, color: s.color, fontFamily: "var(--font-mono)", fontSize: 10 }}>{s.tag}</span>
                    <ArrowUpRight size={14} color={s.color} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}14`, border: `1px solid ${s.color}28` }}>
                    <Icon size={18} color={s.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: fg, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 12.5, color: muted, lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2 mt-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2" style={{ fontSize: 12, color: muted }}>
                        <Check size={13} color={s.color} className="flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-24">
          <div className="text-center mb-12">
            <h2 className="text-balance" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, color: fg, letterSpacing: "-0.02em" }}>
              How We{" "}
              <span style={{ background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Deliver</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl p-6"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: "blur(10px)" }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 30, fontWeight: 800, background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 12 }}>{p.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: fg, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-28">
          <div
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{ background: isDark ? "linear-gradient(135deg, rgba(58,229,178,0.08), rgba(108,99,255,0.08))" : "linear-gradient(135deg, rgba(15,164,126,0.07), rgba(108,99,255,0.07))", border: `1px solid ${accent}26` }}
          >
            <h2 className="text-balance mx-auto" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: fg, maxWidth: 560, letterSpacing: "-0.02em" }}>
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4" style={{ fontSize: 15, color: muted, maxWidth: 460, lineHeight: 1.7 }}>
              Let&apos;s turn your idea into a production-grade product. Book a free strategy session today.
            </p>
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full text-sm font-semibold transition-transform duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", color: "#04050d", boxShadow: "0 0 30px rgba(58,229,178,0.25)" }}
            >
              Get in Touch <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
