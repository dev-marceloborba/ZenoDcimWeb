import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { CagePath } from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import { useFindAllFloorsQuery } from "modules/datacenter/services/floor-service";
import Loading from "modules/shared/components/Loading";
import { RoomModel } from "modules/datacenter/models/datacenter-model";
import { useFindRoomsByFloorIdMutation } from "modules/datacenter/services/room-service";

const EtcFloor: React.FC = () => {
  const {
    state: { floor },
  } = useRouter();
  const [findRooms, { data: rooms }] = useFindRoomsByFloorIdMutation();
  const { data, isLoading } = useFindAllFloorsQuery();

  useEffect(() => {
    async function fetchRooms() {
      if (floor) await findRooms(floor.id).unwrap();
    }
    fetchRooms();
  }, [findRooms, floor]);

  return (
    <HeroContainer>
      <PageTitle>Energia, clima e telecom</PageTitle>
      {/* <Row
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
      </Row> */}
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {data?.map((room) => (
          <Grid key={floor.id} item md={4}>
            <EquipmentCard
              title={floor.name}
              rooms={
                room.rooms?.map<RoomTableData>((room) => ({
                  room: room,
                  alarms: 0,
                  status: 0,
                })) ?? []
              }
            />
          </Grid>
        ))}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default EtcFloor;

type RoomCardProps = {
  title: string;
  rooms: RoomTableData[];
};

enum EEquipmentStatus {
  OFFLINE = 0,
  ONLINE = 1,
}

const EquipmentCard: React.FC<RoomCardProps> = ({ title, rooms }) => {
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography
          component={RouterLink}
          variant="h5"
          color="text.secondary"
          gutterBottom
          to="/zeno/automation/etc"
          sx={{
            textDecoration: "none",
          }}
        >
          {title}
        </Typography>
        <RoomTable rooms={rooms} />
      </CardContent>
    </Card>
  );
};

type RoomTableData = {
  room: RoomModel;
  alarms: number;
  status: EEquipmentStatus;
};

type RoomTableProps = {
  rooms: RoomTableData[];
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

const RoomTable: React.FC<RoomTableProps> = ({ rooms }) => {
  const { navigate, path } = useRouter();

  const handleOpenRoomDetails = (row: RoomTableData) => {
    const { room } = row;
    const destinationPath = compositePathRoute([
      HomePath,
      AutomationPath,
      CagePath,
    ]);
    navigate(destinationPath, {
      state: {
        data: room,
        from: path,
      },
    });
  };
  return (
    <TableContainer
      sx={{
        maxHeight: "470px",
        overflowY: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sala</TableCell>
            <TableCell>Alarmes</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow
              key={room.room.id}
              onClick={() => handleOpenRoomDetails(room)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{room.room.name}</TableCell>
              <TableCell>{room.alarms}</TableCell>
              <TableCell>
                <EquipmentStatus status={room.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
