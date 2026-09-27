"use client";

import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

export type RevealKind = "default" | "heading" | "media";

// Three distinct entrance personalities — same Reveal API, different physics.
// Using the same blur+rise on every element turns motion into wallpaper after ~3 sections.
const VARIANTS = {
  // Body text, containers, rows — editorial blur-fade with slight rise
  default: {
    initial: { opacity: 0, y: 32, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 0.85,
  },
  // Section headlines — faster, sharper, no blur (blur on large display type looks muddy)
  heading: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    duration: 0.7,
  },
  // Image grids / media — scale-in instead of Y translation (prevents layout jump on image containers)
  media: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    duration: 0.9,
  },
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  kind = "default",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  kind?: RevealKind;
}) {
  const reduceMotion = useReducedMotion();
  const v = VARIANTS[kind];

  return (
    <motion.div
      initial={reduceMotion ? false : v.initial}
      whileInView={reduceMotion ? undefined : v.animate}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: v.duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
