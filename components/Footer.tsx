"use client";

import { useEffect, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import TextReveal from "@/components/ui/TextReveal";
import { site } from "@/lib/data";

/**
 * CONTACT / FOOTER — straight edges, same rhythm as every other section.
 * Giant CTA headline, email with copy-to-clipboard (announced through an
 * aria-live region), social links with underline-draw + magnetic pull.
 */
export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  // Local-time widget — a small "the site is alive" detail.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: site.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API unavailable — fail silently, the mailto button next
         to it still works. */
    }
  };

  return (
    <footer id="contact" aria-label="Contact" className="section-pad bg-ink text-paper">
      <div className="container-site">
        <SectionHeader index="03" label="Contact" note="No forms · just email" />

        {/* ---- Giant CTA ---------------------------------------------------- */}
        <h2 aria-label="Got an idea? Let’s talk" className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.03em]">
          <TextReveal
            mode="inView"
            text="Got an idea?"
            stagger={0.02}
            ariaHidden
            className="block text-[clamp(2.5rem,7vw,5.5rem)]"
          />
          <TextReveal
            mode="inView"
            text="Let’s talk."
            delay={0.15}
            stagger={0.02}
            ariaHidden
            className="block text-accent text-[clamp(2.5rem,7vw,5.5rem)]"
          />
        </h2>

        {/* ---- Email + actions ---------------------------------------------- */}
        <Reveal className="mt-16 flex flex-col justify-between gap-8 border-t border-paper/10 pt-8 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-paper/50">Reach out directly</p>
            <a
              href={`mailto:${site.email}`}
              className="link-line mt-3 inline-block break-all font-display text-xl font-bold tracking-tight sm:text-2xl md:text-3xl"
            >
              {site.email}
            </a>
            {/* Polite live region announces the copy action to screen readers */}
            <p aria-live="polite" className="mt-2 h-4 text-[11px] uppercase tracking-[0.18em] text-accent">
              {copied ? "Copied to clipboard" : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <button type="button" onClick={copyEmail} className="btn-pill">
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={`mailto:${site.email}`} aria-label={`Email ${site.firstName}`} className="btn-circle">
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-500 ease-out group-hover:-rotate-45">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* ---- Socials -------------------------------------------------------- */}
        <Reveal className="mt-16">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((social) => (
              <li key={social.label}>
                <Magnetic strength={0.25}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line inline-flex items-center gap-2 py-1 font-display text-xs font-bold uppercase tracking-[0.18em]"
                  >
                    {social.label}
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Bottom bar ------------------------------------------------------- */}
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-paper/50 sm:flex-row sm:items-center">
          <p>©2026 {site.firstName} {site.lastName}</p>
          <p>
            {site.location} — <span suppressHydrationWarning>{time || "--:--"}</span> local
          </p>
          <Magnetic strength={0.3}>
            <a href="#top" className="link-line inline-flex items-center gap-2 py-1">
              Back to top
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 9V1M5 1L1 5M5 1L9 5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
