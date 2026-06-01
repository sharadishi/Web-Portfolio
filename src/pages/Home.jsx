import HomeHeroText from "../components/home/HomeHeroText";
import Agence from "./Agence";
import Projects from "./Projects";
import Contact from "./Contact";

const Home = () => {
  return (
    <>
      <main
        id="home"
        className="relative m-4 overflow-hidden bg-[var(--color-home-bg)] text-white rounded-2xl"
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-[var(--color-menu-bg)]/20 backdrop-blur-xs"></div>
        <div className="relative flex min-h-[97vh] flex-col overflow-hidden px-4 pb-5 pt-24 lg:px-6 lg:pb-6 lg:pt-25">
          <HomeHeroText />
        </div>
      </main>
      <Agence />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
