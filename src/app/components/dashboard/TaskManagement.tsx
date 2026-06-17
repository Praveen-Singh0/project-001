import { useState } from "react";
import { motion } from "motion/react";
import { Plus, CheckSquare, Circle, AlertCircle, Clock, Brain } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number; title: string; project: string; priority: "high" | "medium" | "low";
  assignee: string; due: string; status: TaskStatus; ai?: boolean;
}

const initial: Task[] = [
  { id: 1, title: "Deploy NovaTrade ML pipeline to prod", project: "NovaTrade Analytics", priority: "high", assignee: "Dev Team", due: "Dec 18", status: "in-progress", ai: true },
  { id: 2, title: "HealthBridge API integration review", project: "Healthcare AI", priority: "high", assignee: "Tech Lead", due: "Dec 17", status: "todo" },
  { id: 3, title: "EduSphere content engine — beta test", project: "Learning Platform", priority: "medium", assignee: "QA Team", due: "Dec 20", status: "in-progress" },
  { id: 4, title: "Q4 client satisfaction surveys", project: "Operations", priority: "medium", assignee: "Account Team", due: "Dec 21", status: "todo" },
  { id: 5, title: "FinTech dashboard performance audit", project: "FinTech Analytics", priority: "low", assignee: "Dev Team", due: "Dec 24", status: "done" },
  { id: 6, title: "ArcFlow cloud migration kickoff doc", project: "ArcFlow", priority: "medium", assignee: "Solutions", due: "Dec 19", status: "done" },
];

const cols: { id: TaskStatus; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "#8892b0" },
  { id: "in-progress", label: "In Progress", color: "#3AE5B2" },
  { id: "done", label: "Done", color: "#10b981" },
];

const priorityColor = { high: "#ff4d6d", medium: "#fbbf24", low: "#10b981" };

export function TaskManagement() {
  const { isDark } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [view, setView] = useState<"board" | "list">("board");

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

  const taskCardStyle = (priority: string) => isDark ? {
    background: "rgba(255,255,255,0.03)",
    border: `1px solid rgba(255,255,255,0.07)`,
  } : {
    background: "rgba(255,255,255,0.7)",
    boxShadow: "3px 3px 8px rgba(163,177,198,0.35), -3px -3px 8px rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.8)",
  };

  const toggle = (id: number) => {
    setTasks((ts) => ts.map((t) => {
      if (t.id !== id) return t;
      const next: TaskStatus = t.status === "todo" ? "in-progress" : t.status === "in-progress" ? "done" : "todo";
      return { ...t, status: next };
    }));
  };

  const colTasks = (col: TaskStatus) => tasks.filter((t) => t.status === col);

  return (
    <div className="rounded-2xl overflow-hidden" style={cardStyle}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: fg }}>Task Management</h3>
          <p style={{ fontSize: 12, color: muted }}>{tasks.filter((t) => t.status !== "done").length} open · {tasks.filter((t) => t.priority === "high" && t.status !== "done").length} high priority</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
            {(["board", "list"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200"
                style={{ background: view === v ? (isDark ? "rgba(58,229,178,0.1)" : "rgba(15,164,126,0.1)") : "transparent", color: view === v ? cyan : muted, border: "none", cursor: "pointer" }}>
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "linear-gradient(135deg, #3AE5B2, #6C63FF)", color: "#04050d" }}>
            <Plus size={12} /> New Task
          </button>
        </div>
      </div>

      {/* Board view */}
      {view === "board" ? (
        <div className="p-4 grid grid-cols-3 gap-3 overflow-x-auto">
          {cols.map((col) => (
            <div key={col.id} className="flex flex-col gap-2">
              {/* Column header */}
              <div className="flex items-center gap-2 px-1 pb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: fg }}>{col.label}</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded"
                  style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: muted }}>
                  {colTasks(col.id).length}
                </span>
              </div>

              {colTasks(col.id).map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  className="rounded-xl p-3 flex flex-col gap-2 cursor-pointer group transition-all duration-200"
                  style={taskCardStyle(task.priority)}
                  onClick={() => toggle(task.id)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      {task.status === "done"
                        ? <CheckSquare size={13} color="#10b981" className="flex-shrink-0 mt-0.5" />
                        : task.status === "in-progress"
                        ? <AlertCircle size={13} color="#3AE5B2" className="flex-shrink-0 mt-0.5" />
                        : <Circle size={13} color={muted} className="flex-shrink-0 mt-0.5" />
                      }
                      <p style={{ fontSize: 12, fontWeight: 500, color: fg, lineHeight: 1.4, textDecoration: task.status === "done" ? "line-through" : "none", opacity: task.status === "done" ? 0.5 : 1 }}>
                        {task.title}
                      </p>
                    </div>
                    {task.ai && <Brain size={11} color="#3AE5B2" className="flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                      style={{ background: `${priorityColor[task.priority]}15`, color: priorityColor[task.priority] }}>
                      {task.priority}
                    </span>
                    <span style={{ fontSize: 10, color: muted }}>{task.project}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1" style={{ color: muted }}>
                      <Clock size={10} />
                      <span style={{ fontSize: 10 }}>{task.due}</span>
                    </div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", fontSize: 8, fontWeight: 700, color: muted }}>
                      {task.assignee.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y" style={{ divideColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
          {tasks.map((task, i) => (
            <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-5 py-3 transition-all duration-200 cursor-pointer"
              style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}
              onClick={() => toggle(task.id)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              {task.status === "done" ? <CheckSquare size={14} color="#10b981" /> : <Circle size={14} color={muted} />}
              <span style={{ flex: 1, fontSize: 13, color: fg, textDecoration: task.status === "done" ? "line-through" : "none", opacity: task.status === "done" ? 0.5 : 1 }}>{task.title}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: `${priorityColor[task.priority]}15`, color: priorityColor[task.priority] }}>{task.priority}</span>
              <span style={{ fontSize: 11, color: muted, minWidth: 50 }}>{task.due}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
