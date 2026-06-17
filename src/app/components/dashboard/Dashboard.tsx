import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Search, Sun, Moon, User, Settings, ChevronDown } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { AnalyticsWidgets } from "./AnalyticsWidgets";
import { AIAssistant } from "./AIAssistant";
import { ActivityTimeline } from "./ActivityTimeline";
import { NotificationCenter } from "./NotificationCenter";
import { ClientManagement } from "./ClientManagement";
import { TaskManagement } from "./TaskManagement";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

function TopBar({ searchFocused, setSearchFocused }: { searchFocused: boolean; setSearchFocused: (v: boolean) => void }) {
  const { isDark, toggle } = useTheme();
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";
  const topBg = isDark ? "rgba(4,5,13,0.9)" : "rgba(232,236,247,0.9)";

  return (
    <div
      className="flex items-center justify-between px-5 border-b flex-shrink-0"
      style={{ height: 60, borderColor: isDark ? "rgba(58,229,178,0.08)" : "rgba(108,99,255,0.12)", background: topBg, backdropFilter: "blur(10px)" }}
    >
      <div>
        <span style={{ fontSize: 16, fontWeight: 700, color: fg }}>Good morning, Sarah 👋</span>
        <span style={{ fontSize: 12, color: muted, marginLeft: 12 }}>Wednesday, December 17, 2024</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
          style={{
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
            border: `1px solid ${searchFocused ? (isDark ? "rgba(58,229,178,0.35)" : "rgba(15,164,126,0.35)") : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`,
            width: searchFocused ? 220 : 160,
            transition: "width 0.3s ease, border-color 0.2s ease",
          }}
        >
          <Search size={13} color={muted} />
          <input
            placeholder="Search…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent outline-none text-sm flex-1"
            style={{ color: fg }}
          />
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: muted, border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cyan; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={isDark ? "moon" : "sun"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: muted, border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cyan; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
        >
          <Bell size={14} />
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#3AE5B2" }} />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer transition-all duration-200"
          style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)" }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", fontSize: 9, fontWeight: 700, color: "#04050d" }}>
            SM
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: fg }}>Sarah M.</span>
          <ChevronDown size={11} color={muted} />
        </div>
      </div>
    </div>
  );
}

const views: { id: string; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "ai", label: "AI Assistant" },
  { id: "notifications", label: "Notifications" },
  { id: "clients", label: "Clients" },
  { id: "tasks", label: "Tasks" },
];

export function Dashboard() {
  const { isDark } = useTheme();
  const [activeView, setActiveView] = useState("overview");
  const [searchFocused, setSearchFocused] = useState(false);

  const bg = isDark
    ? "radial-gradient(ellipse 80% 50% at 80% 0%, rgba(108,99,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(58,229,178,0.04) 0%, transparent 60%), #04050d"
    : "radial-gradient(ellipse 80% 50% at 80% 0%, rgba(108,99,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(15,164,126,0.04) 0%, transparent 60%), #e8ecf7";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: bg, fontFamily: "var(--font-sans)" }}>
      <Sidebar active={activeView} onSelect={setActiveView} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar searchFocused={searchFocused} setSearchFocused={setSearchFocused} />

        <main className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 pb-8"
            >
              {/* Overview */}
              {activeView === "overview" && (
                <>
                  <AnalyticsWidgets />
                  <div className="grid lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2">
                      <ActivityTimeline />
                    </div>
                    <div style={{ minHeight: 480 }}>
                      <AIAssistant />
                    </div>
                  </div>
                </>
              )}

              {activeView === "analytics" && <AnalyticsWidgets />}

              {activeView === "ai" && (
                <div className="max-w-2xl mx-auto w-full" style={{ height: 600 }}>
                  <AIAssistant />
                </div>
              )}

              {activeView === "notifications" && (
                <div className="max-w-2xl mx-auto w-full" style={{ minHeight: 600 }}>
                  <NotificationCenter />
                </div>
              )}

              {activeView === "clients" && <ClientManagement />}

              {activeView === "tasks" && <TaskManagement />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
