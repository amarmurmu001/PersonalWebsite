/* ========================================================================
 * Site + project content for Amar Murmu.
 * Based on amar-murmu.vercel.app — everything below is safe to tweak
 * without touching components.
 * ===================================================================== */

export const site = {
  firstName: "Amar",
  lastName: "Murmu",
  role: "Full-Stack Developer & AI Workflow Engineer",
  /** One-line pitch shown in the hero. */
  pitch:
    "I build full-stack applications, design AI-powered workflows, and create developer content. Based in India. Currently shipping things with MERN, Astro, and LLM APIs.",
  email: "amarmurmu001@gmail.com",
  location: "India",
  timezone: "Asia/Kolkata",
  url: "https://amar-murmu.vercel.app",
  socials: [
    { label: "GitHub", url: "https://github.com/amarmurmu001" },
    { label: "YouTube", url: "https://youtube.com/@amarmurmu001" },
    { label: "LinkedIn", url: "https://linkedin.com/in/amarmurmu" },
    { label: "X / Twitter", url: "https://twitter.com/amarmurmu001" },
  ],
  stats: [
    { value: "4+", label: "years coding" },
    { value: "20+", label: "projects shipped" },
    { value: "∞", label: "ideas compiling" },
  ],
};

export type Service = {
  icon: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: "{ dev }",
    title: "Full-Stack Dev",
    description:
      "MERN stack applications, REST APIs, and modern frontend frameworks. Clean code, scalable architecture.",
  },
  {
    icon: "> ai",
    title: "AI Workflows",
    description:
      "Integrating LLMs into design, code, and content pipelines. Prompt engineering. Agentic systems.",
  },
  {
    icon: "// rec",
    title: "Content Creation",
    description:
      "Developer tutorials on YouTube. AI-assisted scripting and production workflows. Tech storytelling.",
  },
];

export const currently = [
  "Building with Astro + Tailwind v4 + MERN",
  "Exploring agentic AI coding workflows",
  "Creating developer content on YouTube",
  "Open to collaboration & freelance work",
];

export const quickLinks = [
  { label: "View AI Workflows →", href: "#work" },
  { label: "View Capabilities →", href: "#about" },
  { label: "GitHub Profile →", href: "https://github.com/amarmurmu001" },
  { label: "YouTube Channel →", href: "https://youtube.com/@amarmurmu001" },
];

export type FAQ = {
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    question: "Who is Amar Murmu?",
    answer:
      "Amar is a full-stack developer and AI workflow engineer building modern web apps with Astro, React, Node, and LLM APIs.",
  },
  {
    question: "What services does Amar offer?",
    answer:
      "He delivers MERN development, AI workflow integration, prompt architecture, and content creation for developer audiences.",
  },
  {
    question: "What technologies does Amar work with?",
    answer:
      "He works with MERN, Astro, Tailwind, LLM APIs, prompt engineering, and product-focused automation systems.",
  },
  {
    question: "How can I collaborate with Amar?",
    answer:
      "Reach out through the contact page, GitHub, or email to discuss freelance work, product builds, or AI tooling projects.",
  },
  {
    question: "Where is Amar based?",
    answer:
      "Amar is based in India and partners with clients globally on development and AI-driven workflows.",
  },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  stack: string[];
  summary: string;
  /** Local image in /public/projects */
  image: string;
  /** Live deployment URL */
  url: string;
};

export const projects: Project[] = [
  {
    slug: "scriptgenius",
    title: "ScriptGenius",
    year: "2025",
    stack: ["React", "OpenAI API", "Node.js"],
    summary:
      "AI-powered script generation for creators and writers — dynamic script formatting, real-time collaboration and templates for every content type.",
    image: "/projects/alumni.png",
    url: "https://script-generator-iota.vercel.app/",
  },
  {
    slug: "alumni-association",
    title: "Alumni Association",
    year: "2025",
    stack: ["React", "Node.js", "MongoDB"],
    summary:
      "A platform connecting college alumni with their alma mater — event management, member directory, donation portal and discussion forums.",
    image: "/projects/scriptgenius.png",
    url: "https://alumni-frontend-five.vercel.app/",
  },
  {
    slug: "solana-voting-dapp",
    title: "Solana Voting Dapp",
    year: "2025",
    stack: ["Solana", "Rust", "Anchor", "React"],
    summary:
      "Trustless on-chain voting: every proposal lives as its own Solana account holding the details, voting period and live results.",
    image: "/projects/voting.jpg",
    url: "https://voting-dapp-frontend-vert.vercel.app/",
  },
  {
    slug: "t3-chat",
    title: "T3-Chat",
    year: "2026",
    stack: ["Next.js", "tRPC", "Tailwind", "Prisma"],
    summary:
      "Realtime chat built on the T3 stack. Currently under construction — shipping soon.",
    image: "/projects/t3chat.png",
    url: "https://t3-chat-blush.vercel.app/",
  },
];

/** Skills shown as one kinetic marquee band in the About section. */
export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Astro",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "LLM APIs",
  "Prompt Engineering",
  "AI Integration",
  "Solana / Web3",
];
