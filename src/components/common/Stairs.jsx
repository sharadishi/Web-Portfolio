import React from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Stairs = ({ children }) => {
  const location = useLocation();
  const stairParentRef = useRef(null);
  const pageRef = useRef(null);
  const timelineRef = useRef(null);
  const isFirstRender = useRef(true);

  const playStairsAnimation = useCallback(() => {
    const stairParent = stairParentRef.current;
    const page = pageRef.current;

    if (!stairParent || !page) return;

    const stairs = gsap.utils.toArray(".stair", stairParent);

    timelineRef.current?.kill();
    gsap.killTweensOf([stairParent, page, ...stairs]);

    gsap.set(stairParent, { display: "block" });
    gsap.set(stairs, { height: "100%", y: "0%" });

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(stairParent, { display: "none" });
        gsap.set(stairs, { y: "0%" });
      },
    });

    timelineRef.current = timeline;

    timeline
      .fromTo(
        stairs,
        { height: 0 },
        {
          height: "100%",
          duration: 0.45,
          ease: "power2.inOut",
          stagger: {
            amount: -0.2,
          },
        },
      )
      .to(stairs, {
        y: "100%",
        duration: 0.55,
        ease: "power3.inOut",
        stagger: {
          amount: -0.25,
        },
      });

    gsap.fromTo(
      page,
      {
        opacity: 0,
        scale: 1.08,
      },
      {
        opacity: 1,
        scale: 1,
        delay: 0.85,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      },
    );
  }, []);

  useEffect(() => {
    playStairsAnimation();
    isFirstRender.current = false;

    window.addEventListener("section:navigate", playStairsAnimation);

    return () => {
      timelineRef.current?.kill();
      window.removeEventListener("section:navigate", playStairsAnimation);
    };
  }, [playStairsAnimation]);

  useGSAP(
    () => {
      // Play animation on real route changes, but leave hash section clicks to the custom event.
      if (!isFirstRender.current) {
        playStairsAnimation();
      }
    },
    { dependencies: [location.pathname], scope: stairParentRef },
  );

  return (
    <div className="overflow-hidden">
      <div
        ref={stairParentRef}
        className="fixed top-0 z-[90] hidden h-screen w-full"
      >
        <div className="flex h-full w-full">
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
        </div>
      </div>
      <div ref={pageRef}>{children}</div>
    </div>
  );
};

Stairs.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Stairs;
