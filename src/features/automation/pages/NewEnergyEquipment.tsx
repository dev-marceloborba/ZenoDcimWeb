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
import {
  FloorResponse,
  RoomResponse,
  EquipmentParameterRequest,
  EquipmentRequest,
} from "app/models/data-center.model";
import {
  useCreateEquipmentParameterMutation,
  useFindEquipmentByIdMutation,
  useListBuildingsQuery,
} from "app/services/datacenter";

const NewEnergyEquipment: React.FC = () => {
  const toast = useToast();
  const params = useParams();
  const navigate = useNavigate();
  const [findEquipmentByid, { data: equipment }] =
    useFindEquipmentByIdMutation();
  const [createEquipmentParameter] = useCreateEquipmentParameterMutation();

  const { data: buildings } = useListBuildingsQuery();
  const [floors, setFloors] = useState<FloorResponse[]>([]);
  const [rooms, setRooms] = useState<RoomResponse[]>([]);

  const [tabIndex, setTabIndex] = useState(0);
  const [parameterModalOpen, setParameterModalOpen] = useState(false);
  const [connectionModalOpen, setConnectionModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEquipmentData() {
      if (params.id) {
        await findEquipmentByid(params.id).unwrap();
      }
    }
    fetchEquipmentData();
  }, [findEquipmentByid, params]);

  const methods = useForm<EquipmentRequest>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, watch } = methods;

  const onSubmit: SubmitHandler<EquipmentRequest> = async (data) => {
    console.log("data", data);
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

  const buildingId = watch("buildingId");
  const floorId = watch("floorId");
  const roomId = watch("roomId");
  const equipmentId = params.id ?? "";

  useEffect(() => {
    const filteredBuilding = buildings?.find(
      (building) => building.id === buildingId
    );
    setFloors(filteredBuilding?.floors ?? []);
  }, [buildingId, buildings]);

  useEffect(() => {
    const filteredFloors = floors?.find((floor) => floor.id === floorId);
    setRooms(filteredFloors?.rooms ?? []);
  }, [floorId, floors]);

  const handleSaveParameter = async (parameter: EquipmentParameterRequest) => {
    handleCloseParameterModal();
    try {
      const result = await createEquipmentParameter(parameter).unwrap();
      console.log(result);
      toast.open("Parametro salvo com sucesso", 2000, "success");
    } catch (error) {
      toast.open(
        `Erro ao criar parâmetro: ${parameter.name}: ${error}`,
        2000,
        "error"
      );
    }
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
                    <ControlledTextInput
                      name="floor"
                      label="Andar"
                      forceSelect
                      items={floors?.map((floor) => ({
                        description: floor.name,
                        value: floor.id,
                      }))}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <ControlledTextInput
                      name="building"
                      label="Prédio"
                      items={buildings?.map((building) => ({
                        description: building.name,
                        value: building.id,
                      }))}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <ControlledTextInput
                      name="room"
                      label="Sala"
                      forceSelect
                      items={rooms?.map((room) => ({
                        description: room.name,
                        value: room.id,
                      }))}
                    />
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
          requestParameters={{ buildingId, floorId, roomId, equipmentId }}
        />
      </Modal>
      <Modal open={connectionModalOpen} onClose={handleCloseConnectionModal}>
        <ConnectionModal />
      </Modal>
    </HeroContainer>
  );
};

export default NewEnergyEquipment;

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
    label: "Fonte de dados",
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

const validationSchema = object().shape({
  name: string().required("Nomenclatura é obrigatório"),
  campus: string().required("Campus é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
  building: string().required("Prédio é obrigatório"),
  room: string().required("Sala é obrigatória"),
});
