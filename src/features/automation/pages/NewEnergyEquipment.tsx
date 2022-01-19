import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import ControlledTextInput from "app/components/ControlledTextInput";
import { EnergyEquipmentRequest } from "app/services/automation-register";
import PageTitle from "app/components/PageTitle";
import Table from "app/hooks/useTable";
import { automationParameters } from "app/data/automation-parameters";

const NewEnergyEquipment: React.FC = () => {
  const columns = [
    {
      name: "parameter",
      label: "Parâmetro",
      align: "left",
    },
    {
      name: "unit",
      label: "Unidade",
      align: "right",
    },
    {
        name: "controller",
        label: "Controlador",
        align: "right",
      },
      {
        name: "address",
        label: "Endereço",
        align: "right",
      },
      {
        name: "minLimit",
        label: "Limit min",
        align: "right",
      },
      {
        name: "maxLimit",
        label: "Limite max",
        align: "right",
      },
      {
        name: "scale",
        label: "Escala",
        align: "right",
      },
      {
        name: "rules",
        label: "Regras",
        align: "right",
      },
  ];

  const methods = useForm<EnergyEquipmentRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EnergyEquipmentRequest> = async (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Cadastros de automação</PageTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h4">Dados do equipamento</Typography>
              <ControlledTextInput name="name" label="Nomenclatura" />
            </Grid>

            <Grid item md={6}>
              <Typography variant="h4">Local</Typography>
              <ControlledTextInput name="campus" label="Campus" />
              <ControlledTextInput name="floor" label="Andar" />
              <ControlledTextInput name="building" label="Prédio" />
              <ControlledTextInput name="room" label="Sala" />
            </Grid>
          </Grid>
        </FormProvider>
        <Button type="submit" variant="contained">
          Salvar
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">Parâmetros</Typography>
        <Table columns={columns} rows={automationParameters} />
      </Box>
    </Container>
  );
};

export default NewEnergyEquipment;

const validationSchema: SchemaOf<EnergyEquipmentRequest> = object().shape({
  name: string().required("Nomenclatura é obrigatório"),
  campus: string().required("Campus é obrigatório"),
  floor: string().required("Andar é obrigatório"),
  building: string().required("Prédio é obrigatório"),
  room: string().required("Andar é obrigatório"),
});
