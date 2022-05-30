import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export type RackTopViewProps = {
    name: string
    temperature: number
    showTermal?: boolean
}

const RackTopView: React.FC<RackTopViewProps> = ({ name, temperature, showTermal = true }) => {

    // range: 20graus : 50 graus
    const normalizedTemperature = 20 * (1 - (temperature - 20) / 30) + 200 * (1 - (50 - temperature) / 30)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: showTermal ? `hsl(${normalizedTemperature}, 100%, 50%)` : 'rgba(59,130,146)',
            width: '5rem',
            height: '5rem',
            p: 1,
            my: 1
        }}>
            <Typography
                component={RouterLink}
                to={"/zeno/racks/details"}
                sx={{
                    textDecoration: 'none',
                    color: (theme) => theme.palette.text.primary
                }}
            >
                {name}
            </Typography>
        </Box>
    )
}

export default RackTopView