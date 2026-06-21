import { useState } from "react";
import { motion } from "motion/react";
import { Cloud, Server, Shield, Zap, TrendingUp, Database, Lock, CheckCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function CloudServicesPage() {
  const { isDark } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";

  const cloudFeatures = [
    {
      icon: Server,
      title: "Global Infrastructure",
      description: "Deploy across 50+ regions worldwide with 99.99% uptime SLA",
      color: "#6C63FF",
    },
    {
      icon: Zap,
      title: "Auto-Scaling",
      description: "Automatically scale resources based on real-time demand patterns",
      color: "#00E5FF",
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Enterprise-grade database solutions with automatic backups",
      color: "#0FA47E",
    },
    {
      icon: Lock,
      title: "Advanced Security",
      description: "Bank-level encryption and compliance certifications included",
      color: "#FF6B9D",
    },
  ];

  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      price: "$299",
      period: "/month",
      description: "Perfect for small teams",
      features: [
        "Up to 10 projects",
        "100GB storage",
        "Basic support",
        "1 region deployment",
        "Community access",
      ],
      highlighted: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$899",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Unlimited projects",
        "1TB storage",
        "Priority support",
        "Multi-region deployment",
        "Advanced analytics",
        "Custom domain",
        "API access",
      ],
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Enterprise solutions",
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "24/7 support",
        "Global deployment",
        "Custom SLA",
        "Advanced security",
        "White-label options",
      ],
      highlighted: false,
    },
  ];

  const regions = [
    { name: "North America", countries: "US, Canada, Mexico", status: "Active" },
    { name: "Europe", countries: "UK, Germany, France, etc", status: "Active" },
    { name: "Asia Pacific", countries: "Singapore, Japan, Australia", status: "Active" },
    { name: "Middle East", countries: "UAE, Saudi Arabia", status: "Active" },
    { name: "South America", countries: "Brazil, Argentina", status: "Coming Soon" },
    { name: "Africa", countries: "South Africa, Nigeria", status: "Coming Soon" },
  ];

  return (
    <main style={{ background: bg }}>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
                border: isDark ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(0,149,191,0.2)",
              }}
            >
              <Cloud size={14} color={labelColor} />
              <span style={{ fontSize: 11, color: labelColor, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>
                CLOUD INFRASTRUCTURE
              </span>
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
              Enterprise Cloud Services
            </h1>
            <p style={{ fontSize: 18, color: muted, lineHeight: 1.7, marginBottom: 24 }}>
              Scalable, secure, and reliable cloud infrastructure built for modern businesses. Deploy globally with zero downtime.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${labelColor}, #6C63FF)`,
                color: "#fff",
                border: "none",
                padding: "14px 32px",
                borderRadius: "50px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6" style={{ background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.3)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, textAlign: "center", marginBottom: 48 }}>
            Why Choose Our Cloud Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cloudFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${feature.color}20`, color: feature.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: fg, marginBottom: 8 }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, textAlign: "center", marginBottom: 48 }}>
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPlan(plan.id)}
                className="rounded-2xl p-8 cursor-pointer transition-all duration-300"
                style={{
                  background: plan.highlighted
                    ? isDark
                      ? "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(108,99,255,0.1))"
                      : "linear-gradient(135deg, rgba(0,149,191,0.1), rgba(108,99,255,0.1))"
                    : cardBg,
                  border: plan.highlighted
                    ? `2px solid ${labelColor}`
                    : `1px solid ${cardBorder}`,
                  transform: selectedPlan === plan.id ? "scale(1.02)" : "scale(1)",
                }}
              >
                {plan.highlighted && (
                  <div
                    style={{
                      display: "inline-block",
                      background: `linear-gradient(135deg, ${labelColor}, #6C63FF)`,
                      color: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: 11,
                      fontWeight: 600,
                      marginBottom: 12,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 700, color: fg, marginBottom: 4 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 12, color: muted, marginBottom: 16 }}>{plan.description}</p>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: fg }}>{plan.price}</span>
                  <span style={{ fontSize: 12, color: muted, marginLeft: 8 }}>{plan.period}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: plan.highlighted
                      ? `linear-gradient(135deg, ${labelColor}, #6C63FF)`
                      : isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.5)",
                    color: plan.highlighted ? "#fff" : fg,
                    border: plan.highlighted ? "none" : `1px solid ${cardBorder}`,
                    borderRadius: "8px",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 24,
                    cursor: "pointer",
                  }}
                >
                  Choose Plan
                </motion.button>
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle size={16} color={labelColor} />
                      <span style={{ fontSize: 13, color: muted }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Regions */}
      <section className="py-20 px-6" style={{ background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.3)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, textAlign: "center", marginBottom: 48 }}>
            Global Cloud Regions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl p-6"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: fg }}>{region.name}</h3>
                  <div
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: region.status === "Active" ? "#0FA47E" : "#FFB84D",
                    }}
                  />
                </div>
                <p style={{ fontSize: 13, color: muted, marginBottom: 8 }}>{region.countries}</p>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: region.status === "Active" ? "rgba(15,164,126,0.1)" : "rgba(255,180,77,0.1)",
                    color: region.status === "Active" ? "#0FA47E" : "#FFB84D",
                  }}
                >
                  {region.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, marginBottom: 16 }}>
            Ready to Scale Your Infrastructure?
          </h2>
          <p style={{ fontSize: 16, color: muted, marginBottom: 32, lineHeight: 1.7 }}>
            Get started with our cloud platform today. No credit card required. 30-day free trial included.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(135deg, #0FA47E, ${labelColor})`,
              color: "#fff",
              border: "none",
              padding: "16px 48px",
              borderRadius: "50px",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Start Your Free Trial
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
