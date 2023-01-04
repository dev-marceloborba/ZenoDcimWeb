import HeroContainer from "modules/shared/components/HeroContainer";
import Button from "@mui/material/Button";
import DataTableV2, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import useRouter from "modules/core/hooks/useRouter";
import {
  useFindEquipmentByIdQueryQuery,
  useUpdateEquipmentMutation,
} from "modules/automation/services/equipment-service";
import { EquipmentModel } from "modules/automation/models/automation-model";
import Loading from "modules/shared/components/Loading";
import {
  useCreateAlarmRuleMutation,
  useDeleteAlarmRuleMutation,
  useFindAlarmRulesByEquipmentIdQuery,
  useUpdateAlarmRuleMutation,
} from "modules/automation/services/alarm-rule-service";
import {
  useDeleteEquipmentParameterMutation,
  useFindEquipmentParametersByEquipmentIdQueryQuery,
  useUpdateEquipmentParameterMutation,
} from "modules/automation/services/equipment-parameter-service";
import { useModal } from "mui-modal-provider";
import EquipmentFormModal from "./components/equipment-form-modal/EquipmentFormModal";
import Tabs from "modules/shared/components/tabs/Tabs";
import RuleFormModal from "modules/automation/modals/rule-form-modal/RuleFormModal";
import { useToast } from "modules/shared/components/ToastProvider";
import ParameterAssociationModal from "modules/automation/modals/parameter-association-modal/ParameterAssociationModal";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import EquipmentParameterFormModal from "modules/automation/modals/equipment-parameter-form-modal/EquipmentParameterFormModal";
import {
  AlarmRuleModel,
  EAlarmConditonal,
  EAlarmPriority,
} from "modules/automation/models/alarm-rule-model";
import { useFindAllParameterGroupsQuery } from "modules/automation/services/parameter-group-service";
// import CardSection from "modules/shared/components/card-section/CardSectionv2";
import CardSection from "modules/shared/components/card-section/CardSectionv3";

const EquipmentDetailsPage: React.FC = () => {
  const { params } = useRouter();
  const { data: equipment, isLoading: isLoadingFetch } =
    useFindEquipmentByIdQueryQuery(params.equipmentId!);

  const { data: parameters } =
    useFindEquipmentParametersByEquipmentIdQueryQuery(params.equipmentId!);

  const { data: groups } = useFindAllParameterGroupsQuery();

  const [updateEquipment, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentMutation();

  const [createRule, { isLoading: isLoadingCreateRule }] =
    useCreateAlarmRuleMutation();

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
    });
  };

  const handleOpenParameterAssociation = (equipmentId: string) => {
    const modal = showModal(ParameterAssociationModal, {
      title: "Associar parâmetros",
      data: {
        equipment: equipment?.component ?? "",
        groups: groups ?? [],
        parameters: parameters ?? [],
      },
      onConfirm: () => {
        modal.hide();
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        sx: {
          minWidth: "800px",
        },
      },
    });
  };

  const handleShowRuleModal = () => {
    const modal = showModal(RuleFormModal, {
      title: "Nova regra",
      parameters: parameters ?? [],
      onConfirm: async (data) => {
        modal.hide();
        try {
          await createRule(data).unwrap();
          toast.open({ message: "Regra criada com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar regra", severity: "error" });
        }
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
            element: <ParametersTab parameters={parameters ?? []} />,
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
            element: (
              <RulesTab
                equipmentId={equipment?.id ?? ""}
                parameters={parameters ?? []}
              />
            ),
            content: (
              <Button variant="contained" onClick={handleShowRuleModal}>
                Nova regra
              </Button>
            ),
          },
        ]}
      />
      <Loading
        open={isLoadingFetch || isLoadingUpdate || isLoadingCreateRule}
      />
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
      <CardSection
        title="Local"
        items={[
          { title: "Site", description: equipment?.site?.name },
          {
            title: "Prédio",
            description: equipment?.building?.name,
          },
          {
            title: "Andar",
            description: equipment?.floor?.name,
          },
          {
            title: "Sala",
            description: equipment?.room?.name,
          },
        ]}
      />
      <CardSection
        title="Identidade"
        items={[
          { title: "Equipamento", description: equipment?.component },
          {
            title: "Código/N série",
            description: equipment?.componentCode,
          },
          {
            title: "Grupo",
            description: "Clima",
          },
          {
            title: "Status",
            description: equipment?.status as string,
          },
          {
            title: "Marca",
            description: equipment?.manufactor,
          },
        ]}
        sx={{ mt: 1 }}
      />
      <CardSection
        title="Parâmetros do equipamento"
        items={[
          {
            title: "Peso",
            description: `${equipment?.weight} kg`,
          },
          {
            title: "Tamanho",
            description: `${equipment?.size} cm`,
          },
          {
            title: "Potência",
            description: `${equipment?.powerLimit} W`,
          },
          {
            title: "",
            description: "",
          },
          {
            title: "Descrição",
            description: equipment?.description,
            defaultSize: 6,
          },
        ]}
        sx={{ mt: 1 }}
      />
    </>
  );
};

