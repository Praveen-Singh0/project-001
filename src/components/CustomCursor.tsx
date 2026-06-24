"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
    };

    const loop = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-magnetic], input, textarea, select")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  const color = isDark ? "#00E5FF" : "#0095bf";

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          borderRadius: "50%",
          border: `1.5px solid ${hovered ? color : `${color}70`}`,
          transition: "width 0.25s, height 0.25s, border-color 0.25s",
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          willChange: "transform",
        }}
      />
    </>
  );
}
