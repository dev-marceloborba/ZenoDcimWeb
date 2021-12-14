import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextInput from 'app/components/TextInput'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EditUserRequest, useEditUserMutation } from 'app/services/authentication'

const EditUser: React.FC = () => {
    const [editUser, { isError, isLoading, error }] = useEditUserMutation()
    const [searchParams] = useSearchParams()
    const { handleSubmit, register, formState: { errors } } = useForm<EditUserRequest>({
        defaultValues: {
            firstName: searchParams.get('firstName') ?? '',
            lastName: searchParams.get('lastName') ?? '',
            email: searchParams.get('email') ?? '',
            active: true,
            role: 1
        }
    })

    const onSubmit: SubmitHandler<EditUserRequest> = async (data) => {
        data.id = searchParams.get('id') ?? ''
        console.log(data)
        try {
            const result = await editUser(data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
        // const result = await http.post('v1/users', data)
        // console.log(result)
    }

    return (
        <Container maxWidth="xs">
            <Typography variant="h5">
                Editar usuário
            </Typography>

            <Box component="form" sx={{ maxWidth: '480px' }} onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="firstName"
                    label="Nome"
                    errorMessage={errors.firstName?.message}
                    inputProps={register('firstName', {
                        required: 'Nome é obrigatório'
                    })}
                />
                <TextInput
                    name="lastName"
                    label="Sobrenome"
                    errorMessage={errors.lastName?.message}
                    inputProps={register('lastName', {
                        required: 'Sobrenome é obrigatório'
                    })}
                />
                <TextInput
                    name="email"
                    label="E-mail"
                    errorMessage={errors.email?.message}
                    inputProps={register('email', {
                        required: 'E-mail é obrigatório'
                    })}
                />

                <TextInput
                    sx={{ mt: 1 }}
                    name="active"
                    label="Status"
                    errorMessage={errors.active?.message}
                    items={
                        [
                            { value: 0, descripton: 'Inativo' },
                            { value: 1, descripton: 'Ativo' },
                        ]
                    }
                    inputProps={register('active', {
                        required: 'Status é obrigatório'
                    })}
                />

                <TextInput
                    sx={{ mt: 1 }}
                    name="role"
                    label="Grupo"
                    errorMessage={errors.role?.message}
                    items={
                        [
                            { value: 1, descripton: 'Administrador' },
                            { value: 2, descripton: 'Operador' },
                            { value: 3, descripton: 'Técnico' },
                            { value: 4, descripton: 'Visualizador' },
                            { value: 5, descripton: 'Cliente' }
                        ]
                    }
                    inputProps={register('role', {
                        required: 'Grupo é obrigatório'
                    })}
                />

                <Button
                    sx={{ mt: 2 }}
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Salvar
                </Button>
            </Box>

        </Container>
    )
}

export default EditUser
