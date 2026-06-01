import React, { useContext, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { NavbarContext } from "../../context/NavContext";
import navImg1 from "../../assets/1.jpg";
import navImg2 from "../../assets/2.webp";
import navImg3 from "../../assets/3.jpg";
import navImg4 from "../../assets/4.jpg";

const navItems = [
  {
    label: "Home",
    kicker: "Start here",
    path: "#home",
    image: navImg1,
  },
  {
    label: "About",
    kicker: "Skills and story",
    path: "#about",
    image: navImg3,
  },
  {
    label: "Resume",
    kicker: "Experience and CV",
    path: "#resume",
    image: navImg1,
  },
  // {
  //   label: "Projects",
  //   kicker: "Selected work",
  //   path: "#projects",
  //   image: navImg2,
  // },
  {
    label: "Contact",
    kicker: "Work together",
    path: "#contact",
    image: navImg4,
  },
];

const FullScreenNav = () => {
  const fullScreenRef = useRef(null);
  const [navOpen, setNavOpen] = useContext(NavbarContext);

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navOpen]);

  function scrollToSection(path) {
    const targetId = path.replace("#", "");
    const target = document.getElementById(targetId);

    setNavOpen(false);

    if (!target) return;

    window.dispatchEvent(new CustomEvent("section:navigate"));
    window.history.replaceState(null, "", path);

    setTimeout(() => {
      const sectionTop =
        target.getBoundingClientRect().top +
        (window.lenis?.scroll ?? window.scrollY);

      if (window.lenis) {
        window.lenis.scrollTo(sectionTop, { duration: 1.2, immediate: false });
      } else {
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
      }
    }, 450);
  }

  function gsapAnimation() {
    const tl = gsap.timeline();
    tl.to(".fullscreennav", {
      display: "block",
    });
    tl.to(".stairing", {
      delay: 0.15,
      height: "100%",
      stagger: {
        amount: -0.3,
      },
    });
    tl.to(".link", {
      opacity: 1,
      rotateX: 0,
      y: 0,
      stagger: {
        amount: 0.25,
      },
    });
    tl.to(
      ".navlink",
      {
        opacity: 1,
      },
      "-=0.2",
    );
  }

  function gsapAnimationReverse() {
    const tl = gsap.timeline();
    tl.to(".link", {
      opacity: 0,
      rotateX: 85,
      y: 30,
      stagger: {
        amount: 0.08,
      },
    });
    tl.to(
      ".navlink",
      {
        opacity: 0,
      },
      "-=0.05",
    );
    tl.to(".stairing", {
      height: 0,
      stagger: {
        amount: 0.1,
      },
    });
    tl.to(".fullscreennav", {
      display: "none",
    });
  }

  useGSAP(
    function () {
      if (navOpen) {
        gsapAnimation();
      } else {
        gsapAnimationReverse();
      }
    },
    [navOpen],
  );

  return (
    <div
      ref={fullScreenRef}
      id="fullscreennav"
      className="fullscreennav fixed inset-0 z-[80] hidden h-screen w-full overflow-hidden text-white"
    >
      <div className="fixed inset-0 h-screen w-full">
        <div className="flex h-full w-full">
          <div className="stairing h-0 w-1/5 bg-[var(--color-menu-bg)]"></div>
          <div className="stairing h-0 w-1/5 bg-[var(--color-menu-bg-alt)]"></div>
          <div className="stairing h-0 w-1/5 bg-[var(--color-menu-bg)]"></div>
          <div className="stairing h-0 w-1/5 bg-[var(--color-menu-bg-alt)]"></div>
          <div className="stairing h-0 w-1/5 bg-[var(--color-menu-bg)]"></div>
        </div>
      </div>

      <div className="relative flex h-screen flex-col">
        <div className="navlink flex w-full items-start justify-between border-b border-white/15 p-4 opacity-0 lg:p-6">
          <Link
            to="/"
            onClick={() => setNavOpen(false)}
            className="font-[font2] text-xl uppercase leading-none text-white lg:text-3xl"
          >
            Sharad
          </Link>

          <div className="hidden pt-1 font-[font1] text-xs uppercase tracking-[0.22em] text-white/65 md:block">
            Menu / {String(navItems.length).padStart(2, "0")}
          </div>

          <button
            onClick={() => setNavOpen(false)}
            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[var(--color-accent)] lg:h-16 lg:w-16"
            aria-label="Close navigation"
            type="button"
          >
            <span className="absolute h-6 w-[1.5px] rotate-45 bg-[var(--color-accent)] transition-transform group-hover:rotate-[135deg] lg:h-10 lg:w-[2px]"></span>
            <span className="absolute h-6 w-[1.5px] -rotate-45 bg-[var(--color-accent)] transition-transform group-hover:rotate-45 lg:h-10 lg:w-[2px]"></span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center py-8 lg:py-10">
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className={`link relative origin-top border-t border-white/20 opacity-0 ${index === navItems.length - 1 ? "border-b" : ""}`}
            >
              <button
                type="button"
                onClick={() => scrollToSection(item.path)}
                className="group relative z-10 grid min-h-20 w-full cursor-pointer items-center gap-4 px-4 py-3 text-left md:grid-cols-[0.15fr_1fr_0.3fr] lg:min-h-28 lg:px-6"
              >
                <span className="font-[font1] text-sm uppercase tracking-[0.22em] text-white/45 lg:text-base">
                  0{index + 1}
                </span>
                <h1 className="font-[font2] text-[17vw] uppercase leading-[0.72] transition-colors group-hover:opacity-0 group-hover:text-[var(--color-accent)] md:text-center lg:text-[6vw]">
                  {item.label}
                </h1>
                <span className="font-[font1] text-sm uppercase tracking-[0.16em] text-white/50 md:text-right lg:text-base">
                  {item.kicker}
                </span>

                <div className="moveLink pointer-events-none absolute inset-0 z-[-1] flex overflow-hidden bg-[var(--color-accent)] text-black">
                  {[0, 1].map((loop) => (
                    <div
                      key={loop}
                      className="moveX flex items-center gap-6 px-6"
                    >
                      <img
                        className="h-16 w-24 shrink-0 rounded-xl object-cover shadow-lg lg:h-20 lg:w-32"
                        src={item.image}
                        alt=""
                      />
                      <h2 className="whitespace-nowrap text-center font-[font2] text-[10vw] uppercase leading-[0.72] lg:text-[4vw]">
                        Open {item.label}
                      </h2>
                      <img
                        className="h-16 w-24 shrink-0 rounded-xl object-cover shadow-lg lg:h-20 lg:w-32"
                        src={item.image}
                        alt=""
                      />
                      <h2 className="whitespace-nowrap text-center font-[font2] text-[10vw] uppercase leading-[0.72] lg:text-[4vw]">
                        Open {item.label}
                      </h2>
                    </div>
                  ))}
                </div>
              </button>
            </div>
          ))}
        </nav>

        <div className="navlink grid gap-3 border-t border-white/20 p-4 font-[font1] text-xs uppercase text-white/60 opacity-0 sm:grid-cols-3 lg:p-6 lg:text-sm">
          <span>Sharad Ishi</span>
          <span className="sm:text-center">Web Designer & Developer</span>
          <span className="sm:text-right">React, Tailwind, UI</span>
        </div>
      </div>
    </div>
  );
};

export default FullScreenNav;
