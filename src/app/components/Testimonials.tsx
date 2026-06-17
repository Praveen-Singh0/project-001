import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CTO",
    company: "HealthBridge Systems",
    avatar: "SM",
    avatarColor: "#3AE5B2",
    quote: "DTECHEX didn't just build us a system — they reimagined how our 12 hospitals operated. The AI triage engine alone has saved hundreds of clinical hours per week. Exceptional technical depth and the most rigorous delivery process I've worked with in 15 years.",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    role: "VP of Engineering",
    company: "NovaTrade Capital",
    avatar: "JO",
    avatarColor: "#6C63FF",
    quote: "Our FinTech analytics platform went from a fragile legacy system to a sub-50ms real-time engine in six months. DTECHEX's team has a rare combination: they understand finance deeply and they ship production-quality AI. We've renewed our retainer twice.",
    rating: 5,
  },
  {
    name: "Priya Krishnamurthy",
    role: "Head of Digital",
    company: "Luminary Commerce",
    avatar: "PK",
    avatarColor: "#14C99A",
    quote: "The personalization engine DTECHEX built added $4M in incremental revenue in the first year. What impressed me most was how they collaborated with our team — they upskilled our engineers, not just replaced them. True partners.",
    rating: 5,
  },
  {
    name: "Daniel Ferrara",
    role: "CEO",
    company: "LogiFlow Logistics",
    avatar: "DF",
    avatarColor: "#a78bfa",
    quote: "We tried two other vendors before DTECHEX. They were the only team that could handle the complexity of our supply chain data model while also delivering a UI our warehouse staff could actually use. Delivery was on time, on budget, and beyond scope.",
    rating: 5,
  },
  {
    name: "Aiko Tanaka",
    role: "Director of Innovation",
    company: "EduSphere Learning",
    avatar: "AT",
    avatarColor: "#f472b6",
    quote: "DTECHEX built our adaptive learning platform from zero to 50,000 students in eight months. The AI content recommendation system is genuinely impressive — engagement metrics are up 41% over our previous platform.",
    rating: 5,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden" style={{ background: "#04050d" }}>
      <div
        className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(108,99,255,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)" }}
          >
            <span style={{ fontSize: 11, color: "#6C63FF", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>CLIENT TESTIMONIALS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#f0f4ff" }}
          >
            What Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3AE5B2, #6C63FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Clients
            </span>{" "}
            Say
          </motion.h2>
        </div>

        {/* Carousel */}
        <div
          className="relative rounded-3xl p-8 md:p-12"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Quote icon */}
          <div
            className="absolute top-8 right-8 w-12 h-12 rounded-xl flex items-center justify-center opacity-20"
            style={{ background: t.avatarColor }}
          >
            <Quote size={20} color="#04050d" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <div key={i} style={{ color: "#fbbf24", fontSize: 16 }}>★</div>
                ))}
              </div>

              {/* Quote */}
              <blockquote style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#c8d3e8", lineHeight: 1.75, fontStyle: "italic" }}>
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.avatarColor}30, ${t.avatarColor}10)`,
                    border: `1px solid ${t.avatarColor}40`,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: t.avatarColor,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#f0f4ff", fontSize: 15 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#8892b0" }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    background: i === active ? t.avatarColor : "rgba(255,255,255,0.15)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#8892b0" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(58,229,178,0.4)";
                  (e.currentTarget as HTMLElement).style.color = "#3AE5B2";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "#8892b0";
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#8892b0" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(58,229,178,0.4)";
                  (e.currentTarget as HTMLElement).style.color = "#3AE5B2";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "#8892b0";
                }}
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom testimonial previews */}
        <div className="grid grid-cols-5 gap-3 mt-6 hidden md:grid">
          {testimonials.map((t2, i) => (
            <button
              key={t2.name}
              onClick={() => setActive(i)}
              className="rounded-xl p-3 text-left transition-all duration-200"
              style={{
                background: i === active ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${i === active ? t2.avatarColor + "40" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mb-2"
                style={{ background: `${t2.avatarColor}20`, fontSize: 9, fontWeight: 700, color: t2.avatarColor, fontFamily: "var(--font-mono)" }}
              >
                {t2.avatar}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: i === active ? "#f0f4ff" : "#8892b0" }}>{t2.name}</div>
              <div style={{ fontSize: 9, color: "#8892b0" }}>{t2.company}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
