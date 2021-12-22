import React from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  EditUserRequest,
  useEditUserMutation,
} from "app/services/authentication";
import ControlledTextInput from "app/components/ControlledTextInput";

const EditUser: React.FC = () => {
  const [editUser, { isError, isLoading, error }] = useEditUserMutation();
  const [searchParams] = useSearchParams();
  const methods = useForm<EditUserRequest>({
    defaultValues: {
      firstName: searchParams.get("firstName") ?? "",
      lastName: searchParams.get("lastName") ?? "",
      email: searchParams.get("email") ?? "",
      active: 1,
      role: 1,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EditUserRequest> = async (data) => {
    data.id = searchParams.get("id") ?? "";
    console.log(data);
    try {
      const result = await editUser(data).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Editar usuário</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: "480px", "& .MuiTextField-root": { mt: 2 } }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="firstName" label="Nome" />

          <ControlledTextInput name="lastName" label="Sobrenome" />

          <ControlledTextInput name="email" label="E-mail" />

          <ControlledTextInput
            name="active"
            label="Status"
            items={[
              { value: 0, description: "Inativo" },
              { value: 1, description: "Ativo" },
            ]}
          />

          <ControlledTextInput
            name="role"
            label="Grupo"
            items={[
              { value: 1, description: "Administrador" },
              { value: 2, description: "Operador" },
              { value: 3, description: "Técnico" },
              { value: 4, description: "Visualizador" },
              { value: 5, description: "Cliente" },
            ]}
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
        </FormProvider>
      </Box>
    </Container>
  );
};

export default EditUser;
