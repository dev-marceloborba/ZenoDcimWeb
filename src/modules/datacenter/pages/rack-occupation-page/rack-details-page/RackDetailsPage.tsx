import HeroContainer from "modules/shared/components/HeroContainer";
import Tabs from "modules/shared/components/tabs/Tabs";
import CardSection from "modules/shared/components/card-section/CardSectionv3";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useModal } from "mui-modal-provider";
import { useToast } from "modules/shared/components/ToastProvider";
import { useState } from "react";
import RackFormModal from "modules/datacenter/modals/rack-form-modal/RackFormModal";
import RackEquipmentFormModal from "modules/datacenter/modals/rack-equipment-form-modal/RackEquipmentFormModal";
import RackStatisticsCard from "./components/rack-statistics-card/RackStatisticsCard";

import IconButton from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ERackMount } from "modules/datacenter/models/rack.model";

export default function RackDetailsPage() {
  const { showModal } = useModal();
  const toast = useToast();

  const handleEditRack = () => {
    const modal = showModal(RackFormModal, {
      title: "Editar rack",
      onConfirm: (formData) => {
        console.log(formData);
        modal.hide();
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleInsertEquipment = () => {
    const modal = showModal(RackEquipmentFormModal, {
      title: "Inserir equipamento",
      onConfirm: (formData) => {
        modal.hide();
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <HeroContainer title="Rack 1020">
      <Tabs
        mode="horizontal"
        tabLabels={["Detalhes", "Ocupação"]}
        tabItems={[
          {
            element: <DetailsTab />,
            content: (
              <Button variant="contained" onClick={handleEditRack}>
                Editar rack
              </Button>
            ),
          },
          {
            element: <OccupationTab />,
            content: (
              <Button variant="contained" onClick={handleInsertEquipment}>
                Inserir equipamento
              </Button>
            ),
          },
        ]}
      />
    </HeroContainer>
  );
}

const DetailsTab: React.FC = () => {
  return (
    <>
      <CardSection
        title="Local"
        items={[
          {
            title: "Site",
            description: "Site 01",
          },
          {
            title: "Prédio",
            description: "Data Hall 01",
          },
          {
            title: "Andar",
            description: "Terreo",
          },
          {
            title: "Sala",
            description: "MDA A",
          },
        ]}
      />
      <CardSection
        title="Identidade"
        items={[
          {
            title: "Rack",
            description: "Rack 1020",
            defaultSize: 12,
          },
        ]}
        sx={{ my: 1 }}
      />

      <CardSection
        title="Dados do rack"
        items={[
          {
            title: "Potência do rack",
            description: "10 kW",
          },
          {
            title: "Unid. de rack",
            description: "42 U",
          },
          {
            title: "Peso suportável",
            description: "1500 kg",
          },
          {
            title: "Tamanho (a x c x p)",
            description: "230 x 60 x 60 cm",
          },
          {
            title: "Descrição",
            description: "Cliente ABC",
            defaultSize: 6,
          },
        ]}
      />
    </>
  );
};

const OccupationTab: React.FC = () => {
  const [rackView, setRackView] = useState<"front" | "back">("front");

  // const toggleRackView = () =>
  //   setRackView((prevState) => (prevState === "back" ? "front" : "back"));

  return (
    <Grid container columnSpacing={1}>
      <Grid
        item
        md={7}
        // marginTop={4.5}
      >
        <Grid container columnSpacing={2}>
          <Grid item md={4}>
            <RackStatisticsCard title="Potência livre" value={1500} unit="W" />
          </Grid>
          <Grid item md={4}>
            <RackStatisticsCard title="Peso livre" value={200} unit="kg" />
          </Grid>
          <Grid item md={4}>
            <RackStatisticsCard title="RU's livre" value={10} unit="U" />
          </Grid>
        </Grid>
        <Typography variant="h4">HP Proliant</Typography>
        <CardSection
          title="Local"
          items={[
            {
              title: "Rack",
              description: "Rack 1020",
            },
            {
              title: "Posição",
              description: "12 U",
            },
          ]}
        />
        <CardSection
          title="Dados do equipamento"
          items={[
            {
              title: "Marca",
              description: "HP",
              defaultSize: 4,
            },
            {
              title: "Modelo",
              description: "Proliant 350XP",
              defaultSize: 4,
            },
            {
              title: "Montagem",
              description: "Rack 19''",
              defaultSize: 4,
            },
            {
              title: "Tamanho",
              description: "200 x 600 x 600 mm",
              defaultSize: 4,
            },
            {
              title: "Peso",
              description: "25 kg",
              defaultSize: 4,
            },
            {
              title: "RU's",
              description: "5 RU's",
              defaultSize: 4,
            },
            {
              title: "Potência",
              description: "1000 W",
              defaultSize: 4,
            },
            {
              title: "Orientação",
              description: "Frontside",
              defaultSize: 4,
            },
            {
              title: "Status",
              description: "Instalado",
              defaultSize: 4,
            },
          ]}
          sx={{ my: 1 }}
        />
        <CardSection
          title="Identidade"
          items={[
            {
              title: "Número de série",
              description: "87858987858458",
              defaultSize: 4,
            },
            {
              title: "Cliente",
              description: "Banco ABC",
              defaultSize: 4,
            },
            {
              title: "Nome equipamento",
              description: "HP Proliant",
              defaultSize: 4,
            },
            {
              title: "Tipo",
              description: "Demo item",
              defaultSize: 4,
            },
            {
              title: "Função",
              description: "Desenvolvimento",
              defaultSize: 4,
            },
          ]}
        />
      </Grid>
      <Grid item md={5} sx={{ position: "relative" }}>
        <div
          style={{
            // position: "absolute",
            width: "100%",
            top: -70,
          }}
        >
          {/* <Stack direction="row" justifyContent="space-evenly">
            <IconButton onClick={toggleRackView} sx={{ minWidth: 0 }}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={toggleRackView} sx={{ minWidth: 0 }}>
              <ChevronRightIcon />
            </IconButton>
          </Stack> */}

          <RackSlot
            mode={rackView}
            items={[
              {
                leftPosition: 42,
                rightPosition: 1,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 41,
                rightPosition: 2,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 40,
                rightPosition: 3,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 39,
                rightPosition: 4,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 38,
                rightPosition: 5,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 37,
                rightPosition: 6,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 36,
                rightPosition: 7,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 35,
                rightPosition: 8,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 34,
                rightPosition: 9,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 33,
                rightPosition: 10,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 32,
                rightPosition: 11,
                equipmentId: "",
                label: "HP  Proliant",
                rackMount: ERackMount.RACK_19_FRONTSIDE,
                items: [
                  {
                    leftPosition: 31,
                    rightPosition: 12,
                    equipmentId: "",
                    label: "HP  Proliant",
                    rackMount: ERackMount.RACK_19_FRONTSIDE,
                  },
                  {
                    leftPosition: 30,
                    rightPosition: 13,
                    equipmentId: "",
                    label: "HP  Proliant",
                    rackMount: ERackMount.RACK_19_FRONTSIDE,
                  },
                ],
              },
              {
                leftPosition: 31,
                rightPosition: 12,
                equipmentId: "",
                label: "HP  Proliant",
                rackMount: ERackMount.RACK_19_FRONTSIDE,
              },
              {
                leftPosition: 30,
                rightPosition: 13,
                equipmentId: "",
                label: "HP  Proliant",
                rackMount: ERackMount.RACK_19_FRONTSIDE,
              },
              {
                leftPosition: 29,
                rightPosition: 14,
                equipmentId: "",
                label: "HP  Proliant",
                rackMount: ERackMount.RACK_19_FRONTSIDE,
              },
              {
                leftPosition: 28,
                rightPosition: 15,
                equipmentId: "",
                label: "HP  Proliant",
                rackMount: ERackMount.RACK_19_FRONTSIDE,
              },
              {
                leftPosition: 27,
                rightPosition: 16,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
              {
                leftPosition: 26,
                rightPosition: 17,
                equipmentId: "",
                label: "Disponível",
                rackMount: ERackMount.NO_ONE,
              },
            ]}
            onSelectEquipment={() => {}}
          />
        </div>
      </Grid>
    </Grid>
  );
};

type RackSlotProps = {
  items: RackSlotItem[];
  onSelectEquipment(slot: RackSlotItem): void;
  mode?: RackMode;
  slots?: IRackSlot[];
};

type RackMode = "front" | "back";

type IRackSlot = {
  leftPosition: number;
  rightPosition: number;
  occupedSlots?: IRackSlot[];
};

type RackSlotItem = {
  equipmentId: string;
  leftPosition: number;
  rightPosition: number;
  label: string;
  rackMount: ERackMount;
  items?: RackSlotItem[];
};

const RackSlot: React.FC<RackSlotProps> = ({
  items,
  mode,
  onSelectEquipment,
}) => {
  const [rackView, setRackView] = useState<RackMode>("front");

  const toggleRackView = () =>
    setRackView((prevState) => (prevState === "back" ? "front" : "back"));

  const getBackgroundColor = (rackMount: ERackMount) => {
    switch (rackMount) {
      case ERackMount.RACK_19_FRONTSIDE:
        return rackView === "front" ? "green" : "red";
      case ERackMount.RACK_19_BACKSIDE:
        return rackView === "front" ? "red" : "green";
      case ERackMount.RACK_19_BOTHSIDE:
        return "green";
      case ERackMount.WITH_ACESSORY_FRONTSIDE:
        return rackView === "front" ? "green" : "red";
      case ERackMount.WITH_ACESSORY_BACKSIDE:
        return rackView === "front" ? "red" : "green";
      case ERackMount.LATERAL:
        return null;
      case ERackMount.BDJ_FRONTSIDE:
        return rackView === "front" ? "green" : "red";
      case ERackMount.BDJ_BACKSIDE:
        return rackView === "front" ? "red" : "green";
      case ERackMount.NO_ONE:
        return null;
    }
  };

  return (
    <Paper sx={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <IconButton onClick={toggleRackView} sx={{ minWidth: 0 }}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={toggleRackView} sx={{ minWidth: 0 }}>
          <ChevronRightIcon />
        </IconButton>
      </div>

      <Typography textAlign="center" variant="h6" sx={{ my: 0 }}>
        {rackView === "front" ? "Front view" : "Back view"}
      </Typography>

      <div style={{ overflow: "auto", maxHeight: "430px", marginTop: "16px" }}>
        {items.map((item, idx) => {
          const rackEquipmentColor = getBackgroundColor(item.rackMount);
          return (
            <Paper
              key={idx}
              sx={{
                backgroundColor: rackEquipmentColor,
                borderRadius: 0,
                boxShadow: 0,
              }}
            >
              {idx === 0 && rackEquipmentColor == null ? <Divider /> : null}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                minHeight={"24px"}
              >
                <Avatar
                  sx={{
                    ml: 1,
                    fontSize: "12px",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  {rackView === "front"
                    ? item.leftPosition
                    : item.rightPosition}
                </Avatar>
                <Button
                  onClick={() => onSelectEquipment(item)}
                  sx={{ padding: 0 }}
                >
                  <Typography
                    sx={{
                      color: rackEquipmentColor ? "#000" : "#a1d9f0",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
                <Avatar
                  sx={{
                    mr: 1,
                    fontSize: "12px",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  {rackView === "front"
                    ? item.rightPosition
                    : item.leftPosition}
                </Avatar>
              </Stack>
              {idx !== items.length - 1 && rackEquipmentColor === null ? (
                <Divider />
              ) : null}
            </Paper>
          );
        })}
      </div>
    </Paper>
  );
};
