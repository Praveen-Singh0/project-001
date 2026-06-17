import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"logo" | "text" | "bar" | "out">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 600);
    const t2 = setTimeout(() => setPhase("bar"), 1100);
    const t3 = setTimeout(() => setPhase("out"), 2400);
    const t4 = setTimeout(onDone, 2900);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 60%, rgba(108,99,255,0.07) 0%, transparent 55%), #04050d",
          }}
        >
          {/* Animated ring */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              className="absolute rounded-full"
              style={{ width: 100, height: 100, border: "1px solid rgba(0,229,255,0.2)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{ width: 74, height: 74, border: "1px solid rgba(108,99,255,0.3)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)",
                boxShadow: "0 0 40px rgba(0,229,255,0.4), 0 0 80px rgba(108,99,255,0.2)",
              }}
            >
              <span
                style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 22, color: "#04050d", letterSpacing: "-0.05em" }}
              >
                DX
              </span>
            </motion.div>
          </div>

          {/* Brand name */}
          <AnimatePresence>
            {(phase === "text" || phase === "bar") && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-1 mb-8"
              >
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 28,
                    letterSpacing: "-0.04em",
                    background: "linear-gradient(135deg, #f0f4ff 0%, rgba(0,229,255,0.8) 50%, #6C63FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  DTECHEX
                </span>
                <span style={{ fontSize: 11, color: "#8892b0", letterSpacing: "0.2em", fontFamily: "var(--font-mono)" }}>
                  DOON TECHNOLOGY EXPERT
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <AnimatePresence>
            {phase === "bar" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{ width: 200, height: 2, background: "rgba(255,255,255,0.08)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #00E5FF, #6C63FF)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </div>
                <motion.span
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#8892b0", letterSpacing: "0.1em" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  INITIALIZING AI ENGINE
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
