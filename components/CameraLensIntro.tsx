"use client";

import { useEffect, useState } from "react";

// Bump this key whenever you want the intro to replay for all existing sessions.
const INTRO_KEY = "modestframes-lens-intro-v4";

// firstload.html animation breakdown (2.2s cycle, infinite):
//   0%  → closed (scale 1, rotate 0)
//   36% → opening (scale 0.26, rotate 35deg)  — 792ms
//   40% → FULLY OPEN / shutter snap            — 880ms  ← we target this in cycle 2
//   54% → settling
//   88% → closed again
//  100% → rest

// We hold through 1 full cycle (2200ms) so the user sees a complete
// open-close sequence, then catch the START of the shutter-snap in
// cycle 2 (at 40% = +880ms) → total hold = 3080ms ≈ 3100ms.
// The site should reveal as the "shutter" is maximally open.
const HOLD_MS   = 3100;  // before fade starts
const FADE_MS   = 700;   // overlay fade-out duration
const UNMOUNT_MS = HOLD_MS + FADE_MS + 80; // when to remove the DOM node

export function CameraLensIntro() {
  // Three explicit phases so there is zero ambiguity:
  //   "cover"  → fully opaque, blocking the page
  //   "fading" → CSS transition running (opacity 1 → 0)
  //   "gone"   → unmounted from DOM
  const [phase, setPhase] = useState<"cover" | "fading" | "gone">("cover");

  useEffect(() => {
    // Guard — browser only
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyPlayed = window.sessionStorage.getItem(INTRO_KEY) === "played";

    if (reduceMotion || alreadyPlayed) {
      setPhase("gone");
      return;
    }

    // Mark as played immediately so hard refreshes in the same session
    // go straight to the page without re-running the intro.
    window.sessionStorage.setItem(INTRO_KEY, "played");
    document.body.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(() => {
      setPhase("fading");
      document.body.style.overflow = ""; // unlock scroll as fade begins
    }, HOLD_MS);

    const doneTimer = window.setTimeout(() => {
      setPhase("gone");
    }, UNMOUNT_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className="camera-intro"
      aria-hidden="true"
      style={{
        // Pure CSS transition — no motion.js involved, no state-race.
        opacity: phase === "fading" ? 0 : 1,
        transition: phase === "fading"
          ? `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : undefined,
      }}
    >
      <iframe
        className="camera-intro__frame"
        src="/firstload.html"
        title=""
        tabIndex={-1}
      />
    </div>
  );
}
