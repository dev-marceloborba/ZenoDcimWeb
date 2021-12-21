import React from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextInput from "app/components/TextInput";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  EditUserRequest,
  useEditUserMutation,
} from "app/services/authentication";

const EditUser: React.FC = () => {
  const [editUser, { isError, isLoading, error }] = useEditUserMutation();
  const [searchParams] = useSearchParams();
  const { handleSubmit, control } = useForm<EditUserRequest>({
    defaultValues: {
      firstName: searchParams.get("firstName") ?? "",
      lastName: searchParams.get("lastName") ?? "",
      email: searchParams.get("email") ?? "",
      active: true,
      role: 1,
    },
  });

  const onSubmit: SubmitHandler<EditUserRequest> = async (data) => {
    data.id = searchParams.get("id") ?? "";
    console.log(data);
    try {
      const result = await editUser(data).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    // const result = await http.post('v1/users', data)
    // console.log(result)
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Editar usuário</Typography>

      <Box
        component="form"
        sx={{ maxWidth: "480px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="firstName"
          //   defaultValue={""}
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextInput
              {...field}
              label="Nome"
              helperText={errors.firstName?.message}
            />
          )}
        />

        <Controller
          name="lastName"
          //   defaultValue={""}
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextInput
              {...field}
              label="Sobrenome"
              helperText={errors.lastName?.message}
            />
          )}
        />

        <Controller
          name="email"
          // defaultValue={""}
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextInput
              {...field}
              label="E-mail"
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="active"
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextInput
              {...field}
              sx={{ mt: 1 }}
              label="Status"
              helperText={errors.active?.message}
              items={[
                { value: 0, description: "Inativo" },
                { value: 1, description: "Ativo" },
              ]}
            />
          )}
        />

        <Controller 
            name="role"
            control={control}
            render={({ field, formState: { errors } }) => (
                <TextInput
                sx={{ mt: 1 }}
                label="Grupo"
                helperText={errors.role?.message}
                items={[
                  { value: 1, description: "Administrador" },
                  { value: 2, description: "Operador" },
                  { value: 3, description: "Técnico" },
                  { value: 4, description: "Visualizador" },
                  { value: 5, description: "Cliente" },
                ]}
              />
            )}
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
  );
};

export default EditUser;
