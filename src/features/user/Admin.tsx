import React from 'react'
import { useNavigate, Link as RouterLink, createSearchParams } from 'react-router-dom'
import ToolBar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import Loading from 'app/components/Loading'
import { EUserRole, useGetUsersQuery } from 'app/services/authentication'

const Admin: React.FC = () => {
    const { isLoading, isError, data, error } = useGetUsersQuery()
    const navigate = useNavigate()

    const handleEdit = (row: any) => (event: any) => {

        const params = {
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            active: row.active,
            role: row.role
        }

        navigate({
            pathname: '/zeno/admin/edit',
            search: `?${createSearchParams(params)}`
        })
    }

    const handleDelete = (row: any) => (event: any) => {
        console.log(row)
    }

    function getUserRoleDescription(role: EUserRole): string {
        switch (role) {
            case EUserRole.ADMIN:
                return 'Administrador'
            case EUserRole.EXTERNAL_CLIENT:
                return 'Cliente'
            case EUserRole.OPERATOR:
                return 'Operador'
            case EUserRole.TECHNICIAN:
                return 'Técnico'
            case EUserRole.VIEW_ONLY:
                return 'Visualizador'
            default:
                return 'Desconhecido'
        }
    }

    return (
        <Container maxWidth="xl">
            <ToolBar />
            <Box component="div" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={RouterLink} to="/zeno/admin/new" variant="contained">Criar usuário</Button>
            </Box>
            {/* <Loading open={state.loading} /> */}

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Grupo</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{getUserRoleDescription(row.role)}</TableCell>
                                    <TableCell align="right">{row.active ? 'Ativo' : 'Inativo'}</TableCell>
                                    <TableCell align="right">
                                        <Box component="div">
                                            <IconButton onClick={handleEdit(row)}>
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton onClick={handleDelete(row)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Admin
