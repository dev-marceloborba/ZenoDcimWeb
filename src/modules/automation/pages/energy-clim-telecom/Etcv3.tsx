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
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item md={4}>
          <RoomCard title="Data Hall" />
        </Grid>
        <Grid item md={4}>
          <RoomCard title="Geradores" />
        </Grid>
        <Grid item md={4}>
          <RoomCard title="Subestação" />
        </Grid>
      </Grid>
    </HeroContainer>
  );
}

type RoomCardProps = {
  title: string;
};

const RoomCard: React.FC<RoomCardProps> = ({ title }) => {
  const rooms: EquipmentTableData[] = [
    {
      room: "Data Hall 1",
      alarms: 0,
      power: 12.3,
    },
    {
      room: "Data Hall 2",
      alarms: 1,
      power: 22.9,
    },
  ];

  return (
    <Card variant="elevation">
      <CardContent>
        <Row sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography>
            Potência consumida:{" "}
            <strong>
              {rooms.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.power;
              }, 0)}
              {" kW"}
            </strong>
          </Typography>
        </Row>
        <EquipmentTable rooms={rooms} />
      </CardContent>
    </Card>
  );
};

type EquipmentTableData = {
  room: string;
  alarms: number;
  power: number;
};

type EquipmentTableProps = {
  rooms: EquipmentTableData[];
};

const EquipmentTable: React.FC<EquipmentTableProps> = ({ rooms }) => {
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
          {rooms.map((room) => (
            <TableRow
              key={room.room}
              onClick={() => handleOpenEquipmentDetails(room)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{room.room}</TableCell>
              <TableCell>{room.alarms}</TableCell>
              <TableCell>{room.power}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
