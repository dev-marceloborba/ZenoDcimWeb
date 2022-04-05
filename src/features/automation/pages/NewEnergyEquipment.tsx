import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import ControlledTextInput from "app/components/ControlledTextInput";
import { EnergyEquipmentRequest } from "app/services/automation-register";
import PageTitle from "app/components/PageTitle";
import Table from "app/hooks/useTable";
// import { automationParameters } from "app/data/automation-parameters";
import EtcFilters from "../components/EtcFilters";

//icons
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import ParameterModal from "../components/ParameterModal";
import ConnectionModal from "../components/ConnectionModal";
import HeroContainer from "app/components/HeroContainer";
import TabPanel from "app/components/TabPanel";
import Row from "app/components/Row";
import Form from "app/components/Form";
import Column from "app/components/Column";
import { useToast } from "app/components/Toast";
import { useFindEquipmentByIdMutation } from "app/services/datacenter";

const NewEnergyEquipment: React.FC = () => {
  const toast = useToast();
  const params = useParams();
  const navigate = useNavigate();
  const [findEquipmentByid, { data: equipment }] =
    useFindEquipmentByIdMutation();
  const [tabIndex, setTabIndex] = useState(0);
  const [parameterModalOpen, setParameterModalOpen] = useState(false);
  const [connectionModalOpen, setConnectionModalOpen] = useState(false);
  const columns = [
    {
      name: "name",
      label: "Parâmetro",
      align: "left",
    },
    {
      name: "unit",
      label: "Unidade",
      align: "right",
    },
    {
      name: "dataSource",
      label: "Controlador",
      align: "right",
    },
    {
      name: "address",
      label: "Endereço",
      align: "right",
    },
    {
      name: "lowLimit",
      label: "Limit min",
      align: "right",
    },
    {
      name: "highLimit",
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

  useEffect(() => {
    async function fetchEquipmentData() {
      if (params.id) {
        await findEquipmentByid(params.id).unwrap();
      }
    }
    fetchEquipmentData();
  }, [findEquipmentByid, params]);

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

  const handleChangeTabIndex = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabIndex(newValue);
  };

  const handleSaveParameter = () => {
    handleCloseParameterModal();
    setTimeout(() => {
      toast.open("Parametro salvo com sucesso", 2000, "success");
    }, 500);
  };

  const handleSelectedEquipmentParameter = (parameter: any) => {
    const selectedParameter = equipment?.equipmentParameters?.find(
      (x) => x.name === parameter.name
    );
    navigate(`/zeno/automation/management/equipment/parameter/form`, {
      state: {
        parameterId: selectedParameter?.id,
      },
    });
  };

  return (
    <HeroContainer>
      <PageTitle>Cadastros de automação</PageTitle>
      <Row sx={{ justifyContent: "space-between", mb: 2, mt: 1 }}>
        <Typography variant="h5">Novo equipamento de energia</Typography>
        <EtcFilters />
      </Row>
      <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
        <Tab label="Novo equipamento" />
        <Tab label="Parâmetro" />
      </Tabs>
      <Divider sx={{ mb: 3 }} />
      <TabPanel value={tabIndex} index={0}>
        <Row sx={{ mb: 2 }}>
          <Button
            startIcon={<CallSplitIcon />}
            variant="text"
            onClick={handleOpenConnectionModal}
          >
            Nova conexão
          </Button>
        </Row>

        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Row
            sx={{
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
          </Row>
        </Form>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Row>
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

          <Button startIcon={<SmsFailedIcon />} variant="text">
            Nova regra
          </Button>
        </Row>

        <Column sx={{ mt: 2 }}>
          <Typography variant="h4">Parâmetros</Typography>
          <Table
            columns={columns}
            rows={equipment?.equipmentParameters}
            onRowClick={handleSelectedEquipmentParameter}
          />
        </Column>
      </TabPanel>
      <Modal open={parameterModalOpen} onClose={handleCloseParameterModal}>
        <ParameterModal
          closeModal={handleCloseParameterModal}
          onSaveData={handleSaveParameter}
        />
      </Modal>
      <Modal open={connectionModalOpen} onClose={handleCloseConnectionModal}>
        <ConnectionModal />
      </Modal>
    </HeroContainer>
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
