"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxImage — GSAP ScrollTrigger parallax inside an overflow-hidden
 * frame (parallax #1 & #2 of the site: About portrait + hero glow uses
 * the same technique inline).
 *
 * The inner layer is oversized (scale 1.25) and scrubbed with
 * `yPercent ± speed` as the frame travels the viewport. Because the
 * tween is `scrub: true` the image position is bound 1:1 to scroll —
 * it plays forwards AND backwards naturally, no timeline needed.
 * `ctx.revert()` on unmount kills both tween and trigger (no leaks
 * during route transitions).
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  /** Percent of the frame's height the image drifts. 8–15 is subtle. */
  speed = 12,
  sizes = "(min-width: 768px) 40vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  sizes?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !frame.current || !inner.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -speed, scale: 1.25 },
        {
          yPercent: speed,
          scale: 1.25,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom", // starts when the frame enters from below
            end: "bottom top", // ends when it leaves above
            scrub: true,
          },
        }
      );
    }, frame); // scope selector-based cleanup to this subtree

    return () => ctx.revert();
  }, [reduce, speed]);

  return (
    <div ref={frame} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="relative h-full w-full will-change-transform">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    </div>
  );
}
