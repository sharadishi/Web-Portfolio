import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Reusable wavy-line hook ───────────────────────────────────────────────
function useWavyLine(wrapperRef, pathRef) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const path = pathRef.current;
    if (!wrapper || !path) return;

    const handleMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      gsap.to(path, {
        attr: {
          d: `M 0 25 Q ${e.clientX - rect.left} ${e.clientY - rect.top} 1000 25`,
        },
        duration: 0.2,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(path, {
        attr: { d: "M 0 25 Q 500 25 1000 25" },
        duration: 1.2,
        ease: "elastic.out(1,0.2)",
      });
    };

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);
    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, [wrapperRef, pathRef]);
}

// ─── ServiceCard ───────────────────────────────────────────────────────────
const ServiceCard = ({ title, body, index }) => {
  const wrapperRef = useRef(null);
  const pathRef = useRef(null);
  useWavyLine(wrapperRef, pathRef);

  return (
    <article className="service-card pt-5 group">
      <div
        ref={wrapperRef}
        className="service-line origin-left relative h-22 w-full"
      >
        <svg
          width="100%"
          height="80"
          viewBox="0 0 1000 50"
          preserveAspectRatio="none"
          className="absolute left-0 top-0"
        >
          <path
            ref={pathRef}
            d="M 0 25 Q 500 25 1000 25"
            stroke="var(--color-menu-bg-alt)"
            strokeWidth="0.2"
            fill="transparent"
          />
        </svg>
      </div>
      <div className="mb-8 font-[font1] text-sm uppercase tracking-[0.25em] text-black/40">
        0{index + 1}
      </div>
      <h3 className="font-[font2] text-2xl uppercase leading-none sm:text-3xl lg:text-5xl">
        {title}
      </h3>
      <p className="mt-5 font-[font1] text-base leading-snug text-black/65 sm:text-lg lg:text-xl">
        {body}
      </p>
    </article>
  );
};

