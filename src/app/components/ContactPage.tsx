import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown, type LucideIcon,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AuroraBackground } from "./AuroraBackground";
import { ParticleField } from "./ParticleField";
import content from "../data/content.json";

const iconMap: Record<string, LucideIcon> = { MapPin, Phone, Mail, Clock };

export function ContactPage() {
  const { isDark } = useTheme();
  const data = content.contact;
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const accent = isDark ? "#3AE5B2" : "#0FA47E";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.7)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const inputBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const pageBg = isDark
    ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,229,178,0.07) 0%, transparent 55%), #04050d"
    : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,164,126,0.05) 0%, transparent 55%), #e8ecf7";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  const setField = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ background: pageBg, fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <AuroraBackground />
      <ParticleField />
      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-36 pb-12 px-6 md:px-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}
          >
            <span style={{ fontSize: 11, color: accent, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>{data.hero.badge}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-balance mx-auto"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: fg, maxWidth: 760 }}
          >
            {data.hero.title.split(data.hero.highlight)[0]}
            <span style={{ background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {data.hero.highlight}
            </span>
            {data.hero.title.split(data.hero.highlight)[1]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-pretty mx-auto mt-6"
            style={{ fontSize: 16, color: muted, lineHeight: 1.7, maxWidth: 560 }}
          >
            {data.hero.subtitle}
          </motion.p>
        </section>

        {/* Info cards */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.info.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Mail;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: "blur(10px)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}28` }}>
                    <Icon size={16} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: item.color, fontFamily: "var(--font-mono)", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13.5, color: fg, lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Form + FAQ */}
        <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-24 grid lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8"
            style={{ background: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: "blur(20px)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${accent}1f`, border: `1px solid ${accent}4d` }}>
                  <CheckCircle size={28} color={accent} />
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>Message Received</h3>
                  <p style={{ fontSize: 14, color: muted, lineHeight: 1.7 }}>Thank you for reaching out. Our team will be in touch within 24 hours.</p>
                </div>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", message: "" }); }} className="text-sm" style={{ color: accent }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 style={{ fontSize: 18, fontWeight: 600, color: fg }}>Start the Conversation</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Sarah Mitchell", type: "text" },
                    { key: "company", label: "Company", placeholder: "Acme Corp", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setField(field.key as keyof typeof form, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: fg }}
                        onFocus={(e) => { e.target.style.borderColor = `${accent}66`; e.target.style.boxShadow = `0 0 0 3px ${accent}14`; }}
                        onBlur={(e) => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>Business Email</label>
                  <input
                    type="email"
                    placeholder="sarah@company.com"
                    required
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: fg }}
                    onFocus={(e) => { e.target.style.borderColor = `${accent}66`; e.target.style.boxShadow = `0 0 0 3px ${accent}14`; }}
                    onBlur={(e) => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>Tell us about your project</label>
                  <textarea
                    placeholder="We're looking to build an AI-powered analytics platform..."
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                    style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: fg }}
                    onFocus={(e) => { e.target.style.borderColor = `${accent}66`; e.target.style.boxShadow = `0 0 0 3px ${accent}14`; }}
                    onBlur={(e) => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{ background: loading ? `${accent}4d` : "linear-gradient(135deg, #3AE5B2, #6C63FF)", color: "#04050d", boxShadow: loading ? "none" : "0 0 30px rgba(58,229,178,0.25)" }}
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "#04050d transparent transparent transparent" }} />
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>Frequently Asked Questions</h3>
            <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, marginBottom: 20 }}>Quick answers to the questions we hear most often.</p>
            <div className="flex flex-col gap-3">
              {data.faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.q} className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${open ? `${accent}40` : cardBorder}`, transition: "border-color 0.2s" }}>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-4 text-left"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600, color: fg }}>{faq.q}</span>
                      <ChevronDown size={16} color={accent} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s", flexShrink: 0 }} />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.7, padding: "0 16px 16px" }}>{faq.a}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
