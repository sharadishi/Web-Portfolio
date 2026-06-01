import { useGSAP } from "@gsap/react";
import ProjectCard from "../components/projects/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.png";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projects = [
    {
      title1: "Okay Ai",
      type1: "AI Dashboard",
      image1: img1,
      link1: "https://okyai.netlify.app/",
    },
    {
      title1: "Durxen",
      type1: "Admin Dashboard",
      image1: img2,
      link1: "https://durxen.netlify.app/",
    },
    {
      title1: "Dubai Advance",
      type1: "Maritime Engineering",
      image1: img3,
      link1: "https://dubaiadvance.netlify.app/",
    },
    {
      title1: "Clothzia",
      type1: "Fashion eCommerce",
      image1: img4,
      link1: "https://clothzia.netlify.app/",
    },
    {
      title1: "Cryzeo",
      type1: "Crypto Landing",
      image1: img5,
      link1: "https://cryzeo.netlify.app/",
    },
    {
      title1: "VaatBot",
      type1: "AI Chatbot",
      image1: img6,
      link1: "https://vaatbot.netlify.app/",
    },
  ];

  useGSAP(function () {
    gsap.from(".card-item", {
      height: "180px",
      stagger: {
        // amount: 0.4,
      },
      scrollTrigger: {
        trigger: ".lol",
        start: "top 80%",
        end: "top -100%",
        scrub: true,
      },
    });
  });

  return (
    <div
      id="projects"
      className="bg-[var(--color-project-bg)] px-2 pb-12 pt-0 text-[var(--color-project-text)] lg:px-4 lg:pb-20"
    >
      <div className="flex flex-col min-h-[40vh] justify-end border-b border-black/15 pb-5 lg:pb-8">
        <div className="mb-5 flex items-end justify-between gap-6">
          <p className="max-w-[460px] font-[font1] text-sm uppercase leading-tight text-black/55 lg:text-base">
            Selected work shaped through strategy, identity and digital craft.
          </p>
          <span className="hidden rounded-full border border-black/20 px-5 py-2 font-[font1] text-sm uppercase text-black/65 lg:block">
            06 cases
          </span>
        </div>
        <h2 className="font-[font2] text-[22vw] uppercase leading-[0.78] tracking-normal lg:text-[11vw]">
          Projets
        </h2>
      </div>

      <div className="lol hero pt-4 lg:pt-6 grid grid-cols-2 gap-3 lg:gap-4">
        {projects.map(function (elem, idx) {
          return (
            <div
              key={idx}
              className="card-item mb-3 h-[400px] w-full overflow-hidden lg:mb-4 lg:h-[500px]"
            >
              <ProjectCard
                project={{
                  image: elem.image1,
                  title: elem.title1,
                  type: elem.type1,
                  number: `0${idx * 2 + 1}`,
                  link: elem.link1,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
