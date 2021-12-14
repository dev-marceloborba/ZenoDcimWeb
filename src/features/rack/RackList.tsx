import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Table from 'app/hooks/useTable'
import { useListRacksQuery } from 'app/services/rack'

const Racks: React.FC = () => {

    const { data, isError, isLoading, error } = useListRacksQuery()

    return (
        <Container maxWidth="xl">
            <Toolbar />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={RouterLink} to="/zeno/racks/new" variant="contained">Novo rack</Button>
            </Box>
            <Table columns={[
                { label: 'Localização', name: 'localization', align: 'left' },
                { label: 'Capacidade', name: 'size', align: 'right' },
                { label: 'Tipo equipamento', name: 'equipmentType', align: 'right' },
                { label: 'Equipamento', name: 'name', align: 'right' },
                { label: 'Modelo', name: 'model', align: 'right' },
                { label: 'Fabricante', name: 'manufactor', align: 'right' },
                { label: 'Número serial', name: 'serialNumber', align: 'right' },
                { label: 'Posição inicial', name: 'initialPosition', align: 'right' },
                { label: 'Posição final', name: 'finalPosition', align: 'right' }
            ]} rows={data ?? null} />
        </Container>
    )
}

export default Racks
