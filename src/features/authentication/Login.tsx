import React from "react";
//libraries
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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
import { TextField } from "formik-mui";

//business logic
import { useLoginMutation } from "app/services/authentication";
import type { LoginRequest } from "app/services/authentication";
import getErrorMessage from "app/utils/apiErrorHandler";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setCredentials, signed } = useAuth();

  const dispatch = useAppDispatch();
  const [login, { isLoading, error, isError }] = useLoginMutation();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const { data: account } = await login(data).unwrap();
      dispatch(setCredentials(account));
      navigate("/zeno");
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box maxWidth={320}>
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
                    label="Senha"
                    name="password"
                    fullWidth
                    sx={{mt: 3}}
                  />

                  <FormButtonsContainer>
                    <LoginButton
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
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
                </Box>
              </Form>
            )}
          </Formik>

          <Copyright color="primary">
            © 2019-{new Date().getFullYear()}{" "}
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="https://www.google.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mindcloud
            </a>{" "}
            - Todos os direitos reservados.
          </Copyright>

          <Loading open={isLoading} />
        </FormContainer>
      </PageGrid>
    );
  }
};

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
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

const Copyright = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginTop: theme.spacing(4),
  whiteSpace: "nowrap",
  fontSize: 14,
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    bottom: theme.spacing(2),
    fontSize: 16,
  },
}));

export default Login;
