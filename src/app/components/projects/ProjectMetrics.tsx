'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Metric } from '../ui/projectsData';

interface ProjectMetricsProps {
  metrics: Metric[];
  accentColor: string;
}

export function ProjectMetrics({ metrics, accentColor }: ProjectMetricsProps) {
  const { isDark } = useTheme();
  const muted = isDark ? '#8892b0' : '#6271a0';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="grid grid-cols-3 gap-6 md:gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          variants={item}
          className="flex flex-col gap-2"
        >
          <div
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              fontWeight: 700,
              color: accentColor,
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
            }}
          >
            {metric.value}
          </div>
          <div
            style={{
              fontSize: 'clamp(11px, 1vw, 13px)',
              color: muted,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {metric.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
