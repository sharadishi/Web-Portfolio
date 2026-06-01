import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavbarColorContext, NavbarContext } from "../../context/NavContext";
import logoSm from "../../assets/8.png";
import logoLg from "../../assets/91.png";

const Navbar = () => {
  const navGreenRef = useRef(null);
  const [, setNavOpen] = useContext(NavbarContext);
  const [navColor] = useContext(NavbarColorContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const lenisScroll = window.lenis?.scroll ?? window.scrollY;
      setScrolled(lenisScroll > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-[60] flex fixed items-center justify-between inset-x-4 top-4 lg:px-12 px-8 h-16 transition-colors duration-300 ${scrolled ? "rounded-full bg-black overflow-hidden" : "bg-transparent rounded-t-2xl overflow-hidden"}`}
    >
      <Link to="/" className="block h-full flex items-center">
        <img src={logoSm} alt="Sharad" className="h-10 w-auto md:hidden" />
        <img
          src={logoLg}
          alt="Sharad"
          className="hidden h-12 w-auto md:block lg:h-16 object-contain"
        />
      </Link>
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setNavOpen(true)}
        className="group relative h-full lg:w-[16vw] w-48 cursor-pointer"
      >
        <div
          ref={navGreenRef}
          className={`absolute top-0 h-0 w-full bg-[var(--color-accent)] transition-all duration-500 ${scrolled ? "rounded-tr-full" : ""}`}
        />
        <div className="relative flex h-full flex-col items-end justify-center gap-1 lg:gap-1.5">
          <span className="h-0.5 w-8 bg-white transition-all duration-300 group-hover:w-12 lg:w-14 lg:group-hover:w-18" />
          <span className="h-0.5 w-6 bg-white transition-all duration-300 group-hover:w-10 lg:w-10 lg:group-hover:w-14" />
          <span className="h-0.5 w-4 bg-white transition-all duration-300 group-hover:w-8 lg:w-6 lg:group-hover:w-10" />
        </div>
      </button>
    </div>
  );
};

export default Navbar;
