import { useState } from "react";
import {
  LayoutDashboard, Brain, Users, CheckSquare, Bell, BarChart3, Settings,
  ChevronLeft, ChevronRight, Zap, Home, LogOut, HelpCircle,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "overview" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Brain, label: "AI Assistant", id: "ai" },
  { icon: Bell, label: "Notifications", id: "notifications", badge: 4 },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: CheckSquare, label: "Tasks", id: "tasks" },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { isDark } = useTheme();
  const { navigate } = useNavigation();

  const bg = isDark ? "#080b18" : "#dde2f5";
  const border = isDark ? "rgba(0,229,255,0.08)" : "rgba(108,99,255,0.12)";
  const textMuted = isDark ? "#8892b0" : "#6271a0";
  const textActive = isDark ? "#f0f4ff" : "#0d0f1e";
  const cyan = isDark ? "#00E5FF" : "#0095bf";

  return (
    <div
      className="flex flex-col h-full transition-all duration-300 relative flex-shrink-0"
      style={{
        width: collapsed ? 68 : 220,
        background: bg,
        borderRight: `1px solid ${border}`,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: border, height: 60, minHeight: 60 }}>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", boxShadow: isDark ? "0 0 12px rgba(0,229,255,0.3)" : "0 4px 10px rgba(0,149,191,0.25)" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 11, color: "#04050d" }}>DX</span>
        </div>
        {!collapsed && (
          <div>
            <span style={{ fontWeight: 800, fontSize: 14, color: textActive, letterSpacing: "-0.02em" }}>DTECHEX</span>
            <div style={{ fontSize: 9, color: textMuted, letterSpacing: "0.06em" }}>ENTERPRISE</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left w-full"
              style={{
                background: isActive
                  ? isDark ? "rgba(0,229,255,0.1)" : "rgba(0,149,191,0.1)"
                  : "transparent",
                border: `1px solid ${isActive ? (isDark ? "rgba(0,229,255,0.2)" : "rgba(0,149,191,0.2)") : "transparent"}`,
                color: isActive ? cyan : textMuted,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLElement).style.color = textActive;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = textMuted;
                }
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full" style={{ background: cyan }} />
              )}
              <item.icon size={16} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: "#00E5FF", color: "#04050d" }}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#00E5FF" }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t flex flex-col gap-1" style={{ borderColor: border }}>
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full"
          style={{ color: textMuted, background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.color = textActive; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = textMuted; }}
        >
          <Home size={15} className="flex-shrink-0" />
          {!collapsed && <span style={{ fontSize: 13, fontWeight: 500 }}>Back to Site</span>}
        </button>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full"
          style={{ color: textMuted, background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,0,0,0.06)" : "rgba(255,0,0,0.06)"; (e.currentTarget as HTMLElement).style.color = "#ff4d6d"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = textMuted; }}
        >
          <LogOut size={15} className="flex-shrink-0" />
          {!collapsed && <span style={{ fontSize: 13, fontWeight: 500 }}>Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 z-10"
        style={{
          background: isDark ? "#0a0e1e" : "#dde2f5",
          border: `1px solid ${border}`,
          color: textMuted,
          boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
        }}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  );
}
