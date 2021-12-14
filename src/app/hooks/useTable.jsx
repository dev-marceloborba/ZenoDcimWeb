import React from 'react'

import TableContainer from '@mui/material/TableContainer'
import MuiTable from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

const Table = ({ rows, columns }) => {
    const fields = columns.map((column) => column.name)

    return (
        <TableContainer>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => (
                                <TableCell key={column.label} align={column.align} >{column.label}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows?.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    {
                                        fields.map((field, index) => {
                                            if (index === 0) {
                                                return (
                                                    <TableCell key={`${field}-${row[field]}`} component="th" scope="row">
                                                        {row[field]}
                                                    </TableCell>)
                                            } else {
                                                return (
                                                    <TableCell key={`${field}-${row[field]}`} align="right">
                                                        {row[field]}
                                                    </TableCell>)
                                            }
                                        })
                                    }
                                </TableRow>)
                        })
                    }
                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}

export default Table
