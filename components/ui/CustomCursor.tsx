"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "hover" | "view";

/**
 * Custom cursor — a small dot that morphs into a large circle over
 * interactive elements (links/buttons) and into an accent disc with a
 * "VIEW" label over elements marked `data-cursor="view"` (project rows).
 *
 * How it works:
 *  1. Pointer position lives in two motion values; springs chase them,
 *     giving the trail its weight.
 *  2. ONE delegated `mouseover` listener on the window decides the
 *     variant by checking `closest("a, button, [data-cursor]")` — no
 *     per-element wiring needed anywhere in the app.
 *  3. mix-blend-difference inverts the dot against whatever is beneath
 *     it, so it stays visible across dark AND light sections.
 *     The "view" state drops the blend for a solid accent disc.
 *
 * Desktop-only: mounts exclusively on `(pointer: fine)` devices and adds
 * the `has-custom-cursor` class that hides the native cursor. Touch
 * devices never see any of this.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (!el) return setVariant("default");
      setVariant(el.dataset.cursor === "view" ? "view" : "hover");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  // Diameter per state — animating width/height (not scale) keeps the
  // label inside the disc crisp instead of stretched.
  const size = variant === "view" ? 92 : variant === "hover" ? 56 : 12;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[100] ${
        variant === "view" ? "" : "mix-blend-difference"
      }`}
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-300 ${
          variant === "view" ? "bg-accent" : "bg-paper"
        }`}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.span
          className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink"
          animate={{ opacity: variant === "view" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
