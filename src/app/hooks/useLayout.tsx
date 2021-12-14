import React, { createContext, useState, useEffect, useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

type LayoutContextData = {
    showModal(): void;
    closeModal(): void;
    toggleDrawer(): void;
    showMenuButton: boolean;
    drawerOpened: boolean;
    isMobile: boolean;
}

type DrawerStateType = {
    showMenuButton: boolean;
    drawerOpened: boolean;
    modalOpened: boolean;
    isMobile: boolean;
}

const LayoutContext = createContext<LayoutContextData>({} as LayoutContextData)

export const LayoutProvider: React.FC = ({ children }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    const [drawerState, setDrawerState] = useState<DrawerStateType>({} as DrawerStateType)

    useEffect(() => {
        if (!matches) {
            setDrawerState(prevState => ({
                ...prevState,
                isMobile: true,
                drawerOpened: false
            }))
        } else {
            setDrawerState(prevState => ({
                ...prevState,
                isMobile: false,
                drawerOpened: true
            }))
        }
    }, [matches])

    const toggleDrawer = () => {
        const { isMobile, drawerOpened } = drawerState
        if (isMobile) {
            setDrawerState(prevState => ({ ...prevState, drawerOpened: !drawerOpened }))
        }
    }

    const showModal = () => {
        setDrawerState(prevState => ({
            ...prevState,
            modalOpened: true
        }))
    }

    const closeModal = () => {
        setDrawerState(prevState => ({
            ...prevState,
            modalOpened: false
        }))
    }

    return (
        <LayoutContext.Provider value={{ toggleDrawer, showModal, closeModal, ...drawerState }}>
            {children}
        </LayoutContext.Provider>
    )
}

export function useLayout() {
    const context = useContext(LayoutContext)
    return context
}
