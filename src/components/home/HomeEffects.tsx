"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useContentReady } from "@/contexts/ContentReadyContext";

const AuroraBackground = dynamic(
  () => import("@/components/AuroraBackground").then((m) => m.AuroraBackground),
  { ssr: false },
);

const ParticleField = dynamic(
  () => import("@/components/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const contentReady = useContentReady();

  useEffect(() => {
    if (!contentReady) return;
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [contentReady]);

  if (!contentReady) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] cursor-spotlight"
      style={{
        background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, var(--spotlight-color) 0%, transparent 70%)`,
        transition: "background 0.08s",
      }}
    />
  );
}

/** Client-only canvas effects — keeps the home page shell static/SSG */
export function HomeEffects() {
  const contentReady = useContentReady();

  if (!contentReady) return null;

  return (
    <>
      <AuroraBackground />
      <ParticleField />
      <CursorSpotlight />
    </>
  );
}
