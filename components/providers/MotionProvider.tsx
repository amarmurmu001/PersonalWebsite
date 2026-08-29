"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global Framer Motion settings.
 *
 * reducedMotion="user" is the accessibility keystone of the whole site:
 * when the visitor's OS requests reduced motion, every transform/layout
 * animation (y, scale, rotate…) is automatically stripped and only
 * opacity/color transitions survive. JS effects (Lenis, GSAP parallax,
 * the custom cursor) each check `useReducedMotion()` themselves.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
