"use client";

import { Eye, Target, Lightbulb, TrendingUp, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const cards: {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}[] = [
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

function GlassCard({
  icon: Icon,
  title,
  desc,
  color,
}: (typeof cards)[number]) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass-card rounded-2xl p-5 group cursor-default"
      style={{ "--card-accent": color } as React.CSSProperties}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={16} color={color} />
      </div>
      <h4 className="text-sm font-semibold mb-2 text-foreground">{title}</h4>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
    </motion.div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative py-12 overflow-hidden bg-background"
    >
      <div
        className="absolute top-0 left-[-20%] w-[600px] h-[600px] rounded-full pointer-events-none blur-[80px]"
        style={{ background: "var(--section-glow)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
            style={{
              background: "var(--pill-label-bg)",
              borderColor: "var(--pill-label-border)",
            }}
          >
            <span
              className="text-[11px] tracking-widest font-mono"
              style={{ color: "var(--brand-label)" }}
            >
              ABOUT DTECHEX
            </span>
          </div>

          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-tight tracking-tight text-foreground mb-6">
            Six Years of Engineering the Future
          </h2>

          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-muted-foreground">
              Founded in 2018, DTECHEX — Doon Technology Expert — was built on a single conviction: that AI and cloud technology should be accessible to every enterprise, not just the Fortune 500. What began as a boutique digital studio has grown into a 50+ expert team delivering AI, cloud, and full-stack solutions to 150+ clients across six continents.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              We operate across the most demanding sectors: healthcare, fintech, logistics, e-commerce, education, and enterprise software. Our approach is forensic — we study your operations, identify the highest-leverage technology plays, and engineer systems built to last and scale.
            </p>

            <div className="flex gap-6 pt-4">
              {[
                { year: "2018", label: "Founded" },
                { year: "2021", label: "100 Clients" },
                { year: "2024", label: "AI-First" },
              ].map((item) => (
                <div key={item.year} className="flex flex-col gap-1">
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: "var(--brand-cyan)" }}
                  >
                    {item.year}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {["Healthcare", "FinTech", "Education", "Logistics", "E-Commerce", "Enterprise"].map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full text-xs border text-muted-foreground"
                style={{
                  background: "var(--tag-bg)",
                  borderColor: "var(--tag-border)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {cards.map((c) => (
            <GlassCard key={c.title} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
