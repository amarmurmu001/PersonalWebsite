"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";

/**
 * FAQ — accordion with structured data for Google rich results.
 * Mobile-first: single column, clean touch targets.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** JSON-LD FAQ schema injected into <head> via a portal-free <script>. */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" aria-label="FAQ" className="section-pad bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-site">
        <Reveal>
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-ink/50">
            FAQ
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section-title max-w-md">Common questions.</h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <div className="border-b border-ink/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="flex w-full items-center justify-between py-5 text-left md:py-6"
                >
                  <span className="pr-4 font-display text-base font-bold uppercase tracking-tight md:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 text-xl transition-transform duration-300 ${
                      openIndex === i ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-ink/70 md:pb-8 md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
