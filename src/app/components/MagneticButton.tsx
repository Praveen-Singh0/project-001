import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  style = {},
  onClick,
  strength = 0.35,
  as: Tag = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.1s ease";
  };

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ ...style, willChange: "transform", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      data-magnetic
    >
      {children}
    </Tag>
  );
}
