import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextInput from 'app/components/TextInput'
import { PlcRequest, useAddPlcMutation } from 'app/services/automation'

const NewClp: React.FC = () => {
    const { handleSubmit } = useForm<PlcRequest>()
    const [mutation, { isLoading, isError }] = useAddPlcMutation()

    const onSubmit: SubmitHandler<PlcRequest> = async data => {
        try {
            const result = await mutation(data).unwrap()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth="xs">
            <Typography variant="h5">
                Criar PLC
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '640px' }}>
                <TextInput name="name" label="Nome" errorMessage="Nome é obrigatório" />
                <TextInput name="manufactor" label="Fabricante" errorMessage="Fabricante é obrigatório" />
                <TextInput name="ipAddress" label="Endereço IP" errorMessage="Endereço IP é obrigatório" />
                <TextInput name="tcpPort" label="Porta TCP/IP" errorMessage="Porta TCP/IP é obrigatório" />
                <TextInput name="scan" label="Varredura" errorMessage="Varredura é obrigatório" />
                <Button sx={{ mt: 2 }} fullWidth type="submit" color="primary" variant="contained">Criar</Button>
            </Box>
        </Container>
    )
}

export default NewClp