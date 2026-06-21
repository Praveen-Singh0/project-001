import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Zap, Shield, Layers, Brain, Cloud, Smartphone } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ServicesPage() {
  const { isDark } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string>("ai");

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";

  const categories = [
    {
      id: "ai",
      name: "AI & Machine Learning",
      icon: Brain,
      color: "#6C63FF",
      description: "Custom AI solutions powered by latest ML technologies",
      services: [
        "Large Language Model Integration",
        "Custom Chatbot Development",
        "Predictive Analytics Engine",
        "Computer Vision Solutions",
        "AI Model Fine-tuning & Training",
        "Intelligent Automation",
      ],
    },
    {
      id: "cloud",
      name: "Cloud & Infrastructure",
      icon: Cloud,
      color: "#00E5FF",
      description: "Scalable cloud solutions for enterprise",
      services: [
        "AWS Architecture Design",
        "Multi-cloud Strategy",
        "Kubernetes Orchestration",
        "DevOps Pipeline Setup",
        "Cloud Migration Services",
        "Infrastructure as Code",
      ],
    },
    {
      id: "mobile",
      name: "Mobile & Web",
      icon: Smartphone,
      color: "#0FA47E",
      description: "Full-stack development for web and mobile",
      services: [
        "React & Next.js Development",
        "Mobile App Development",
        "Progressive Web Apps",
        "API Design & Development",
        "Real-time Applications",
        "Cross-platform Solutions",
      ],
    },
  ];

  const active = categories.find((c) => c.id === expandedCategory) || categories[0];
  const Icon = active.icon;

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
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                color: fg,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Our Services
            </h1>
            <p style={{ fontSize: 18, color: muted, lineHeight: 1.7 }}>
              Comprehensive technology solutions tailored to transform your business with cutting-edge AI, cloud infrastructure, and full-stack development expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category List */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: labelColor,
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setExpandedCategory(cat.id)}
                    whileHover={{ x: 4 }}
                    className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                    style={{
                      background: expandedCategory === cat.id ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)") : "transparent",
                      border: expandedCategory === cat.id ? `1px solid ${cat.color}` : `1px solid transparent`,
                      color: expandedCategory === cat.id ? cat.color : muted,
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{cat.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Category Details */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl p-8"
              style={{
                background: cardBg,
                border: cardBorder,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${active.color}20`,
                    border: `2px solid ${active.color}`,
                  }}
                >
                  <Icon size={32} color={active.color} />
                </div>
                <div>
                  <h2 style={{ fontSize: 28, fontWeight: 700, color: fg, marginBottom: 8 }}>
                    {active.name}
                  </h2>
                  <p style={{ fontSize: 16, color: muted }}>{active.description}</p>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-3">
                {active.services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <CheckCircle size={20} color={active.color} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: fg }}>{service}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-3 rounded-full font-semibold transition-all"
                style={{
                  background: `linear-gradient(135deg, ${active.color}, ${active.color}dd)`,
                  color: isDark ? "#04050d" : "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Get Started with {active.name}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, textAlign: "center", marginBottom: 48 }}>
            Why Choose DTECHEX
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Rapid deployment and quick time-to-market" },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-level security and compliance standards" },
              { icon: Layers, title: "Scalable", desc: "Solutions that grow with your business" },
            ].map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${labelColor}20`, color: labelColor }}
                  >
                    <BenefitIcon size={24} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: fg, marginBottom: 8 }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontSize: 14, color: muted }}>{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