type ParametersTabProps = {
  parameters: EquipmentParameterModel[];
};

const ParametersTab: React.FC<ParametersTabProps> = ({ parameters }) => {
  const { showModal } = useModal();
  const toast = useToast();
  const { navigate, path } = useRouter();

  const [updateParameter, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentParameterMutation();

  const [deleteParameter, { isLoading: isLoadingDelete }] =
    useDeleteEquipmentParameterMutation();

  const handleEditParameter = (parameter: EquipmentParameterModel) => {
    const modal = showModal(EquipmentParameterFormModal, {
      title: "Editar parâmetro do equipamento",
      data: parameter,
      mode: "edit",
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateParameter(formData).unwrap();
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
            navigate(`${path}/${row.id}/history`, {});
          },
        }}
      />
      <Loading open={isLoadingUpdate || isLoadingDelete} />
    </>
  );
};

type RulesTabProps = {
  equipmentId: string;
  parameters: EquipmentParameterModel[];
};

const RulesTab: React.FC<RulesTabProps> = ({ equipmentId, parameters }) => {
  const { showModal } = useModal();
  const toast = useToast();
  const { data: rules, isLoading: isLoadingFetch } =
    useFindAlarmRulesByEquipmentIdQuery(equipmentId);
  const [updateRule, { isLoading: isLoadingUpdate }] =
    useUpdateAlarmRuleMutation();
  const [deleteRule, { isLoading: isLoadingDelete }] =
    useDeleteAlarmRuleMutation();

  const handleEditRule = (rule: AlarmRuleModel) => {
    const modal = showModal(RuleFormModal, {
      title: "Editar regra",
      mode: "edit",
      parameters,
      data: rule,
      onConfirm: async (formData) => {
        modal.hide();
        console.log(formData);
        try {
          await updateRule({
            ...formData,
            conditional: formData.conditional as EAlarmConditonal,
            priority: formData.priority as EAlarmPriority,
            id: rule.id,
          }).unwrap();
          toast.open({ message: "Regra alterada com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar regra", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteRule = async (parameter: EquipmentParameterModel) => {
    try {
      await deleteRule(parameter.id).unwrap();
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
          rules?.map<any>((rule) => ({
            ...rule,
            equipmentParameterName: rule.equipmentParameter?.name,
          })) ?? []
        }
        options={{
          showEdit: true,
          showDelete: true,
          selectionMode: "hide",
          onEditRow: handleEditRule,
          onDeleteRow: handleDeleteRule,
        }}
      />
      <Loading open={isLoadingFetch || isLoadingUpdate || isLoadingDelete} />
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
    name: "name",
    label: "Regra",
  },
  {
    name: "equipmentParameterName",
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
