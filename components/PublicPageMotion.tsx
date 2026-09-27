"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

export function PublicPageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  // Track whether this is the very first render. On first load CameraLensIntro
  // is handling the reveal, so we skip the page entrance animation to avoid
  // the hero double-transitioning (intro fade → page blur-in simultaneously).
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    // After the first paint, mark subsequent navigations as non-initial
    const id = window.setTimeout(() => {
      isFirstRender.current = false;
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  if (pathname.startsWith("/admin") || reduceMotion) return children;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

