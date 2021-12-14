import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextInput from 'app/components/TextInput'
import { useCreateUserMutation, UserRequest } from 'app/services/authentication'


const CreateUser: React.FC = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<UserRequest>()
    const [createUser, { isLoading, isError, error }] = useCreateUserMutation()

    const onSubmit: SubmitHandler<UserRequest> = async (data) => {
        const result = await createUser(data)
        console.log(result)
    }

    return (
        <Container maxWidth="xs">
            <Typography variant="h5">
                Criar usuário
            </Typography>

            <Box component="form" sx={{ maxWidth: '480px' }} onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="firstName"
                    label="Nome"
                    autoFocus
                    errorMessage={errors.firstName?.message}
                    inputProps={register('firstName', {
                        required: "Nome é obrigatório"
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
                    name="password"
                    label="Senha"
                    obscureText
                    errorMessage={errors.password?.message}
                    inputProps={register('password', {
                        required: 'Senha é obrigatória'
                    })}
                />
                <TextInput
                    name="passwordConfirmation"
                    label="Confirmação de senha"
                    obscureText
                    errorMessage={errors.passwordConfirmation?.message}
                    inputProps={register('passwordConfirmation', {
                        required: 'Confirmação de senha é obrigatória'
                    })}
                />

                <TextInput
                    sx={{ mt: 1 }}
                    name="group"
                    label="Grupo"
                    errorMessage={errors.role?.message}
                    items={
                        [
                            { value: 1, descripton: 'Administrador' },
                            { value: 2, descripton: 'Operador' },
                            { value: 3, descripton: 'Técnico' },
                            { value: 4, descripton: 'Visualizador' },
                            { value: 5, descripton: 'Cliente' }
                        ]}
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
                    Criar
                </Button>
            </Box>
        </Container>
    )
}

export default CreateUser
