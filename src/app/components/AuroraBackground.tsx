import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function drawBlob(
      cx: number, cy: number, rx: number, ry: number,
      r: number, g: number, b: number, a: number, angle = 0
    ) {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(rx, ry), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      if (isDark) {
        // Dark mode — neon aurora
        drawBlob(
          W * (0.5 + 0.1 * Math.sin(t * 0.3)), H * 0.0,
          W * 0.55, H * 0.45,
          58, 229, 178, 0.055, t * 0.05
        );
        drawBlob(
          W * (0.75 + 0.08 * Math.cos(t * 0.25)), H * (0.3 + 0.05 * Math.sin(t * 0.2)),
          W * 0.4, H * 0.35,
          108, 99, 255, 0.055, -t * 0.04
        );
        drawBlob(
          W * (0.15 + 0.07 * Math.sin(t * 0.2)), H * (0.5 + 0.06 * Math.cos(t * 0.3)),
          W * 0.38, H * 0.3,
          0, 191, 255, 0.04, t * 0.06
        );
        drawBlob(
          W * (0.6 + 0.06 * Math.cos(t * 0.18)), H * (0.7 + 0.04 * Math.sin(t * 0.22)),
          W * 0.35, H * 0.28,
          167, 139, 250, 0.035, -t * 0.03
        );
      } else {
        // Light mode — subtle pastel aurora
        drawBlob(
          W * (0.5 + 0.08 * Math.sin(t * 0.3)), H * -0.1,
          W * 0.6, H * 0.5,
          15, 164, 126, 0.07, t * 0.04
        );
        drawBlob(
          W * (0.8 + 0.06 * Math.cos(t * 0.2)), H * (0.2 + 0.05 * Math.sin(t * 0.18)),
          W * 0.45, H * 0.4,
          108, 99, 255, 0.06, -t * 0.03
        );
        drawBlob(
          W * (0.2 + 0.05 * Math.sin(t * 0.22)), H * (0.6 + 0.04 * Math.cos(t * 0.25)),
          W * 0.4, H * 0.35,
          0, 191, 255, 0.05, t * 0.05
        );
      }

      t += 0.008;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}
