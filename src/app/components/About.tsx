import { motion } from "motion/react";
import { Eye, Target, Lightbulb, TrendingUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const cards = [
  {
    icon: Eye,
    title: "Vision",
    desc: "To be the world's most trusted AI-first technology partner, enabling every enterprise to operate at the speed of intelligence.",
    color: "#00E5FF",
  },
  {
    icon: Target,
    title: "Mission",
    desc: "We build transformative digital solutions—AI, Cloud, and Engineering—that help businesses outperform in an era of relentless change.",
    color: "#6C63FF",
  },
  {
    icon: Lightbulb,
    title: "Philosophy",
    desc: "Technology is only as powerful as the strategy behind it. We engineer with precision, empathy, and an obsession for outcomes.",
    color: "#00BFFF",
  },
  {
    icon: TrendingUp,
    title: "Strategy",
    desc: "Long-term partnerships over short-term projects. We embed deeply into your business to architect systems that compound value over time.",
    color: "#a78bfa",
  },
];

function GlassCard({ icon: Icon, title, desc, color, index }: typeof cards[0] & { index: number }) {
  const { isDark } = useTheme();
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.14)";
  const cardHoverBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-5 transition-all duration-300 group cursor-default"
      style={{
        background: cardBg,
        border: cardBorder,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = cardHoverBg;
        (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = isDark
          ? `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${color}15`
          : `0 20px 40px rgba(163,177,198,0.15), 0 0 20px ${color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = cardBg;
        (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={16} color={color} />
      </div>
      <h4 style={{ fontSize: 14, fontWeight: 600, color: fg, marginBottom: 8 }}>{title}</h4>
      <p style={{ fontSize: 13, color: muted, lineHeight: 1.65 }}>{desc}</p>
    </motion.div>
  );
}

export function About() {
  const { isDark } = useTheme();
  const bg = isDark ? "#04050d" : "#e8ecf7";
  const glowBg = isDark 
    ? "radial-gradient(ellipse, rgba(108,99,255,0.05) 0%, transparent 70%)"
    : "radial-gradient(ellipse, rgba(0,149,191,0.04) 0%, transparent 70%)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#6C63FF" : "#0095bf";
  const cyan = isDark ? "#00E5FF" : "#0FA47E";
  const tagBg = isDark ? "rgba(0,229,255,0.06)" : "rgba(0,149,191,0.06)";
  const tagBorder = isDark ? "rgba(0,229,255,0.15)" : "rgba(0,149,191,0.15)";
  
  return (
    <section id="about" className="relative py-12 overflow-hidden" style={{ background: bg }}>
      {/* Background accent */}
      <div
        className="absolute top-0 left-[-20%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: glowBg, filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Story */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: isDark ? "rgba(108,99,255,0.1)" : "rgba(0,149,191,0.08)", border: isDark ? "1px solid rgba(108,99,255,0.25)" : "1px solid rgba(0,149,191,0.2)" }}
          >
            <span style={{ fontSize: 11, color: labelColor, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>ABOUT DTECHEX</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: fg, marginBottom: 24 }}
          >
            Six Years of Engineering the Future
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <p style={{ fontSize: "1rem", color: muted, lineHeight: 1.8 }}>
              Founded in 2018, DTECHEX — Doon Technology Expert — was built on a single conviction: that AI and cloud technology should be accessible to every enterprise, not just the Fortune 500. What began as a boutique digital studio has grown into a 50+ expert team delivering AI, cloud, and full-stack solutions to 150+ clients across six continents.
            </p>
            <p style={{ fontSize: "1rem", color: muted, lineHeight: 1.8 }}>
              We operate across the most demanding sectors: healthcare, fintech, logistics, e-commerce, education, and enterprise software. Our approach is forensic — we study your operations, identify the highest-leverage technology plays, and engineer systems built to last and scale.
            </p>

            {/* Timeline accent */}
            <div className="flex gap-6 pt-4">
              {[
                { year: "2018", label: "Founded" },
                { year: "2021", label: "100 Clients" },
                { year: "2024", label: "AI-First" },
              ].map((item) => (
                <div key={item.year} className="flex flex-col gap-1">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: cyan }}>{item.year}</span>
                  <span style={{ fontSize: 12, color: muted }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sector tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            {["Healthcare", "FinTech", "Education", "Logistics", "E-Commerce", "Enterprise"].map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full text-xs"
                style={{ background: tagBg, border: tagBorder, color: muted }}
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Glass cards */}
        <div className="grid grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <GlassCard key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
