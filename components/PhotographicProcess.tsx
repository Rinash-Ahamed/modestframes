"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { process_ } from "@/lib/site";

// Authentic camera lenses and darkroom specs for each process phase
const PHOTOGRAPHIC_STAGES = [
  {
    aperture: "f / 1.4",
    focal: "35mm",
    spec: "Available Light & Cadence",
    lensName: "35mm Wide Prime",
    videoSrc: "/video/lens-1.webm",
    fallbackVideoSrc: "/video/lens-35mm.webm",
  },
  {
    aperture: "f / 2.0",
    focal: "50mm",
    spec: "1/500s · Unstaged Coverage",
    lensName: "50mm Standard Prime",
    videoSrc: "/video/lens-2.webm",
    fallbackVideoSrc: "/video/lens-50mm.webm",
  },
  {
    aperture: "f / 2.8",
    focal: "85mm",
    spec: "Manual Tone Curve · Hand-Culled",
    lensName: "85mm Portrait Telephoto",
    videoSrc: "/video/lens-3.webm",
    fallbackVideoSrc: "/video/lens-85mm.webm",
  },
  {
    aperture: "f / 4.0",
    focal: "70mm",
    spec: "Private Curated Proofing",
    lensName: "24-70mm Curated Zoom",
    videoSrc: "/video/lens-4.webm",
    fallbackVideoSrc: "/video/lens-selection.webm",
  },
  {
    aperture: "f / 5.6",
    focal: "100mm",
    spec: "Fine-Art Cotton Rag Print",
    lensName: "100mm Archival Macro",
    videoSrc: "/video/lens-5.webm",
    fallbackVideoSrc: "/video/lens-master.webm",
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
              isAnyHovered && !isHovered ? "opacity-35 blur-[0.2px]" : "opacity-100"
            )}
          >
            {/* Shutter exposure light sweep across row on hover */}
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
              {/* Left Column: Lens WebM / Lens Housing + Stage Info */}
              <div className="flex items-center gap-5 md:col-span-4 md:items-start">
                {/* Lens Unit (Plays webm video if present, or distinct optical lens graphic) */}
                <LensVisual stage={stage} isHovered={isHovered} />

                {/* Stage title + Lens aperture tag */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone transition-colors duration-300 group-hover:text-silver">
                      {stage.aperture} · {stage.focal}
                    </span>
                  </div>

                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-silver md:text-3xl">
                    {p.title}
                  </h3>

                  <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.16em] text-stone/60">
                    {stage.lensName}
                  </p>
                </div>
              </div>

              {/* Right Column: Process body + Darkroom spec */}
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

// Renders the lens webm video if file exists in public/video, with seamless looping and no audio.
// If the video file is not yet placed, gracefully displays a distinct, high-precision SVG lens graphic for that focal length.
function LensVisual({
  stage,
  isHovered,
}: {
  stage: (typeof PHOTOGRAPHIC_STAGES)[0];
  isHovered: boolean;
}) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-bone/20 bg-void/90 shadow-md transition-all duration-500 group-hover:border-bone/60 group-hover:shadow-[0_0_20px_rgba(240,239,236,0.12)] md:h-16 md:w-16">
      {/* Outer camera bayonet mount ring */}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-bone/10" />

      {/* WebM Video Player */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setHasError(true)}
          className={clsx(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
            videoLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={stage.videoSrc} type="video/webm" />
          <source src={stage.fallbackVideoSrc} type="video/webm" />
        </video>
      )}

      {/* Distinct Optical Lens Fallback Graphic (renders when webm is loading or not yet provided) */}
      {(!videoLoaded || hasError) && (
        <LensGraphic focal={stage.focal} isHovered={isHovered} />
      )}

      {/* Subtle anti-reflective lens flare coating on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-bone/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

// Distinct, custom-drawn optical camera lens graphic for each specific lens focal length
function LensGraphic({
  focal,
  isHovered,
}: {
  focal: string;
  isHovered: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={clsx(
        "h-10 w-10 transition-transform duration-700 md:h-11 md:w-11",
        isHovered ? "rotate-45 scale-105" : "rotate-0 scale-100"
      )}
      aria-hidden="true"
    >
      {/* Outer knurled focus ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-bone/30"
        strokeDasharray="3 3"
      />

      {/* Metal lens barrel */}
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="currentColor"
        strokeWidth="1"
        className="text-bone/50"
      />

      {/* Optical Glass Element — varies by lens type */}
      {focal === "35mm" && (
        <>
          {/* 35mm Wide curved bulbous glass */}
          <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1.5" className="text-bone/80" />
          <circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="0.8" className="text-bone/40" />
          <path d="M22 24 A 12 12 0 0 1 40 24" stroke="currentColor" strokeWidth="1" className="text-silver/70" />
        </>
      )}

      {focal === "50mm" && (
        <>
          {/* 50mm Standard Prime classic double-gauss element */}
          <circle cx="32" cy="32" r="15" stroke="currentColor" strokeWidth="1.2" className="text-bone/70" />
          <polygon points="32,22 39,27 39,37 32,42 25,37 25,27" stroke="currentColor" strokeWidth="1" className="text-silver/90" />
          <circle cx="32" cy="32" r="4" fill="currentColor" className="text-bone/40" />
        </>
      )}

      {focal === "85mm" && (
        <>
          {/* 85mm Telephoto deep aperture blades */}
          <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" className="text-bone/40" />
          <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" className="text-silver/90" />
          <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="0.75" className="text-bone/60" />
          <line x1="32" y1="14" x2="32" y2="50" stroke="currentColor" strokeWidth="0.6" className="text-bone/30" />
          <line x1="14" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="0.6" className="text-bone/30" />
        </>
      )}

      {focal === "70mm" && (
        <>
          {/* 70mm Zoom ring with focal track notches */}
          <circle cx="32" cy="32" r="17" stroke="currentColor" strokeWidth="1.5" className="text-bone/60" strokeDasharray="6 2" />
          <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1.2" className="text-silver/80" />
          <circle cx="32" cy="32" r="3" fill="currentColor" className="text-bone/70" />
        </>
      )}

      {focal === "100mm" && (
        <>
          {/* 100mm Macro recessed front glass with 1:1 scale reticle */}
          <circle cx="32" cy="32" r="19" stroke="currentColor" strokeWidth="1.2" className="text-bone/50" />
          <circle cx="32" cy="32" r="13" stroke="currentColor" strokeWidth="1" className="text-bone/70" />
          <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="1.5" className="text-silver" />
          <circle cx="32" cy="32" r="2" fill="currentColor" className="text-silver" />
        </>
      )}

      {/* Front element reflection flare crescent */}
      <path
        d="M20 20 Q 32 14, 44 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-silver/80"
      />
    </svg>
  );
}

export default PhotographicProcess;
