import { Link } from 'react-router-dom'

const HomeBottomText = () => {
  return (
    <div className='mx-auto grid w-full max-w-[1800px] gap-6 border-t border-white/20 pt-5 font-[font2] lg:grid-cols-[1fr_auto] lg:items-end'>
      <p className='max-w-2xl font-[font1] text-xl leading-snug text-white/75 lg:text-2xl'>
        I build powerful portfolio websites and frontend experiences that look premium, load fast, and make your work impossible to ignore.
      </p>

      <div className='flex flex-wrap gap-2 lg:justify-end'>
        <Link className='group flex min-h-14 items-center gap-4 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-5 pt-1 text-2xl uppercase text-black transition-colors hover:bg-transparent hover:text-[var(--color-accent)] lg:min-h-20 lg:px-10 lg:text-[2vw]' to='/projects'>
          View Work
          <span className='transition-transform group-hover:translate-x-2'>-&gt;</span>
        </Link>
        <Link className='group flex min-h-14 items-center gap-4 rounded-full border-2 border-white/45 px-5 pt-1 text-2xl uppercase text-white/80 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:min-h-20 lg:px-10 lg:text-[2vw]' to='/about'>
          About Me
          <span className='transition-transform group-hover:translate-x-2'>-&gt;</span>
        </Link>
      </div>
    </div>
  )
}

export default HomeBottomText
