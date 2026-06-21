import { useState } from "react";
import { motion } from "motion/react";
import { Search, Plus, MoreHorizontal, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const clients = [
  { id: 1, name: "HealthBridge Systems", contact: "Sarah Mitchell", email: "s.mitchell@hbridge.com", value: "$184K", status: "Active", trend: +12, avatar: "HB", color: "#00E5FF", industry: "Healthcare", project: "AI Triage System" },
  { id: 2, name: "NovaTrade Capital", contact: "James Okonkwo", email: "j.okonkwo@novatrade.io", value: "$220K", status: "Active", trend: +28, avatar: "NT", color: "#6C63FF", industry: "FinTech", project: "Analytics Dashboard" },
  { id: 3, name: "Luminary Commerce", contact: "Priya Krishnamurthy", email: "p.k@luminaryco.com", value: "$96K", status: "Active", trend: +5, avatar: "LC", color: "#00BFFF", industry: "E-Commerce", project: "Growth Engine" },
  { id: 4, name: "EduSphere Learning", contact: "Aiko Tanaka", email: "a.tanaka@edusphere.co", value: "$72K", status: "Review", trend: -3, avatar: "ES", color: "#a78bfa", industry: "Education", project: "Learning Platform" },
  { id: 5, name: "LogiFlow Logistics", contact: "Daniel Ferrara", email: "d.ferrara@logiflow.eu", value: "$115K", status: "Active", trend: +18, avatar: "LF", color: "#10b981", industry: "Logistics", project: "Cloud Migration" },
  { id: 6, name: "ArcFlow Systems", contact: "Marcus Chen", email: "m.chen@arcflow.io", value: "$44K", status: "Onboarding", trend: 0, avatar: "AF", color: "#fbbf24", industry: "Enterprise", project: "ERP Integration" },
];

export function ClientManagement() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"value" | "name" | "status">("value");
  const [focused, setFocused] = useState(false);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#00E5FF" : "#0095bf";

  const cardStyle = isDark ? {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
  } : {
    background: "#f0f4ff",
    boxShadow: "6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.6)",
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s: string) =>
    s === "Active" ? "#10b981" : s === "Review" ? "#fbbf24" : "#6C63FF";

  return (
    <div className="rounded-2xl overflow-hidden" style={cardStyle}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: fg }}>Client Management</h3>
          <p style={{ fontSize: 12, color: muted }}>{filtered.length} active relationships</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200"
            style={{
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
              border: `1px solid ${focused ? (isDark ? "rgba(0,229,255,0.3)" : "rgba(0,149,191,0.3)") : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`,
            }}
          >
            <Search size={12} color={muted} />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              placeholder="Search clients…"
              className="bg-transparent outline-none text-xs w-28"
              style={{ color: fg }}
            />
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d" }}>
            <Plus size={12} /> Add Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
              {["Client", "Industry", "Project", "Value", "Trend", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left" style={{ fontSize: 11, fontWeight: 600, color: muted, letterSpacing: "0.06em" }}>
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b transition-all duration-200 group"
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${c.color}15`, border: `1px solid ${c.color}25`, fontSize: 10, fontWeight: 700, color: c.color, fontFamily: "var(--font-mono)" }}>
                      {c.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: fg }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: muted }}>{c.contact}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: muted }}>
                    {c.industry}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span style={{ fontSize: 12, color: muted }}>{c.project}</span>
                </td>
                <td className="px-4 py-3">
                  <span style={{ fontSize: 13, fontWeight: 700, color: fg, fontFamily: "var(--font-mono)" }}>{c.value}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1" style={{ color: c.trend > 0 ? "#10b981" : c.trend < 0 ? "#ff4d6d" : muted }}>
                    {c.trend > 0 ? <TrendingUp size={12} /> : c.trend < 0 ? <TrendingDown size={12} /> : null}
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{c.trend > 0 ? `+${c.trend}%` : c.trend < 0 ? `${c.trend}%` : "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: `${statusColor(c.status)}15`, color: statusColor(c.status), border: `1px solid ${statusColor(c.status)}30` }}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-opacity"
                    style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
                  >
                    <ExternalLink size={13} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
