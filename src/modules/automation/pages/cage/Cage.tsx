import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import HeroContainer from "modules/shared/components/HeroContainer";
import PageTitle from "modules/shared/components/PageTitle";
import BuildingDropdown from "modules/automation/components/BuildingDropdown";
import FloorDropdown from "modules/automation/components/FloorDropdown";
import RoomDropdown from "modules/automation/components/RoomDropdown";
import Row from "modules/shared/components/Row";

const Cage: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Energia, clima e telecom</PageTitle>
      <Row
        sx={{
          maxWidth: "60%",
          " & .MuiFormControl-root:nth-child(2)": {
            mx: 2,
          },
        }}
      >
        <BuildingDropdown />
        <FloorDropdown />
        <RoomDropdown />
      </Row>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item md={4}>
          <EquipmentCard title="DH01.2CG02 - Energia" />
        </Grid>
        <Grid item md={4}>
          <EquipmentCard title="DH01.2CG02 - Clima" />
        </Grid>
        <Grid item md={4}>
          <EquipmentCard title="DH01.2CG02 - Telecom" />
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default Cage;

type EquipmentCardProps = {
  title: string;
};

enum EEquipmentStatus {
  OFFLINE = 0,
  ONLINE = 1,
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ title }) => {
  const equipments: EquipmentTableData[] = [
    {
      equipment: "Equipamento 1",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      equipment: "Equipamento 2",
      alarms: 1,
      status: EEquipmentStatus.OFFLINE,
    },
  ];
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <EquipmentTable equipments={equipments} />
      </CardContent>
    </Card>
  );
};

type EquipmentTableData = {
  equipment: string;
  alarms: number;
  status: EEquipmentStatus;
};

type EquipmentTableProps = {
  equipments: EquipmentTableData[];
};

type EquipmentStatusProps = {
  status: EEquipmentStatus;
};

const EquipmentStatus: React.FC<EquipmentStatusProps> = ({ status }) => {
  switch (status) {
    case EEquipmentStatus.OFFLINE:
      return (
        <Typography variant="body1" color="error">
          Offline
        </Typography>
      );
    case EEquipmentStatus.ONLINE:
      return (
        <Typography variant="body1" color="#2AD631">
          Online
        </Typography>
      );
  }
};

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipments }) => {
  const navigate = useNavigate();

  const handleOpenEquipmentDetails = (equipment: any) => {
    console.log("open equipment details");
    // navigate(toEquipmentDetails)
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Equipamento</TableCell>
            <TableCell>Alarmes</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment) => (
            <TableRow
              key={equipment.equipment}
              onClick={() => handleOpenEquipmentDetails(equipment)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{equipment.equipment}</TableCell>
              <TableCell>{equipment.alarms}</TableCell>
              <TableCell>
                <EquipmentStatus status={equipment.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
