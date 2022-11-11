import React, { useEffect, useState } from "react";
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
import { automationPaths } from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import { useFindAllRoomsQuery } from "modules/datacenter/services/room-service";
import Loading from "modules/shared/components/Loading";
import {
  EEquipmentGroup,
  EquipmentModel,
} from "modules/automation/models/automation-model";
import { useFindEquipmentsByRoomIdMutation } from "modules/automation/services/equipment-service";

enum EEquipmentStatus {
  OFFLINE = 0,
  ONLINE = 1,
}

type EquipmentState = {
  energyEquipments: EquipmentModel[];
  climateEquipments: EquipmentModel[];
  telecomEquipments: EquipmentModel[];
};

const Cage: React.FC = () => {
  const {
    state: { data: room },
  } = useRouter();
  const [findEquipments, { isLoading }] = useFindEquipmentsByRoomIdMutation();
  const [equipmentData, setEquipmentData] = useState<EquipmentState>({
    energyEquipments: [],
    climateEquipments: [],
    telecomEquipments: [],
  });

  useEffect(() => {
    async function fetchEquipments() {
      if (room) {
        const equipments = await findEquipments(room.id).unwrap();
        const energy = equipments.filter(
          (x) => x.group === EEquipmentGroup.ENERGY
        );
        const climate = equipments.filter(
          (x) => x.group === EEquipmentGroup.CLIM
        );
        const telecom = equipments.filter(
          (x) => x.group === EEquipmentGroup.TELECOM
        );

        setEquipmentData({
          energyEquipments: energy,
          climateEquipments: climate,
          telecomEquipments: telecom,
        });
      }
    }

    fetchEquipments();
  }, [room, findEquipments]);

  return (
    <HeroContainer>
      <PageTitle>Energia, clima e telecom</PageTitle>
      {/* <Row
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
      </Row> */}
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item md={4}>
          <EquipmentCard
            title={`${room.name} - Energia`}
            equipments={
              equipmentData.energyEquipments.map<EquipmentTableData>(
                (equip) => ({
                  alarms: 0,
                  equipment: equip,
                  status: EEquipmentStatus.ONLINE,
                })
              ) ?? []
            }
          />
        </Grid>

        <Grid item md={4}>
          <EquipmentCard
            title={`${room.name} - Clima`}
            equipments={
              equipmentData.climateEquipments.map<EquipmentTableData>(
                (equip) => ({
                  alarms: 0,
                  equipment: equip,
                  status: EEquipmentStatus.ONLINE,
                })
              ) ?? []
            }
          />
        </Grid>

        <Grid item md={4}>
          <EquipmentCard
            title={`${room.name} - Telecom`}
            equipments={
              equipmentData.telecomEquipments.map<EquipmentTableData>(
                (equip) => ({
                  alarms: 0,
                  equipment: equip,
                  status: EEquipmentStatus.ONLINE,
                })
              ) ?? []
            }
          />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default Cage;

type EquipmentCardProps = {
  title: string;
  equipments: EquipmentTableData[];
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({ title, equipments }) => {
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
  equipment: EquipmentModel;
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
  const { navigate, path } = useRouter();

  const handleOpenEquipmentDetails = (equipment: EquipmentModel) => {
    const destinationPath = compositePathRoute([
      HomePath,
      AutomationPath,
      automationPaths.equipmentParameterDetails.shortPath,
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
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment, index) => (
            <TableRow
              key={index}
              onClick={() => handleOpenEquipmentDetails(equipment.equipment)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{equipment.equipment.component}</TableCell>
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
