import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

function useCounter(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

const stats = [
  { value: 150, suffix: "+", label: "Clients Worldwide", color: "#3AE5B2" },
  { value: 50, suffix: "+", label: "Expert Engineers", color: "#6C63FF" },
  { value: 300, suffix: "+", label: "Projects Delivered", color: "#14C99A" },
  { value: 98, suffix: "%", label: "Client Satisfaction", color: "#a78bfa" },
];

function StatCard({ value, suffix, label, color, index, started }: typeof stats[0] & { index: number; started: boolean }) {
  const count = useCounter(value, 2000 + index * 200, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex flex-col items-center gap-2 p-8 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          color,
          lineHeight: 1,
          textShadow: `0 0 30px ${color}50`,
          letterSpacing: "-0.02em",
        }}
      >
        {count}
        {suffix}
      </div>
      <div style={{ fontSize: 13, color: "#8892b0", fontWeight: 500, textAlign: "center" }}>{label}</div>
      <div className="w-12 h-px mt-1" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    </motion.div>
  );
}

/* Simplified animated world map using canvas dots */
function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  /* Approximate world landmass dot positions (normalized 0-1) */
  const dots = [
    // North America
    [0.15, 0.25], [0.18, 0.22], [0.22, 0.20], [0.25, 0.23], [0.20, 0.28], [0.23, 0.32], [0.18, 0.35],
    [0.14, 0.30], [0.12, 0.35], [0.17, 0.38], [0.20, 0.40], [0.24, 0.38],
    // South America
    [0.25, 0.50], [0.27, 0.55], [0.24, 0.60], [0.26, 0.65], [0.28, 0.70], [0.23, 0.58],
    // Europe
    [0.46, 0.22], [0.48, 0.20], [0.50, 0.22], [0.52, 0.20], [0.47, 0.25], [0.49, 0.27], [0.51, 0.25],
    [0.44, 0.25], [0.53, 0.23], [0.45, 0.28],
    // Africa
    [0.48, 0.38], [0.50, 0.42], [0.49, 0.50], [0.51, 0.55], [0.48, 0.60], [0.52, 0.45], [0.47, 0.45],
    // Asia
    [0.55, 0.22], [0.58, 0.20], [0.62, 0.22], [0.65, 0.24], [0.68, 0.22], [0.70, 0.25],
    [0.60, 0.28], [0.63, 0.32], [0.67, 0.30], [0.72, 0.28], [0.75, 0.30],
    [0.58, 0.35], [0.62, 0.38], [0.65, 0.36], [0.70, 0.38],
    [0.55, 0.28], [0.78, 0.32], [0.80, 0.30], [0.82, 0.28],
    // Australia
    [0.76, 0.58], [0.78, 0.55], [0.80, 0.58], [0.78, 0.62], [0.75, 0.60],
  ];

  // Active connections (city pairs by index)
  const connections = [
    [0, 30], [10, 45], [20, 55], [35, 60], [5, 25], [50, 62],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      // Draw dots
      dots.forEach(([nx, ny], i) => {
        const x = nx * W;
        const y = ny * H;
        const pulse = 0.4 + 0.2 * Math.sin(t * 1.5 + i * 0.5);
        ctx.fillStyle = `rgba(58,229,178,${pulse * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw animated connection arcs
      connections.forEach(([ai, bi], ci) => {
        if (ai >= dots.length || bi >= dots.length) return;
        const ax = dots[ai][0] * W;
        const ay = dots[ai][1] * H;
        const bx = dots[bi][0] * W;
        const by = dots[bi][1] * H;

        const progress = ((t * 0.5 + ci * 0.6) % 3) / 3;
        if (progress > 1) return;

        const mx = (ax + bx) / 2;
        const my = Math.min(ay, by) - 40 - Math.abs(bx - ax) * 0.15;

        // Draw arc
        ctx.strokeStyle = `rgba(108,99,255,${0.3 * (1 - Math.abs(progress - 0.5) * 2)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mx, my, bx, by);
        ctx.stroke();

        // Moving dot
        const px = (1 - progress) * (1 - progress) * ax + 2 * (1 - progress) * progress * mx + progress * progress * bx;
        const py = (1 - progress) * (1 - progress) * ay + 2 * (1 - progress) * progress * my + progress * progress * by;
        ctx.fillStyle = "rgba(58,229,178,0.9)";
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 0.016;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="w-full"
      style={{ opacity: 0.7 }}
    />
  );
}

export function GlobalTrust() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trust"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, rgba(6,9,20,1) 50%, #04050d 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(58,229,178,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: "rgba(58,229,178,0.08)", border: "1px solid rgba(58,229,178,0.2)" }}
          >
            <span style={{ fontSize: 11, color: "#3AE5B2", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>GLOBAL PRESENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#f0f4ff" }}
          >
            Trusted Across{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3AE5B2, #6C63FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Every Continent
            </span>
          </motion.h2>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="rounded-2xl overflow-hidden mb-12 p-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(58,229,178,0.1)",
          }}
        >
          <WorldMap />
        </motion.div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
