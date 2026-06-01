/* eslint-disable react-refresh/only-export-components, react/prop-types */
import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const NavbarContext = createContext()
export const NavbarColorContext = createContext()

const darkSections = ['#projects', '#about', '#contact']

const NavContext = ({ children }) => {
    const [navColor, setNavColor] = useState('white')
    const [navOpen, setNavOpen] = useState(false)
    const hash = useLocation().hash

    useEffect(function () {
        if (darkSections.includes(hash)) {
            setNavColor('black')
        } else {
            setNavColor('white')
        }
    }, [hash])

    return (
        <div>
            <NavbarContext.Provider value={[navOpen, setNavOpen]}>
                <NavbarColorContext.Provider value={[navColor, setNavColor]}>
                    {children}
                </NavbarColorContext.Provider>
            </NavbarContext.Provider>
        </div>
    )
}

export default NavContext
