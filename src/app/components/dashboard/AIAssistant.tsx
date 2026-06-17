import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Send, Sparkles, X, Minimize2, Maximize2, Copy, RefreshCw } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const suggestions = [
  "Summarize last quarter's performance",
  "Which clients need follow-up this week?",
  "Generate a project status report",
  "Forecast next month's revenue",
];

const preloadedConvo: { role: "user" | "ai"; text: string }[] = [
  { role: "ai", text: "Hello! I'm your DTECHEX AI assistant. I have full context on your projects, clients, revenue, and tasks. What can I help you with today?" },
  { role: "user", text: "Which clients haven't had a touchpoint in the last 30 days?" },
  { role: "ai", text: "I've identified 4 clients without recent contact:\n\n• **NovaTrade Capital** — Last contact 38 days ago. Active project, high-value.\n• **HealthBridge Systems** — 35 days. Contract renewal due in 6 weeks.\n• **EduSphere Learning** — 31 days. Feature request pending.\n• **ArcFlow Logistics** — 32 days. Invoice outstanding ($12,400).\n\nI'd recommend prioritizing **HealthBridge** given the renewal window. Want me to draft a check-in email?" },
];

export function AIAssistant() {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState(preloadedConvo);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#00E5FF" : "#0095bf";

  const cardStyle = isDark ? {
    background: "rgba(10,14,30,0.85)",
    border: "1px solid rgba(0,229,255,0.12)",
    backdropFilter: "blur(20px)",
  } : {
    background: "#f0f4ff",
    boxShadow: "6px 6px 20px rgba(163,177,198,0.5), -6px -6px 20px rgba(255,255,255,0.9)",
    border: "1px solid rgba(255,255,255,0.7)",
  };

  const aiResponses = [
    "Based on your Q4 data, revenue grew 23% YoY driven primarily by AI Solutions (+41%) and Cloud Services (+18%). Your top 3 clients account for 34% of total revenue. I recommend expanding the HealthBridge engagement given the highest margin profile.",
    "I've analyzed your task board. 7 tasks are overdue — 3 are blocking active project milestones. The critical path issue is in the FinTech Analytics project where 2 backend APIs are pending. Want me to send an automated nudge to the assigned engineers?",
    "Your next month revenue forecast is $138K–$145K (±5% confidence interval). This assumes NovaTrade contract renewal ($22K MRR) and 3 new project kick-offs in the pipeline. The main risk is the HealthBridge renewal — 60% probability based on engagement signals.",
  ];

  const send = (text: string = input) => {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((m) => [...m, { role: "ai", text: response }]);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden" style={cardStyle}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: isDark ? "rgba(0,229,255,0.1)" : "rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", boxShadow: isDark ? "0 0 12px rgba(0,229,255,0.3)" : "0 4px 10px rgba(0,149,191,0.2)" }}>
            <Brain size={14} color="#04050d" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: fg }}>DTECHEX AI</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
              <span style={{ fontSize: 10, color: "#10b981" }}>Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setMessages(preloadedConvo)}
            className="p-1.5 rounded-lg transition-colors" style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}>
            <RefreshCw size={13} />
          </button>
          <button onClick={() => setMinimized((m) => !m)}
            className="p-1.5 rounded-lg transition-colors" style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = fg; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}>
            {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" style={{ maxHeight: 320 }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "ai" && (
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5"
                      style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)" }}>
                      <Sparkles size={10} color="#04050d" />
                    </div>
                  )}
                  <div
                    className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm"
                    style={{
                      background: m.role === "user"
                        ? "linear-gradient(135deg, #00E5FF20, #6C63FF20)"
                        : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                      border: `1px solid ${m.role === "user" ? (isDark ? "rgba(0,229,255,0.2)" : "rgba(0,149,191,0.2)") : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")}`,
                      color: fg,
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)" }}>
                    <Sparkles size={10} color="#04050d" />
                  </div>
                  <div className="flex gap-1 px-3 py-2.5 rounded-2xl"
                    style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: cyan }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200"
                    style={{ background: isDark ? "rgba(0,229,255,0.06)" : "rgba(0,149,191,0.06)", border: `1px solid ${isDark ? "rgba(0,229,255,0.15)" : "rgba(0,149,191,0.15)"}`, color: cyan, cursor: "pointer" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(0,229,255,0.12)" : "rgba(0,149,191,0.12)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(0,229,255,0.06)" : "rgba(0,149,191,0.06)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Ask anything about your business…"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: fg }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: input.trim() ? "linear-gradient(135deg, #00E5FF, #6C63FF)" : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
                    color: input.trim() ? "#04050d" : muted,
                    border: "none", cursor: input.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
