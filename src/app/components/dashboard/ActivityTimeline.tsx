import { motion } from "motion/react";
import { GitCommit, CheckCircle, MessageSquare, FileText, Zap, AlertCircle, Users } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const events = [
  { icon: Zap, color: "#3AE5B2", title: "AI model retrained", desc: "NovaTrade risk model v2.4 deployed with +2.1% accuracy improvement.", time: "09:14 AM", date: "Today" },
  { icon: CheckCircle, color: "#10b981", title: "Task completed", desc: "HealthBridge — Patient triage API integration signed off by Sarah Mitchell.", time: "08:47 AM", date: "Today" },
  { icon: MessageSquare, color: "#6C63FF", title: "Client meeting logged", desc: "EduSphere Q1 review. 45 min. Action items: 3 features approved, timeline extended 2 weeks.", time: "07:30 AM", date: "Today" },
  { icon: FileText, color: "#fbbf24", title: "Invoice sent", desc: "INV-2024-092 · $18,500 · NovaTrade Capital · Net 30.", time: "Yesterday", date: "Dec 16" },
  { icon: Users, color: "#a78bfa", title: "New client onboarded", desc: "ArcFlow Logistics added. Cloud migration project kick-off scheduled Jan 6.", time: "Dec 15", date: "Dec 15" },
  { icon: GitCommit, color: "#14C99A", title: "Deployment: Production", desc: "FinTech Analytics Dashboard v3.1 — Sub-50ms latency confirmed. All health checks passed.", time: "Dec 14", date: "Dec 14" },
  { icon: AlertCircle, color: "#fbbf24", title: "SLA alert resolved", desc: "HealthBridge uptime alert cleared. Root cause: CDN edge misconfiguration. Resolved in 4 min.", time: "Dec 13", date: "Dec 13" },
];

export function ActivityTimeline() {
  const { isDark } = useTheme();
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";

  const cardStyle = isDark ? {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
  } : {
    background: "#f0f4ff",
    boxShadow: "6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.6)",
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={cardStyle}>
      <div className="px-5 py-4 border-b flex items-center justify-between"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: fg }}>Activity Timeline</h3>
        <span style={{ fontSize: 12, color: muted }}>{events.length} events this week</span>
      </div>

      <div className="p-5 overflow-y-auto" style={{ maxHeight: 420 }}>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px"
            style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }} />

          <div className="flex flex-col gap-5">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="relative flex items-start gap-4 pl-10"
              >
                {/* Dot on timeline */}
                <div
                  className="absolute left-0 top-1 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ev.color}15`, border: `1px solid ${ev.color}30` }}
                >
                  <ev.icon size={13} color={ev.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p style={{ fontSize: 13, fontWeight: 600, color: fg, lineHeight: 1.4 }}>{ev.title}</p>
                    <span style={{ fontSize: 10, color: muted, whiteSpace: "nowrap", flexShrink: 0, fontFamily: "var(--font-mono)", marginTop: 1 }}>
                      {i === 0 || i === 1 || i === 2 ? ev.time : ev.date}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: muted, marginTop: 3, lineHeight: 1.55 }}>{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
