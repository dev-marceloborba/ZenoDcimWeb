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
import { EnergyClimTelecomFloorPath } from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";

export default function EtcBuilding() {
  const { data, isLoading } = useFindAllBuildingsQuery();

  return (
    <HeroContainer title="Energia, clima e telecom">
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {data?.map((building) => (
          <Grid key={building.id} item md={4}>
            <RoomCard
              title={building.name}
              roomData={
                building.floors?.map<RoomTableData>((floor) => {
                  return {
                    room: floor.name,
                    alarms: 0,
                    power: 0,
                  };
                }) ?? []
              }
            />
          </Grid>
        ))}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

type RoomCardProps = {
  title: string;
  roomData: RoomTableData[];
};

const RoomCard: React.FC<RoomCardProps> = ({ title, roomData: rooms }) => {
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
        <RoomTable rooms={rooms} />
      </CardContent>
    </Card>
  );
};

type RoomTableData = {
  room: string;
  alarms: number;
  power: number;
};

type RoomTableProps = {
  rooms: RoomTableData[];
};

const RoomTable: React.FC<RoomTableProps> = ({ rooms }) => {
  const { navigate, path } = useRouter();

  const handleOpenEquipmentDetails = (row: any) => {
    const { equipment } = row;
    const destinationPath = compositePathRoute([
      HomePath,
      AutomationPath,
      EnergyClimTelecomFloorPath,
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
            <TableCell>Andar</TableCell>
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
