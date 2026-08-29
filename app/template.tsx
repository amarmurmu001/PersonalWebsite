"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition (app/template.tsx re-mounts on EVERY navigation).
 *
 * A full-screen accent curtain wipes up-and-away while the new page
 * fades in beneath it — the classic award-site page hand-off.
 *
 * Reduced-motion guard: MotionConfig would strip the curtain's scaleY
 * animation and leave it frozen at scaleY(1), permanently covering the
 * page — so under reduced motion we skip the curtain entirely.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      {/* Curtain: starts covering, scales to zero height from the top */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      />
      {/* Content waits a beat, then rises in as the curtain clears */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
      >
        {children}
      </motion.div>
    </>
  );
}
