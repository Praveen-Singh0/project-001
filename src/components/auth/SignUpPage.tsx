import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Building2, Chrome, Github, ArrowRight, Check } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

const plans = [
  { id: "starter", label: "Starter", price: "Free", desc: "Up to 5 users" },
  { id: "pro", label: "Pro", price: "$49/mo", desc: "Up to 50 users", popular: true },
  { id: "enterprise", label: "Enterprise", price: "Custom", desc: "Unlimited" },
];

function Field({ icon: Icon, type = "text", placeholder, value, onChange, label }: {
  icon: typeof Mail; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; label: string;
}) {
  const { isDark } = useTheme();
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: isDark ? "#8892b0" : "#6271a0", display: "block", marginBottom: 6 }}>{label}</label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-200"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${focused ? (isDark ? "rgba(0,229,255,0.4)" : "rgba(0,149,191,0.4)") : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)")}`,
          boxShadow: focused ? `0 0 0 3px ${isDark ? "rgba(0,229,255,0.07)" : "rgba(0,149,191,0.07)"}` : "none",
        }}
      >
        <Icon size={15} style={{ position: "absolute", left: 14, color: isDark ? "#8892b0" : "#6271a0" }} />
        <input
          type={type === "password" && show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full py-3 pl-11 pr-4 bg-transparent outline-none text-sm"
          style={{ color: isDark ? "#f0f4ff" : "#0d0f1e" }}
        />
        {type === "password" && (
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 p-1"
            style={{ color: isDark ? "#8892b0" : "#6271a0", background: "none", border: "none", cursor: "pointer" }}>
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

export function SignUpPage() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();
  const [plan, setPlan] = useState("pro");
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "" });
  const [loading, setLoading] = useState(false);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#00E5FF" : "#0095bf";
  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("verify-email"); }, 1400);
  };

  return (
    <AuthLayout tagline="Join 150+ companies building with DTECHEX.">
      <div className="flex flex-col gap-5">
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 6 }}>Create account</h1>
          <p style={{ fontSize: 14, color: muted }}>
            Already have an account?{" "}
            <button onClick={() => navigate("login")} style={{ color: cyan, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Sign in</button>
          </p>
        </div>

        {/* Plan picker */}
        <div className="grid grid-cols-3 gap-2">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlan(p.id)}
              className="relative flex flex-col items-center gap-1 py-3 rounded-xl text-xs transition-all duration-200"
              style={{
                background: plan === p.id ? (isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)") : cardBg,
                border: `1px solid ${plan === p.id ? (isDark ? "rgba(0,229,255,0.35)" : "rgba(0,149,191,0.35)") : cardBorder}`,
                color: plan === p.id ? cyan : muted,
              }}
            >
              {p.popular && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold"
                  style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d" }}>
                  POPULAR
                </span>
              )}
              <span style={{ fontWeight: 700, color: plan === p.id ? cyan : fg }}>{p.label}</span>
              <span style={{ fontWeight: 800, color: plan === p.id ? cyan : fg, fontSize: 13 }}>{p.price}</span>
              <span style={{ fontSize: 10, color: muted }}>{p.desc}</span>
            </button>
          ))}
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          {[{ icon: Chrome, label: "Google" }, { icon: Github, label: "GitHub" }].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: fg, backdropFilter: "blur(10px)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = cardBorder; }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }} />
          <span style={{ fontSize: 12, color: muted }}>or with email</span>
          <div className="flex-1 h-px" style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }} />
        </div>

        <form onSubmit={handle} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            <Field icon={User} placeholder="Sarah Mitchell" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} label="Full name" />
            <Field icon={Building2} placeholder="Acme Corp" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} label="Company" />
          </div>
          <Field icon={Mail} type="email" placeholder="you@company.com" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} label="Work email" />
          <Field icon={Lock} type="password" placeholder="Min. 8 characters" value={form.password} onChange={(v) => setForm((f) => ({ ...f, password: v }))} label="Password" />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              background: loading ? "rgba(0,229,255,0.4)" : "linear-gradient(135deg, #00E5FF, #6C63FF)",
              color: "#04050d",
              boxShadow: isDark ? "0 0 25px rgba(0,229,255,0.25)" : "0 6px 20px rgba(0,149,191,0.35)",
            }}
          >
            {loading ? (
              <div
                className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "#04050d transparent transparent transparent" }} />
            ) : (
              <><span>Create Account</span><ArrowRight size={15} /></>
            )}
          </button>
        </form>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-4">
          {["SOC 2 Type II", "GDPR", "ISO 27001"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <Check size={11} color={cyan} />
              <span style={{ fontSize: 10, color: muted }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}
