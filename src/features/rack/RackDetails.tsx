import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import DashboardCard from 'app/components/DashboardCard'
import Indicator, { IndicatorProps } from 'app/components/Indicator'
import DonutChart, { DonutChartProps } from 'app/components/DonutChart'

//icons
import TemperatureInIcon from '@mui/icons-material/Thermostat';
import TemperatureOutIcon from '@mui/icons-material/AcUnit';
import PowerIcon from '@mui/icons-material/Power';
import ClockIcon from '@mui/icons-material/AccessTime';

const RackDetails: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <Toolbar />

            <Grid container spacing={1}>
                <Grid item md={3} xs={12}>
                    <Indicator {...temperatureInIndicator} />
                </Grid>

                <Grid item md={3} xs={12}>
                    <Indicator {...temperatureOutIndicator} />
                </Grid>

                <Grid item md={3} xs={12}>
                    <Indicator {...powerConsumptionIndicator} />
                </Grid>

                <Grid item md={3} xs={12}>
                    <Indicator {...lastAccessIndicator} />
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item md={4} xs={12}>
                    <DashboardCard>
                        <DonutChart {...physicalOccupation} />
                    </DashboardCard>
                </Grid>

                <Grid item md={4} xs={12}>
                    <DashboardCard>
                        <DonutChart {...energyOccupation} />
                    </DashboardCard>
                </Grid>

                <Grid item md={4} xs={12}>
                    <DashboardCard>
                        <DonutChart {...energyOccupation} />
                    </DashboardCard>
                </Grid>
            </Grid>
        </Container>
    )
}

export default RackDetails

type RackMonitorData = {
    temperatureIn: number
    temperatureOut: number
    powerConsumption: number
    lastAccess: string
}

const rackData: RackMonitorData = {
    temperatureIn: 24.2,
    temperatureOut: 23.1,
    powerConsumption: 4133,
    lastAccess: "21/09/2021 14:33:04"
}

const temperatureInIndicator: IndicatorProps = {
    text: "Temperatura de entrada",
    value: rackData.temperatureIn + " °C",
    Icon: <TemperatureInIcon sx={{ fontSize: 48 }} />
}

const temperatureOutIndicator: IndicatorProps = {
    text: "Temperatura de saída",
    value: rackData.temperatureOut + " °C",
    Icon: <TemperatureOutIcon sx={{ fontSize: 48 }} />
}

const powerConsumptionIndicator: IndicatorProps = {
    text: "Consumo",
    value: rackData.powerConsumption + " W",
    Icon: <PowerIcon sx={{ fontSize: 48 }} />
}

const lastAccessIndicator: IndicatorProps = {
    text: "Último acesso",
    value: rackData.lastAccess,
    size: 'small',
    Icon: <ClockIcon sx={{ fontSize: 48 }} />
}

const physicalOccupation: DonutChartProps = {
    x: ["Servidor", "Switch", "Storage", "Livre"],
    y: [20, 5, 4, 16],
    // colors: ['#F44336', '#E91E63', '#9C27B0'],
}

const energyOccupation: DonutChartProps = {
    x: ["Em uso", "Disponível"],
    y: [60, 40],
    // colors: ['#F08080', '#90EE90']
}