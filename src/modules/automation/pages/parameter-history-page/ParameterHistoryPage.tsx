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
import VirtualParameterFormModal from "modules/automation/modals/virtual-parameter-form-modal/VirtualParameterFormModal";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import { parse, compareDesc } from "date-fns";

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
  const { data: sites } = useFindAllSitesQuery();

  const handleEditParameter = () => {
    let modalToShow: any = EquipmentParameterFormModal;
    let params: any = parameter;
    if (!!parameter?.expression) {
      modalToShow = VirtualParameterFormModal;
      params = {
        model: parameter,
        sites,
      };
    }

    const modal = showModal(modalToShow, {
      title: "Editar parâmetro do equipamento",
      data: params,
      mode: "edit",
      onConfirm: async (formData: any) => {
        modal.destroy();
        try {
          await updateParameter({
            ...formData,
            equipmentId: params.equipmentId!,
            id: parameter?.id,
            pathname: parameter?.pathname,
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
        modal.destroy();
      },
    });
  };

  return (
    <HeroContainer title="Detalhes do parâmetro">
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
  console.log(parameter);

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
          {
            title: "Expressão",
            description: parameter?.expression ?? "",
            defaultSize: 12,
            isInvisible: parameter?.expression == null,
          },
          {
            title: "Id",
            description: parameter?.id ?? "",
            defaultSize: 12,
          },
          // {
          //   title: "Pathname",
          //   description: parameter?.pathname,
          //   defaultSize: 12,
          // },
        ]}
      />
      {parameter?.alarmRules?.length! > 0 ? (
        <Typography variant="subtitle1">Triggers</Typography>
      ) : null}
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
    initialDate: addDaysToDate(new Date(), -1),
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

  const getSortedData = () => {
    if (measures) {
      const filteredData = measures.filter(
        (item) => item !== null && item.timestamp !== null
      );
      const sortedData = filteredData.sort((a, b) => {
        const timestampA = parse(a.timestamp, "dd/MM/yyyy HH:mm", new Date());
        const timestampB = parse(b.timestamp, "dd/MM/yyyy HH:mm", new Date());
        return compareDesc(timestampA, timestampB);
      });
      return sortedData;
    } else return [];
  };

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
            measures={getSortedData()}
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
