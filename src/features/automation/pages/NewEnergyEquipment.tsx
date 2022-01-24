import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
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
import EtcFilters from "../components/EtcFilters";

//icons
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import ParameterModal from "../components/ParameterModal";
import ConnectionModal from "../components/ConnectionModal";

const NewEnergyEquipment: React.FC = () => {
  const [parameterModalOpen, setParameterModalOpen] = React.useState(false);
  const [connectionModalOpen, setConnectionModalOpen] = React.useState(false);
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

  const handleOpenParameterModal = () => {
    setParameterModalOpen(true);
  };

  const handleCloseParameterModal = () => {
    setParameterModalOpen(false);
  };

  const handleOpenConnectionModal = () => {
    setConnectionModalOpen(true);
  };

  const handleCloseConnectionModal = () => {
    setConnectionModalOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Cadastros de automação</PageTitle>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, mt: 1 }}
      >
        <Typography variant="h5">Novo equipamento de energia</Typography>
        <EtcFilters />
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: "flex", mb: 2 }}>
        <Button
          startIcon={<ThermostatIcon />}
          variant="text"
          onClick={handleOpenParameterModal}
        >
          Novo parâmetro
        </Button>
        <Button startIcon={<SmsFailedIcon />} variant="text">
          Novo alarme
        </Button>
        <Button
          startIcon={<CallSplitIcon />}
          variant="text"
          onClick={handleOpenConnectionModal}
        >
          Nova conexão
        </Button>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Dados do equipamento
              </Typography>
              <ControlledTextInput
                sx={{ maxWidth: "320px" }}
                name="name"
                label="Nomenclatura"
              />
            </Grid>
            <Grid item md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Local
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <ControlledTextInput name="campus" label="Campus" />
                </Grid>
                <Grid item md={6}>
                  <ControlledTextInput name="floor" label="Andar" />
                </Grid>
                <Grid item md={6}>
                  <ControlledTextInput name="building" label="Prédio" />
                </Grid>
                <Grid item md={6}>
                  <ControlledTextInput name="room" label="Sala" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="medium"
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
          >
            Salvar
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">Parâmetros</Typography>
        <Table columns={columns} rows={automationParameters} />
      </Box>
      <Modal open={parameterModalOpen} onClose={handleCloseParameterModal}>
        <ParameterModal closeModal={handleCloseParameterModal} />
      </Modal>
      <Modal open={connectionModalOpen} onClose={handleCloseConnectionModal}>
        <ConnectionModal />
      </Modal>
    </Container>
  );
};

export default NewEnergyEquipment;

const validationSchema: SchemaOf<EnergyEquipmentRequest> = object().shape({
  name: string().required("Nomenclatura é obrigatório"),
  campus: string().required("Campus é obrigatório"),
  floor: string().required("Andar é obrigatório"),
  building: string().required("Prédio é obrigatório"),
  room: string().required("Sala é obrigatória"),
});
