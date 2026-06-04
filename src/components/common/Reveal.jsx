import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal Module
 * 
 * A deep module that abstracts GSAP ScrollTrigger orchestration.
 * Callers get high-leverage motion via simple presets.
 */
const Reveal = ({
  children,
  animation = "fade-up",
  stagger = 0,
  delay = 0,
  duration = 0.9,
  threshold = 0.75,
  trigger,
  selector, // New prop for targeted animations
  className = "",
  ease = "power4.out",
  once = true,
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    const triggerElement = trigger ? document.querySelector(trigger) : element;

    const presets = {
      "fade-up": { y: 50, opacity: 0 },
      "fade-in": { opacity: 0 },
      "scale-in": { scale: 0.8, opacity: 0 },
      "slide-left": { x: 50, opacity: 0 },
    };

    const vars = {
      ...(presets[animation] || presets["fade-up"]),
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: triggerElement,
        start: `top ${threshold * 100}%`,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    };

    // Leverage: selector > children > container
    let targets;
    if (selector) {
      targets = gsap.utils.toArray(selector, element);
    } else if (element.children.length > 0) {
      targets = Array.from(element.children);
    } else {
      targets = [element];
    }
    
    gsap.from(targets, vars);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
