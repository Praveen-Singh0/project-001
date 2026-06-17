import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Zap, Globe, Cpu } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "../contexts/NavigationContext";
import { MagneticButton } from "./MagneticButton";

function AIGlobe({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.38;

    const c1 = isDark ? "58,229,178" : "15,164,126";
    const c2 = isDark ? "108,99,255" : "108,99,255";

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const glowGrad = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.4);
      glowGrad.addColorStop(0, `rgba(${c1},0.06)`);
      glowGrad.addColorStop(0.5, `rgba(${c2},0.04)`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.4, 0, Math.PI * 2);
      ctx.fill();

      const bodyGrad = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, 0, cx, cy, R);
      if (isDark) {
        bodyGrad.addColorStop(0, "rgba(10,14,30,0.9)");
        bodyGrad.addColorStop(1, "rgba(58,229,178,0.06)");
      } else {
        bodyGrad.addColorStop(0, "rgba(220,228,248,0.95)");
        bodyGrad.addColorStop(1, "rgba(15,164,126,0.06)");
      }
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(${c1},0.35)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 1; i <= 5; i++) {
        const lat = (i / 6) * Math.PI;
        const y = cy - R * Math.cos(lat);
        const r = R * Math.sin(lat);
        if (r < 2) continue;
        ctx.strokeStyle = `rgba(${c1},0.1)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(cx, y, r, r * 0.18, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI + t * 0.2;
        ctx.strokeStyle = `rgba(${c1},0.08)`;
        ctx.lineWidth = 0.8;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, R * 0.3, R, 0, 0, Math.PI * 2);
        ctx.restore();
        ctx.stroke();
      }

      const nodes = [
        { phi: 0.5, theta: t * 0.4 },
        { phi: 1.1, theta: 1.2 + t * 0.3 },
        { phi: 0.8, theta: 2.5 + t * 0.5 },
        { phi: 1.5, theta: 0.8 + t * 0.25 },
        { phi: 0.3, theta: 3.8 + t * 0.35 },
        { phi: 1.8, theta: 4.5 + t * 0.45 },
      ];

      const projected = nodes.map((n) => ({
        x: cx + R * Math.sin(n.phi) * Math.cos(n.theta),
        y: cy + R * Math.cos(n.phi),
        visible: Math.cos(n.theta) > -0.2,
      }));

      ctx.strokeStyle = `rgba(${c1},0.18)`;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          if (!projected[i].visible || !projected[j].visible) continue;
          const dx = projected[j].x - projected[i].x;
          const dy = projected[j].y - projected[i].y;
          if (Math.sqrt(dx * dx + dy * dy) < R * 1.1) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            const mx = (projected[i].x + projected[j].x) / 2;
            const my = (projected[i].y + projected[j].y) / 2 - 15;
            ctx.quadraticCurveTo(mx, my, projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      projected.forEach((p) => {
        if (!p.visible) return;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2);
        ctx.fillStyle = `rgba(${c1},${0.7 + 0.3 * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${c1},${0.3 * pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6 + 3 * pulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      const arcGrad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      arcGrad.addColorStop(0, "transparent");
      arcGrad.addColorStop(0.3, `rgba(${c1},0.15)`);
      arcGrad.addColorStop(0.7, `rgba(${c2},0.15)`);
      arcGrad.addColorStop(1, "transparent");
      ctx.strokeStyle = arcGrad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, R + 12, -Math.PI * 0.7, Math.PI * 0.1);
      ctx.stroke();

      t += 0.012;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={420}
      className="w-full max-w-[420px] mx-auto"
      style={{ filter: isDark ? "drop-shadow(0 0 40px rgba(58,229,178,0.2))" : "drop-shadow(0 0 30px rgba(15,164,126,0.15))" }}
    />
  );
}

function AIDashboardCard({ isDark }: { isDark: boolean }) {
  const metrics = [
    { label: "AI Requests/s", value: "12.4K", color: isDark ? "#3AE5B2" : "#0FA47E" },
    { label: "Accuracy", value: "98.7%", color: "#6C63FF" },
    { label: "Latency", value: "24ms", color: isDark ? "#14C99A" : "#0B7D5E" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-8 right-0 md:right-[-20px] rounded-2xl p-4 w-[240px]"
      style={{
        background: isDark ? "rgba(10,14,30,0.85)" : "rgba(232,236,247,0.92)",
        backdropFilter: "blur(20px)",
        border: isDark ? "1px solid rgba(58,229,178,0.2)" : "1px solid rgba(15,164,126,0.2)",
        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(58,229,178,0.05)"
          : "8px 8px 24px rgba(163,177,198,0.5), -8px -8px 24px rgba(255,255,255,0.9)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ background: isDark ? "#3AE5B2" : "#0FA47E", boxShadow: `0 0 6px ${isDark ? "#3AE5B2" : "#0FA47E"}` }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: isDark ? "#8892b0" : "#6271a0" }}>AI ENGINE ACTIVE</span>
      </div>
      {metrics.map((m) => (
        <div key={m.label} className="mb-2.5">
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: 10, color: isDark ? "#8892b0" : "#6271a0" }}>{m.label}</span>
            <span style={{ fontSize: 11, color: m.color, fontFamily: "var(--font-mono)", fontWeight: 600 }}>{m.value}</span>
          </div>
          <div className="h-1 rounded-full" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)" }}>
            <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${m.color}, transparent)`, width: "75%" }}
              animate={{ width: ["65%", "85%", "70%"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

const logos = [
  { name: "Google", letter: "G", color: "#4285F4" },
  { name: "Microsoft", letter: "M", color: "#00BCF2" },
  { name: "AWS", letter: "⌘", color: "#FF9900" },
  { name: "Oracle", letter: "O", color: "#FF0000" },
  { name: "Meta", letter: "f", color: "#0668E1" },
  { name: "Adobe", letter: "Ae", color: "#FF0000" },
];

function Particles({ isDark }: { isDark: boolean }) {
  const items = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    dur: 4 + Math.random() * 4,
    color: i % 2 === 0 ? (isDark ? "rgba(58,229,178,0.5)" : "rgba(15,164,126,0.4)") : (isDark ? "rgba(108,99,255,0.5)" : "rgba(108,99,255,0.4)"),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
          animate={{ opacity: [0.1, 0.8, 0.1], y: [0, -20, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

export function Hero() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Particles isDark={isDark} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center pt-24 pb-16">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 w-fit"
            style={{
              background: isDark ? "rgba(58,229,178,0.08)" : "rgba(15,164,126,0.08)",
              border: `1px solid ${isDark ? "rgba(58,229,178,0.2)" : "rgba(15,164,126,0.2)"}`,
            }}
          >
            <Zap size={12} color={cyan} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: cyan, letterSpacing: "0.1em" }}>AI • CLOUD • DIGITAL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: fg }}
          >
            Building{" "}
            <span style={{ background: "linear-gradient(135deg, #3AE5B2 0%, #6C63FF 60%, #14C99A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Intelligent
            </span>{" "}
            Solutions for a Smarter Tomorrow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontSize: "1.05rem", color: muted, lineHeight: 1.75, maxWidth: 500 }}
          >
            DTECHEX empowers businesses with AI, Cloud, and Digital Engineering to drive innovation, automate operations, and accelerate growth.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }} className="flex items-center gap-4 flex-wrap">
            <MagneticButton
              onClick={() => navigate("dashboard")}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #3AE5B2, #6C63FF)",
                color: "#04050d",
                boxShadow: isDark ? "0 0 30px rgba(58,229,178,0.3)" : "0 8px 30px rgba(15,164,126,0.35)",
              }}
            >
              Explore Dashboard <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton
              as="a"
              onClick={() => {}}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300"
              style={{
                background: "transparent",
                border: `1px solid ${isDark ? "rgba(58,229,178,0.3)" : "rgba(15,164,126,0.3)"}`,
                color: fg,
              }}
            >
              View Our Work
            </MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.6 }} className="flex items-center gap-3">
            <div className="flex">
              {["#3AE5B2", "#6C63FF", "#4F46E5", "#14C99A"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: isDark ? "#04050d" : "#e8ecf7", background: c, marginLeft: i ? -8 : 0, fontSize: 10, color: "#04050d", fontWeight: 700 }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Globe size={13} color={cyan} />
              <span style={{ fontSize: 13, color: muted }}>
                Trusted by <span style={{ color: cyan, fontWeight: 600 }}>150+ Businesses</span> Worldwide
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="pt-2">
            <p style={{ fontSize: 11, color: muted, letterSpacing: "0.08em", marginBottom: 12 }}>PARTNERED WITH INDUSTRY LEADERS</p>
            <div className="flex items-center gap-5 flex-wrap">
              {logos.map((l) => (
                <div key={l.name} className="flex items-center gap-1.5 opacity-40 hover:opacity-70 transition-opacity duration-300" title={l.name}>
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: l.color, fontSize: 9, fontWeight: 700, color: "#fff" }}>{l.letter}</div>
                  <span style={{ fontSize: 12, color: fg, fontWeight: 600 }}>{l.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <AIGlobe isDark={isDark} />
          <AIDashboardCard isDark={isDark} />

          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute top-12 left-0 md:left-[-10px] rounded-xl px-3 py-2 flex items-center gap-2"
            style={{
              background: isDark ? "rgba(10,14,30,0.85)" : "rgba(232,236,247,0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(108,99,255,0.25)",
              boxShadow: isDark ? "none" : "4px 4px 12px rgba(163,177,198,0.4), -4px -4px 12px rgba(255,255,255,0.8)",
            }}
          >
            <Cpu size={14} color="#6C63FF" />
            <span style={{ fontSize: 12, color: fg, fontWeight: 500 }}>300+ Projects Delivered</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(transparent, ${isDark ? "#04050d" : "#e8ecf7"})` }} />
    </section>
  );
}
