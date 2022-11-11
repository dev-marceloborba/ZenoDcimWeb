//libraries
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";

//hooks
import { useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { useAuth } from "app/hooks/useAuth";

//components
import { styled } from "@mui/material/styles";
import { useToast } from "modules/shared/components/ToastProvider";
import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import Copyright from "modules/shared/components/Copyright";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Fade from "@mui/material/Fade";
import Form from "modules/shared/components/Form";
import Grid, { GridProps } from "@mui/material/Grid";
import Loading from "modules/shared/components/Loading";
import Logo from "app/assets/logo-horizontal-white.svg";
import Typography, { TypographyProps } from "@mui/material/Typography";

//business logic
import { useLoginMutation } from "modules/user/services/authentication-service";
import type { LoginViewModel } from "modules/user/models/user-model";
import getErrorMessage from "app/utils/apiErrorHandler";
import { HomePath } from "modules/paths";

const UserLogin: React.FC = () => {
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const methods = useForm<LoginViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const { setCredentials, signed } = useAuth();

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<LoginViewModel> = async (data) => {
    try {
      const { data: account } = await login(data).unwrap();
      if (data) {
        dispatch(setCredentials(account));
        navigate(`/${HomePath}`);
      } else {
        toast.open({
          message: "Erro ao realizar login: Servidor offline",
          severity: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (signed) {
    return <Navigate to={`/${HomePath}`} />;
  } else {
    return (
      <PageGrid container>
        <ImageContainer>
          <PageLogo src={Logo} />
          <LogoTitle>Zeno DCIM</LogoTitle>
        </ImageContainer>
        <FormContainer>
          <FormTitle variant="h1">Bem vindo!</FormTitle>
          <Form onSubmit={handleSubmit(onSubmit)} maxWidth={320}>
            <FormProvider {...methods}>
              <ControlledTextInput name="email" label="E-mail" />
              <ControlledTextInput
                name="password"
                label="Senha"
                type="password"
                sx={{ mt: 2 }}
              />
              <FormButtonsContainer>
                <LoginButton
                  disabled={!isValid}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Login
                </LoginButton>
                <Button type="button" variant="text">
                  Esqueceu sua senha?
                </Button>
              </FormButtonsContainer>
              <Fade in={isError}>
                <Typography
                  color="secondary"
                  sx={{ textAlign: "center", mt: 2 }}
                >
                  Erro ao realizar login: {getErrorMessage(error)}
                </Typography>
              </Fade>
            </FormProvider>
          </Form>
          <Copyright />
          <Loading open={isLoading} />
        </FormContainer>
      </PageGrid>
    );
  }
};

const validationSchema: SchemaOf<LoginViewModel> = object().shape({
  email: string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: string().required("Senha é obrigatória"),
});

// styled-components
const PageGrid = styled(Grid)<GridProps>(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
}));

const ImageContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: "60%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "50%",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const PageLogo = styled("img")<BoxProps>(({ theme }) => ({
  width: 165,
  marginBottom: theme.spacing(4),
}));

const LogoTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: "white",
  fontWeight: 500,
  fontSize: 84,
  [theme.breakpoints.down("md")]: {
    fontSize: 48,
  },
}));

const FormContainer = styled("div")(({ theme }) => ({
  width: "40%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "50%",
  },
}));

const FormTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 500,
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

const FormButtonsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const LoginButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: "16px 20px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom: theme.spacing(4),
  },
}));

export default UserLogin;
