/** Lightweight framer-motion presets — opacity + transform only */

import type { Variants } from "framer-motion";

export const viewportOnce = {
  once: true,
  margin: "-60px",
  amount: 0.15,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};
