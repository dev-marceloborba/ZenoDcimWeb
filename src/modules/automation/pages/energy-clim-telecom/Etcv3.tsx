import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import BuildingDropdown from "modules/automation/components/BuildingDropdown";

import FloorDropdown from "modules/automation/components/FloorDropdown";
import RoomDropdown from "modules/automation/components/RoomDropdown";
import { CagePath } from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";

export default function Etcv3() {
  return (
    <HeroContainer title="Energia, clima e telecom">
      <Row
        sx={{
          maxWidth: "60%",
          " & .MuiFormControl-root:nth-child(2)": {
            mx: 2,
          },
          mt: 2,
        }}
      >
        <BuildingDropdown />
        <FloorDropdown />
        <RoomDropdown />
      </Row>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item md={4}>
          <EquipmentCard title="Data Hall" />
        </Grid>
        <Grid item md={4}>
          <EquipmentCard title="Geradores" />
        </Grid>
        <Grid item md={4}>
          <EquipmentCard title="Subestação" />
        </Grid>
      </Grid>
    </HeroContainer>
  );
}

type EquipmentCardProps = {
  title: string;
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({ title }) => {
  const equipments: EquipmentTableData[] = [
    {
      equipment: "Equipamento 1",
      alarms: 0,
      power: 12.3,
    },
    {
      equipment: "Equipamento 2",
      alarms: 1,
      power: 22.9,
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
  power: number;
};

type EquipmentTableProps = {
  equipments: EquipmentTableData[];
};

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipments }) => {
  const { navigate, path } = useRouter();

  const handleOpenEquipmentDetails = (row: any) => {
    const { equipment } = row;
    const destinationPath = compositePathRoute([
      HomePath,
      AutomationPath,
      CagePath,
    ]);
    navigate(destinationPath, {
      state: {
        data: equipment,
        from: path,
      },
    });
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Equipamento</TableCell>
            <TableCell>Alarmes</TableCell>
            <TableCell>Potência (kW)</TableCell>
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
              <TableCell>{equipment.power}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
