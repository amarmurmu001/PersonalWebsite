"use client";

import Marquee from "@/components/ui/Marquee";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import TextReveal from "@/components/ui/TextReveal";
import { skills, services, currently, quickLinks } from "@/lib/data";

/**
 * ABOUT — mobile-first inverted (paper) section.
 * Bio + portrait in two columns; kinetic skills marquee;
 * capabilities cards; currently + quick links; services list.
 */
export default function About() {
  return (
    <section id="about" aria-label="About" className="section-pad bg-paper text-ink">
      <div className="container-site">
        <SectionHeader index="02" label="About" note="Amar Murmu · India" />

        <TextReveal
          as="h2"
          mode="inView"
          text="Exploring the depths of creativity."
          stagger={0.014}
          className="section-title max-w-2xl"
        />

        {/* ---- Bio + portrait ------------------------------------------------ */}
        <div className="mt-12 gap-10 md:mt-20 md:grid md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <Reveal>
              <p className="text-base leading-relaxed text-ink/80 md:text-xl">
                Hellooo! I&apos;m Amar — a full-stack developer from India who loves
                building innovative web applications. I work primarily in
                JavaScript, React and Next.js, weaving in AI and blockchain
                where they genuinely make the product better.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60 md:mt-6 md:text-base">
                For me it&apos;s about seamless user experiences: taking complex
                digital visions — smart contracts, AI pipelines, realtime
                systems — and making them feel effortless. When I&apos;m not
                shipping code, I&apos;m creating content about the journey.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 border-t border-ink/10 pt-5 text-[11px] uppercase tracking-[0.22em] text-ink/50 md:mt-10">
                4+ yrs building <span className="mx-2 text-accent">/</span>
                20+ products shipped <span className="mx-2 text-accent">/</span>∞ curiosity
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-10 md:col-span-5 md:col-start-8 md:mt-0" scale={0.97}>
            <ParallaxImage
              src="/projects/portrait.png"
              alt="Portrait of Amar Murmu"
              speed={8}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-square w-full border border-ink/10 grayscale transition-all duration-700 ease-out hover:grayscale-0"
            />
          </Reveal>
        </div>
      </div>

      {/* ---- Capabilities cards (mobile-first stacked) ---------------------- */}
      <div className="container-site mt-16 md:mt-24">
        <Reveal>
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-ink/50">
            What I do
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-0 border border-ink/10 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={0.06 * i}>
              <div
                className={`p-6 md:p-7 ${
                  i < services.length - 1 ? "border-b border-ink/10 md:border-b-0 md:border-r" : ""
                }`}
              >
                <p className="mb-4 text-xs tracking-[0.04em] text-accent">
                  {service.icon}
                </p>
                <h3 className="mb-2 text-sm font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed text-ink/55 md:text-[13px]">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---- Skills: kinetic band ------------------------------------------ */}
      <div className="mt-16 border-y border-ink/10 md:mt-24">
        <p className="sr-only">Skills: {skills.join(", ")}</p>
        <Marquee duration={36} className="py-5 md:py-6">
          {skills.map((skill) => (
            <span key={skill} className="flex items-center">
              <span className="whitespace-nowrap font-display text-base font-bold uppercase tracking-tight md:text-2xl">
                {skill}
              </span>
              <span className="mx-4 text-accent md:mx-8">/</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ---- Currently + Quick Links (mobile-first stacked) ----------------- */}
      <div className="container-site mt-16 gap-10 md:mt-24 md:grid md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">
              Currently
            </p>
          </Reveal>
          <ul className="space-y-3">
            {currently.map((item, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <li className="flex items-start gap-3 text-sm text-ink/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <Reveal>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">
              Quick links
            </p>
          </Reveal>
          <ul className="space-y-3">
            {quickLinks.map((link, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <li>
                  <a
                    href={link.href}
                    className="link-line text-sm text-ink/70 underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Services list --------------------------------------------------- */}
      <div className="container-site mt-16 gap-10 md:mt-24 md:grid md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em]">
            Full services
          </h3>
          <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink/55">
            From first sketch to production deploy — one person, whole stack.
          </p>
        </Reveal>

        <ul className="mt-6 md:col-span-8 md:col-start-5 md:mt-0">
          {[
            "Full-Stack Development",
            "UI/UX & Web Design",
            "AI & Blockchain Integration",
            "Content Creation",
          ].map((service, i) => (
            <li key={service}>
              <Reveal delay={0.05 * i}>
                <div className="group flex items-center justify-between border-b border-ink/10 py-4 transition-colors duration-300 hover:border-ink/30">
                  <p className="flex items-baseline gap-4 transition-transform duration-500 ease-out group-hover:translate-x-1 md:gap-5">
                    <span className="text-[11px] tracking-[0.18em] text-accent">
                      0{i + 1}
                    </span>
                    <span className="font-display text-base font-bold uppercase tracking-tight md:text-xl">
                      {service}
                    </span>
                  </p>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <path
                      d="M1 13L13 1M13 1H4M13 1V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
