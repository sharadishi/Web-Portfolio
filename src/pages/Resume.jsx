import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Public asset — file lives in /public/Sharad-Aeshi-Resume.pdf
const RESUME_FILE = "/Sharad-Aeshi-Resume.pdf";

const summary =
  "Senior Frontend Engineer with 9+ years of experience building high-performance, scalable web applications. Expert in Next.js, TypeScript, React.js, and Tailwind CSS with a proven record of architecting complex, real-time interfaces for enterprise platforms.";

const achievements = [
  "Built real-time analytics dashboards in Next.js & React handling 10k+ concurrent users.",
  "Architected scalable TypeScript + Tailwind CSS component libraries used across enterprise apps.",
  "Improved frontend load times by 40% via lazy loading, code splitting, and performance tuning.",
  "Translated Figma designs into pixel-perfect, fully responsive, and accessible UI components.",
  "Integrated OpenAI APIs to deliver intelligent automation and conversational web features.",
];

const featuredProjects = [
  {
    name: "Exitfund — Investment Management Platform",
    period: "Nov 2023 — Aug 2024",
    stack:
      "Next.js · React · TypeScript · Tailwind CSS · Chart.js · MongoDB · Django REST",
    detail:
      "Built complex investment dashboards with real-time portfolio tracking, role-based UI for investors and fund managers, and an atomic Tailwind component library optimized with SSR & ISR.",
  },
  {
    name: "AI-Powered Chatbot Platform",
    period: "Nov 2022 — Apr 2023",
    stack:
      "React · TypeScript · React Native · Tailwind CSS · OpenAI API · WebSockets",
    detail:
      "Developed an AI chatbot interface integrating OpenAI APIs with 95% code reusability across web and mobile, plus a real-time analytics dashboard for performance monitoring.",
  },
  {
    name: "Multi-Tenant E-commerce SaaS Platform",
    period: "Aug 2023 — Mar 2024",
    stack:
      "Next.js · React · TypeScript · Tailwind CSS · PostgreSQL · Microservices",
    detail:
      "Architected a multi-tenant frontend supporting 10k+ concurrent users with a real-time inventory system over WebSockets, achieving 99.9% uptime through optimized rendering and caching.",
  },
];

const education = {
  degree: "Bachelor of Engineering (Computer Science)",
  school: "Pacific School of Engineering, Surat, India",
  period: "2012 — 2016",
};

const Resume = () => {
  useGSAP(() => {
    gsap.from(".resume-fade", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.12,
      immediateRender: false,
      scrollTrigger: {
        trigger: "#resume",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <main className="bg-[var(--color-about-bg)] px-4 pb-24 pt-32 text-black lg:px-6 lg:pt-25">
      <section id="resume" className="mx-auto max-w-[1800px]">
        {/* ── Header ── */}
        <div className="resume-fade grid gap-3 border-b border-black/20 pb-4 font-[font1] text-xs uppercase tracking-[0.18em] text-black/55 sm:grid-cols-3 lg:text-sm">
          <span>Resume / CV</span>
          <span className="sm:text-center">9+ Years · Frontend</span>
          <span className="sm:text-right">Updated 2026</span>
        </div>

        <div className="resume-fade mt-12 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-[font1] text-sm uppercase tracking-[0.28em] text-black/45 lg:text-base">
              Senior Frontend Engineer
            </p>
            <h1 className="mt-5 font-[font2] text-[20vw] uppercase leading-[0.8] lg:text-[8vw]">
              Resume
            </h1>
          </div>

          {/* Download button */}
          <a
            href={RESUME_FILE}
            download="Sharad-Aeshi-Resume.pdf"
            className="group relative inline-flex shrink-0 items-center gap-3 self-start overflow-hidden rounded-full border border-black/25 px-8 py-4 font-[font1] text-sm uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[var(--color-accent)] lg:self-auto"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Download PDF
            </span>
            <span
              aria-hidden="true"
              className="relative z-10 transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
            <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        </div>

        {/* ── Summary ── */}
        <p className="resume-fade mt-10 max-w-4xl font-[font2] text-2xl leading-[1.05] text-black/80 lg:text-4xl">
          {summary}
        </p>

        {/* ── Key achievements ── */}
        <div className="resume-fade mt-16 lg:mt-24">
          <div className="flex items-center gap-3 font-[font1] text-sm uppercase tracking-[0.25em] text-black/45">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            Key Achievements
          </div>
          <ul className="mt-8 grid gap-x-12 gap-y-4 lg:grid-cols-2">
            {achievements.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-black/10 pb-4 font-[font1] text-base leading-relaxed text-black/70 lg:text-lg"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Featured projects ── */}
        <div className="resume-fade mt-16 lg:mt-24">
          <div className="flex items-center gap-3 font-[font1] text-sm uppercase tracking-[0.25em] text-black/45">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            Featured Projects
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.name}
                className="group flex flex-col rounded-2xl border border-black/10 bg-white/40 p-7 transition-all duration-500 hover:border-[var(--color-accent)]/40 hover:bg-white/60 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
              >
                <span className="font-[font1] text-xs uppercase tracking-[0.2em] text-black/40">
                  {project.period}
                </span>
                <h3 className="mt-4 font-[font2] text-2xl uppercase leading-[0.95] lg:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-5 font-[font1] text-sm leading-relaxed text-black/65">
                  {project.detail}
                </p>
                <p className="mt-6 border-t border-black/10 pt-4 font-[font1] text-xs uppercase tracking-[0.12em] text-black/45">
                  {project.stack}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div className="resume-fade mt-16 lg:mt-24">
          <div className="flex items-center gap-3 font-[font1] text-sm uppercase tracking-[0.25em] text-black/45">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            Education
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-black/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="font-[font2] text-3xl uppercase leading-none lg:text-5xl">
                {education.degree}
              </h3>
              <p className="mt-4 font-[font1] text-base text-black/60 lg:text-lg">
                {education.school}
              </p>
            </div>
            <span className="inline-block self-start rounded-full border border-[var(--color-accent)]/40 px-5 py-2 font-[font1] text-sm uppercase tracking-[0.2em] text-black/55 lg:self-auto">
              {education.period}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resume;
