import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PageTitle from "app/components/PageTitle";
import EtcFilters from "../components/EtcFilters";
// import BuildingDropdown from "../components/BuildingDropdown";
// import FloorDropdown from "../components/FloorDropdown";
// import RoomDropdown from "../components/RoomDropdown";
import MuiDataTable from "mui-datatables";

// icons
import AddIcon from "@mui/icons-material/Add";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";
import AccessButton from "app/components/AccessButton";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";

import tableOptions from "app/utils/tableOptions";
// import Column from "app/components/Column";
import { useListAllEquipmentsQuery } from "app/services/datacenter";
import findObjectByProperty from "app/utils/findObjectByProperty";
import { EquipmentResponse } from "app/models/data-center.model";

const AutomationRegisterManagement: React.FC = () => {
  const [tableData, setTableData] = useState<any>();
  // const { buildings, building, floor, room } = useAutomationFilters();
  const { buildings } = useAutomationFilters();
  const { data: equipments } = useListAllEquipmentsQuery();
  const navigate = useNavigate();
  const columns = [
    {
      name: "name",
      label: "Componente",
      align: "left",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "building",
      label: "Prédio",
      align: "right",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "floor",
      label: "Andar",
      align: "right",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "room",
      label: "Sala",
      align: "right",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      align: "right",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "alarms",
      label: "Alarmes",
      align: "right",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdAt",
      label: "Data de criação",
      align: "right",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   ...tableActions(navigate, "/automation/register/edit"),
    // },
    // {
    //   name: "actions",
    //   label: "Ações",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     empty: false,
    //     customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
    //       const onDetailsClick = () => {
    //         const { rowData } = tableMeta;
    //         console.log(rowData);
    //       };

    //       return (
    //         <Row
    //           sx={{
    //             " & .MuiButton-root": {
    //               fontSize: "0.75rem",
    //             },
    //             " & .MuiButton-root:nth-child(even)": {
    //               // margin: "12px 0",
    //               margin: "0 12px",
    //             },
    //           }}
    //         >
    //           <Button variant="outlined" color="info" onClick={onDetailsClick}>
    //             Detalhes
    //           </Button>
    //           <Button variant="outlined">Editar</Button>
    //           <Button variant="outlined" color="error">
    //             Apagar
    //           </Button>
    //         </Row>
    //       );
    //     },
    //   },
    // },
  ];

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
    <HeroContainer>
      <PageTitle>Cadastros de automação</PageTitle>
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
          <Button
            variant="text"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/zeno/automation/management/equipment"
          >
            Novo equipamento
          </Button>
        </Tooltip>

        <Tooltip title="Criar nova conexão">
          <AccessButton
            startIcon={<CallSplitIcon />}
            label="Nova conexão"
            to="/zeno"
          />
        </Tooltip>

        <Tooltip title="Criar novo prédio">
          <AccessButton
            startIcon={<AccountBalanceIcon />}
            label="Novo prédio"
            to="/zeno/automation/management/building"
          />
        </Tooltip>

        <Tooltip title="Criar nova sala">
          <AccessButton
            startIcon={<StoreMallDirectoryIcon />}
            label="Nova sala"
            to="/zeno/automation/management/building"
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
        {/* <Table
          columns={columns}
          rows={tableData}
          onRowClick={navigateToEquipmentDetails}
          showActions
        /> */}
        <MuiDataTable
          title="Equipamentos de Energia"
          data={tableData}
          columns={columns}
          options={{
            ...tableOptions,
            onRowClick: (rowData) => {
              const selectedEquipment = findObjectByProperty(
                equipments ?? [],
                "component",
                rowData[0]
              ) as EquipmentResponse;
              navigate(
                `/zeno/automation/management/equipment/${selectedEquipment.id}`
              );
            },
          }}
        />
      </Row>
    </HeroContainer>
  );
};

export default AutomationRegisterManagement;
