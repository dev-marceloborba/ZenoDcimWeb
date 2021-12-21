import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextInput from 'app/components/TextInput'
import { ModbusTagRequest, useAddModbusTagMutation } from 'app/services/automation'

const NewModbusTag: React.FC = () => {
    const { handleSubmit } = useForm<ModbusTagRequest>()
    const [addModbusTag, { isLoading, isError }] = useAddModbusTagMutation()

    const onSubmit: SubmitHandler<ModbusTagRequest> = async data => {
        try {
            const result = await addModbusTag(data).unwrap()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth="xs">
            <Typography variant="h5">
                Criar Tag Modbus
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '640px' }}>
                <TextInput name="modbusDevice" label="Dispositivo Modbus" helperText="Dispositivo Modbus é obrigatório" />
                <TextInput name="name" label="Nome" helperText="Nome é obrigatório" />
                <TextInput name="dataType" label="Tipo de dado" helperText="Tipo de dado é obrigatório" />
                <TextInput name="address" label="Endereço" helperText="Endereço é obrigatório" />
                <TextInput name="size" label="Tamanho" helperText="Tamanho é obrigatório" />
                <TextInput name="deadband" label="Banda morta" helperText="Banda morta é obrigatório" />
                <Button sx={{ mt: 2 }} fullWidth type="submit" color="primary" variant="contained">Criar</Button>
            </Box>
        </Container>
    )
}

export default NewModbusTag