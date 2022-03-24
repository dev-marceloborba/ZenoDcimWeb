import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Form from "app/components/Form";
import ControlledTextInput from "app/components/ControlledTextInput";
import { useToast } from "app/components/Toast";

import {
  useCreateUserMutation,
  UserRequest,
} from "app/services/authentication";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SchemaOf, object, ref, string, number } from "yup";

import getErrorMessage from "app/utils/apiErrorHandler";
import { useListCompaniesQuery } from "app/services/company";
import Card from "app/components/Card";
import Loading from "app/components/Loading";

const CreateUser: React.FC = () => {
  const methods = useForm<UserRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { data: companyList } = useListCompaniesQuery();
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const { open: openToast } = useToast();

  const { handleSubmit } = methods;

  useEffect(() => {
    function errorHandler() {
      if (isError) {
        const message = getErrorMessage(error);
        openToast(message, 3000, "error");
      }
    }
    errorHandler();
  }, [error, openToast, isError]);

  const onSubmit: SubmitHandler<UserRequest> = async (data) => {
    try {
      await createUser(data).unwrap();
      openToast("Usuário criado com sucesso", 2000, "success");
    } catch (err) {
      openToast(`Erro ao criar o usuário: ${err}`, 2000, "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <Typography variant="h5">Criar usuário</Typography>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            maxWidth: "480px",
            "& .MuiTextField-root": {
              mt: 2,
            },
          }}
        >
          <FormProvider {...methods}>
            <ControlledTextInput
              name="companyId"
              label="Empresa"
              items={companyList?.map((company) => ({
                value: company.id,
                description: company.tradingName,
              }))}
            />
            <ControlledTextInput name="firstName" label="Nome" />
            <ControlledTextInput name="lastName" label="Sobrenome" />
            <ControlledTextInput name="email" label="E-mail" />
            <ControlledTextInput
              name="password"
              label="Senha"
              type="password"
            />
            <ControlledTextInput
              name="passwordConfirmation"
              label="Confirmação de senha"
              type="password"
            />
            <ControlledTextInput name="role" label="Grupo" items={items} />
            <Button
              sx={{ mt: 2 }}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Criar
            </Button>
          </FormProvider>
        </Form>
      </Card>
      <Loading open={isLoading} />
    </Container>
  );
};

type RoleItem = {
  value: number;
  description: string;
};

const items: RoleItem[] = [
  { value: 1, description: "Administrador" },
  { value: 2, description: "Operador" },
  { value: 3, description: "Técnico" },
  { value: 4, description: "Visualizador" },
  { value: 5, description: "Cliente" },
];

const validationSchema: SchemaOf<UserRequest> = object().shape({
  firstName: string().required("Nome é obrigatorio"),
  lastName: string().required("Sobrenome é obrigatorio"),
  email: string().email("E-mail inválido").required("E-mail é obrigatorio"),
  password: string()
    .min(5, "Senha deve ter ao menos 5 caracteres")
    .required("Senha é obrigatória"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  role: number().required("Grupo é obrigatório"),
  companyId: string().required("Empresa é obrigatória"),
});

export default CreateUser;
