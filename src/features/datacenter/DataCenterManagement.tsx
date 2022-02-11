import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Typography from "@mui/material/Typography";
import Form from "app/components/Form";
import ControlledTextInput from "app/components/ControlledTextInput";
import SubmitButton from "app/components/SubmitButton";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Center from "app/components/Center";

const DataCenterManagement: React.FC = () => {
  // const ref1 = React.useRef<HTMLDivElement>(null);
  return (
    <HeroContainer>
      <PageTitle>Gerenciamento do Data Center</PageTitle>

      <CustomCard sx={{mt: 2}}>
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
              }}
            >
              <Typography variant="h5">Novo prédio</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <Form
              sx={{
                "& .MuiTextField-root": {
                  marginTop: 2,
                },
              }}
            >
              <TextField fullWidth name="campus" label="Campus" />
              <TextField fullWidth name="name" label="Nome do prédio" />
              <Button variant="text">Incluir andar</Button>
              <SubmitButton label="Salvar" />
            </Form>
          </Grid>
        </Grid>
      </CustomCard>

      <CustomCard sx={{ mt: 4 }}>
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
              }}
            >
              <Typography variant="h5">Novo andar</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <Form
              sx={{
                "& .MuiTextField-root": {
                  marginTop: 2,
                },
              }}
            >
              <TextField fullWidth name="campus" label="Prédio" />
              <TextField fullWidth name="name" label="Nome do andar" />
              <Button variant="text">Incluir sala</Button>
              <SubmitButton label="Salvar" />
            </Form>
          </Grid>
        </Grid>
      </CustomCard>

      <CustomCard sx={{ mt: 4 }}>
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
              }}
            >
              <Typography variant="h5">Nova sala</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <Form
              sx={{
                "& .MuiTextField-root": {
                  marginTop: 2,
                },
              }}
            >
              <TextField fullWidth name="campus" label="Andar" />
              <TextField fullWidth name="name" label="Nome da sala" />
              <Button variant="text">Incluir equipamento</Button>
              <SubmitButton label="Salvar" />
            </Form>
          </Grid>
        </Grid>
      </CustomCard>


      <CustomCard sx={{ mt: 4 }}>
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
              }}
            >
              <Typography variant="h5">Novo equipamento</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <Form
              sx={{
                "& .MuiTextField-root": {
                  marginTop: 2,
                },
              }}
            >
              <TextField fullWidth name="campus" label="Andar" />
              <TextField fullWidth name="name" label="Nome da sala" />
              <Button variant="text">Incluir equipamento</Button>
              <SubmitButton label="Salvar" />
            </Form>
          </Grid>
        </Grid>
      </CustomCard>
    </HeroContainer>
  );
};

export default DataCenterManagement;

const CustomCard = styled(Card)({
  padding: "16px 24px",
});
