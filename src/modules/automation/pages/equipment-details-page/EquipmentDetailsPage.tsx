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
import { useFindAlarmRulesByEquipmentIdQuery } from "modules/automation/services/alarm-rule-service";
import { useFindEquipmentParametersByEquipmentIdMutation } from "modules/automation/services/equipment-parameter-service";
import { useModal } from "mui-modal-provider";
import EquipmentFormModal from "./components/equipment-form-modal/EquipmentFormModal";

const EquipmentDetailsPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const [findEquipment, { data: equipment, isLoading }] =
    useFindEquipmentByIdMutation();
  const { showModal } = useModal();

  const handleShowEquipmentModal = () => {
    const modal = showModal(EquipmentFormModal, {
      title: "Editar equipamento",
      onConfirm: () => {
        modal.hide();
      },
      onClose: () => {
        modal.hide();
      },
      mode: "edit",
      data: {
        site: equipment?.site?.id ?? "",
        building: equipment?.building?.id ?? "",
        floor: equipment?.floor?.id ?? "",
        room: equipment?.room?.id ?? "",
        name: equipment?.component ?? "",
        group: equipment?.group ?? 0,
        manufactor: "",
        powerLimit: equipment?.powerLimit ?? 0,
        serialNumber: equipment?.componentCode ?? "",
        description: equipment?.description ?? "",
        size: equipment?.size ?? "",
        weight: equipment?.weight ?? 0,
      },
    });
  };

  useEffect(() => {
    async function fetchEquipment() {
      if (params.equipmentId) {
        await findEquipment(params.equipmentId).unwrap();
      }
    }
    fetchEquipment();
  }, [findEquipment, params.equipmentId]);

  return (
    <HeroContainer title={equipment?.component}>
      <TabContextProvider>
        <LabelTabs items={["Detalhes", "Parâmetros", "Regras"]}>
          <Button variant="contained" onClick={handleShowEquipmentModal}>
            Editar equipamento
          </Button>
        </LabelTabs>
        <DetailsTab equipment={equipment} />
        <ParametersTab equipmentId={equipment?.id ?? ""} />
        <RulesTab equipmentId={equipment?.id ?? ""} />
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
              {equipment?.site?.name}
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
              {/* TODO: inserir fabricante aqui */}
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

type ParametersTabProps = {
  equipmentId: string;
};

const ParametersTab: React.FC<ParametersTabProps> = ({ equipmentId }) => {
  const { tabIndex } = useTabContext();
  const [findParameters, { data: parameters, isLoading }] =
    useFindEquipmentParametersByEquipmentIdMutation();

  useEffect(() => {
    async function fetchParameters() {
      await findParameters(equipmentId).unwrap();
    }
    fetchParameters();
  }, [equipmentId, findParameters]);

  return (
    <TabPanel index={1} value={tabIndex}>
      <DataTableV2
        title="Parâmetros"
        columns={parameterColumns}
        rows={parameters ?? []}
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
      <Loading open={isLoading} />
    </TabPanel>
  );
};

type RulesTabProps = {
  equipmentId: string;
};

const RulesTab: React.FC<RulesTabProps> = ({ equipmentId }) => {
  const { tabIndex } = useTabContext();
  const { data: rules, isLoading } =
    useFindAlarmRulesByEquipmentIdQuery(equipmentId);

  return (
    <TabPanel index={2} value={tabIndex}>
      <DataTableV2
        title="Regras"
        columns={ruleColumns}
        rows={
          rules?.map((rule) => ({
            rule: rule.name,
            parameter: rule.equipmentParameter?.name ?? "",
            conditional: rule.conditional,
            setpoint: rule.setpoint,
            priority: rule.priority,
          })) ?? []
        }
        options={{
          showEdit: false,
          showDelete: false,
          selectionMode: "hide",
        }}
      />
      <Loading open={isLoading} />
    </TabPanel>
  );
};

const parameterColumns: ColumnHeader[] = [
  {
    name: "name",
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
  // {
  //   name: "type",
  //   label: "Tipo",
  // },
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
