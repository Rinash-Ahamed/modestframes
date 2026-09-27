"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 6500;

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback((next: number) => setActive(((next % total) + total) % total), [total]);

  // Auto-advance; pauses when user has interacted manually.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(active + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active, paused, go]);

  const t = testimonials[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Quote block — crossfade between testimonials */}
      <div className="min-h-[16rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="md:grid md:grid-cols-12 md:gap-10"
          >
            {/* Opening quote mark as a visual anchor */}
            <div className="md:col-span-9">
              <span aria-hidden="true" className="numeral-ghost block text-8xl leading-none text-bone/10">
                &ldquo;
              </span>
              <p className="-mt-5 font-editorial text-2xl italic leading-snug text-bone sm:text-3xl md:text-[2.5rem] md:leading-[1.22]">
                {t.quote}
              </p>
            </div>

            {/* Attribution — pinned to the bottom-right column on desktop */}
            <div className="mt-10 md:col-span-3 md:mt-0 md:flex md:items-end md:justify-end">
              <div className="border-t border-bone/15 pt-5">
                <p className="font-editorial text-lg text-bone">{t.name}</p>
                <p className="font-editorial mt-0.5 text-base text-smoke">{t.context}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row */}
      <div className="mt-10 flex items-center gap-6">
        {/* Pill-style progress dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { go(i); setPaused(true); }}
              aria-label={`Go to testimonial ${i + 1}`}
              className="flex h-5 items-center justify-center"
            >
              <motion.span
                animate={{
                  width: i === active ? "1.25rem" : "0.25rem",
                  opacity: i === active ? 1 : 0.35,
                  backgroundColor: i === active ? "#f0efec" : "#b8b8b8",
                }}
                transition={{ duration: 0.35, ease: EASE }}
                className="block h-[3px] rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Prev / next arrows — right-aligned */}
        <div className="ml-auto flex gap-2.5">
          <button
            onClick={() => { go(active - 1); setPaused(true); }}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/50 transition-all duration-300 hover:border-bone/60 hover:text-bone"
          >
            <span aria-hidden="true" className="font-mono text-sm leading-none">←</span>
          </button>
          <button
            onClick={() => { go(active + 1); setPaused(true); }}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/50 transition-all duration-300 hover:border-bone/60 hover:text-bone"
          >
            <span aria-hidden="true" className="font-mono text-sm leading-none">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
