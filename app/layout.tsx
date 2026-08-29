import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/Navbar";
import { site } from "@/lib/data";

/**
 * Editorial type pairing:
 *  • Syne 700/800 — geometric display face for the oversized headlines
 *  • Space Grotesk — quiet grotesk for body/meta text
 * Both are self-hosted & subset by next/font (zero layout shift).
 */
const display = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Amar Murmu — Full-Stack Developer & AI Workflow Engineer",
    template: "%s | Amar Murmu",
  },
  description:
    "Amar Murmu is a full-stack developer specializing in MERN, Astro, React, Node.js, and AI workflows. Shipped 20+ projects with LLM APIs, prompt architecture, and modern codebases.",
  keywords: [
    "Amar Murmu",
    "full-stack developer",
    "React developer",
    "Next.js",
    "Astro",
    "MERN stack",
    "AI workflows",
    "prompt engineering",
    "web developer India",
    "freelance developer",
    "LLM APIs",
    "content creator",
    "developer YouTube",
  ],
  authors: [{ name: "Amar Murmu" }],
  creator: "Amar Murmu",
  publisher: "Amar Murmu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: "Amar Murmu",
    title: "Amar Murmu — Full-Stack Developer & AI Workflow Engineer",
    description:
      "Full-stack developer specializing in MERN, Astro, React, Node.js, and AI workflows. Shipped 20+ projects with LLM APIs and modern codebases.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amar Murmu — Full-Stack Developer & AI Workflow Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amar Murmu — Full-Stack Developer & AI Workflow Engineer",
    description:
      "Full-stack developer specializing in MERN, Astro, React, Node.js, and AI workflows. Shipped 20+ projects.",
    images: ["/og-image.png"],
    creator: "@amarmurmu001",
  },
  verification: {
    google: "Itkra6H3s2JQNGnt9sXpC2QGmuqxPRlNGMeL7jXYPRU",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /** Person structured data for rich results */
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amar Murmu",
    url: site.url,
    image: `${site.url}/og-image.png`,
    jobTitle: "Full-Stack Developer & AI Workflow Engineer",
    sameAs: site.socials.map((s) => s.url),
    knowsAbout: [
      "Web Development",
      "MERN Stack",
      "React",
      "Next.js",
      "Astro",
      "AI Workflows",
      "Prompt Engineering",
      "Content Creation",
    ],
  };

  /** WebSite structured data */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Amar Murmu Portfolio",
    url: site.url,
    author: {
      "@type": "Person",
      name: "Amar Murmu",
    },
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="bg-ink font-sans text-paper antialiased">
        {/* Keyboard users can jump straight past the nav */}
        <a
          href="#work"
          className="sr-only z-[110] rounded-full bg-accent px-5 py-3 font-display text-xs font-bold uppercase tracking-widest text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        <MotionProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            {children}
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
