"use client";

import { useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { process_ } from "@/lib/site";

// Authentic camera EXIF and darkroom specifications for each phase
const PHOTOGRAPHIC_STAGES = [
  {
    aperture: "f / 1.4",
    focal: "35mm",
    spec: "Available Light & Cadence",
    phase: "First Light",
  },
  {
    aperture: "f / 2.0",
    focal: "50mm",
    spec: "1/500s · Unstaged Coverage",
    phase: "The Exposure",
  },
  {
    aperture: "f / 2.8",
    focal: "85mm",
    spec: "Manual Tone Curve · Hand-Culled",
    phase: "The Darkroom",
  },
  {
    aperture: "f / 4.0",
    focal: "Contact Sheet",
    spec: "Private Curated Proofing",
    phase: "The Selection",
  },
  {
    aperture: "f / 5.6",
    focal: "Archival",
    spec: "Fine-Art Cotton Rag Print",
    phase: "The Master",
  },
];

export function PhotographicProcess() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHoveredIndex(null)}
      className="divide-y divide-bone/10 border-y border-bone/10"
    >
      {process_.map((p, i) => {
        const stage = PHOTOGRAPHIC_STAGES[i] || PHOTOGRAPHIC_STAGES[0];
        const isHovered = hoveredIndex === i;
        const isAnyHovered = hoveredIndex !== null;

        return (
          <div
            key={p.title}
            onMouseEnter={() => setHoveredIndex(i)}
            className={clsx(
              "group relative overflow-hidden py-8 transition-all duration-500 md:py-10",
              isAnyHovered && !isHovered ? "opacity-35 blur-[0.3px]" : "opacity-100"
            )}
          >
            {/* Shutter exposure light sweep across row */}
            <motion.div
              initial={false}
              animate={{
                x: isHovered ? "100%" : "-100%",
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-bone/[0.04] to-transparent"
            />

            <div className="relative z-10 grid gap-6 md:grid-cols-12 md:items-start md:gap-8">
              {/* Left Column: Viewfinder Reticle & Aperture HUD */}
              <div className="flex items-center gap-4 md:col-span-4 md:items-start">
                {/* Camera Viewfinder Focus Reticle */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center border border-bone/15 bg-void transition-all duration-500 group-hover:border-bone/60 group-hover:bg-bone/[0.04]">
                  {/* Viewfinder corner AF brackets that snap inward on focus lock */}
                  <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l border-t border-bone/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:border-silver" />
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r border-t border-bone/40 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 group-hover:border-silver" />
                  <span className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 border-b border-l border-bone/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-silver" />
                  <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 border-b border-r border-bone/40 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-silver" />

                  {/* Center autofocus reticle crosshair */}
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-3 w-3 text-stone/50 transition-all duration-300 group-hover:scale-125 group-hover:text-silver"
                    aria-hidden="true"
                  >
                    <path d="M7 0h2v5H7zm0 11h2v5H7zm4-4h5v2h-5zm-11 0h5v2H0z" />
                  </svg>
                </div>

                {/* Stage title + Lens aperture tag */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone transition-colors duration-300 group-hover:text-silver">
                      {stage.aperture} · {stage.focal}
                    </span>
                  </div>

                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-silver md:text-3xl">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Right Column: Process body + Darkroom note */}
              <div className="md:col-span-8 md:pt-1">
                <p className="font-editorial text-lg leading-relaxed text-stone transition-colors duration-300 group-hover:text-bone/90 md:text-xl">
                  {p.body}
                </p>

                {/* Photographic specification strip */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-bone/20 transition-all duration-300 group-hover:w-10 group-hover:bg-bone/50" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone/70 transition-colors duration-300 group-hover:text-stone">
                    {stage.spec}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PhotographicProcess;
