import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, CheckCheck, Zap, AlertCircle, TrendingUp, MessageSquare, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const notifications = [
  { id: 1, type: "ai", icon: Zap, title: "AI Alert: Revenue anomaly detected", desc: "Q4 AI revenue 41% above forecast. HealthBridge contract contributing $22K unexpectedly.", time: "2 min ago", read: false, color: "#3AE5B2" },
  { id: 2, type: "warning", icon: AlertCircle, title: "Task overdue: Backend API Integration", desc: "Assigned to Dev Team · NovaTrade Analytics project. 3 days overdue.", time: "1 hr ago", read: false, color: "#fbbf24" },
  { id: 3, type: "success", icon: TrendingUp, title: "Project milestone reached", desc: "HealthBridge Healthcare AI — Phase 2 completed on time. Client satisfaction: 5/5.", time: "3 hrs ago", read: false, color: "#10b981" },
  { id: 4, type: "message", icon: MessageSquare, title: "New message: James Okonkwo", desc: "\"The dashboard looks excellent. Can we schedule a call to discuss Phase 3?\"", time: "5 hrs ago", read: false, color: "#6C63FF" },
  { id: 5, type: "ai", icon: Zap, title: "Weekly AI Summary Ready", desc: "12,400 AI requests processed · 98.7% accuracy · 24ms avg latency. Full report attached.", time: "Yesterday", read: true, color: "#3AE5B2" },
  { id: 6, type: "success", icon: TrendingUp, title: "Invoice paid: EduSphere Learning", desc: "$14,500 received · Invoice #INV-2024-089 cleared.", time: "Yesterday", read: true, color: "#10b981" },
];

export function NotificationCenter() {
  const { isDark } = useTheme();
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";

  const cardStyle = isDark ? {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
  } : {
    background: "#f0f4ff",
    boxShadow: "6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.6)",
  };

  const unreadCount = items.filter((n) => !n.read).length;
  const visible = filter === "unread" ? items.filter((n) => !n.read) : items;

  const markAll = () => setItems((i) => i.map((n) => ({ ...n, read: true })));
  const dismiss = (id: number) => setItems((i) => i.filter((n) => n.id !== id));

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden" style={cardStyle}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}>
        <div className="flex items-center gap-2.5">
          <Bell size={16} color={cyan} />
          <span style={{ fontSize: 15, fontWeight: 700, color: fg }}>Notifications</span>
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: "#3AE5B2", color: "#04050d" }}>{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Filter toggle */}
          <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
            {(["all", "unread"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1 text-xs font-semibold capitalize transition-all duration-200"
                style={{
                  background: filter === f ? (isDark ? "rgba(58,229,178,0.1)" : "rgba(15,164,126,0.1)") : "transparent",
                  color: filter === f ? cyan : muted,
                  border: "none", cursor: "pointer",
                }}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={markAll} className="p-1.5 rounded-lg text-xs flex items-center gap-1"
            style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}>
            <CheckCheck size={13} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Bell size={24} color={muted} />
              <span style={{ fontSize: 13, color: muted }}>No notifications</span>
            </div>
          ) : (
            visible.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="group relative flex items-start gap-3 px-5 py-4 border-b transition-all duration-200"
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  background: !notif.read ? (isDark ? "rgba(58,229,178,0.02)" : "rgba(15,164,126,0.02)") : "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = !notif.read ? (isDark ? "rgba(58,229,178,0.02)" : "rgba(15,164,126,0.02)") : "transparent";
                }}
              >
                {!notif.read && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: notif.color }} />
                )}
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${notif.color}15`, border: `1px solid ${notif.color}25` }}>
                  <notif.icon size={14} color={notif.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p style={{ fontSize: 13, fontWeight: !notif.read ? 600 : 500, color: fg, lineHeight: 1.4 }}>{notif.title}</p>
                    <button
                      onClick={() => dismiss(notif.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: muted, marginTop: 2, lineHeight: 1.5 }}>{notif.desc}</p>
                  <p style={{ fontSize: 11, color: muted, marginTop: 4, opacity: 0.7 }}>{notif.time}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
