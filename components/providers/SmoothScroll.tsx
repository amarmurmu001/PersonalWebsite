"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// ScrollTrigger must be registered before any tween references it.
gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext<Lenis | null>(null);

/** Access the live Lenis instance (e.g. to call lenis.scrollTo programmatically). */
export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Lenis smooth scroll, driven by GSAP's single ticker so that smooth
 * scrolling and every ScrollTrigger animation share one clock:
 *
 *   lenis.on("scroll") -> ScrollTrigger.update   (positions stay in sync)
 *   gsap.ticker        -> lenis.raf              (one rAF loop for everything)
 *   lagSmoothing(0)    -> no artificial GSAP delays
 *
 * Skipped entirely under prefers-reduced-motion: native scrolling wins.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // lerp 0.09 → a heavy, "editorial" glide. Lower = smoother/laggier.
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });

    instance.on("scroll", ScrollTrigger.update);

    // GSAP ticks in seconds; Lenis wants milliseconds.
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Intercept in-page anchor clicks (#work, #contact…) so nav links
    // glide with Lenis instead of jumping instantly.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      // -72px offset clears the fixed navbar.
      instance.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    setLenis(instance);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
