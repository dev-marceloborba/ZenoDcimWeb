import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useFindUserByIdMutation,
} from "app/services/authentication";
import ControlledTextInput from "app/components/ControlledTextInput";
import Form from "app/components/Form";
import Card from "app/components/Card";
import Loading from "app/components/Loading";
import { useToast } from "app/components/Toast";
import { EditUserRequest } from "app/models/authentication.model";
import SubmitButton from "app/components/SubmitButton";
import DeleteButton from "app/components/DeleteButton";
import Row from "app/components/Row";

const UserDetails: React.FC = () => {
  const [editUser, { isError, isLoading, error }] = useEditUserMutation();
  const [findUserById] = useFindUserByIdMutation();
  const [deleteUser] = useDeleteUserMutation();
  const toast = useToast();
  const methods = useForm<EditUserRequest>();
  const { id } = useParams();

  const { handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<EditUserRequest> = async (data) => {
    try {
      await editUser(data).unwrap();
      toast.open("Usuário editado com sucesso", 2000, "success");
    } catch (error) {
      toast.open(`Erro ao editar o usuário: ${error}`, 2000, "error");
    }
  };

  const onDelete = async () => {
    try {
      await deleteUser(id!).unwrap();
      toast.open("Usuário deletado com sucesso", 2000, "success");
    } catch (error) {
      toast.open(`Erro ao deletar o usuário: ${error}`, 2000, "error");
    }
  };

  useEffect(() => {
    async function getUser() {
      const user = await findUserById(id!).unwrap();
      setValue("id", user.id);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("active", Number(user.active));
      setValue("role", user.role);
    }
    if (id) getUser();
  }, [findUserById, id, setValue]);

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
            <Row sx={{ justifyContent: "space-between", mt: 2 }}>
              <SubmitButton label="Salvar" />
              <DeleteButton onDeleteConfirmation={onDelete} />
            </Row>
          </FormProvider>
        </Form>
      </Card>
      <Loading open={isLoading} />
    </Container>
  );
};

export default UserDetails;
