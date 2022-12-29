import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import HeroContainer from "modules/shared/components/HeroContainer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataTableV2, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import Paper, { PaperProps } from "@mui/material/Paper";
import useRouter from "modules/core/hooks/useRouter";
import {
  useFindEquipmentByIdQueryQuery,
  useUpdateEquipmentMutation,
} from "modules/automation/services/equipment-service";
import { EquipmentModel } from "modules/automation/models/automation-model";
import Loading from "modules/shared/components/Loading";
import { useFindAlarmRulesByEquipmentIdQuery } from "modules/automation/services/alarm-rule-service";
import {
  useDeleteEquipmentParameterMutation,
  useFindEquipmentParametersByEquipmentIdMutation,
  useFindEquipmentParametersByEquipmentIdQueryQuery,
} from "modules/automation/services/equipment-parameter-service";
import { useModal } from "mui-modal-provider";
import EquipmentFormModal from "./components/equipment-form-modal/EquipmentFormModal";
import Tabs from "modules/shared/components/tabs/Tabs";
import RuleFormModal from "modules/automation/modals/rule-form-modal/RuleFormModal";
import { useToast } from "modules/shared/components/ToastProvider";
import ParameterAssociationModal from "modules/automation/modals/parameter-association-modal/ParameterAssociationModal";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import EquipmentParameterFormModal from "modules/automation/modals/equipment-parameter-form-modal/EquipmentParameterFormModal";

const EquipmentDetailsPage: React.FC = () => {
  const { data: sites } = useFindAllSitesQuery();
  const { params } = useRouter();
  const { data: equipment, isLoading: isLoadingFetch } =
    useFindEquipmentByIdQueryQuery(params.equipmentId!);
  const [updateEquipment, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const handleShowEquipmentModal = () => {
    const modal = showModal(EquipmentFormModal, {
      title: "Editar equipamento",
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateEquipment({
            id: equipment?.id ?? "",
            ...formData,
          }).unwrap();
          toast.open({ message: "Equipamento atualizado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao atualizar equipamento",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
      mode: "edit",
      data: equipment,
      // data: {
      //   siteId: equipment?.site?.id ?? "",
      //   buildingId: equipment?.building?.id ?? "",
      //   floorId: equipment?.floor?.id ?? "",
      //   roomId: equipment?.room?.id ?? "",
      //   component: equipment?.component ?? "",
      //   group: equipment?.group ?? 0,
      //   // manufactor: "",
      //   powerLimit: equipment?.powerLimit ?? 0,
      //   componentCode: equipment?.componentCode ?? "",
      //   description: equipment?.description ?? "",
      //   size: equipment?.size ?? "",
      //   weight: equipment?.weight ?? 0,
      // },
    });
  };

  const handleOpenParameterAssociation = (equipmentId: string) => {
    const modal = showModal(ParameterAssociationModal, {
      title: "Associar parâmetros",
      equipment: equipment?.component ?? "",
      sites: sites ?? [],
      onConfirm: () => {
        modal.hide();
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        sx: {
          minWidth: "500px",
        },
      },
    });
  };

  const handleShowRuleModal = () => {
    const modal = showModal(RuleFormModal, {
      title: "Nova regra",
      parameters: [],
      onConfirm: (data) => {
        modal.hide();
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <HeroContainer title={equipment?.component}>
      <Tabs
        mode="horizontal"
        tabLabels={["Detalhes", "Parâmetros", "Regras"]}
        tabItems={[
          {
            element: <DetailsTab equipment={equipment} />,
            content: (
              <Button variant="contained" onClick={handleShowEquipmentModal}>
                Editar equipamento
              </Button>
            ),
          },
          {
            element: <ParametersTab equipmentId={equipment?.id ?? ""} />,
            content: (
              <Button
                variant="contained"
                onClick={() => handleOpenParameterAssociation(equipment!.id)}
              >
                Associar parâmetros
              </Button>
            ),
          },
          {
            element: <RulesTab equipmentId={equipment?.id ?? ""} />,
            content: (
              <Button variant="contained" onClick={handleShowRuleModal}>
                Nova regra
              </Button>
            ),
          },
        ]}
      />
      <Loading open={isLoadingFetch || isLoadingUpdate} />
    </HeroContainer>
  );
};

export default EquipmentDetailsPage;

type DetailsTabProps = {
  equipment: EquipmentModel | undefined;
};

const DetailsTab: React.FC<DetailsTabProps> = ({ equipment }) => {
  return (
    <>
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
            my: 1,
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
              {equipment?.status}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Marca
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {equipment?.manufactor}
            </Typography>
          </Grid>
        </Grid>
      </CardSection>

      <CardSection sx={{ mt: 2, mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: "underline",
            my: 1,
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
    </>
  );
};

type ParametersTabProps = {
  equipmentId: string;
};

const ParametersTab: React.FC<ParametersTabProps> = ({ equipmentId }) => {
  const { showModal } = useModal();
  const toast = useToast();
  const { navigate, path } = useRouter();
  const { data: parameters, isLoading } =
    useFindEquipmentParametersByEquipmentIdQueryQuery(equipmentId);
  const [deleteParameter] = useDeleteEquipmentParameterMutation();

  const handleEditParameter = (parameter: EquipmentParameterModel) => {
    const modal = showModal(EquipmentParameterFormModal, {
      title: "Editar parâmetro do equipamento",
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteParameter = async (parameter: EquipmentParameterModel) => {
    try {
      await deleteParameter(parameter.id).unwrap();
      toast.open({ message: "Parâmetro excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir parâmetro", severity: "error" });
    }
  };

  return (
    <>
      <DataTableV2
        title="Parâmetros"
        columns={parameterColumns}
        rows={parameters ?? []}
        options={{
          showEdit: true,
          showDelete: true,
          selectionMode: "hide",
          onEditRow: handleEditParameter,
          onDeleteRow: handleDeleteParameter,
          onRowClick: (row) => {
            navigate(`${path}/parameters`, {});
          },
        }}
      />
      <Loading open={isLoading} />
    </>
  );
};

type RulesTabProps = {
  equipmentId: string;
};

const RulesTab: React.FC<RulesTabProps> = ({ equipmentId }) => {
  const { showModal } = useModal();
  const toast = useToast();
  const { data: rules, isLoading } =
    useFindAlarmRulesByEquipmentIdQuery(equipmentId);
  const [deleteParameter] = useDeleteEquipmentParameterMutation();

  const handleEditParameter = (parameter: EquipmentParameterModel) => {
    const modal = showModal(EquipmentParameterFormModal, {
      title: "Editar parâmetro do equipamento",
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteParameter = async (parameter: EquipmentParameterModel) => {
    try {
      await deleteParameter(parameter.id).unwrap();
      toast.open({ message: "Parâmetro excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir parâmetro", severity: "error" });
    }
  };

  return (
    <>
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
          showEdit: true,
          showDelete: true,
          selectionMode: "hide",
          onEditRow: handleEditParameter,
          onDeleteRow: handleDeleteParameter,
        }}
      />
      <Loading open={isLoading} />
    </>
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
