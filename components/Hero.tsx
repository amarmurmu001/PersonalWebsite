"use client";

import { motion } from "framer-motion";
import TextReveal, { EASE } from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/lib/data";

/**
 * HERO — mobile-first editorial layout:
 * meta row → role → giant name → pitch + CTA → stats bar → scroll cue.
 * Stats bar shows 3 metrics inline on desktop, stacked on mobile.
 */
export default function Hero() {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section id="top" aria-label="Intro" className="flex min-h-svh flex-col pt-24">
      {/* ---- Meta row ---------------------------------------------------- */}
      <motion.div
        {...rise(1.0)}
        className="container-site flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-paper/50"
      >
        <p>Portfolio ©2026</p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
          Open to work
        </p>
      </motion.div>

      {/* ---- Center block -------------------------------------------------- */}
      <div className="container-site mt-auto flex flex-col pb-10 md:pb-14">
        <motion.p
          {...rise(0.55)}
          className="mb-6 text-[11px] uppercase tracking-[0.22em] text-paper/50"
        >
          {site.role} — {site.location}
        </motion.p>

        <h1
          aria-label={`${site.firstName} ${site.lastName}`}
          className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
        >
          <TextReveal
            text={site.firstName}
            delay={0.65}
            ariaHidden
            className="block text-[clamp(2.75rem,13vw,10rem)]"
          />
          <TextReveal
            text={site.lastName}
            delay={0.78}
            ariaHidden
            className="block text-[clamp(2.75rem,13vw,10rem)]"
          />
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-6 border-t border-paper/10 pt-6 md:mt-12 md:flex-row md:items-end md:gap-8 md:pt-8">
          <motion.p
            {...rise(1.05)}
            className="max-w-md text-balance text-sm leading-relaxed text-paper/70 md:text-base"
          >
            {site.pitch}
          </motion.p>

          <motion.div {...rise(1.15)}>
            <Magnetic strength={0.3}>
              <a href="#work" className="btn-pill group">
                See the work
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-out group-hover:-rotate-45"
                >
                  <path
                    d="M1 13L13 1M13 1H4M13 1V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* ---- Stats bar ---------------------------------------------------- */}
        <motion.div
          {...rise(1.2)}
          className="mt-8 grid grid-cols-3 border border-paper/10 md:mt-12 md:w-fit md:grid-cols-none md:flex md:items-center"
        >
          {site.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1 py-3 px-4 ${
                i < site.stats.length - 1 ? "border-r border-paper/10" : ""
              } md:border-r-0 md:px-7 md:py-4 ${
                i < site.stats.length - 1 ? "md:border-r md:border-paper/10" : ""
              }`}
            >
              <span className="font-display text-lg font-bold text-paper md:text-2xl">
                {stat.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.08em] text-paper/50 md:text-[10px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ---- Scroll cue -------------------------------------------------- */}
        <motion.div
          {...rise(1.3)}
          aria-hidden="true"
          className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-paper/50 md:mt-12"
        >
          <span className="relative block h-8 w-px overflow-hidden bg-paper/20">
            <span className="absolute inset-0 animate-scroll-line bg-accent" />
          </span>
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
