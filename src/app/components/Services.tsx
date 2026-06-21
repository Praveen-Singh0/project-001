import { motion } from "motion/react";
import { Brain, Cloud, Globe, Smartphone, Palette, Cog, Megaphone, Building2, ArrowUpRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Custom LLMs, AI agents, computer vision, NLP, and intelligent automation tailored to your industry.",
    color: "#00E5FF",
    tag: "Core",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    desc: "AWS, Azure, GCP architecture, cloud migration, Kubernetes, serverless, and infrastructure optimization.",
    color: "#6C63FF",
    tag: "Infrastructure",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance React, Next.js, and full-stack web applications with enterprise-grade architecture.",
    color: "#00BFFF",
    tag: "Development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform iOS & Android apps with React Native and Flutter — beautiful, fast, and scalable.",
    color: "#a78bfa",
    tag: "Mobile",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Research-driven product design, design systems, prototyping, and user testing for exceptional experiences.",
    color: "#f472b6",
    tag: "Design",
  },
  {
    icon: Cog,
    title: "Process Automation",
    desc: "RPA, workflow automation, intelligent document processing, and integration platforms that eliminate manual work.",
    color: "#34d399",
    tag: "Automation",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Data-driven SEO, performance marketing, content strategy, and analytics that convert traffic to revenue.",
    color: "#fbbf24",
    tag: "Growth",
  },
  {
    icon: Building2,
    title: "Enterprise Software",
    desc: "Custom ERP, CRM, and SaaS platforms engineered for scale, security, and long-term business value.",
    color: "#60a5fa",
    tag: "Enterprise",
  },
];

export function Services() {
  const { isDark } = useTheme();
  const bg = isDark ? "#04050d" : "#e8ecf7";
  const glowBg = isDark 
    ? "radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, transparent 70%)"
    : "radial-gradient(ellipse, rgba(0,149,191,0.04) 0%, transparent 70%)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const tagBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.5)";
  const tagBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const cardBg = isDark 
    ? "rgba(255,255,255,0.025)"
    : "rgba(255,255,255,0.6)";
  const cardBorder = isDark
    ? "rgba(255,255,255,0.07)"
    : "rgba(108,99,255,0.14)";
  const cardHoverBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.8)";

  return (
    <section id="services" className="relative py-28 overflow-hidden" style={{ background: bg }}>
      {/* Glow */}
      <div
        className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: glowBg, filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)", border: isDark ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(0,149,191,0.2)" }}
            >
              <span style={{ fontSize: 11, color: labelColor, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>SERVICES</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: fg }}
            >
              Full-Spectrum{" "}
              <span
                style={{
                  background: isDark ? "linear-gradient(135deg, #00E5FF, #6C63FF)" : "linear-gradient(135deg, #0095bf, #6C63FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Technology
              </span>{" "}
              Services
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 14, color: muted, maxWidth: 340, lineHeight: 1.7 }}
          >
            Eight practice areas. One seamless delivery model. From strategy to execution to operations.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-6 flex flex-col gap-4 group cursor-default transition-all duration-300 overflow-hidden"
              style={{
                background: cardBg,
                border: cardBorder,
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.background = cardHoverBg;
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}35`;
                (e.currentTarget as HTMLElement).style.boxShadow = isDark 
                  ? `0 20px 50px rgba(0,0,0,0.4), 0 0 25px ${s.color}0D`
                  : `0 20px 50px rgba(163,177,198,0.2), 0 0 25px ${s.color}0D`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.background = cardBg;
                (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top right, ${s.color}10, transparent)` }}
              />

              {/* Tag */}
              <div className="flex items-center justify-between">
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ background: `${s.color}15`, color: s.color, fontFamily: "var(--font-mono)", fontSize: 10 }}
                >
                  {s.tag}
                </span>
                <ArrowUpRight
                  size={14}
                  color={s.color}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
              >
                <s.icon size={18} color={s.color} />
              </div>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: fg, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 12.5, color: muted, lineHeight: 1.65 }}>{s.desc}</p>
              </div>

              {/* Bottom line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
