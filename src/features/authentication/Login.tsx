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
import Button, { ButtonProps } from "@mui/material/Button";
import Box, { BoxProps } from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid, { GridProps } from "@mui/material/Grid";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Loading from "app/components/Loading";
import Logo from "app/assets/logo-horizontal-white.svg";

//business logic
import { useLoginMutation } from "app/services/authentication";
import type { LoginRequest } from "app/models/authentication.model";
import getErrorMessage from "app/utils/apiErrorHandler";
import ControlledTextInput from "app/components/ControlledTextInput";
import Form from "app/components/Form";
import { useToast } from "app/components/Toast";
import Copyright from "app/components/Copyright";

const Login: React.FC = () => {
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const methods = useForm<LoginRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { setCredentials, signed } = useAuth();

  const dispatch = useAppDispatch();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const { data: account } = await login(data).unwrap();
      if (data) {
        dispatch(setCredentials(account));
        navigate("/zeno");
      } else {
        toast.open("Erro ao realizar login: Servidor offline", 2000, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (signed) {
    return <Navigate to="/zeno" />;
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
                <LoginButton type="submit" variant="contained" size="large">
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

const validationSchema: SchemaOf<LoginRequest> = object().shape({
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

export default Login;
