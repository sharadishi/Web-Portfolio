import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const Stairs = (props) => {
    const currentPath = useLocation().pathname
    const stairParentRef = useRef(null)
    const pageRef = useRef(null)

    function playStairsAnimation() {
        const tl = gsap.timeline()
        tl.to(stairParentRef.current, {
            display: 'block',
        })
        tl.from('.stair', {
            height: 0,
            stagger: {
                amount: -0.2
            }
        })
        tl.to('.stair', {
            y: '100%',
            stagger: {
                amount: -0.25
            }
        })
        tl.to(stairParentRef.current, {
            display: 'none'
        })
        tl.to('.stair', {
            y: '0%',
        })

        gsap.from(pageRef.current,{
            opacity:0,
            delay:1.3,
            scale:1.2
        })
    }

    const isFirstRender = useRef(true)

    useEffect(function () {
        window.addEventListener('section:navigate', playStairsAnimation)

        return function () {
            window.removeEventListener('section:navigate', playStairsAnimation)
        }
    }, [])

    useGSAP(function () {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        playStairsAnimation()
    }, [currentPath])
    

    return (
        <div className='overflow-hidden'>
            <div ref={stairParentRef} className='h-screen w-full fixed z-[70] top-0'>
                <div className='h-full w-full flex'>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                </div>
            </div>
            <div ref={pageRef}>
                {props.children}
            </div>
        </div>
    )
}

export default Stairs
