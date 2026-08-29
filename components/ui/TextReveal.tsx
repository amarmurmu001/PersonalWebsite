"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { JSX } from "react";

/** Signature ease — a long expo-out that makes every movement feel expensive. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * TextReveal — staggered character cascade for headlines.
 *
 * Structure:
 *   word mask (overflow-hidden)  → chars rise out of it
 *     └ char (inline-block, rotates slightly from its bottom-left corner)
 *
 * The parent variant spreads `staggerChildren` across every char; each
 * char is a child variant. Under reduced motion, MotionConfig strips the
 * transforms so the text simply appears fully formed.
 *
 * Accessibility: the real string sits in `aria-label` on the heading;
 * all split spans live inside one aria-hidden wrapper.
 */
export default function TextReveal({
  text,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.022,
  mode = "load", // "load" = animate on mount · "inView" = animate on scroll
  ariaHidden = false,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Seconds before the first char moves. */
  delay?: number;
  /** Seconds between each char. */
  stagger?: number;
  mode?: "load" | "inView";
  /** Set when nesting inside an already-labelled parent (e.g. hero h1). */
  ariaHidden?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = as as "span";

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const char: Variants = {
    hidden: { y: "115%", rotate: 7 },
    visible: {
      y: "0%",
      rotate: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  const words = text.split(" ");

  return (
    <Tag
      className={className}
      {...(ariaHidden
        ? { "aria-hidden": true }
        : { "aria-label": text })}
    >
      {/* Single wrapper hides the split spans from screen readers */}
      <span aria-hidden="true" className="inline">
        {words.map((word, wi) => (
          // whitespace-nowrap keeps a word's letters on one line
          <span key={wi} className="inline-block whitespace-nowrap">
            <motion.span
              className="inline-block"
              variants={container}
              initial="hidden"
              {...(mode === "load"
                ? { animate: "visible" }
                : {
                    whileInView: "visible",
                    viewport: { once: true, margin: "-10% 0px" },
                  })}
            >
              {word.split("").map((ch, ci) => (
                <span
                  key={ci}
                  // padding stops descenders (g, y, p) being clipped by the mask
                  className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span
                    className="inline-block origin-bottom-left will-change-transform"
                    variants={char}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </motion.span>
            {wi < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
