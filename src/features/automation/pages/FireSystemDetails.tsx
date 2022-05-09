import React from "react";
import Card from "@mui/material/Card";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import Typography from "@mui/material/Typography";
import BmsIndicator from "app/components/BmsIndicator";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import { EEquipmentStatus, EParameterStatus } from "app/types/bms";
import { fireSystem } from "app/data/fire-system";
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";
import Column from "app/components/Column";

const FireSystemDetails: React.FC = () => {
  const { events } = fireSystem;

  return (
    <HeroContainer>
      <PageTitle>Incêndio - Eventos</PageTitle>
      <Row sx={{ mt: 2, maxWidth: 480 }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 1, mr: 1 }} />
      </Row>
      <Card sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5">Laço 1</Typography>
        <Row sx={{ justifyContent: "space-between" }}>
          <Column sx={{ width: "230px" }}>
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
          </Column>
          <Column sx={{ ml: 0, width: "80%" }}>
            <DataTable
              title="Eventos"
              columns={columns}
              rows={events ?? []}
              options={{
                hideSearch: true,
              }}
            />
          </Column>
        </Row>
      </Card>
    </HeroContainer>
  );
};

export default FireSystemDetails;

const columns: ColumnHeader[] = [
  {
    label: "Equipamento",
    name: "equipment",
  },
  {
    label: "Evento",
    name: "event",
  },
  {
    label: "Severidade",
    name: "priority",
  },
  {
    label: "Data",
    name: "date",
  },
];
