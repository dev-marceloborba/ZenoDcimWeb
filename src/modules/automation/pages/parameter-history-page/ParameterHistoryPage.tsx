import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useRouter from "modules/core/hooks/useRouter";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useFindMeasuresByParameterMutation } from "modules/automation/services/history-service";
import ParameterChart from "./components/parameter-chart/ParameterChart";
import {
  useFindEquipmentParameterByIdQueryQuery,
  useUpdateEquipmentParameterMutation,
} from "modules/automation/services/equipment-parameter-service";
import Tabs from "modules/shared/components/tabs/Tabs";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import CardSection from "modules/shared/components/card-section/CardSectionv3";
import {
  getAlarmConditionalFromEnum,
  getAlarmPriorityFromEnum,
  getAlarmTypeFromEnum,
} from "modules/alarms/utils/alarmUtils";
import { useModal } from "mui-modal-provider";
import EquipmentParameterFormModal from "modules/automation/modals/equipment-parameter-form-modal/EquipmentParameterFormModalv2";
import { useToast } from "modules/shared/components/ToastProvider";

type FilterState = {
  initialDate: Date | null;
  finalDate: Date | null;
};

export default function ParameterHistoryPage() {
  const { params } = useRouter();
  const { showModal } = useModal();
  const toast = useToast();
  const {
    data: parameter,
    isLoading,
    refetch,
  } = useFindEquipmentParameterByIdQueryQuery(params.equipmentParameterId!);
  const [updateParameter, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentParameterMutation();

  const handleEditParameter = () => {
    const modal = showModal(EquipmentParameterFormModal, {
      title: "Editar parâmetro",
      mode: "edit",
      data: parameter,
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateParameter({
            ...formData,
            equipmentId: params.equipmentId!,
            id: parameter!.id,
          }).unwrap();
          refetch();
          toast.open({ message: "Parâmetro atualizado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao atualizar parâmetro",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  return (
    <HeroContainer title="Histórico de parâmetro">
      <Tabs
        tabItems={[
          {
            title: "Detalhes",
            element: <DetailsTab parameter={parameter} />,
            content: (
              <Button variant="contained" onClick={handleEditParameter}>
                Editar parâmetro
              </Button>
            ),
          },
          {
            title: "Histórico",
            element: <HistorianTab parameter={parameter} />,
          },
        ]}
      />
      <Loading open={isLoading || isLoadingUpdate} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "parameter",
    label: "Parâmetro",
  },
  {
    name: "value",
    label: "Valor",
  },
  {
    name: "timestamp",
    label: "Estampa de tempo",
    customFunction: (row) => getTimeStampFormat(row),
  },
];

type DetailsTabProps = {
  parameter: EquipmentParameterModel | undefined;
};

const DetailsTab: React.FC<DetailsTabProps> = ({ parameter }) => {
  return (
    <>
      <CardSection
        title="Dados do parâmetro"
        items={[
          {
            title: "Título",
            description: parameter?.name,
          },
          {
            title: "Unidade",
            description: parameter?.unit,
          },
          {
            title: "Escala",
            description: parameter?.scale.toString(),
          },
        ]}
      />
      <Typography variant="subtitle1">Triggers</Typography>
      {parameter?.alarmRules?.map((alarmRule, idx) => (
        <TriggerDetails
          key={alarmRule.id}
          index={idx + 1}
          value={alarmRule.setpoint}
          message={alarmRule.name}
          comparator={getAlarmConditionalFromEnum(alarmRule.conditional)}
          severity={getAlarmPriorityFromEnum(alarmRule.priority)}
          type={getAlarmTypeFromEnum(alarmRule.type)}
        />
      ))}
    </>
  );
};

type HistorianTabProps = {
  parameter: EquipmentParameterModel | undefined;
};

const HistorianTab: React.FC<HistorianTabProps> = ({ parameter }) => {
  const [filter, setFilter] = useState<FilterState>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });
  const [findMeasuresByParameter, { data: measures, isLoading }] =
    useFindMeasuresByParameterMutation();

  const handleChangeDates = (
    date: Date | null | undefined,
    interval: keyof Pick<FilterState, "initialDate" | "finalDate">
  ) =>
    setFilter((prevState) => ({
      ...prevState,
      [interval]: date,
    }));

  useEffect(() => {
    async function fetchMeasures() {
      await findMeasuresByParameter({
        parameter: parameter?.name,
        initialDate: filter.initialDate,
        finalDate: filter.finalDate,
      }).unwrap();
    }
    fetchMeasures();
  }, [
    filter.finalDate,
    filter.initialDate,
    findMeasuresByParameter,
    parameter?.name,
  ]);

  return (
    <>
      <Row sx={{ mb: 2 }}>
        <DateTimePicker
          label="Data inicial"
          value={filter.initialDate}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} />}
          onAccept={(d) => handleChangeDates(d, "initialDate")}
        />
        <DateTimePicker
          label="Data final"
          value={filter.finalDate}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} sx={{ ml: 1 }} />}
          onAccept={(d) => handleChangeDates(d, "finalDate")}
        />
      </Row>
      <Grid container columnSpacing={1}>
        <Grid item md={6}>
          <DataTable
            title={parameter?.name ?? ""}
            rows={measures ?? []}
            columns={columns}
          />
        </Grid>
        <Grid item md={6}>
          <ParameterChart
            measures={measures ?? []}
            description={parameter?.name ?? ""}
          />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </>
  );
};

type TriggerDetailsProps = {
  index: number;
  type: string;
  value: number;
  comparator: string;
  severity: string;
  message: string;
};

const TriggerDetails: React.FC<TriggerDetailsProps> = ({
  index,
  type,
  value,
  comparator,
  severity,
  message,
}) => {
  return (
    <Paper sx={{ mt: 1 }}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Avatar sx={{ mx: 1 }}>{index}</Avatar>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item md={3}>
            <Typography>Tipo</Typography>
            <Typography>{type}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>Valor</Typography>
            <Typography>{value}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>Comparador</Typography>
            <Typography>{comparator}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>Severidade</Typography>
            <Typography>{severity}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>Mensagem</Typography>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};
