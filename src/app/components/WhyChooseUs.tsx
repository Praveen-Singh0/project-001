import { motion } from "motion/react";
import { Brain, Cloud, Layers, BarChart3, ArrowRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const pillars = [
  {
    icon: Brain,
    title: "AI Engineering",
    desc: "Custom LLM integrations, intelligent agents, computer vision, NLP pipelines, and ML systems that transform raw data into decisive intelligence.",
    color: "#00E5FF",
    gradient: "linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(0,191,255,0.04) 100%)",
  },
  {
    icon: Cloud,
    title: "Cloud Transformation",
    desc: "Multi-cloud architecture, Kubernetes orchestration, infrastructure-as-code, and cloud-native migrations designed for 99.99% uptime.",
    color: "#6C63FF",
    gradient: "linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(79,70,229,0.04) 100%)",
  },
  {
    icon: Layers,
    title: "Digital Product Development",
    desc: "End-to-end product engineering — from discovery and design to development and DevOps — shipped in iterative cycles that reduce time-to-value.",
    color: "#00BFFF",
    gradient: "linear-gradient(135deg, rgba(0,191,255,0.12) 0%, rgba(0,229,255,0.04) 100%)",
  },
  {
    icon: BarChart3,
    title: "Data Intelligence",
    desc: "Real-time analytics platforms, data warehouse modernization, BI dashboards, and predictive models that surface signals executives act on.",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(108,99,255,0.04) 100%)",
  },
];

export function WhyChooseUs() {
  const { isDark } = useTheme();
  const bg = isDark 
    ? "linear-gradient(180deg, #04050d 0%, rgba(6,9,20,1) 50%, #04050d 100%)"
    : "linear-gradient(180deg, #e8ecf7 0%, rgba(240,244,255,1) 50%, #e8ecf7 100%)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const gridColor = isDark ? "rgba(0,229,255,0.06)" : "rgba(0,149,191,0.05)";
  const glowBg = isDark 
    ? "radial-gradient(ellipse at top right, rgba(0,229,255,0.05) 0%, transparent 70%)"
    : "radial-gradient(ellipse at top right, rgba(0,149,191,0.04) 0%, transparent 70%)";
  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.14)";
  
  return (
    <section
      id="why"
      className="relative py-28 overflow-hidden"
      style={{
        background: bg,
      }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)", border: isDark ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(0,149,191,0.2)" }}
          >
            <span style={{ fontSize: 11, color: isDark ? "#00E5FF" : "#0095bf", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>WHY CHOOSE US</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: fg, maxWidth: 600, margin: "0 auto" }}
          >
            Turning Ideas into{" "}
            <span
  className="
    inline-block
    bg-gradient-to-r
    from-[#3AE5B2]
    via-[#6C63FF]
    to-[#00E5FF]
    bg-clip-text
    text-transparent
  "
>
              Working
            </span>{" "}
            Digital Products
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-6 flex flex-col gap-4 group cursor-default transition-all duration-400"
              style={{
                background: p.gradient,
                border: cardBorder,
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = isDark ? `0 30px 60px rgba(0,0,0,0.4), 0 0 30px ${p.color}10` : `0 30px 60px rgba(163,177,198,0.2), 0 0 30px ${p.color}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: p.color,
                  opacity: 0.5,
                }}
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
              >
                <p.icon size={20} color={p.color} />
              </div>

              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: fg, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.65 }}>{p.desc}</p>
              </div>

              <div className="flex items-center gap-2 mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span style={{ fontSize: 12, color: p.color }}>Learn more</span>
                <ArrowRight size={12} color={p.color} />
              </div>

              {/* Bottom gradient line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}50, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
