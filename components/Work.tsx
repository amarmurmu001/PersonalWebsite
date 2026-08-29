"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import TextReveal from "@/components/ui/TextReveal";
import { projects } from "@/lib/data";

/**
 * SELECTED WORK — mobile-first list grid.
 * Mobile: stacked cards with inline images.
 * Desktop: floating image preview that chases the cursor.
 */
export default function Work() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.45 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.45 });

  const onMove = (e: MouseEvent) => {
    const rect = section.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(e.clientX - rect.left);
    py.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={section}
      id="work"
      aria-label="Selected work"
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
      className="section-pad relative"
    >
      <div className="container-site">
        <SectionHeader index="01" label="Selected Work" note={`${projects.length} builds`} />

        <TextReveal
          as="h2"
          mode="inView"
          text="Things I've built."
          stagger={0.016}
          className="section-title max-w-xl"
        />

        {/* ---- Project list --------------------------------------------------- */}
        <ol className="mt-10 md:mt-20">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.04 * i}>
              <li className="list-none">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="view"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-label={`${project.title} (${project.year}) — view project`}
                  className="group block border-t border-paper/10 py-6 last:border-b md:py-10"
                >
                  <div className="items-center gap-4 md:grid md:grid-cols-12 md:gap-6">
                    {/* Index / year */}
                    <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-paper/40 md:col-span-1 md:gap-4">
                      /{String(i + 1).padStart(2, "0")}
                      <span className="md:hidden">·</span>
                      <span>{project.year}</span>
                    </p>

                    {/* Title */}
                    <h3 className="mt-3 text-xl font-bold uppercase leading-tight tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-6 md:mt-0 md:text-4xl">
                      {project.title}
                    </h3>

                    {/* Summary + stack */}
                    <div className="mt-3 md:col-span-4 md:mt-0">
                      <p className="text-xs leading-relaxed text-paper/60 md:text-sm">
                        {project.summary}
                      </p>
                      <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-paper/40 md:mt-2">
                        {project.stack.join(" · ")}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="mt-4 flex md:col-span-1 md:mt-0 md:justify-end">
                      <Magnetic strength={0.4}>
                        <span className="btn-circle !h-10 !w-10 md:!h-14 md:!w-14">
                          <svg
                            width="15"
                            height="15"
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
                        </span>
                      </Magnetic>
                    </div>
                  </div>

                  {/* Mobile inline image */}
                  <div className="relative mt-4 aspect-video overflow-hidden md:hidden">
                    <Image src={project.image} alt="" fill sizes="100vw" className="object-cover" />
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* ---- Floating preview (desktop only) -------------------------------- */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: active !== null ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative h-56 w-80 overflow-hidden ring-1 ring-paper/20">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                scale: active === i ? 1 : 1.06,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={project.image} alt="" fill sizes="20rem" className="object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
