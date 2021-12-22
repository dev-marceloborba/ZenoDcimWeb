import React from 'react'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useListCompaniesQuery } from 'app/services/company'
import Table from 'app/hooks/useTable'

const CompanyList: React.FC = () => {

    const { data, isError, isLoading, error } = useListCompaniesQuery()

    return (
        <Container maxWidth="xl">
            <Toolbar />
            <Table columns={[
                { name: 'companyName', label: "Razão social", align: 'left' },
                { name: 'tradingName', label: "Nome fantasia", align: 'right' },
                { name: 'registrationNumber', label: "CNPJ", align: 'right' },
            ]} rows={data} />
        </Container>
    )
}

export default CompanyList
