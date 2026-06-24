"use client";

import { Users, TrendingUp, Clock, Shield, CheckCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function StaffAugmentationPage() {
  const { isDark } = useTheme();

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const accentColor = "#0FA47E";
  const glowGradient = isDark
    ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)"
    : "linear-gradient(90deg, transparent, rgba(0,149,191,0.2), transparent)";
  const glowBg = isDark
    ? "radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, transparent 70%)"
    : "radial-gradient(ellipse, rgba(0,149,191,0.03) 0%, transparent 70%)";

  const engagementModels = [
    {
      title: "Dedicated Teams",
      description: "Build a fully managed team dedicated to your project with direct collaboration and accountability.",
      features: ["Single point of contact", "Fixed resource allocation", "Seamless communication", "Long-term commitment"],
    },
    {
      title: "Time & Materials",
      description: "Flexible engagement with hourly or daily billing, perfect for varying project demands.",
      features: ["Pay for actual work", "Flexible scaling", "No minimum commitment", "Variable resource needs"],
    },
    {
      title: "Project-Based",
      description: "Fixed-price engagement for well-defined projects with clear deliverables and timelines.",
      features: ["Fixed budget", "Clear scope", "Defined timeline", "Predictable costs"],
    },
    {
      title: "Managed Services",
      description: "Outsourced operations management including support, maintenance, and continuous optimization.",
      features: ["24/7 monitoring", "Proactive support", "Regular updates", "Performance optimization"],
    },
  ];

  const benefits = [
    { icon: Users, label: "Access Top Talent", description: "Leverage a global pool of skilled professionals" },
    { icon: TrendingUp, label: "Scale Rapidly", description: "Grow your team quickly without hiring overhead" },
    { icon: Clock, label: "Faster Time-to-Market", description: "Get productive resources immediately" },
    { icon: Shield, label: "Risk Mitigation", description: "Flexible arrangements with proven professionals" },
  ];

  return (
    <main style={{ background: bg }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: glowGradient }}
        />
        <div
          className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: glowBg, filter: "blur(80px)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
                border: isDark
                  ? "1px solid rgba(0,229,255,0.2)"
                  : "1px solid rgba(0,149,191,0.2)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: labelColor,
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                STAFF AUGMENTATION
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: fg,
                marginBottom: 24,
              }}
            >
              Build Your Dream Team with Expert{" "}
              <span
                className="inline-block bg-gradient-to-r from-[#3AE5B2] via-[#6C63FF] to-[#00E5FF] bg-clip-text text-transparent"
              >
                Augmentation
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: muted,
                lineHeight: 1.7,
                maxWidth: 650,
                margin: "0 auto 32px",
              }}
            >
              Access pre-vetted, experienced professionals to accelerate your projects and scale your teams on-demand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="rounded-2xl p-12"
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
            }}
          >
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: fg,
                marginBottom: 20,
              }}
            >
              Why Choose Staff Augmentation?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: muted,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              Staff augmentation provides a strategic way to extend your team's capabilities without the costs and commitments of permanent hiring. Whether you need specialized expertise, additional capacity, or skills for a specific project, our carefully vetted professionals integrate seamlessly with your organization.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Expert Vetting", description: "Rigorous screening ensures only top professionals join our pool" },
                { title: "Seamless Integration", description: "Our team members work as true extensions of your organization" },
                { title: "Cost-Effective", description: "Pay only for the resources you need, when you need them" },
                { title: "Quick Onboarding", description: "Fast deployment with minimal ramp-up time" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.4)",
                  }}
                >
                  <CheckCircle size={24} color={accentColor} className="flex-shrink-0" />
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: fg, marginBottom: 4 }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: fg,
                marginBottom: 12,
              }}
            >
              Flexible Engagement Models
            </h2>
            <p
              style={{
                fontSize: 16,
                color: muted,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Choose the engagement model that best fits your needs and project requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {engagementModels.map((model, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl p-8 group hover:scale-105 transition-all duration-300"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: fg,
                    marginBottom: 8,
                  }}
                >
                  {model.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: muted,
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {model.description}
                </p>
                <ul className="space-y-2">
                  {model.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2">
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: accentColor }}
                      />
                      <span style={{ fontSize: 13, color: muted }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 md:px-10" style={{ background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.3)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: fg,
                marginBottom: 12,
              }}
            >
              Key Benefits
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `${accentColor}15`,
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    <Icon size={24} color={accentColor} />
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: fg,
                      marginBottom: 8,
                    }}
                  >
                    {benefit.label}
                  </h3>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: fg,
                marginBottom: 12,
              }}
            >
              Our Process
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Requirement Analysis", desc: "We understand your needs and project scope" },
              { step: "02", title: "Talent Matching", desc: "Curated pool of professionals matching your criteria" },
              { step: "03", title: "Onboarding", desc: "Quick setup and integration with your team" },
              { step: "04", title: "Success Support", desc: "Ongoing management and performance optimization" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: 12,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: fg, marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <div
                    className="hidden md:flex absolute top-1/2 -right-3 w-6 h-6 items-center justify-center"
                    style={{ color: accentColor }}
                  >
                    <ArrowUpRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: fg,
                marginBottom: 16,
              }}
            >
              Ready to Scale Your Team?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: muted,
                marginBottom: 32,
                lineHeight: 1.7,
                maxWidth: 550,
                margin: "0 auto 32px",
              }}
            >
              Let's discuss how staff augmentation can help you achieve your project goals while maintaining flexibility and cost-effectiveness.
            </p>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Schedule Consultation
              <ArrowUpRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
