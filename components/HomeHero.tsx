"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { studio } from "@/lib/site";

const EASE_STUDIO = [0.22, 1, 0.36, 1] as const;

// Sync with CameraLensIntro: intro fades starting at 3100ms.
// Hero content begins at 3.0s so the tagline is mid-reveal as the overlay clears.
const HERO_DELAY = 3.0;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: HERO_DELAY },
  },
};

const line: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1.1, ease: EASE_STUDIO } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_STUDIO } },
};

// The tagline broken into short lines so each can mask-reveal on its own -
// a slower, more deliberate entrance than a single block fading up.
const TAGLINE_LINES = [
  { text: "Photography for the moment", lean: false },
  { text: "that already knew it mattered.", lean: true },
];

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-void">
      <div className="absolute inset-0 overflow-hidden bg-void">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          className="h-full w-full object-cover pointer-events-none"
        >
          <source src="/video/mad-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Layered scrims: a long fade to black at the base for text contrast,
          plus a tighter vignette at the edges for depth. */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/75 via-transparent to-void/20" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_180px_60px_rgba(8,8,8,0.65)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: HERO_DELAY + 0.25 }}
        className="absolute left-6 top-28 z-10 hidden items-center gap-3 md:flex md:left-12 xl:left-20"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">Est. studio, {studio.city}</span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-studio relative z-10 flex w-full flex-col gap-10 pb-20 pt-40 md:pb-28"
      >
        <div>
          {TAGLINE_LINES.map((line_) => (
            <div key={line_.text} className={`overflow-hidden ${line_.lean ? "pb-1" : ""}`}>
              <motion.h1
                variants={line}
                className={`text-balance text-5xl leading-[1.08] sm:text-6xl md:text-[5.5rem] ${
                  line_.lean
                    ? "heading-lean md:leading-[1.12]"
                    : "font-display font-black tracking-tight text-bone md:leading-[1.05]"
                }`}
              >
                {line_.text}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <Link
            href="/portfolio"
            className="font-mono tracking-[0.04em] group flex items-center gap-3 text-xs text-bone transition-colors duration-300 hover:text-silver"
          >
            <span className="border-b border-bone/40 pb-0.5 transition-colors duration-300 group-hover:border-silver">
              View the portfolio
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <Link
            href="/contact"
            className="font-mono tracking-[0.04em] text-xs text-stone underline decoration-stone/40 underline-offset-4 transition-colors hover:text-silver hover:decoration-silver"
          >
            Enquire about your date
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
