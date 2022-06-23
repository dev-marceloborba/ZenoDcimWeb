import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import EtcFilters from "modules/automation/components/EtcFilters";
// import BuildingDropdown from "modules/automation/components/BuildingDropdown";
// import FloorDropdown from "modules/automation/components/FloorDropdown";
// import RoomDropdown from "modules/automation/components/RoomDropdown";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";

// icons
import AddIcon from "@mui/icons-material/Add";
import CallSplitIcon from "@mui/icons-material/CallSplit";

import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import AccessButton from "modules/shared/components/AccessButton";

// import Column from "modules/shared/components/Column";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";
import { EquipmentModel } from "modules/automation/models/automation-model";
import Loading from "modules/shared/components/Loading";
import useAutomationFilters from "modules/automation/data/hooks/useAutomationFilters";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import {
  AutomationRegisterPath,
  EquipmentFormPath,
} from "modules/automation/routes/paths";

const EquipmentAdmin: React.FC = () => {
  const [tableData, setTableData] = useState<any>();
  // const { buildings, building, floor, room } = useAutomationFilters();
  const { buildings } = useAutomationFilters();
  const { data: equipments, isLoading } = useFindAllEquipmentsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const vet: any = [];
    buildings?.forEach((b) =>
      b.floors?.forEach((f) =>
        f.rooms?.forEach((r) =>
          r.equipments?.forEach((e) => {
            vet.push({
              building: b.name,
              floor: f.name,
              alarms: e.alarms,
              createdAt: new Date().toLocaleDateString(),
              room: r.name,
              status: e.status.toString(),
              name: e.component,
              id: e.id,
            });
          })
        )
      )
    );

    setTableData(vet);
  }, [buildings, setTableData]);

  // const equipments =
  //   buildings
  //     ?.find((x) => x.id === building)
  //     ?.floors?.find((x) => x.id === floor)
  //     ?.rooms?.find((x) => x.id === room)?.equipments ?? [];

  // const navigateToEquipmentDetails = (row: any) => {
  //   const seletectedEquipment = equipments.find(
  //     (x) => x.component === row.name
  //   );
  //   navigate(
  //     `/zeno/automation/management/equipment/${seletectedEquipment!.id}`
  //   );
  // };

  return (
    <HeroContainer title="Gestão de equipamentos">
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography variant="h6">Equipamentos de Energia</Typography>
        <EtcFilters />
      </Row>

      {/* <Row sx={{ mt: 2, maxWidth: "480px" }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 2 }} />
        <RoomDropdown sx={{ ml: 2 }} />
      </Row> */}

      <Divider sx={{ mt: 2 }} />

      <Row sx={{ mt: 2 }}>
        <Tooltip title="Criar novo equipamento">
          <AccessButton
            startIcon={<AddIcon />}
            label="Novo equipamento"
            to={compositePathRoute([
              HomePath,
              AutomationPath,
              EquipmentFormPath,
            ])}
          />
        </Tooltip>

        <Tooltip title="Criar nova conexão">
          <AccessButton
            startIcon={<CallSplitIcon />}
            label="Nova conexão"
            to="/zeno"
          />
        </Tooltip>
      </Row>

      <Row
        sx={{
          mt: 2,
          " & .MuiPaper-root": {
            width: "100%",
          },
        }}
      >
        <DataTable
          title="Equipamentos de Energia"
          rows={tableData ?? []}
          columns={columns}
          // options={{
          //   onRowClick: (row: EquipmentModel) => {
          //     navigate(`/zeno/automation/management/equipment/${row.id}`);
          //   },
          // }}
        />
      </Row>
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default EquipmentAdmin;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Componente",
  },
  {
    name: "building",
    label: "Prédio",
  },
  {
    name: "floor",
    label: "Andar",
  },
  {
    name: "room",
    label: "Sala",
  },
  {
    name: "createdAt",
    label: "Data de criação",
  },
];
