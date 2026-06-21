import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ProjectsPage() {
  const { isDark } = useTheme();

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";

  const projects = [
    {
      title: "FinTech AI Platform",
      category: "AI & Finance",
      description: "AI-powered trading platform with real-time analytics and predictive models",
      metrics: { impact: "40% ROI", timeline: "6 months", clients: "Fortune 500" },
      gradient: "linear-gradient(135deg, #6C63FF, #3AE5B2)",
      color: "#6C63FF",
    },
    {
      title: "Healthcare Data System",
      category: "Cloud & Security",
      description: "HIPAA-compliant cloud platform serving 2M+ patient records with ML insights",
      metrics: { uptime: "99.99%", patients: "2M+", regions: "50+" },
      gradient: "linear-gradient(135deg, #00E5FF, #0FA47E)",
      color: "#00E5FF",
    },
    {
      title: "E-Commerce Intelligence",
      category: "Full-Stack & Analytics",
      description: "Personalization engine increasing conversion rates by 35% using ML",
      metrics: { increase: "+35%", scale: "1B+ events/day", users: "10M+" },
      gradient: "linear-gradient(135deg, #0FA47E, #6C63FF)",
      color: "#0FA47E",
    },
  ];

  return (
    <main style={{ background: bg }}>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)", border: isDark ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(0,149,191,0.2)" }}
            >
              <Star size={14} color={labelColor} />
              <span style={{ fontSize: 11, color: labelColor, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>FEATURED WORK</span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                color: fg,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Portfolio of Excellence
            </h1>
            <p style={{ fontSize: 18, color: muted, lineHeight: 1.7 }}>
              Transformative projects delivered for leading enterprises across finance, healthcare, retail, and technology sectors worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.slice(0, 2).map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-2xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="h-80 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
                style={{ background: project.gradient }}
              >
                <div className="relative z-10">
                  <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    {project.category}
                  </div>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex gap-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{value}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "capitalize" }}>{key}</div>
                      </div>
                    ))}
                  </div>
                  <ArrowUpRight size={24} color="#fff" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Width Project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group rounded-2xl overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.01 }}
        >
          <div
            className="h-80 rounded-2xl p-8 flex items-end justify-between"
            style={{ background: projects[2].gradient }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                {projects[2].category}
              </div>
              <h3 style={{ fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                {projects[2].title}
              </h3>
            </div>
            <ArrowUpRight size={32} color="#fff" className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, textAlign: "center", marginBottom: 48 }}>
            Our Track Record
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "150+", label: "Projects Delivered" },
              { stat: "99.9%", label: "Client Satisfaction" },
              { stat: "50+", label: "Team Experts" },
              { stat: "6+", label: "Years in Industry" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div style={{ fontSize: 40, fontWeight: 700, color: labelColor, marginBottom: 8 }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: 15, color: muted }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
