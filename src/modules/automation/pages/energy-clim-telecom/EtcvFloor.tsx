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
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { automationPaths } from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import Loading from "modules/shared/components/Loading";
import { RoomModel } from "modules/datacenter/models/datacenter-model";
import { useFindRoomsByFloorIdMutation } from "modules/datacenter/services/room-service";

const EtcFloor: React.FC = () => {
  const {
    params: { floorId },
  } = useRouter();
  const [findRooms, { data: rooms, isLoading }] =
    useFindRoomsByFloorIdMutation();

  useEffect(() => {
    async function fetchRooms() {
      if (floorId) {
        await findRooms(floorId).unwrap();
      }
    }
    fetchRooms();
  }, [findRooms, floorId]);

  return (
    <HeroContainer>
      <PageTitle>Energia, clima e telecom</PageTitle>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item md={4}>
          <RoomCard
            //@ts-ignore
            title={rooms?.length > 0 ? rooms[0].floor?.name : ""}
            rooms={
              rooms?.map<RoomTableData>((room) => ({
                alarms: 0,
                status: 0,
                room: room,
              })) ?? []
            }
          />
        </Grid>
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

const RoomCard: React.FC<RoomCardProps> = ({ title, rooms }) => {
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
      automationPaths.cage.fullPath
        .replace(":floorId", room.floorId)
        .replace(":roomId", room.id),
    ]);
    navigate(destinationPath, {
      state: {
        data: room,
        from: path,
        description: room.name,
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
            <TableCell>Potência (kW)</TableCell>
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
              <TableCell>0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
