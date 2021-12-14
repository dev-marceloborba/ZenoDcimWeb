import React from 'react'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Table from 'app/hooks/useTable'

const AlarmList: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <Toolbar />
            <Table columns={[
                { name: 'name', label: 'Nome', align: 'left' },
                { name: 'dateIn', label: 'Data de entrada', align: 'right' },
                { name: 'dateOut', label: 'Data de saída', align: 'right' },
                { name: 'dateOut', label: 'Data de saída', align: 'right' },
                { name: 'acked', label: 'Reconhecido', align: 'right' },
                { name: 'priority', label: 'Prioridade', align: 'right' },
            ]} rows={[]} />
        </Container>
    )
}

export default AlarmList