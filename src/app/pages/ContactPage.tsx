import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ChevronDown, Send } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ContactPage() {
  const { isDark } = useTheme();
  const [expandedFaq, setExpandedFaq] = useState<number>(0);

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const inputBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)";
  const inputBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.14)";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";

  const faqs = [
    {
      question: "What's the typical project timeline?",
      answer: "Most projects take 3-6 months depending on scope. We provide detailed timelines during the consultation phase.",
    },
    {
      question: "Do you offer support after launch?",
      answer: "Yes, we provide 24/7 support and maintenance packages tailored to your business needs.",
    },
    {
      question: "What technologies do you work with?",
      answer: "We specialize in AI/ML, cloud platforms (AWS, GCP), React, Node.js, Python, and modern full-stack technologies.",
    },
    {
      question: "How do you handle data security?",
      answer: "All projects follow enterprise security standards with HIPAA, SOC 2, and GDPR compliance options available.",
    },
  ];

  const contactMethods = [
    { icon: Mail, label: "Email", value: "hello@dtechex.com", color: "#6C63FF" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", color: "#00E5FF" },
    { icon: MapPin, label: "Address", value: "San Francisco, CA", color: "#0FA47E" },
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
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                color: fg,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Let&apos;s Build Together
            </h1>
            <p style={{ fontSize: 18, color: muted, lineHeight: 1.7 }}>
              Have a project in mind? Get in touch with our team and let&apos;s create something extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
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
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${method.color}20`, color: method.color }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: fg, marginBottom: 4 }}>
                    {method.label}
                  </h3>
                  <p style={{ fontSize: 15, color: muted }}>{method.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form & FAQ Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, color: fg, marginBottom: 24 }}>Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: muted, marginBottom: 8, textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      borderRadius: "8px",
                      color: fg,
                      fontSize: 14,
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: muted, marginBottom: 8, textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      borderRadius: "8px",
                      color: fg,
                      fontSize: 14,
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: muted, marginBottom: 8, textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    Project Type
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      borderRadius: "8px",
                      color: fg,
                      fontSize: 14,
                      fontFamily: "inherit",
                    }}
                  >
                    <option>AI & Machine Learning</option>
                    <option>Cloud Infrastructure</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: muted, marginBottom: 8, textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      borderRadius: "8px",
                      color: fg,
                      fontSize: 14,
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${labelColor}, #6C63FF)`,
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, color: fg, marginBottom: 24 }}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-lg overflow-hidden"
                    style={{ border: `1px solid ${inputBorder}` }}
                  >
                    <motion.button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                      className="w-full p-4 flex items-center justify-between"
                      style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.4)" }}
                      whileHover={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)" }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600, color: fg, textAlign: "left" }}>
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        color={labelColor}
                        style={{
                          transform: expandedFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s",
                          flexShrink: 0,
                        }}
                      />
                    </motion.button>

                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: expandedFaq === idx ? "auto" : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "16px",
                          background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.3)",
                          borderTop: `1px solid ${inputBorder}`,
                        }}
                      >
                        <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
