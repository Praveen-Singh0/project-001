import { motion } from "motion/react";
import { Brain, Cloud, Layers, BarChart3, ArrowRight } from "lucide-react";

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
  return (
    <section
      id="why"
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #04050d 0%, rgba(6,9,20,1) 50%, #04050d 100%)",
      }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)
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
            style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)" }}
          >
            <span style={{ fontSize: 11, color: "#00E5FF", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>WHY CHOOSE US</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#f0f4ff", maxWidth: 600, margin: "0 auto" }}
          >
            Turning Ideas into{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00E5FF, #6C63FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Intelligent
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
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 30px 60px rgba(0,0,0,0.4), 0 0 30px ${p.color}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
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
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f0f4ff", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#8892b0", lineHeight: 1.65 }}>{p.desc}</p>
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
