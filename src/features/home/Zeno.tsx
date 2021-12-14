import React from 'react'
import Box from '@mui/material/Box'

import withAuthentication from 'app/hocs/withAuthentication'
import Header from 'app/components/Header'
import Sidenav from 'app/components/Sidenav'
import { LayoutProvider } from 'app/hooks/useLayout'

import { SubRoutes } from 'features/routes/Router'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useSubscription } from 'mqtt-react-hooks'

const Zeno: React.FC = () => {

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))
    const { message } = useSubscription("topic")

    console.log(message?.message)

    return (
        <LayoutProvider>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'hidden'
                }}
            >
                <Header />
                <Sidenav />
                <Box
                    component="div"
                    sx={{
                        mt: '4rem',
                        ml: matches ? '220px' : '0px'
                    }}
                >
                    <div>
                        <h3>{message?.message}</h3>
                    </div>
                    <SubRoutes />
                </Box>
            </Box>
        </LayoutProvider>

    )
}

export default withAuthentication(Zeno)
