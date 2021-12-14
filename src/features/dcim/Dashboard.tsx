import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Indicator, { IndicatorProps } from 'app/components/Indicator'
import DashboardCard from 'app/components/DashboardCard'
import LineChart, { LineCharProps } from 'app/components/Linechart'

import RackIcon from '@mui/icons-material/Storage'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SecurityIcon from '@mui/icons-material/VerifiedUser'
import LastEventsTable, { LastEventsTableProps } from 'app/components/LastEventsTable'
import BarChart from 'app/components/Barchart'

const Dashboard: React.FC = () => {

    const lineChartData: LineCharProps = {
        categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
        data: [18, 22, 15, 17, 24, 20, 19, 21]
    }

    const rackUsageIndicator: IndicatorProps = {
        text: 'Racks em uso',
        value: 2321,
        Icon: <RackIcon sx={{ fontSize: 48 }} />
    }

    const rackFreeIndicator: IndicatorProps = {
        text: 'Racks disponíveis',
        value: 132,
        Icon: <DashboardIcon sx={{ fontSize: 48 }} />
    }

    const rackTotalAccess: IndicatorProps = {
        text: 'Total de acessos',
        value: 431,
        Icon: <SecurityIcon sx={{ fontSize: 48 }} />
    }

    const accessEvents: LastEventsTableProps = {
        events: [
            {
                message: "Aberta porta do Rack AA-B1",
                date: "16/08/2020 15:44"
            },
            {
                message: "Aberta porta do Rack AA-B1",
                date: "16/08/2020 15:44"
            },
            {
                message: "Aberta porta do Rack AA-B1",
                date: "16/08/2020 15:44"
            },
            {
                message: "Aberta porta do Rack AA-B1",
                date: "16/08/2020 15:44"
            },
            {
                message: "Aberta porta do Rack AA-B1",
                date: "16/08/2020 15:44"
            },
        ]
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={1} mt={1} >
                <Grid item xl={4}>
                    <Indicator {...rackUsageIndicator} />
                </Grid>

                <Grid item xl={4}>
                    <Indicator {...rackFreeIndicator} />
                </Grid>

                <Grid item xl={4}>
                    <Indicator {...rackTotalAccess} />
                </Grid>
            </Grid>

            <Grid container spacing={1} mt={1} >

                <Grid item xl={4}>
                    <DashboardCard>
                        <LineChart {...lineChartData} />
                    </DashboardCard>
                </Grid>

                <Grid item xl={4}>
                    <DashboardCard>
                        <BarChart />
                    </DashboardCard>
                </Grid>

                <Grid item xl={4}>
                    <DashboardCard>
                        <LineChart {...lineChartData} />
                    </DashboardCard>
                </Grid>
            </Grid>

            <Grid container spacing={1} mt={1}>
                <Grid item xl={6}>
                    <DashboardCard>
                        <Typography>Ultimos acessos</Typography>
                        <LastEventsTable {...accessEvents} />
                    </DashboardCard>
                </Grid>
                <Grid item xl={6}>
                    <DashboardCard>
                        <LastEventsTable {...accessEvents} />
                    </DashboardCard>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard