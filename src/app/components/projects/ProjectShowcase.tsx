'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Project } from '../ui/projectsData';
import { ProjectSlide } from './ProjectSlide';
import { useTheme } from '../../contexts/ThemeContext';

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active project based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const index = Math.floor(latest * projects.length);
      const clampedIndex = Math.min(index, projects.length - 1);

      if (clampedIndex > activeIndex) {
        setDirection('down');
      } else if (clampedIndex < activeIndex) {
        setDirection('up');
      }

      setActiveIndex(clampedIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, projects.length]);

  const projectHeight = 500; // vh units converted to px approximation
  const totalHeight = projects.length * projectHeight;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        minHeight: `${projects.length * 100}vh`,
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative w-full h-full">
          {/* Projects carousel */}
          <AnimatePresence mode="wait">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: direction === 'down' ? 100 : -100,
                  scale: 0.95,
                }}
                animate={
                  index === activeIndex
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        y: direction === 'down' ? -100 : 100,
                        scale: 0.95,
                      }
                }
                exit={{
                  opacity: 0,
                  y: direction === 'down' ? -100 : 100,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0"
              >
                <ProjectSlide project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-8 z-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 rounded-full"
                    animate={{
                      width: i === activeIndex ? 24 : 8,
                      backgroundColor:
                        i === activeIndex
                          ? isDark
                            ? '#00E5FF'
                            : '#0095bf'
                          : isDark
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(0,0,0,0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: isDark ? '#8892b0' : '#6271a0',
                  letterSpacing: '0.05em',
                }}
              >
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Scroll hint */}
          {activeIndex === 0 && (
            <motion.div
              className="absolute bottom-20 right-8 z-50"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: isDark ? '#8892b0' : '#6271a0',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'center',
                  letterSpacing: '0.05em',
                }}
              >
                <div>SCROLL TO EXPLORE</div>
                <div style={{ marginTop: 8 }}>↓</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
