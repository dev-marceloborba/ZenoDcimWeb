import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import {
  useCreateUserMutation,
  UserRequest,
} from "app/services/authentication";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
import { useToast } from "app/components/Toast";

import getErrorMessage from "app/utils/apiErrorHandler";
import { useListCompaniesQuery } from "app/services/company";
import ControlledTextInput from "app/components/ControlledTextInput";

const CreateUser: React.FC = () => {
  const methods = useForm<UserRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { data: companyList } = useListCompaniesQuery();
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const { open } = useToast();

  const { handleSubmit } = methods

  useEffect(() => {
    function errorHandler() {
      if (isError) {
        const message = getErrorMessage(error);
        open(message, 3000);
      }
    }
    errorHandler();
  }, [error, open, isError]);


  const onSubmit: SubmitHandler<UserRequest> = async (data) => {
    try {
      await createUser(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Criar usuário</Typography>

      <Box
        sx={{ maxWidth: "480px" }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <ControlledTextInput
            name="companyId"
            label="Empresa"
            items={companyList?.map((company) => ({
              value: company.id,
              description: company.companyName,
            }))}
          />

          <ControlledTextInput
            name="firstName"
            label="Nome"
          />

          <ControlledTextInput
            name="lastName"
            label="Sobrenome"
          />

          <ControlledTextInput
            name="email"
            label="E-mail"
          />

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

          <ControlledTextInput
            name="role"
            label="Grupo"
            items={items}
          />

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
      </Box>
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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Nome é obrigatorio"),
  lastName: Yup.string().required("Sobrenome é obrigatorio"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatorio"),
  password: Yup.string()
    .min(5, "Senha deve ter ao menos 5 caracteres")
    .required("Senha é obrigatória"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  role: Yup.string().required("Grupo é obrigatório"),
  companyId: Yup.string().required("Empresa é obrigatória"),
});

export default CreateUser;
