import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import TextInput from 'app/components/TextInput'
import { RackRequest, useCreateRackMutation } from 'app/services/rack'

const CreateRack: React.FC = () => {
    const { handleSubmit } = useForm<RackRequest>()
    const [addRack, { isLoading, isError, error }] = useCreateRackMutation()

    const onSubmit: SubmitHandler<RackRequest> = async (data) => {
        addRack(data)
    }

    return (
        <Container maxWidth="xl">
            <Toolbar />
            <Typography variant="h4">Criar novo rack</Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '640px' }}>
                <TextInput name="localization" label="Localização" errorMessage="Campo obrigatorio" />
                <TextInput name="size" label="Tamanho" errorMessage="Campo obrigatorio" />
                <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>Criar rack</Button>
            </Box>
        </Container>
    )
}

export default CreateRack
