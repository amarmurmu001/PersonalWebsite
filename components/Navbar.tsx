"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/data";
import { EASE } from "@/components/ui/TextReveal";

/**
 * Fixed navbar — mobile-first.
 * Mobile: hamburger menu that opens as a full-screen overlay.
 * Desktop: horizontal nav links with mix-blend-difference.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      >
        <nav
          aria-label="Primary"
          className="container-site flex items-center justify-between py-4 text-paper md:py-5"
        >
          <a
            href="#top"
            className="font-display text-sm font-bold uppercase tracking-[0.15em]"
          >
            {site.firstName}
            <span>.</span>
            {site.lastName}
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] md:flex">
            {[
              ["Work", "#work"],
              ["About", "#about"],
              ["FAQ", "#faq"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="link-line py-2">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile: hamburger button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-0.5 w-5 bg-paper transition-all duration-300 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-paper transition-all duration-300 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-ink md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8">
              {[
                ["Work", "#work"],
                ["About", "#about"],
                ["FAQ", "#faq"],
                ["Contact", "#contact"],
              ].map(([label, href], i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="font-display text-3xl font-bold uppercase tracking-[0.15em] text-paper"
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
