import React from "react";
import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useEditUserMutation } from "app/services/authentication";
import ControlledTextInput from "app/components/ControlledTextInput";
import Form from "app/components/Form";
import Card from "app/components/Card";
import Loading from "app/components/Loading";
import { useToast } from "app/components/Toast";
import { EditUserRequest } from "app/models/authentication.model";

const EditUser: React.FC = () => {
  const [editUser, { isError, isLoading, error }] = useEditUserMutation();
  const [searchParams] = useSearchParams();
  const toast = useToast();
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
      await editUser(data).unwrap();
      toast.open("Usuário editado com sucesso", 2000, "success");
    } catch (error) {
      toast.open(`Erro ao editar o usuário: ${error}`, 2000, "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <Typography variant="h5">Editar usuário</Typography>
        <Form
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
        </Form>
      </Card>
      <Loading open={isLoading} />
    </Container>
  );
};

export default EditUser;
