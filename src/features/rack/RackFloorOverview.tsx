import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import RackTopView, { RackTopViewProps } from 'app/components/RackTopView'
import RackOverviewToolbar from 'app/components/RackOverviewToolbar'
import Breadcrumbs from 'app/components/Breadcrumbs'

const RackFloorOverview: React.FC = () => {

    const evenRacks = Array.from([2, 4, 6, 8, 10]).map<RackTopViewProps>(x => ({ name: 'Rack ' + x, temperature: 20 }))
    const oddRacks = Array.from([1, 3, 5, 7, 9]).map<RackTopViewProps>(x => ({ name: 'Rack ' + x, temperature: 50 }))

    return (
        <Container maxWidth="xl">
            <RackOverviewToolbar />
            <Breadcrumbs />
            <Box sx={{
                display: 'flex',
            }}>
                <Box>
                    {
                        oddRacks.map((rack, index) => (
                            <RackTopView key={index} {...rack} />
                        ))
                    }


                </Box>

                <Box ml={1}>
                    {
                        evenRacks.map((rack, index) => (
                            <RackTopView key={index} {...rack} />
                        ))
                    }
                </Box>
            </Box>



        </Container>
    )
}

export default RackFloorOverview