// ─── Agence ────────────────────────────────────────────────────────────────
const Agence = () => {
  const pageRef = useRef(null); // scope ref for all GSAP selectors

  const topLineWrapperRef = useRef(null);
  const topLinePathRef = useRef(null);
  const bottomLineWrapperRef = useRef(null);
  const bottomLinePathRef = useRef(null);
  const skillsLineWrapperRef = useRef(null);
  const skillsLinePathRef = useRef(null);

  useWavyLine(topLineWrapperRef, topLinePathRef);
  useWavyLine(bottomLineWrapperRef, bottomLinePathRef);
  useWavyLine(skillsLineWrapperRef, skillsLinePathRef);

  // ── ALL unique scroll animations ────────────────────────────────────────
  useGSAP(() => {
    // 1. About top bar — blur fade in from top
    gsap.from(".about-top-bar", {
      y: -30,
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.7,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 2. Hero — clip-path reveal + fade up
    gsap.from(".hero-fade-up", {
      y: 80,
      opacity: 0,
      clipPath: "inset(0 0 100% 0)",
      duration: 1,
      ease: "power4.out",
      stagger: 0.2,
      immediateRender: false,
      scrollTrigger: {
        trigger: "#about",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // 3. Dividers — scaleX from center
    gsap.from(".line-animate", {
      scaleX: 0,
      transformOrigin: "50% 50%",
      duration: 1.4,
      ease: "power3.inOut",
      stagger: 0.15,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 4. Stats — scale bounce in
    gsap.from(".stat-item", {
      scale: 0.6,
      opacity: 0,
      rotateX: 40,
      duration: 0.9,
      stagger: 0.12,
      ease: "back.out(1.7)",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Count-up numbers
    document.querySelectorAll(".stat-value").forEach((el) => {
      const target = parseInt(el.dataset.num, 10);
      const suffix = el.dataset.suffix || "";
      const pad = parseInt(el.dataset.pad, 10) || 0;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power4.out",
        onUpdate: () => {
          let display = Math.round(obj.val).toString();
          if (pad) display = display.padStart(pad, "0");
          el.textContent = display + suffix;
        },
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    // 5. Experience timeline — step reveal + dot pulse + active tracking
    document.querySelectorAll(".experience-step").forEach((step) => {
      const dot = step.querySelector(".timeline-dot");
      const card = step.querySelector(".experience-card");

      ScrollTrigger.create({
        trigger: step,
        start: "top center+=80",
        end: "bottom center+=80",
        onEnter: () => step.classList.add("active"),
        onLeave: () => step.classList.remove("active"),
        onEnterBack: () => step.classList.add("active"),
        onLeaveBack: () => step.classList.remove("active"),
      });

      gsap.fromTo(
        card,
        { x: 100, opacity: 0, skewX: -6 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        dot,
        { scale: 0, borderWidth: 4 },
        {
          scale: 1,
          borderWidth: 2,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // 6. Services label — letter-spacing expand
    gsap.from(".services-label", {
      opacity: 0,
      letterSpacing: "-0.1em",
      duration: 0.6,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".services-heading",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 7. Services heading — slide from left with clip
    gsap.from(".services-heading", {
      x: -80,
      opacity: 0,
      skewY: 3,
      duration: 0.9,
      ease: "expo.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".services-heading",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 8. Service lines — scaleX from right
    gsap.from(".service-line", {
      scaleX: 0,
      transformOrigin: "100% 50%",
      duration: 1,
      ease: "power4.out",
      stagger: 0.12,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".services-cards",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 9. Service cards — alternate left/right entrance
    document.querySelectorAll(".service-card").forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 === 0 ? -80 : 80,
        opacity: 0,
        rotate: i % 2 === 0 ? -2 : 2,
        duration: 0.9,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // 10. Skills heading — scale + fade
    gsap.from(".skills-heading", {
      scale: 0.8,
      opacity: 0,
      duration: 0.9,
      ease: "elastic.out(1,0.4)",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".skills-heading",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 11. Skill cards — stagger cascade with rotate3d
    gsap.from(".skill-card", {
      y: 80,
      opacity: 0,
      rotateX: 15,
      transformOrigin: "50% 0%",
      duration: 0.9,
      stagger: 0.12,
      ease: "power4.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".skills-cards",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  // Refresh ScrollTrigger once images & fonts are fully loaded
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }
    return () => window.removeEventListener("load", refresh);
  }, []);

  const experience = [
    {
      company: "La Net Team Software Solution Pvt Ltd",
      role: "Senior Full Stack Developer (Team Lead)",
      period: "Nov 2020 — Present",
      bullets: [
        "Led frontend architecture for enterprise SaaS platforms using React.js, Next.js, and TypeScript.",
        "Developed real-time analytics dashboards with Chart.js and dynamic KPI tracking.",
        "Built reusable UI components that improved design consistency and delivery speed, and implemented CI/CD pipelines that reduced release time by 40%.",
        "Mentored 12 developers on frontend architecture and TypeScript best practices.",
      ],
    },
    {
      company: "Vortex Bizlink Pvt Ltd",
      role: "Full Stack Developer",
      period: "Dec 2016 — Oct 2020",
      bullets: [
        "Built responsive e-commerce and ERP platforms using Angular and React.",
        "Designed UI workflows for managing inventory, orders, and user modules.",
        "Integrated Stripe, PayPal, and Twilio APIs for seamless payments and notifications.",
        "Optimized performance through lazy loading and caching strategies.",
      ],
    },
  ];

  const services = [
    [
      "Frontend architecture",
      "Scalable Next.js and React applications with clean structure, reusable components, and maintainable design systems.",
    ],
    [
      "Real-time interfaces",
      "Live dashboards and data-driven UIs powered by WebSockets, SSR/SSG, and optimized rendering.",
    ],
    [
      "Performance tuning",
      "Code splitting, lazy loading, and bundle optimization that cut load times and keep apps fast at scale.",
    ],
    [
      "AI-powered UX",
      "OpenAI and LLM integrations that bring intelligent automation and conversational features into the product.",
    ],
  ];

  const skills = [
    {
      label: "Frontend Core",
      items: [
        "Next.js",
        "React.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "SCSS",
      ],
    },
    {
      label: "UI & Components",
      items: [
        "Responsive Design",
        "Component Architecture",
        "Design Systems",
        "Figma to Code",
        "Accessibility (a11y)",
      ],
    },
    {
      label: "Performance",
      items: [
        "Code Splitting",
        "Lazy Loading",
        "SSR / SSG",
        "Bundle Optimization",
        "Real-time Systems",
        "WebSockets",
      ],
    },
    {
      label: "Backend & APIs",
      items: [
        "Node.js",
        "Python (Django, Flask)",
        "REST APIs",
        "GraphQL",
        "Microservices",
      ],
    },
    {
      label: "Tools & DevOps",
      items: [
        "Git",
        "Docker",
        "CI/CD (GitHub Actions)",
        "AWS",
        "MongoDB",
        "PostgreSQL",
        "SQL Server",
      ],
    },
    {
      label: "AI Integration",
      items: ["OpenAI API", "LLM Integration", "AI-Powered UX", "NLP"],
    },
  ];

  const stats = [
    { num: 9, suffix: "+", label: "Years experience" },
    { num: 10, suffix: "k+", label: "Concurrent users served" },
    { num: 40, suffix: "%", label: "Faster load times" },
  ];

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-[var(--color-about-bg)] text-black"
    >
      <section
        id="about"
        className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-5 lg:px-6 lg:pb-24 lg:pt-25"
      >
        <div className="relative mx-auto max-w-[1800px]">
          <div className="about-top-bar grid gap-3 border-b border-black/20 pb-4 font-[font1] text-[11px] uppercase tracking-[0.18em] text-black/55 sm:grid-cols-3 sm:text-xs lg:text-sm">
            <span>About the work</span>
            <span className="sm:text-center">Next.js / TypeScript / React</span>
            <span className="sm:text-right">Surat, Gujarat, India</span>
          </div>

          <div className="hero-trigger grid gap-10 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-28">
            <div className="hero-fade-up">
              <p className="font-[font1] text-xs uppercase tracking-[0.28em] text-black/45 sm:text-sm lg:text-base">
                Senior Frontend Engineer
              </p>
              <h1 className="mt-5 max-w-6xl font-[font2] text-[22vw] uppercase leading-[0.8] sm:text-[20vw] lg:text-[8vw]">
                About <br /> Me
              </h1>
            </div>

            <div className="hero-fade-up flex flex-col justify-end gap-6 sm:gap-8 lg:pb-4">
              <p className="font-[font2] text-3xl leading-[0.95] sm:text-4xl lg:text-7xl">
                I build high-performance, scalable web applications with
                Next.js, TypeScript, and React.
              </p>
              <p className="max-w-3xl font-[font1] text-base leading-snug text-black/65 sm:text-lg lg:text-2xl">
                Senior Frontend Engineer with 9+ years of experience
                architecting complex, real-time interfaces for enterprise
                platforms — elegant, intuitive, and accessible UI backed by a
                strong full-stack foundation.
              </p>

              {/* Resume download */}
              <a
                href="/Sharad-Aeshi-Resume.pdf"
                download
                className="group inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border border-black/25 px-7 py-3 font-[font1] text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[var(--color-accent)] sm:text-sm"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Download Resume
                </span>
                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </div>
          </div>

          <div className="relative mt-14 lg:mt-20">
            <div
              ref={topLineWrapperRef}
              className="line-animate relative h-15 origin-left"
            >
              <svg
                width="100%"
                height="50"
                viewBox="0 0 1000 50"
                preserveAspectRatio="none"
                className="absolute left-0 top-0"
              >
                <path
                  ref={topLinePathRef}
                  d="M 0 25 Q 500 25 1000 25"
                  stroke="var(--color-menu-bg-alt)"
                  strokeWidth="0.2"
                  fill="transparent"
                />
              </svg>
            </div>

            <div className="stats-grid grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item flex items-end justify-between gap-5 border-black/15 py-3 sm:block sm:border-r sm:pr-5 sm:last:border-r-0"
                >
                  <strong
                    className="stat-value font-[font2] text-4xl uppercase leading-none sm:text-5xl lg:text-7xl"
                    data-num={stat.num}
                    data-suffix={stat.suffix || ""}
                    data-pad={stat.pad || 0}
                  >
                    0
                  </strong>
                  <p className="font-[font1] text-xs uppercase tracking-[0.18em] text-black/50 sm:mt-4 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div
              ref={bottomLineWrapperRef}
              className="line-animate relative h-15 origin-left"
            >
              <svg
                width="100%"
                height="50"
                viewBox="0 0 1000 50"
                preserveAspectRatio="none"
                className="absolute left-0 bottom-0"
              >
                <path
                  ref={bottomLinePathRef}
                  d="M 0 25 Q 500 25 1000 25"
                  stroke="var(--color-menu-bg-alt)"
                  strokeWidth="0.2"
                  fill="transparent"
                />
              </svg>
            </div>
          </div>

          {/* ── Experience ── */}
          <div className="experience-section mt-16 pt-10">
            <div className="flex items-center gap-3 font-[font1] text-xs uppercase tracking-[0.25em] text-black/45 sm:text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Experience
            </div>

            <div className="experience-timeline relative mt-12 lg:mt-16">
              <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-black/10 to-transparent sm:left-7 lg:left-8" />

              {experience.map(({ company, role, period, bullets }, idx) => (
                <div
                  key={company}
                  className="experience-step sticky top-[90px] py-6 lg:top-[120px]"
                >
                  <div className="flex gap-4 sm:gap-6 lg:gap-10">
                    <div className="timeline-dot relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-about-bg)] font-[font2] text-base transition-all duration-500 sm:h-14 sm:w-14 sm:text-lg lg:h-16 lg:w-16 lg:text-xl">
                      0{idx + 1}
                    </div>

                    <article className="experience-card flex-1 overflow-hidden rounded-xl border border-black/10 bg-[var(--color-project-bg)] p-5 shadow-sm sm:p-6 lg:p-8">
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                        <p className="font-[font1] text-xs uppercase tracking-[0.25em] text-black/40 sm:text-sm">
                          {role}
                        </p>
                        <span className="inline-block w-fit rounded-full border border-[var(--color-accent)]/30 px-4 py-1 font-[font1] text-[11px] uppercase tracking-[0.2em] text-black/50">
                          {period}
                        </span>
                      </div>
                      <h3 className="mt-3 font-[font2] text-2xl uppercase leading-none sm:text-4xl lg:text-5xl">
                        {company}
                      </h3>
                      <ul className="mt-6 space-y-3 font-[font1] text-sm leading-relaxed text-black/70 sm:mt-8 sm:text-base">
                        {bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)] sm:mt-2.5" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="mx-auto grid max-w-[1800px] gap-10 px-4 py-16 sm:px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-6 lg:py-28">
        <div>
          <p className="services-label font-[font1] text-xs uppercase tracking-[0.25em] text-black/45 sm:text-sm">
            Services
          </p>
          <h2 className="services-heading mt-4 font-[font2] text-5xl uppercase leading-[0.85] sm:text-6xl lg:text-9xl">
            What I Do
          </h2>
        </div>
        <div className="services-cards grid gap-4 md:grid-cols-2">
          {services.map(([title, body], index) => (
            <ServiceCard key={title} title={title} body={body} index={index} />
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="mx-auto relative max-w-[1800px] px-4 pb-24 sm:px-5 lg:px-6 lg:pb-28">
        <div
          ref={skillsLineWrapperRef}
          className="line-animate origin-left absolute left-0 top-0 h-15 w-full"
        >
          <svg
            width="100%"
            height="50"
            viewBox="0 0 1000 50"
            preserveAspectRatio="none"
            className="absolute left-0 top-0"
          >
            <path
              ref={skillsLinePathRef}
              d="M 0 25 Q 500 25 1000 25"
              stroke="var(--color-menu-bg-alt)"
              strokeWidth="0.2"
              fill="transparent"
            />
          </svg>
        </div>

        <div className="relative pt-20">
          <h2 className="skills-heading font-[font2] text-[16vw] uppercase leading-[0.8] lg:text-[8vw]">
            <span className="text-black/15">Skills</span>
            <br />
            <span className="block">Expertise</span>
          </h2>

          <div className="skills-cards mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, gi) => (
              <div
                key={group.label}
                className="skill-card group relative overflow-hidden rounded-2xl border border-black/8 bg-white/30 p-6 transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:bg-white/50 lg:p-8"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-r-full bg-[var(--color-accent)] transition-all duration-500 group-hover:h-3/4" />

                {/* Background index number */}
                <div className="pointer-events-none absolute right-2 -bottom-4 select-none text-[120px] font-[font2] leading-none text-black/2 transition-all duration-500 group-hover:text-[var(--color-accent)]/8">
                  {String(gi + 1).padStart(2, "0")}
                </div>

                <div className="relative pl-3">
                  <span className="font-[font1] text-xs uppercase tracking-[0.25em] text-black/40 transition-all duration-500 group-hover:text-[var(--color-accent)] lg:text-sm">
                    {group.label}
                  </span>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {group.items.map((item, ii) => (
                      <span
                        key={item}
                        className="relative overflow-hidden rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs uppercase text-black/70 shadow-sm transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_20px_var(--color-accent-glow)] sm:px-5 sm:py-2.5 sm:text-sm"
                        style={{ transitionDelay: `${ii * 30}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Marquee footer */}
          <div className="mt-12 overflow-hidden border-t border-black/8 pt-6">
            <div className="animate-marquee whitespace-nowrap font-[font2] text-4xl uppercase leading-none text-black/8 sm:text-5xl lg:text-7xl">
              {skills.flatMap((g) => g.items).join("  •  ")} •{" "}
              {skills.flatMap((g) => g.items).join("  •  ")} •
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Agence;
