import React from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import PageTitle from "modules/shared/components/PageTitle";
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

const Rack: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Rack</PageTitle>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid
          item
          md={6}
          sx={{
            " & .MuiCard-root:nth-child(2)": {
              my: 2,
            },
          }}
        >
          <ParameterCard {...energyCardData} />
          <ParameterCard {...climCardData} />
          <ParameterCard {...telecomCardData} />
        </Grid>

        <Grid item md={6}>
          <RackOccupationCard {...rackOcuppationData} />
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default Rack;

enum EEquipmentStatus {
  OFFLINE = 0,
  ONLINE = 1,
}

type ParameterData = {
  parameter: string;
  description: string;
  value: number;
  unit: string;
  alarms: number;
  status: EEquipmentStatus;
};

type ParameterCardProps = {
  equipment: string;
  parameters: ParameterData[];
  type: "energy" | "clim" | "telecom";
};

const ParameterCard: React.FC<ParameterCardProps> = ({
  equipment,
  parameters,
  type,
}) => {
  const cardTitle = () => {
    switch (type) {
      case "energy":
        return "Energia";
      case "clim":
        return "Clima";
      case "telecom":
        return "Telecom";
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          color="text.secondary"
        >{`${equipment} - ${cardTitle()}`}</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Parâmetro</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Alarmes</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parameters.map((parameter) => (
                <TableRow key={parameter.description}>
                  <TableCell>{parameter.parameter}</TableCell>
                  <TableCell>{parameter.description}</TableCell>
                  <TableCell>{`${parameter.value} ${parameter.unit}`}</TableCell>
                  <TableCell>{parameter.alarms}</TableCell>
                  <TableCell>{parameter.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const energyCardData: ParameterCardProps = {
  equipment: "DH01.2CG02.A.RCK01",
  parameters: [
    {
      parameter: "Tensão",
      description: "Bifásica vinda da RPP",
      value: 120,
      unit: "V",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Corrente",
      description: "Bifásica vinda do TC RPP",
      value: 5,
      unit: "A",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Potência Ativa",
      description: "Bifásica vinda da RPP",
      value: 2500,
      unit: "W",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Potência Reativa",
      description: "Bifásica vinda da RPP",
      value: 500,
      unit: "Var",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
  ],
  type: "energy",
};

const climCardData: ParameterCardProps = {
  equipment: "DH01.2CG02.A.RCK01",
  parameters: [
    {
      parameter: "Temperatura de Entrada",
      description: "Na frente do Rack",
      value: 23,
      unit: "°C",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Temperatura de Saída",
      description: "Na traseira do Rack",
      value: 33,
      unit: "°C",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Temperatura Interna S",
      description: "Parte interna da porta frontal, área superior",
      value: 30,
      unit: "°C",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Temperatura Interna I",
      description: "Parte interna da porta frontal, área inferior",
      value: 26,
      unit: "°C",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
  ],
  type: "clim",
};

const telecomCardData: ParameterCardProps = {
  equipment: "DH01.2CG02.A.RCK01",
  parameters: [
    {
      parameter: "Link 01",
      description: "Unifique link AYH123 SLA 98%",
      value: 50,
      unit: "Mbps/s",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Link 02",
      description: "Quântico Connect SLA 95%",
      value: 50,
      unit: "Mbps/s",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Link 03",
      description: "Claro link JDH234 SLA 99%",
      value: 50,
      unit: "Mbps/s",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
    {
      parameter: "Link 04",
      description: "Vivo link JDH234 SLA 101%",
      value: 50,
      unit: "Mbps/s",
      alarms: 0,
      status: EEquipmentStatus.ONLINE,
    },
  ],
  type: "telecom",
};

type RackEquipmentData = {
  rackUnit: string;
  equipment: string;
  description: string;
  sku: string;
  enterDate: string;
  initialPosition: number;
  finalPosition: number;
};

type RackOccupationCardProps = {
  rackEquipments: RackEquipmentData[];
};

const RackOccupationCard: React.FC<RackOccupationCardProps> = ({
  rackEquipments,
}) => {
  const isBiggerLine = (equipment: any) => {
    return equipment.finalPosition - equipment.initialPosition > 2;
  };

  const calcEquipmentHeight = (equipment: RackEquipmentData) => {
    const { initialPosition, finalPosition } = equipment;
    if (initialPosition === finalPosition) {
      //   return "50px";
      return "auto";
    }

    return `${(finalPosition - initialPosition) * 10}px`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          DH01.2CG02.A.RCK01 - Ocupação
        </Typography>
      </CardContent>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Un. de Rack</TableCell>
              <TableCell>Equipamento</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Data entrada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rackEquipments.map((rackEquipment) => (
              <TableRow
                key={rackEquipment.description}
                sx={{
                  //   height: isBiggerLine(rackEquipment) ? "180px" : "auto",
                  height: calcEquipmentHeight(rackEquipment),
                }}
              >
                <TableCell>{rackEquipment.rackUnit}</TableCell>
                <TableCell>{rackEquipment.equipment}</TableCell>
                <TableCell>{rackEquipment.description}</TableCell>
                <TableCell>{rackEquipment.sku}</TableCell>
                <TableCell>{rackEquipment.enterDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

const rackOcuppationData: RackOccupationCardProps = {
  rackEquipments: [
    {
      rackUnit: "44U",
      equipment: "Switch Cisco C9200L-24T-4G-E-BR",
      description: "Switch Top of Rack para distribuição nos Racks 01, 02 e 03",
      sku: "ABCDE12345",
      enterDate: "27 Maio 2022",
      initialPosition: 44,
      finalPosition: 44,
    },
    {
      rackUnit: "43U",
      equipment: "-",
      description: "-",
      sku: "-",
      enterDate: "-",
      initialPosition: 43,
      finalPosition: 43,
    },
    {
      rackUnit: "42U",
      equipment: "-",
      description: "-",
      sku: "-",
      enterDate: "-",
      initialPosition: 42,
      finalPosition: 42,
    },
    {
      rackUnit: "41U",
      equipment: "-",
      description: "-",
      sku: "-",
      enterDate: "-",
      initialPosition: 41,
      finalPosition: 41,
    },
    {
      rackUnit: "38U-40U",
      equipment: "Servidor HPE ProLiant ML30 Gen10",
      description: "Servidor proocessamento",
      sku: "ABCDE12345",
      enterDate: "27 Maio 2022",
      initialPosition: 38,
      finalPosition: 40,
    },
    // {
    //   rackUnit: "39U",
    //   equipment: "-",
    //   description: "-",
    //   sku: "-",
    //   enterDate: "-",
    //   initialPosition: 39,
    //   finalPosition: 39,
    // },
    // {
    //   rackUnit: "38U",
    //   equipment: "-",
    //   description: "-",
    //   sku: "-",
    //   enterDate: "-",
    //   initialPosition: 38,
    //   finalPosition: 38,
    // },
    {
      rackUnit: "03U-37U",
      equipment: "Servidor NAS ASUSTOR AS6404T",
      description: "Servidor de armazenamento",
      sku: "ABCDE12345",
      enterDate: "27 Maio 2022",
      initialPosition: 3,
      finalPosition: 37,
    },
    {
      rackUnit: "02U",
      equipment: "-",
      description: "-",
      sku: "-",
      enterDate: "-",
      initialPosition: 2,
      finalPosition: 2,
    },
    {
      rackUnit: "01U",
      equipment: "-",
      description: "-",
      sku: "-",
      enterDate: "-",
      initialPosition: 1,
      finalPosition: 1,
    },
  ],
};
