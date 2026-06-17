import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Users, DollarSign, Zap, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";
import { useTheme } from "../../contexts/ThemeContext";

const revenueData = [
  { month: "Jan", revenue: 42000, ai: 18000 },
  { month: "Feb", revenue: 51000, ai: 22000 },
  { month: "Mar", revenue: 48000, ai: 25000 },
  { month: "Apr", revenue: 63000, ai: 31000 },
  { month: "May", revenue: 71000, ai: 38000 },
  { month: "Jun", revenue: 68000, ai: 40000 },
  { month: "Jul", revenue: 82000, ai: 49000 },
  { month: "Aug", revenue: 91000, ai: 56000 },
  { month: "Sep", revenue: 88000, ai: 58000 },
  { month: "Oct", revenue: 104000, ai: 67000 },
  { month: "Nov", revenue: 115000, ai: 74000 },
  { month: "Dec", revenue: 128000, ai: 82000 },
];

const projectData = [
  { name: "AI", value: 38 },
  { name: "Cloud", value: 24 },
  { name: "Web", value: 18 },
  { name: "Mobile", value: 12 },
  { name: "Design", value: 8 },
];

function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

function StatCard({ icon: Icon, label, value, change, positive, color, prefix = "", suffix = "" }: {
  icon: typeof TrendingUp; label: string; value: number; change: string;
  positive: boolean; color: string; prefix?: string; suffix?: string;
}) {
  const { isDark } = useTheme();
  const count = useCounter(value);
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";

  const cardStyle = isDark ? {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
  } : {
    background: "#f0f4ff",
    boxShadow: "6px 6px 14px rgba(163,177,198,0.5), -6px -6px 14px rgba(255,255,255,0.85)",
    border: "1px solid rgba(255,255,255,0.6)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={cardStyle}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Icon size={16} color={color} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold`}
          style={{ background: positive ? "rgba(16,185,129,0.12)" : "rgba(255,77,109,0.12)", color: positive ? "#10b981" : "#ff4d6d" }}>
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: fg, letterSpacing: "-0.03em", fontFamily: "var(--font-mono)" }}>
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>{label}</div>
      </div>
    </motion.div>
  );
}

export function AnalyticsWidgets() {
  const { isDark } = useTheme();
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const gridLine = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const chartCard = isDark ? {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
  } : {
    background: "#f0f4ff",
    boxShadow: "6px 6px 14px rgba(163,177,198,0.45), -6px -6px 14px rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.6)",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Monthly Revenue" value={128000} change="+23%" positive prefix="$" color="#00E5FF" />
        <StatCard icon={Users} label="Active Clients" value={154} change="+8%" positive color="#6C63FF" />
        <StatCard icon={Zap} label="AI Requests (24h)" value={284000} change="+41%" positive suffix="+" color="#00BFFF" />
        <StatCard icon={Activity} label="Projects Active" value={23} change="-2" positive={false} color="#a78bfa" />
      </div>

      {/* Revenue chart */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl p-5"
          style={chartCard}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: fg }}>Revenue vs AI Revenue</h3>
              <p style={{ fontSize: 12, color: muted }}>Full year 2024 — $128K peak in December</p>
            </div>
            <div className="flex gap-3">
              {[{ color: "#00E5FF", label: "Total" }, { color: "#6C63FF", label: "AI" }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                  <span style={{ fontSize: 11, color: muted }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: isDark ? "#0a0e1e" : "#f0f4ff", border: `1px solid ${gridLine}`, borderRadius: 12, color: fg, fontSize: 12 }}
                formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`, ""]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#00E5FF" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="ai" stroke="#6C63FF" strokeWidth={2} fill="url(#aiGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Project mix */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="rounded-2xl p-5"
          style={chartCard}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, color: fg, marginBottom: 4 }}>Project Mix</h3>
          <p style={{ fontSize: 12, color: muted, marginBottom: 16 }}>By service type — active projects</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={projectData} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fill: muted, fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#6C63FF" fillOpacity={0.8} />
              <Tooltip
                contentStyle={{ background: isDark ? "#0a0e1e" : "#f0f4ff", border: `1px solid ${gridLine}`, borderRadius: 10, color: fg, fontSize: 12 }}
                formatter={(v: number) => [`${v} projects`, ""]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-col gap-2 mt-3">
            {projectData.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between">
                <span style={{ fontSize: 12, color: muted }}>{p.name}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1 rounded-full" style={{ width: p.value * 2, background: `linear-gradient(90deg, #00E5FF, #6C63FF)` }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: fg, fontFamily: "var(--font-mono)", width: 20, textAlign: "right" }}>{p.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
