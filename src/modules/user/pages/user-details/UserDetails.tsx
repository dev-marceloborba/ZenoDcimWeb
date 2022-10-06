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
import {
  getUserRoleInstance,
  getUserStatusInstance,
} from "modules/user/models/user-model";
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

  console.log(state);
  // console.log(user, mode);

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
      // await deleteUser(id!).unwrap();
      toast.open("Usuário deletado com sucesso", 2000, "success");
    } catch (error) {
      toast.open(`Erro ao deletar o usuário: ${error}`, 2000, "error");
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
              name="group"
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
