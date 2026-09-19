"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const INTRO_KEY = "modestframes-lens-intro-v3";

export function CameraLensIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyPlayed = window.sessionStorage.getItem(INTRO_KEY) === "played";

    if (reduceMotion || alreadyPlayed) {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem(INTRO_KEY, "played");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    }, 2800);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="camera-intro"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.55, delay: 2.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <iframe className="camera-intro__frame" src="/firstload.html" title="" tabIndex={-1} />
    </motion.div>
  );
}
