import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const projects = [
  {
    title: "Enterprise CRM Platform",
    category: "AI + Cloud",
    desc: "A next-generation CRM built for a 2,000-seat global sales team. Real-time deal scoring via ML, GPT-powered meeting summaries, and a unified customer data graph reduced sales cycle by 34%.",
    stack: ["React", "NestJS", "PostgreSQL", "OpenAI", "AWS"],
    metrics: [
      { label: "Faster Close Rate", value: "34%" },
      { label: "Users", value: "2K+" },
      { label: "Uptime", value: "99.99%" },
    ],
    accent: "#00E5FF",
    bgGradient:
      "linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(108,99,255,0.05) 100%)",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=380&fit=crop&auto=format",
  },
  {
    title: "Healthcare Automation System",
    category: "AI + Automation",
    desc: "End-to-end patient workflow automation for a regional hospital network. AI triage, intelligent scheduling, and NLP-powered clinical notes cut administrative overhead by 60% across 12 facilities.",
    stack: ["Next.js", "Python", "Claude API", "Azure", "PostgreSQL"],
    metrics: [
      { label: "Admin Time Saved", value: "60%" },
      { label: "Facilities", value: "12" },
      { label: "Patient Records", value: "500K" },
    ],
    accent: "#6C63FF",
    bgGradient:
      "linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(0,229,255,0.04) 100%)",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=380&fit=crop&auto=format",
  },
  {
    title: "FinTech Analytics Dashboard",
    category: "Data Intelligence",
    desc: "Real-time risk and portfolio analytics platform for a mid-market hedge fund. Sub-50ms data pipelines, predictive volatility models, and executive dashboards that visualize $2B+ AUM in real time.",
    stack: ["React", "Python", "Redis", "GCP", "LangChain"],
    metrics: [
      { label: "Data Latency", value: "<50ms" },
      { label: "AUM Tracked", value: "$2B+" },
      { label: "Accuracy", value: "94.2%" },
    ],
    accent: "#00BFFF",
    bgGradient:
      "linear-gradient(135deg, rgba(0,191,255,0.08) 0%, rgba(79,70,229,0.04) 100%)",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&h=380&fit=crop&auto=format",
  },
  {
    title: "E-Commerce Growth Engine",
    category: "Full-Stack + AI",
    desc: "Headless commerce platform with AI-driven personalization for a D2C brand doing $80M ARR. Recommendation engine, dynamic pricing, and predictive inventory management boosted revenue 28% YoY.",
    stack: ["Next.js", "Node.js", "MongoDB", "Redis", "OpenAI"],
    metrics: [
      { label: "Revenue Growth", value: "28%" },
      { label: "Annual Revenue", value: "$80M" },
      { label: "SKUs Managed", value: "50K+" },
    ],
    accent: "#a78bfa",
    bgGradient:
      "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(0,229,255,0.03) 100%)",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=380&fit=crop&auto=format",
  },
];

export function Projects() {
  const { isDark } = useTheme();
  const bg = isDark ? "#04050d" : "#e8ecf7";
  const glowBg = isDark
    ? "radial-gradient(ellipse, rgba(108,99,255,0.05) 0%, transparent 70%)"
    : "radial-gradient(ellipse, rgba(0,149,191,0.04) 0%, transparent 70%)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const cardBorder = isDark
    ? "rgba(255,255,255,0.07)"
    : "rgba(108,99,255,0.14)";
  const cardShadow = isDark
    ? "0 30px 80px rgba(0,0,0,0.4)"
    : "0 30px 80px rgba(163,177,198,0.2)";
  const textStack = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.6)";
  const textStackBorder = isDark
    ? "rgba(255,255,255,0.1)"
    : "rgba(108,99,255,0.14)";
  const textStackColor = isDark ? "#8892b0" : "#6271a0";

  return (
    <section
      id="projects"
      className="relative py-28 overflow-hidden"
      style={{ background: bg }}
    >
      <div
        className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: glowBg, filter: "blur(80px)" }}
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
            style={{
              background: isDark
                ? "rgba(0,229,255,0.08)"
                : "rgba(0,149,191,0.08)",
              border: isDark
                ? "1px solid rgba(0,229,255,0.2)"
                : "1px solid rgba(0,149,191,0.2)",
            }}
          >
            <Star size={11} color={labelColor} />
            <span
              style={{
                fontSize: 11,
                color: labelColor,
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
              }}
            >
              PROJECT SHOWCASE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: fg,
            }}
          >
            Work That Speaks{" "}
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
              for Itself
            </span>
          </motion.h2>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`grid lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden transition-all duration-300 group ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
              style={{
                background: project.bgGradient,
                border: cardBorder,
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  `${project.accent}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = cardShadow;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
                style={{ minHeight: 280 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: 280 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${i % 2 === 1 ? "270deg" : "90deg"}, rgba(4,5,13,0) 50%, rgba(4,5,13,0.8) 100%)`,
                  }}
                />
                {/* Category badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${project.accent}20`,
                    border: `1px solid ${project.accent}40`,
                    color: project.accent,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div
                className={`p-8 flex flex-col justify-center gap-5 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: fg,
                      marginBottom: 10,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ fontSize: 14, color: muted, lineHeight: 1.7 }}>
                    {project.desc}
                  </p>
                </div>

                {/* Metrics */}
                <div className="flex gap-6">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 18,
                          fontWeight: 700,
                          color: project.accent,
                        }}
                      >
                        {m.value}
                      </div>
                      <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        background: textStack,
                        border: `1px solid ${textStackBorder}`,
                        color: textStackColor,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="self-start flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                  style={{ color: project.accent }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.gap = "10px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.gap = "8px";
                  }}
                >
                  View Case Study
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
