import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import Card from "modules/shared/components/Card";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { EditUserRequest } from "app/models/authentication.model";
import SubmitButton from "modules/shared/components/SubmitButton";
import DeleteButton from "modules/shared/components/DeleteButton";
import Row from "modules/shared/components/Row";
import HeroContainer from "modules/shared/components/HeroContainer";
import useRouter from "modules/core/hooks/useRouter";
import {
  useDeleteUserMutation,
  useEditUserMutation,
} from "modules/user/services/authentication-service";
import { getUserStatusInstance } from "modules/user/models/user-model";
import { useFindAllGroupsQuery } from "modules/user/services/groups.service";

const UserDetails: React.FC = () => {
  const { data: groups } = useFindAllGroupsQuery();
  const [editUser, { isLoading }] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const {
    state: { user, mode },
  } = useRouter();
  const { state } = useRouter();
  const toast = useToast();
  const methods = useForm<EditUserRequest>();

  const { handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<EditUserRequest> = async (data) => {
    try {
      var mod = { ...data, active: Boolean(data.active) };
      await editUser(mod).unwrap();
      toast.open({ message: "Usuário editado com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: `Erro ao editar o usuário: ${error}`,
        severity: "error",
      });
    }
  };

  const onDelete = async () => {
    try {
      // await deleteUser(id!).unwrap();
      toast.open({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      toast.open({
        message: `Erro ao deletar o usuário: ${error}`,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    async function getUser() {
      setValue("id", user.id);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("active", getUserStatusInstance(user.active));
      setValue("groupId", user.group);
    }

    if (user) getUser();
  }, [setValue, user]);

  return (
    <HeroContainer maxWidth="md">
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
              name="groupId"
              label="Grupo"
              items={
                groups?.map((group) => ({
                  description: group.name,
                  value: group.id,
                })) ?? []
              }
            />
            <Row sx={{ justifyContent: "space-between", mt: 2 }}>
              <SubmitButton label="Salvar" />
              <DeleteButton onDeleteConfirmation={onDelete} />
            </Row>
          </FormProvider>
        </Form>
      </Card>
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default UserDetails;
