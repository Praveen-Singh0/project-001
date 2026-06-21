import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

const techItems = [
  { name: "React", color: "#61DAFB", letter: "⚛" },
  { name: "Next.js", color: "#f0f4ff", letter: "N" },
  { name: "TypeScript", color: "#3178C6", letter: "TS" },
  { name: "Node.js", color: "#68A063", letter: "⬡" },
  { name: "NestJS", color: "#E0234E", letter: "N" },
  { name: "Express", color: "#f0f4ff", letter: "Ex" },
  { name: "AWS", color: "#FF9900", letter: "⌘" },
  { name: "Azure", color: "#0078D4", letter: "Az" },
  { name: "GCP", color: "#4285F4", letter: "G" },
  { name: "React Native", color: "#61DAFB", letter: "RN" },
  { name: "Flutter", color: "#02569B", letter: "Ft" },
  { name: "OpenAI", color: "#10A37F", letter: "AI" },
  { name: "Claude", color: "#CC785C", letter: "Cl" },
  { name: "LangChain", color: "#1C3C3C", letter: "LC" },
  { name: "PostgreSQL", color: "#336791", letter: "Pg" },
  { name: "MongoDB", color: "#47A248", letter: "Mo" },
  { name: "Redis", color: "#DC382D", letter: "Re" },
];

function TechChip({ name, color, letter, index }: typeof techItems[0] & { index: number }) {
  const { isDark } = useTheme();
  const chipBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)";
  const chipBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const chipHoverBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.7)";
  const textColor = isDark ? "#c8d3e8" : "#6271a0";
  const shadowDark = isDark ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(163,177,198,0.15)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all duration-300 group cursor-default"
      style={{
        background: chipBg,
        border: chipBorder,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = chipHoverBg;
        (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `${shadowDark}, 0 0 15px ${color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = chipBg;
        (e.currentTarget as HTMLElement).style.borderColor = chipBorder;
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20`, fontSize: 10, fontWeight: 700, color, fontFamily: "var(--font-mono)" }}
      >
        {letter}
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: textColor }}>{name}</span>
    </motion.div>
  );
}

export function TechStack() {
  const { isDark } = useTheme();
  const bg = isDark ? "#04050d" : "#e8ecf7";
  const gridColor = isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.05)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#6C63FF" : "#0095bf";
  const catBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.5)";
  const catBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";

  return (
    <section id="tech" className="relative py-28 overflow-hidden" style={{ background: bg }}>
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: isDark ? "rgba(108,99,255,0.1)" : "rgba(0,149,191,0.08)", border: isDark ? "1px solid rgba(108,99,255,0.25)" : "1px solid rgba(0,149,191,0.2)" }}
          >
            <span style={{ fontSize: 11, color: labelColor, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>TECHNOLOGY STACK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: fg, maxWidth: 600, margin: "0 auto" }}
          >
            Built on{" "}
            <span
              style={{
                background: isDark ? "linear-gradient(135deg, #00E5FF, #6C63FF)" : "linear-gradient(135deg, #0095bf, #6C63FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Best-in-Class
            </span>{" "}
            Technology
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: muted, maxWidth: 480, margin: "16px auto 0", lineHeight: 1.7 }}
          >
            We choose battle-tested tools from the most trusted vendors in the ecosystem — and integrate them into coherent, maintainable architectures.
          </motion.p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-3 justify-center">
          {techItems.map((item, i) => (
            <TechChip key={item.name} {...item} index={i} />
          ))}
        </div>

        {/* Categories row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
        >
          {[
            { label: "Frontend", techs: "React · Next.js · TypeScript", color: "#00E5FF" },
            { label: "Backend", techs: "Node.js · NestJS · Express", color: "#6C63FF" },
            { label: "Cloud & Infra", techs: "AWS · Azure · GCP", color: "#00BFFF" },
            { label: "AI & Data", techs: "OpenAI · Claude · LangChain", color: "#a78bfa" },
          ].map((cat) => (
            <div
              key={cat.label}
              className="rounded-xl p-4"
              style={{
                background: catBg,
                border: catBorder,
              }}
            >
              <div
                className="text-xs font-semibold mb-2"
                style={{ color: cat.color, fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
              >
                {cat.label}
              </div>
              <div style={{ fontSize: 12, color: muted }}>{cat.techs}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
