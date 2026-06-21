import { useState } from "react";
import { motion } from "motion/react";
import { Users, Rocket, Globe, Shield, ArrowRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const stats = [
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: Rocket, label: "Projects Delivered", value: "300+" },
  { icon: Globe, label: "Countries Served", value: "10+" },
  { icon: Shield, label: "Client Satisfaction", value: "98%" },
];

const categories = [
  { id: "frontend", name: "Frontend", color: "#00E5FF" },
  { id: "backend", name: "Backend", color: "#6C63FF" },
  { id: "cloud", name: "Cloud", color: "#00BFFF" },
  { id: "ai", name: "AI/ML", color: "#a78bfa" },
  { id: "mobile", name: "Mobile", color: "#FF6B6B" },
  { id: "devops", name: "DevOps", color: "#4ECDC4" },
];

const technologies = [
  { name: "React", category: "frontend", icon: "⚛" },
  { name: "Next.js", category: "frontend", icon: "⬡" },
  { name: "Vue.js", category: "frontend", icon: "✓" },
  { name: "Angular", category: "frontend", icon: "A" },
  { name: "TypeScript", category: "frontend", icon: "TS" },
  { name: "Tailwind CSS", category: "frontend", icon: "🌊" },
  { name: "JavaScript", category: "frontend", icon: "JS" },
  { name: "Node.js", category: "backend", icon: "⬡" },
  { name: "Python", category: "backend", icon: "🐍" },
  { name: "GraphQL", category: "backend", icon: "◆" },
  { name: "Firebase", category: "backend", icon: "🔥" },
  { name: "AWS", category: "cloud", icon: "☁" },
  { name: "Docker", category: "devops", icon: "🐋" },
  { name: "Kubernetes", category: "devops", icon: "☸" },
];

function StatCard({ icon: Icon, label, value, index }: { icon: typeof Users; label: string; value: string; index: number }) {
  const { isDark } = useTheme();
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const iconColor = isDark ? "#00E5FF" : "#0095bf";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4 px-6 py-4"
    >
      <div className="flex-shrink-0">
        <Icon size={32} color={iconColor} />
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: fg }}>{value}</div>
        <div style={{ fontSize: 13, color: muted }}>{label}</div>
      </div>
    </motion.div>
  );
}

function TechCard({ name, icon, index }: { name: string; icon: string; index: number }) {
  const { isDark } = useTheme();
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.14)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="rounded-lg p-4 text-center cursor-pointer group"
      style={{
        background: cardBg,
        border: cardBorder,
        backdropFilter: "blur(10px)",
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: fg }}>{name}</div>
    </motion.div>
  );
}

export function TechStack() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("frontend");

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const catBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)";
  const catBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.14)";
  const activeCatBg = isDark ? "rgba(0,229,255,0.15)" : "rgba(0,149,191,0.15)";

  const filteredTechs = technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section id="tech" className="relative py-24 overflow-hidden" style={{ background: bg }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 pb-8"
          style={{
            borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(108,99,255,0.14)",
          }}
        >
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} {...stat} index={idx} />
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Side - Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: labelColor, letterSpacing: "0.15em", marginBottom: 12, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              Tech Stack
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, marginBottom: 12, lineHeight: 1.2 }}>
              Built for Speed & Reliability
            </h2>
            <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, marginBottom: 24 }}>
              We leverage the best tools and technologies to build future-ready, scalable solutions.
            </p>

            {/* Illustration Placeholder */}
            <div
              className="w-full h-48 rounded-lg flex items-center justify-center"
              style={{
                background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
                border: isDark ? "1px solid rgba(0,229,255,0.15)" : "1px solid rgba(0,149,191,0.15)",
              }}
            >
              <div style={{ textAlign: "center", color: muted }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>☁️ 💻 ⚙️</div>
                <div style={{ fontSize: 12 }}>Tech Illustration</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Categories and Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-full font-medium text-sm transition-all"
                  style={{
                    background: activeCategory === cat.id ? activeCatBg : catBg,
                    border: activeCategory === cat.id ? `2px solid ${cat.color}` : `1px solid ${catBorder}`,
                    color: activeCategory === cat.id ? cat.color : muted,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            {/* Technologies Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {filteredTechs.map((tech, idx) => (
                <TechCard key={tech.name} name={tech.name} icon={tech.icon} index={idx} />
              ))}
            </div>

            {/* View All Button */}
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
              style={{
                background: isDark ? "rgba(0,229,255,0.1)" : "rgba(0,149,191,0.1)",
                border: isDark ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(0,149,191,0.3)",
                color: labelColor,
              }}
            >
              View All Technologies
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
