import React from "react";
import { Link } from "react-router-dom";

const HomeBottomText = () => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    if (window.lenis) {
      window.lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard expo out
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-[1800px] gap-6 border-t border-white/20 pt-5 font-[font2] lg:grid-cols-[1fr_auto] lg:items-end">
      <p className="max-w-2xl font-[font1] text-xl leading-snug text-white/75 lg:text-2xl">
        I build powerful portfolio websites and frontend experiences that look
        premium, load fast, and make your work impossible to ignore.
      </p>

      <div className="flex flex-wrap gap-2 lg:justify-end">
        <a
          href="#resume"
          onClick={(e) => handleScroll(e, "#resume")}
          className="group flex min-h-14 items-center gap-4 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-5 pt-1 text-2xl uppercase text-black transition-colors hover:bg-transparent hover:text-[var(--color-accent)] lg:min-h-20 lg:px-10 lg:text-[2vw]"
        >
          View Work
          <span className="transition-transform group-hover:translate-x-2">
            -&gt;
          </span>
        </a>
        <a
          href="#about"
          onClick={(e) => handleScroll(e, "#about")}
          className="group flex min-h-14 items-center gap-4 rounded-full border-2 border-white/45 px-5 pt-1 text-2xl uppercase text-white/80 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:min-h-20 lg:px-10 lg:text-[2vw]"
        >
          About Me
          <span className="transition-transform group-hover:translate-x-2">
            -&gt;
          </span>
        </a>
      </div>
    </div>
  );
};

export default HomeBottomText;
