import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import HeroContainer from "modules/shared/components/HeroContainer";
import PageTitle from "modules/shared/components/PageTitle";

const Etcv2: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Energia, clima e telecom</PageTitle>
      <Grid container>
        <Grid item md={4}>
          <EquipmentCard />
        </Grid>
        <Grid item md={4}>
          <EquipmentCard />
        </Grid>
        <Grid item md={4}>
          <EquipmentCard />
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default Etcv2;

const EquipmentCard: React.FC = () => {
  const equipments: EquipmentTableProps[] = [
    {
      equipment: "Equipamento 1",
      alarms: 0,
      status: "Online",
    },
    {
      equipment: "Equipamento 2",
      alarms: 1,
      status: "Offline",
    },
  ];
  return (
    <Card>
      <Typography>Terreo</Typography>
      <EquipmentTable {...equipments} />
    </Card>
  );
};

type EquipmentTableProps = {
  equipment: string;
  alarms: number;
  status: "Online" | "Offline";
};

const EquipmentTable: React.FC<EquipmentTableProps[]> = (props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Equipamento</TableCell>
          <TableCell>Alarmes</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.map((equipment) => (
          <TableRow key={equipment.equipment}>
            <TableCell>{equipment.equipment}</TableCell>
            <TableCell>{equipment.alarms}</TableCell>
            <TableCell>{equipment.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
