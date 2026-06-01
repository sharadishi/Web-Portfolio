/* eslint-disable react/prop-types */
const ProjectCard = ({ image1, image2, project }) => {
    const cards = project
        ? [project]
        : [
            { image: image1, title: 'Selected project', type: 'Case study' },
            { image: image2, title: 'Selected project', type: 'Case study' },
        ].filter((item) => item.image)

    return (
        <>
            {cards.map((item, index) => (
                <a
                    key={`${item.image}-${index}`}
                    href={item.link || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative block h-full min-h-[420px] overflow-hidden rounded-[22px] bg-black transition-all duration-500 ease-out hover:rounded-[42px] lg:min-h-0 lg:flex-1'
                >
                    <img className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 ' src={item.image} alt={item.title || 'Project preview'} />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/25 opacity-90 transition-opacity duration-500 group-hover:opacity-100' />
                    <div className='absolute left-0 top-0 flex w-full items-start justify-between p-4 font-[font1] text-xs uppercase text-white/80 lg:p-6 lg:text-sm'>
                        <span>{item.number || `0${index + 1}`}</span>
                        <span>{item.type || 'Case study'}</span>
                    </div>
                    <div className='absolute bottom-0 left-0 flex w-full items-end justify-between gap-4 p-4 lg:p-6'>
                        <h2 className='max-w-[70%] font-[font2] text-2xl uppercase leading-none text-white lg:text-3xl'>
                            {item.title || 'Project'}
                        </h2>
                        <span className='grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/55 bg-white/10 font-[font1] text-2xl text-white backdrop-blur-md transition duration-500 group-hover:-rotate-45 group-hover:bg-white group-hover:text-black lg:h-14 lg:w-14 lg:text-4xl'>
                            +
                        </span>
                    </div>
                </a>
            ))}
        </>
    )
}

export default ProjectCard
