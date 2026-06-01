import Video from "./Video";
import HeroBottomText from "./HomeBottomText";

const HomeHeroText = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col font-[font1] px-4 sm:px-6">
      <div className="mb-6 grid gap-2 border-b border-white/20 pb-4 font-[font1] text-[10px] uppercase text-white/65 sm:grid-cols-3 sm:gap-3 lg:mb-5 lg:text-sm">
        <span className="text-center sm:text-left">SHARAD ISHI</span>
        <span className="sm:text-center">
          Web Designer &amp; Frontend Developer
        </span>
        <span className="text-center sm:text-right">React, Tailwind, UI</span>
      </div>

      <p className="mx-auto mb-6 max-w-3xl text-center font-[font1] text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] sm:text-xs lg:text-base">
        I design premium web experiences with React, Tailwind, and motion-rich
        UI.
      </p>

      <h1 className="text-center font-[font2] text-[14vw] uppercase leading-[0.78] sm:text-[16vw] lg:text-[7vw]">
        Sr. Software Web Designer
      </h1>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center font-[font2] text-[10vw] uppercase leading-[0.84] sm:text-[12vw] lg:gap-5 lg:text-[7vw]">
        <span>Creates</span>
        <div className="h-[8vw] w-[20vw] min-w-20 overflow-hidden rounded-full border border-white/30 shadow-[0_0_40px_var(--color-accent-glow)] sm:min-w-28 sm:h-[7vw] sm:w-[18vw] lg:h-[6vw] lg:w-[15vw]">
          <Video />
        </div>
        <span>Bold</span>
      </div>

      <div className="mt-1 text-center font-[font2] text-[10vw] uppercase leading-[0.84] sm:text-[12vw] lg:text-[7vw]">
        Digital Work
      </div>

      <div className="mt-10 mb-20 grid gap-2 border-t border-white/20 pt-4 font-[font1] text-[10px] uppercase text-white/60 sm:grid-cols-3 sm:gap-3 lg:mt-12 lg:mb-25 lg:text-sm">
        <p className="text-center sm:text-left">Portfolio websites</p>
        <p className="sm:text-center">React + Tailwind UI</p>
        <p className="text-center sm:text-right">Smooth animation</p>
      </div>
      <HeroBottomText />
    </section>
  );
};

export default HomeHeroText;
