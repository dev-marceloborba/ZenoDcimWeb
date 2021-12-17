import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {
  EUserRole,
  useCreateUserMutation,
  UserRequest,
} from "app/services/authentication";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { useToast } from "app/components/Toast";

import getErrorMessage from "app/utils/apiErrorHandler";
import { useListCompaniesQuery } from "app/services/company";

const CreateUser: React.FC = () => {
  const { data: companyList } = useListCompaniesQuery();
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const { open } = useToast();

  useEffect(() => {
    function errorHandler() {
      if (isError) {
        const message = getErrorMessage(error);
        open(message, 3000);
      }
    }
    errorHandler();
  }, [error, open, isError]);

  const onSubmit = async (data: UserRequest) => {
    try {
      await createUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Criar usuário</Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ maxWidth: "480px" }}>
              <Field
                component={TextField}
                name="companyId"
                label="Empresa"
                fullWidth
                select
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {companyList?.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.companyName}
                  </MenuItem>
                ))}
              </Field>
              <Field
                component={TextField}
                type="text"
                name="firstName"
                label="Nome"
                fullWidth
              />
              <Field
                component={TextField}
                type="text"
                name="lastName"
                label="Sobrenome"
                fullWidth
              />
              <Field
                component={TextField}
                type="email"
                name="email"
                label="E-mail"
                fullWidth
              />
              <Field
                component={TextField}
                type="password"
                name="password"
                label="Senha"
                fullWidth
              />
              <Field
                component={TextField}
                type="password"
                name="passwordConfirmation"
                label="Confirmação de senha"
                fullWidth
              />
              <Field
                component={TextField}
                name="role"
                label="Grupo"
                fullWidth
                select
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {items.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.description}
                  </MenuItem>
                ))}
              </Field>
              <Button
                sx={{ mt: 2 }}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
              >
                Criar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  role: EUserRole.ADMIN,
  companyId: ""
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
  companyId: Yup.string().required("Empresa é obrigatória")
});

export default CreateUser;
