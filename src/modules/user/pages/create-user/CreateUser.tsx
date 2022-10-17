import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import { useToast } from "modules/shared/components/ToastProvider";
import { useCreateUserMutation } from "modules/user/services/authentication-service";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, ref, string } from "yup";
import getErrorMessage from "app/utils/apiErrorHandler";
import Card from "modules/shared/components/Card";
import Loading from "modules/shared/components/Loading";
import { UserViewModel } from "modules/user/models/user-model";
import { useFindAllCompaniesQuery } from "modules/user/services/company-service";
import { useFindAllGroupsQuery } from "modules/user/services/groups.service";
import SubmitButton from "modules/shared/components/SubmitButton";

const CreateUser: React.FC = () => {
  const methods = useForm<UserViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const { data: companyList } = useFindAllCompaniesQuery();
  const { data: groups } = useFindAllGroupsQuery();
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<UserViewModel> = async (data) => {
    try {
      await createUser(data).unwrap();
      toast
        .open({ message: "Usuário criado com sucesso" })
        .then(() => navigate(-1));
    } catch (err) {
      toast.open({
        message: `Erro ao criar o usuário: ${err}`,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    function errorHandler() {
      if (isError) {
        const message = getErrorMessage(error);
        toast.open({ message });
      }
    }
    errorHandler();
  }, [error, isError, toast]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        companyId: "",
        email: "",
        groupId: "",
        password: "",
        passwordConfirmation: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

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
            <SubmitButton disabled={!isValid} sx={{ mt: 2 }} />
          </FormProvider>
        </Form>
      </Card>
      <Loading open={isLoading} />
    </Container>
  );
};

const validationSchema: SchemaOf<UserViewModel> = object().shape({
  firstName: string().required("Nome é obrigatorio"),
  lastName: string().required("Sobrenome é obrigatorio"),
  email: string().email("E-mail inválido").required("E-mail é obrigatorio"),
  password: string()
    .min(5, "Senha deve ter ao menos 5 caracteres")
    .required("Senha é obrigatória"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  groupId: string().required("Grupo é obrigatório"),
  companyId: string().required("Empresa é obrigatória"),
});

export default CreateUser;
