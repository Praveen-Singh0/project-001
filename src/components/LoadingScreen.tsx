"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center${
        phase === "out" ? " animate-out fade-out duration-500" : ""
      }`}
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 60%, rgba(108,99,255,0.07) 0%, transparent 55%), #04050d",
      }}
    >
      <div className="relative flex items-center justify-center mb-8">
        <div
          className="absolute rounded-full animate-ping"
          style={{ width: 100, height: 100, border: "1px solid rgba(0,229,255,0.2)", animationDuration: "2s" }}
        />
        <div
          className="absolute rounded-full animate-ping"
          style={{ width: 74, height: 74, border: "1px solid rgba(108,99,255,0.3)", animationDuration: "2.3s" }}
        />

        <div
          className="relative flex items-center justify-center w-16 h-16 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #00D5A1 0%, #6b63ff7d 100%)",
            boxShadow: "0 0 40px rgba(0, 255, 98, 0.4), 0 0 80px rgba(108,99,255,0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 800,
              fontSize: 22,
              color: "#04050d",
              letterSpacing: "-0.05em",
            }}
          >
            DX
          </span>
        </div>
      </div>

      {(phase === "text" || phase === "bar") && (
        <div className="flex flex-col items-center gap-1 mb-8">
          <Image
            src="/assets/img/logo.png"
            alt="DTechEx"
            width={160}
            height={64}
            className="h-19 w-auto object-contain"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(79%) sepia(30%) saturate(934%) hue-rotate(103deg) brightness(94%) contrast(90%)",
            }}
          />
          <span style={{ fontSize: 11, color: "#8892b0", letterSpacing: "0.2em", fontFamily: "var(--font-mono)" }}>
            DOON TECHNOLOGY EXPERT
          </span>
        </div>
      )}

      {phase === "bar" && (
        <div className="flex flex-col items-center gap-3">
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 200, height: 2, background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full animate-[loader-bar_1.2s_ease-in-out_forwards]"
              style={{ background: "linear-gradient(90deg, #00E5FF, #6C63FF)", width: "0%" }}
            />
          </div>
          <span
            className="animate-pulse"
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#8892b0", letterSpacing: "0.1em" }}
          >
            INITIALIZING AI ENGINE
          </span>
        </div>
      )}
    </div>
  );
}
