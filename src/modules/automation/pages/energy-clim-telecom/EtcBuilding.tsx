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
import { automationPaths } from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import { FloorModel } from "modules/datacenter/models/datacenter-model";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";

export default function EtcBuilding() {
  const { data, isLoading, isError } = useFindAllBuildingsQuery();

  return (
    <HeroContainer title="Energia, clima e telecom">
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {data?.map((building) => (
          <Grid key={building.id} item md={4}>
            <RoomCard
              title={building.name}
              floors={
                building.floors?.map<FloorTableData>((floor) => {
                  return {
                    floor: floor,
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
      <ErrorCard isError={isError} />
    </HeroContainer>
  );
}

type FloorCardProps = {
  title: string;
  floors: FloorTableData[];
};

const RoomCard: React.FC<FloorCardProps> = ({ title, floors }) => {
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
              {floors.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.power;
              }, 0)}
              {" kW"}
            </strong>
          </Typography>
        </Row>
        <FloorTable floors={floors} />
      </CardContent>
    </Card>
  );
};

type FloorTableData = {
  floor: FloorModel;
  alarms: number;
  power: number;
};

type FloorTableProps = {
  floors: FloorTableData[];
};

const FloorTable: React.FC<FloorTableProps> = ({ floors }) => {
  const { navigate, path } = useRouter();

  const handleOpenFloorDetails = (row: FloorTableData) => {
    const { floor } = row;
    const destinationPath = compositePathRoute([
      HomePath,
      AutomationPath,
      automationPaths.energyClimateTelecomFloor.shortPath,
    ]);
    navigate(destinationPath, {
      state: {
        data: floor,
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
          {floors.map((floor) => (
            <TableRow
              key={floor.floor.id}
              onClick={() => handleOpenFloorDetails(floor)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{floor.floor.name}</TableCell>
              <TableCell>{floor.alarms}</TableCell>
              <TableCell>{floor.power}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type ErrorCardProps = {
  isError: boolean;
};

const ErrorCard: React.FC<ErrorCardProps> = ({ isError }) => {
  if (isError) {
    return (
      <Card>
        <CardContent>
          <Typography>
            Não foi possível estabelecer conexão com a API
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
};
