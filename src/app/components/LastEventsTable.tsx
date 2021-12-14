import React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

type Event = {
    message: string
    date: string
}

export type LastEventsTableProps = {
    events: Event[]
}

const LastEventsTable: React.FC<LastEventsTableProps> = ({ events }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mensagem</TableCell>
                        <TableCell>Data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        events.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell >{row.message}</TableCell>
                                <TableCell >{row.date}</TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    )
}

export default LastEventsTable