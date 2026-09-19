"use client";

import { motion } from "motion/react";
import { Plate } from "./Plate";

export function HeroPlate({ index, alt }: { index: number; alt: string }) {
  return (
    <motion.div
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    >
      <Plate index={index} alt={alt} className="h-full w-full" priority sizes="100vw" />
    </motion.div>
  );
}
