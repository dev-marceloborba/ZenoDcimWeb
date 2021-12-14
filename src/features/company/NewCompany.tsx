import React from 'react'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useCreateCompanyMutation } from 'app/services/company'

const NewCompany: React.FC = () => {
    const [createCompany, { isLoading, isError, error }] = useCreateCompanyMutation()
    return (
        <Container maxWidth="xl">
            <Toolbar />
        </Container>
    )
}

export default NewCompany
