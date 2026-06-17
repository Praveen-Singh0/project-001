import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Send, Calendar, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Office", value: "Dehradun, Uttarakhand, India — 248001", color: "#3AE5B2" },
  { icon: Phone, label: "Phone", value: "+91 135 000 0000", color: "#6C63FF" },
  { icon: Mail, label: "Email", value: "hello@dtechex.com", color: "#14C99A" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background: "#04050d" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(58,229,178,0.3), transparent)" }}
      />
      <div
        className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(58,229,178,0.04) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: "rgba(58,229,178,0.08)", border: "1px solid rgba(58,229,178,0.2)" }}
          >
            <Calendar size={11} color="#3AE5B2" />
            <span style={{ fontSize: 11, color: "#3AE5B2", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>GET IN TOUCH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#f0f4ff", marginBottom: 16 }}
          >
            Schedule a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3AE5B2, #6C63FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Consultation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: "#8892b0", lineHeight: 1.75, marginBottom: 32, maxWidth: 420 }}
          >
            Tell us about your challenge. Our team will respond within 24 hours with a tailored proposal or schedule a free 30-minute strategy session.
          </motion.p>

          {/* Contact info cards */}
          <div className="flex flex-col gap-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon size={15} color={item.color} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: item.color, fontFamily: "var(--font-mono)", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: "#c8d3e8" }}>{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Response time badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: "#34d399" }} />
            <span style={{ fontSize: 12, color: "#34d399" }}>Average response time: under 4 hours</span>
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(58,229,178,0.12)", border: "1px solid rgba(58,229,178,0.3)" }}
              >
                <CheckCircle size={28} color="#3AE5B2" />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f0f4ff", marginBottom: 8 }}>Message Received</h3>
                <p style={{ fontSize: 14, color: "#8892b0", lineHeight: 1.7 }}>
                  Thank you for reaching out. Our team will be in touch within 24 hours to discuss your project.
                </p>
              </div>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", message: "" }); }}
                className="text-sm transition-colors"
                style={{ color: "#3AE5B2" }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#f0f4ff", marginBottom: 4 }}>Start the Conversation</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name", placeholder: "Sarah Mitchell" },
                  { key: "company", label: "Company", placeholder: "Acme Corp" },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ fontSize: 12, color: "#8892b0", display: "block", marginBottom: 6 }}>{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f0f4ff",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(58,229,178,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(58,229,178,0.06)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: 12, color: "#8892b0", display: "block", marginBottom: 6 }}>Business Email</label>
                <input
                  type="email"
                  placeholder="sarah@company.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4ff" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(58,229,178,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(58,229,178,0.06)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, color: "#8892b0", display: "block", marginBottom: 6 }}>Tell us about your project</label>
                <textarea
                  placeholder="We're looking to build an AI-powered analytics platform for our logistics operations..."
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4ff" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(58,229,178,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(58,229,178,0.06)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: loading ? "rgba(58,229,178,0.3)" : "linear-gradient(135deg, #3AE5B2, #6C63FF)",
                  color: "#04050d",
                  boxShadow: loading ? "none" : "0 0 30px rgba(58,229,178,0.25)",
                }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 rounded-full"
                    style={{ borderColor: "#04050d transparent transparent transparent" }}
                  />
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
