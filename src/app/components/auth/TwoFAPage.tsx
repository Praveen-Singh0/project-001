import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Smartphone, ArrowRight, Check, RefreshCw } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

export function TwoFAPage() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState<"app" | "sms">("app");
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";

  const full = code.join("").length === 6;

  const handleKey = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...code];
    next[i] = v.slice(-1);
    setCode(next);
    setError(false);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setCode(text.split(""));
      refs.current[5]?.focus();
    }
  };

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code.join("") === "123456" || full) {
        setSuccess(true);
        setTimeout(() => navigate("dashboard"), 1200);
      } else {
        setError(true);
        setCode(["", "", "", "", "", ""]);
        refs.current[0]?.focus();
      }
    }, 1200);
  };

  useEffect(() => { refs.current[0]?.focus(); }, []);

  return (
    <AuthLayout tagline="Two-factor authentication keeps your account bulletproof.">
      <div className="flex flex-col gap-6">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: isDark ? "rgba(108,99,255,0.1)" : "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Shield size={28} color="#6C63FF" />
        </motion.div>

        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 6 }}>
            Two-factor auth
          </h1>
          <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
            {method === "app"
              ? "Enter the 6-digit code from your authenticator app."
              : "We sent a 6-digit code to your phone ending in ••••31."}
          </p>
        </div>

        {/* Method switch */}
        <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}` }}>
          {(["app", "sms"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMethod(m); setCode(["", "", "", "", "", ""]); setError(false); }}
              className="flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: method === m ? (isDark ? "rgba(108,99,255,0.15)" : "rgba(108,99,255,0.1)") : "transparent",
                color: method === m ? "#6C63FF" : muted,
              }}
            >
              {m === "app" ? <Shield size={13} /> : <Smartphone size={13} />}
              {m === "app" ? "Auth App" : "SMS"}
            </button>
          ))}
        </div>

        {/* OTP Input */}
        <div className="flex gap-2.5 justify-center">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleKey(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="w-11 h-13 text-center text-lg font-bold rounded-xl outline-none transition-all duration-200"
              style={{
                height: 52,
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                border: `2px solid ${
                  error ? "#ff4d6d" :
                  success ? "#10b981" :
                  digit ? (isDark ? "rgba(58,229,178,0.5)" : "rgba(15,164,126,0.5)") :
                  (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")
                }`,
                color: fg,
                boxShadow: digit && !error ? `0 0 0 3px ${isDark ? "rgba(58,229,178,0.06)" : "rgba(15,164,126,0.06)"}` : "none",
              }}
            />
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ fontSize: 13, color: "#ff4d6d", textAlign: "center" }}>
              Incorrect code. Try again. (Hint: use any 6 digits)
            </motion.p>
          )}
          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2"
              style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>
              <Check size={16} /> Verified! Redirecting...
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={verify}
          disabled={!full || loading || success}
          className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: success ? "#10b981" : "linear-gradient(135deg, #3AE5B2, #6C63FF)",
            color: "#04050d",
            opacity: !full ? 0.5 : 1,
          }}
        >
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "#04050d transparent transparent transparent" }} />
          ) : success ? (<><Check size={15} /> Verified</>) : (<><span>Verify Code</span><ArrowRight size={15} /></>)}
        </button>

        <div className="flex items-center justify-between">
          <button
            onClick={() => { setCode(["", "", "", "", "", ""]); setError(false); }}
            className="flex items-center gap-2 text-sm"
            style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cyan; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
          >
            <RefreshCw size={13} /> New code
          </button>
          <button onClick={() => navigate("dashboard")} style={{ fontSize: 13, color: muted, background: "none", border: "none", cursor: "pointer" }}>
            Skip for now
          </button>
        </div>

        <p style={{ fontSize: 11, color: muted, textAlign: "center" }}>
          Having trouble?{" "}
          <span style={{ color: cyan, cursor: "pointer" }}>Use backup codes</span> or{" "}
          <span style={{ color: cyan, cursor: "pointer" }}>contact support</span>
        </p>
      </div>
    </AuthLayout>
  );
}
