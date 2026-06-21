import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Zap, Globe, Cpu, Bot } from "lucide-react";
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
    const cx = W / 2, cy = H * 0.42;
    const R = Math.min(W, H) * 0.3;

    const c1 = isDark ? "58,229,178" : "15,164,126";
    const c2 = "108,99,255";

    // Pre-generate sphere dot grid. Brighter "land" dots via pseudo-noise clusters.
    type Dot = { phi: number; theta: number; land: boolean };
    const dots: Dot[] = [];
    const latBands = 46;
    for (let i = 1; i < latBands; i++) {
      const phi = (i / latBands) * Math.PI; // 0..PI
      const circumference = Math.sin(phi);
      const count = Math.max(6, Math.round(circumference * 90));
      for (let j = 0; j < count; j++) {
        const theta = (j / count) * Math.PI * 2;
        // pseudo land mass using layered sine noise
        const n =
          Math.sin(theta * 3 + phi * 2) +
          Math.sin(theta * 5 - phi * 4) * 0.6 +
          Math.sin(theta * 1.5 + phi * 6) * 0.8;
        const land = n > 0.6;
        dots.push({ phi, theta, land });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // outer ambient glow
      const glowGrad = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.8);
      glowGrad.addColorStop(0, `rgba(${c2},0.12)`);
      glowGrad.addColorStop(0.45, `rgba(${c1},0.05)`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, W, H);

      // sphere body
      const bodyGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      if (isDark) {
        bodyGrad.addColorStop(0, "rgba(20,30,70,0.55)");
        bodyGrad.addColorStop(0.7, "rgba(10,16,40,0.35)");
        bodyGrad.addColorStop(1, "rgba(108,99,255,0.05)");
      } else {
        bodyGrad.addColorStop(0, "rgba(210,220,245,0.85)");
        bodyGrad.addColorStop(1, "rgba(15,164,126,0.05)");
      }
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      const rot = t * 0.25;
      const tilt = -0.35; // axial tilt

      // draw sphere dots
      for (const d of dots) {
        const theta = d.theta + rot;
        // 3D coords
        let x = Math.sin(d.phi) * Math.cos(theta);
        let y = Math.cos(d.phi);
        let z = Math.sin(d.phi) * Math.sin(theta);
        // apply tilt around X axis
        const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
        const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
        y = y2; z = z2;

        const sx = cx + x * R;
        const sy = cy + y * R;
        const front = z > 0;
        const depth = (z + 1) / 2; // 0 back .. 1 front

        if (d.land) {
          const a = front ? 0.55 + depth * 0.45 : 0.08 + depth * 0.12;
          ctx.fillStyle = `rgba(${c1},${a})`;
          ctx.beginPath();
          ctx.arc(sx, sy, front ? 1.5 : 1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const a = front ? 0.12 + depth * 0.18 : 0.04;
          ctx.fillStyle = `rgba(${isDark ? "120,150,220" : "90,110,170"},${a})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // rim light
      ctx.strokeStyle = `rgba(${c2},0.4)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // orbital ring (tilted ellipse) with a moving comet head
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.4);
      const orbA = R * 1.32, orbB = R * 0.42;
      const ringGrad = ctx.createLinearGradient(-orbA, 0, orbA, 0);
      ringGrad.addColorStop(0, "transparent");
      ringGrad.addColorStop(0.25, `rgba(${c1},0.5)`);
      ringGrad.addColorStop(0.75, `rgba(${c2},0.5)`);
      ringGrad.addColorStop(1, "transparent");
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbA, orbB, 0, 0, Math.PI * 2);
      ctx.stroke();
      // comet
      const ca = t * 1.1;
      const cxp = Math.cos(ca) * orbA;
      const cyp = Math.sin(ca) * orbB;
      ctx.fillStyle = `rgba(${c1},1)`;
      ctx.shadowColor = `rgba(${c1},0.9)`;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cxp, cyp, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // holographic projection base — concentric rings
      const baseY = cy + R + 38;
      for (let i = 0; i < 4; i++) {
        const prog = ((t * 0.4 + i / 4) % 1);
        const rr = 30 + prog * 110;
        ctx.strokeStyle = `rgba(${c1},${0.35 * (1 - prog)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, baseY, rr, rr * 0.22, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // vertical light beams from globe to base
      const beamGrad = ctx.createLinearGradient(0, cy, 0, baseY);
      beamGrad.addColorStop(0, `rgba(${c1},0.25)`);
      beamGrad.addColorStop(1, "transparent");
      ctx.strokeStyle = beamGrad;
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 14, cy + R * 0.5);
        ctx.lineTo(cx + i * 30, baseY);
        ctx.stroke();
      }

      // central beam core
      const coreGrad = ctx.createLinearGradient(0, baseY - 90, 0, baseY);
      coreGrad.addColorStop(0, "transparent");
      coreGrad.addColorStop(1, `rgba(${c1},0.5)`);
      ctx.strokeStyle = coreGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, baseY - 90);
      ctx.lineTo(cx, baseY);
      ctx.stroke();
      // base glow point
      ctx.fillStyle = `rgba(${c1},0.9)`;
      ctx.shadowColor = `rgba(${c1},0.9)`;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(cx, baseY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      t += 0.012;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      width={460}
      height={460}
      className="w-full max-w-[460px] mx-auto"
      style={{ filter: isDark ? "drop-shadow(0 0 50px rgba(108,99,255,0.25))" : "drop-shadow(0 0 30px rgba(15,164,126,0.15))" }}
    />
  );
}

function AIDashboardCard({ isDark }: { isDark: boolean }) {
  const green = isDark ? "#3AE5B2" : "#0FA47E";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-10 right-0 md:right-[-24px] rounded-2xl p-5 w-[252px]"
      style={{
        background: isDark ? "rgba(10,14,30,0.85)" : "rgba(232,236,247,0.92)",
        backdropFilter: "blur(20px)",
        border: isDark ? "1px solid rgba(58,229,178,0.2)" : "1px solid rgba(15,164,126,0.2)",
        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(58,229,178,0.05)"
          : "8px 8px 24px rgba(163,177,198,0.5), -8px -8px 24px rgba(255,255,255,0.9)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ border: `1px solid ${green}`, background: isDark ? "rgba(58,229,178,0.08)" : "rgba(15,164,126,0.08)" }}
          >
            <Bot size={16} color={green} />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: fg, fontWeight: 700, letterSpacing: "0.04em" }}>AI ENGINE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: green, boxShadow: `0 0 6px ${green}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: green, fontWeight: 600, letterSpacing: "0.08em" }}>ACTIVE</span>
        </div>
      </div>

      <p style={{ fontSize: 14, color: muted, lineHeight: 1.5, marginBottom: 16 }}>
        Learning. Analyzing.<br />Delivering Intelligence.
      </p>

      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #3AE5B2, #6C63FF)" }}
          animate={{ width: ["55%", "82%", "62%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
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
              onClick={() => { }}
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
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1.2 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <AIGlobe isDark={isDark} />
          <AIDashboardCard isDark={isDark} />

          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute top-12 left-[20px] rounded-xl px-3 py-2 flex items-center gap-2"
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
