"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "./TextReveal";

/**
 * Reveal — scroll-triggered entrance used across sections.
 *
 * Fires once when ~12% of the block enters the viewport. Fades up with
 * a whisper of scale; under reduced motion, MotionConfig drops the
 * y/scale and only opacity remains.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 48,
  scale,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(scale !== undefined && { scale }) }}
      whileInView={{ opacity: 1, y: 0, ...(scale !== undefined && { scale: 1 }) }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
