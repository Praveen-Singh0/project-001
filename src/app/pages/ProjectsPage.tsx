import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
  color: string;
  tags: string[];
}

export function ProjectsPage() {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const bg = isDark ? "#04050d" : "#e8ecf7";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const projectBg = isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.4)";
  const projectBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.14)";

  const projects: Project[] = [
    {
      id: "1",
      title: "FinTech AI Platform",
      subtitle: "Intelligent Trading Revolution",
      category: "AI & Finance",
      description: "Revolutionized trading with predictive AI",
      challenge: "Build a real-time trading platform that processes millions of data points with AI-driven insights",
      solution: "Custom ML models, low-latency infrastructure, real-time WebSocket connections",
      results: ["40% ROI Increase", "99.99% Uptime", "2M+ Daily Transactions"],
      color: "#6C63FF",
      tags: ["Machine Learning", "Real-time Data", "Trading"],
    },
    {
      id: "2",
      title: "Healthcare Data System",
      category: "Cloud & Security",
      subtitle: "HIPAA-Compliant Innovation",
      description: "Secure platform for 2M+ patient records",
      challenge: "Create enterprise healthcare platform with strict compliance and security requirements",
      solution: "AWS-based architecture, end-to-end encryption, audit trails, HIPAA compliance",
      results: ["2M+ Records", "50+ Regions", "Zero Breaches"],
      color: "#00E5FF",
      tags: ["Healthcare", "Cloud", "Security"],
    },
    {
      id: "3",
      title: "E-Commerce Intelligence",
      subtitle: "Personalization at Scale",
      category: "Full-Stack & Analytics",
      description: "ML-powered personalization engine",
      challenge: "Build personalization engine for 10M+ users processing 1B+ daily events",
      solution: "Distributed ML pipeline, real-time recommendations, advanced analytics",
      results: ["+35% Conversion", "1B+ Events/Day", "10M+ Users"],
      color: "#0FA47E",
      tags: ["E-commerce", "ML", "Analytics"],
    },
    {
      id: "4",
      title: "Real-time Analytics Platform",
      subtitle: "Data at the Speed of Thought",
      category: "Data & Analytics",
      description: "Enterprise analytics with instant insights",
      challenge: "Process streaming data for real-time business intelligence",
      solution: "Apache Kafka, Elasticsearch, custom dashboards, WebGL visualizations",
      results: ["Sub-second Latency", "1PB+ Data", "500+ Dashboards"],
      color: "#FF6B6B",
      tags: ["Analytics", "Real-time", "Data"],
    },
  ];

  return (
    <main style={{ background: bg }}>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
        {/* Background elements */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full"
          style={{
            background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
            filter: "blur(60px)",
          }}
          animate={{
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl relative z-10"
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: labelColor,
              letterSpacing: "0.15em",
              marginBottom: 24,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
            }}
          >
            Our Work
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 800,
              color: fg,
              marginBottom: 24,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textBalance: "balance",
            }}
          >
            Transforming Ideas Into Digital Excellence
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: muted,
              marginBottom: 40,
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            Experience-driven solutions that drive measurable results and industry-leading performance for forward-thinking enterprises.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: isDark ? "rgba(0,229,255,0.1)" : "rgba(0,149,191,0.1)",
              border: isDark ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(0,149,191,0.2)",
            }}
          >
            <span style={{ color: labelColor, fontWeight: 600 }}>Scroll to explore</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Timeline */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative">
        <div className="space-y-24">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15 }}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Timeline indicator */}
              <div className="flex items-start gap-8 md:gap-12">
                <div className="flex flex-col items-center gap-4 flex-shrink-0">
                  <motion.div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: project.color,
                      boxShadow: `0 0 20px ${project.color}60`,
                    }}
                  />
                  {idx !== projects.length - 1 && (
                    <div
                      className="w-0.5 h-32 md:h-48"
                      style={{
                        background: `linear-gradient(180deg, ${project.color}80, ${project.color}00)`,
                      }}
                    />
                  )}
                </div>

                {/* Project Content */}
                <motion.div
                  className="flex-1 p-8 rounded-2xl cursor-pointer transition-all"
                  style={{
                    background: projectBg,
                    border: hoveredProject === project.id ? `2px solid ${project.color}` : projectBorder,
                    borderWidth: hoveredProject === project.id ? "2px" : "1px",
                  }}
                  whileHover={{ x: 8 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div style={{ fontSize: 11, color: project.color, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                        {project.category}
                      </div>
                      <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: fg, marginBottom: 4 }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: 16, color: project.color, fontWeight: 600, marginBottom: 12 }}>
                        {project.subtitle}
                      </p>
                    </div>
                    <motion.div
                      animate={{
                        x: hoveredProject === project.id ? 8 : 0,
                        opacity: hoveredProject === project.id ? 1 : 0.6,
                      }}
                    >
                      <ArrowRight size={28} color={project.color} />
                    </motion.div>
                  </div>

                  <p style={{ fontSize: 15, color: muted, lineHeight: 1.7, marginBottom: 16 }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <div
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                          border: `1px solid ${project.color}40`,
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6"
                        style={{
                          borderTop: `1px solid ${project.color}30`,
                        }}
                      >
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <div style={{ fontSize: 11, color: labelColor, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.1em" }}>
                              Challenge
                            </div>
                            <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{project.challenge}</p>
                          </div>
                          <div>
                            <div style={{ fontSize: 11, color: labelColor, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.1em" }}>
                              Solution
                            </div>
                            <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{project.solution}</p>
                          </div>
                          <div>
                            <div style={{ fontSize: 11, color: labelColor, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.1em" }}>
                              Results
                            </div>
                            <ul style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
                              {project.results.map((result) => (
                                <li key={result} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                  <span style={{ color: project.color, fontWeight: 700 }}>•</span>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-6 px-6 py-2 rounded-full font-semibold flex items-center gap-2 text-sm"
                          style={{
                            background: project.color,
                            color: "#fff",
                          }}
                        >
                          View Case Study
                          <ChevronRight size={16} />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center py-20 rounded-3xl"
          style={{
            background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
            border: isDark ? "1px solid rgba(0,229,255,0.15)" : "1px solid rgba(0,149,191,0.15)",
          }}
        >
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: fg, marginBottom: 16 }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ fontSize: 16, color: muted, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            Let&apos;s discuss how we can transform your vision into a powerful digital solution.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto text-sm"
            style={{
              background: `linear-gradient(135deg, ${labelColor}, #6C63FF)`,
              color: "#fff",
            }}
          >
            Get in Touch
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
