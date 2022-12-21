import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import HeroContainer from "modules/shared/components/HeroContainer";
import LabelTabs from "modules/shared/components/LabelTabs";
import TabPanel from "modules/shared/components/TabPanel";
import {
  TabContextProvider,
  useTabContext,
} from "modules/shared/components/TabContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DataTableV2, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import Paper, { PaperProps } from "@mui/material/Paper";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditButton from "modules/shared/components/edit-button/EditButton";
import DeleteButton from "modules/shared/components/DeleteButton";
import useRouter from "modules/core/hooks/useRouter";
import { useFindEquipmentByIdMutation } from "modules/automation/services/equipment-service";
import { EquipmentModel } from "modules/automation/models/automation-model";
import Loading from "modules/shared/components/Loading";

const EquipmentDetailsPage: React.FC = () => {
  const { params } = useRouter();
  const [findEquipment, { data: equipment, isLoading }] =
    useFindEquipmentByIdMutation();

  useEffect(() => {
    async function fetchEquipment() {
      if (params.equipmentId) {
        await findEquipment(params.equipmentId).unwrap();
      }
    }
    fetchEquipment();
  }, [findEquipment, params.equipmentId]);

  console.log(equipment);
  return (
    <HeroContainer title="Ar condicionado 01">
      <TabContextProvider>
        <LabelTabs items={["Detalhes", "Parâmetros", "Regras"]} />
        <DetailsTab equipment={equipment} />
        <ParametersTab />
        <RulesTab />
      </TabContextProvider>
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default EquipmentDetailsPage;

type DetailsTabProps = {
  equipment: EquipmentModel | undefined;
};

const DetailsTab: React.FC<DetailsTabProps> = ({ equipment }) => {
  const { tabIndex } = useTabContext();

  return (
    <TabPanel index={0} value={tabIndex}>
      <CardSection>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: "underline",
            my: 1,
          }}
        >
          Local
        </Typography>
        <Grid container>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Site
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              Site 1
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Prédio
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {equipment?.building?.name}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Andar
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {equipment?.floor?.name}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Sala
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {equipment?.room?.name}
            </Typography>
          </Grid>
        </Grid>
      </CardSection>

      <CardSection sx={{ mt: 2, mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: "underline",
          }}
        >
          Identidade
        </Typography>
        <Grid container rowSpacing={1}>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Equipamento
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {equipment?.component}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Código/N série
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {/* TODO: colocar serial number */}
              {equipment?.componentCode}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Grupo
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              Clima
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Status
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              Instalado
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Marca
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              Trane
            </Typography>
          </Grid>
        </Grid>
      </CardSection>

      <CardSection sx={{ mt: 2, mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: "underline",
          }}
        >
          Parâmetros do equipamento
        </Typography>
        <Grid container rowSpacing={1}>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Peso
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {`${equipment?.weight ?? ""} kg`}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Tamanho
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {`${equipment?.size ?? ""} cm`}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Potência
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {`${equipment?.powerLimit ?? ""} W`}
            </Typography>
          </Grid>
          <Grid item md={3}></Grid>
          <Grid item md={6}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Descrição
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {equipment?.description}
            </Typography>
          </Grid>
        </Grid>
      </CardSection>
    </TabPanel>
  );
};

const ParametersTab = () => {
  const { tabIndex } = useTabContext();

  return (
    <TabPanel index={1} value={tabIndex}>
      <DataTableV2
        title="Parâmetros"
        columns={columns}
        rows={[
          {
            parameter: "Utilizacao do ar condicionado",
            unit: "%",
            lowLowLimit: 10,
            lowLimit: 20,
            highLimit: 30,
            highHighLimit: 40,
            scale: 1,
            type: "Parâmetro físico",
          },
        ]}
        options={{
          showEdit: true,
          showDelete: true,
          selectionMode: "hide",
        }}
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table size="medium">
              <TableHead
                sx={(theme) => ({
                  backgroundColor: theme.palette.background.paper,
                })}
              >
                <TableRow>
                  <TableCell align="left">Parâmetro</TableCell>
                  <TableCell align="right">Unidade</TableCell>
                  <TableCell align="right">Limite muito baixo</TableCell>
                  <TableCell align="right">Limite baixo</TableCell>
                  <TableCell align="right">Limite alto</TableCell>
                  <TableCell align="right">Limite muito alto</TableCell>
                  <TableCell align="right">Escala</TableCell>
                  <TableCell align="right">Tipo</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover tabIndex={-1}>
                  <TableCell align="left">
                    Utilizaçao do ar condicionado
                  </TableCell>
                  <TableCell align="right">%</TableCell>
                  <TableCell align="right">10</TableCell>
                  <TableCell align="right">20</TableCell>
                  <TableCell align="right">30</TableCell>
                  <TableCell align="right">40</TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">Parâmetro fīsico</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end">
                      <EditButton mode="icon" />
                      <DeleteButton
                        mode="icon"
                        onDeleteConfirmation={() => {}}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </TabPanel>
  );
};

const RulesTab = () => {
  const { tabIndex } = useTabContext();

  return (
    <TabPanel index={2} value={tabIndex}>
      <DataTableV2
        title="Regras"
        columns={ruleColumns}
        rows={[
          {
            rule: "Sobretensão fase L1",
            parameter: "Tensão elétrica - L1",
            conditional: ">=",
            setpoint: 240,
            priority: "Alta",
          },
        ]}
        options={{
          showEdit: true,
          showDelete: true,
          selectionMode: "hide",
        }}
      />
    </TabPanel>
  );
};

const columns: ColumnHeader[] = [
  {
    name: "parameter",
    label: "Parâmetro",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "lowLowLimit",
    label: "Limite muito baixo",
  },
  {
    name: "lowLimit",
    label: "Limite baixo",
  },
  {
    name: "highLimit",
    label: "Limite alto",
  },
  {
    name: "highHighLimit",
    label: "Limite muito alto",
  },
  {
    name: "scale",
    label: "Escala",
  },
  {
    name: "type",
    label: "Tipo",
  },
];

const ruleColumns: ColumnHeader[] = [
  {
    name: "rule",
    label: "Regra",
  },
  {
    name: "parameter",
    label: "Parâmetro",
  },
  {
    name: "conditional",
    label: "Condicional",
  },
  {
    name: "setpoint",
    label: "Setpoint",
  },
  {
    name: "priority",
    label: "Prioridade",
  },
];

type CardSectionProps = {
  title?: string;
} & PaperProps;

const CardSection: React.FC<CardSectionProps> = ({
  title = "",
  children,
  ...props
}) => {
  return (
    <Paper
      {...props}
      sx={{
        ...props.sx,
        padding: "8px 12px",
      }}
    >
      {children}
    </Paper>
  );
};
