import { useEffect, useMemo, useCallback } from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { automationPaths } from "modules/automation/routes/paths";
import {
  useCreateAlarmRuleMutation,
  useDeleteAlarmRuleMutation,
  useFindAlarmRuleByIdMutation,
} from "modules/automation/services/alarm-rule-service";
import Loading from "modules/shared/components/Loading";
import useRouter from "modules/core/hooks/useRouter";
import { EquipmentModel } from "modules/automation/models/automation-model";
import { useToast } from "modules/shared/components/ToastProvider";
import getPriorityDescription from "./helpers/getPriorityDescription";
import getConditionalDescription from "./helpers/getConditionalDescription";
import { useFindEquipmentByIdMutation } from "modules/automation/services/equipment-service";
import { AlarmRuleViewModel } from "modules/automation/models/alarm-rule-model";

type EquipmentParameterRulesViewModel = {
  id: string;
  equipmentParameterId: string;
  equipmentParameterName: string;
  alarmRuleId: string;
  name: string;
  priority: string;
  conditional: string;
  setpoint: number;
  enableNotification: boolean;
  enableEmail: boolean;
};

export default function EquipmentParameterRules() {
  const {
    state: { data: equipment },
  }: { state: { data: EquipmentModel } } = useRouter();
  const { navigate } = useRouter();

  const [findEquipmentRules, { data: alarmRules, isLoading }] =
    useFindEquipmentByIdMutation();

  const [createAlarmRule] = useCreateAlarmRuleMutation();
  const [findAlarmRule] = useFindAlarmRuleByIdMutation();
  const [deleteAlarmRule] = useDeleteAlarmRuleMutation();
  const toast = useToast();

  const handleDeleteSelection = async (
    selection: EquipmentParameterRulesViewModel[]
  ) => {
    for (let i = 0; i < selection.length; i++) {
      await deleteAlarmRule(selection[i].alarmRuleId).unwrap();
    }
    toast.open({ message: "Alarme(s) excluído(s) com sucesso" });
    fetchAlarmRules();
  };

  const fetchAlarmRules = useCallback(async () => {
    if (equipment) {
      await findEquipmentRules(equipment.id).unwrap();
    }
  }, [equipment, findEquipmentRules]);

  useEffect(() => {
    fetchAlarmRules();
  }, [equipment, fetchAlarmRules, findEquipmentRules]);

  const data = useMemo(() => {
    let equipmentParameters: EquipmentParameterRulesViewModel[] = [];
    alarmRules?.equipmentParameters?.forEach((equipmentParameter) => {
      if (equipmentParameter.alarmRules) {
        equipmentParameter.alarmRules.forEach((alarmRule) => {
          equipmentParameters.push({
            id: alarmRule.id,
            equipmentParameterId: equipmentParameter.id,
            equipmentParameterName: equipmentParameter.name,
            alarmRuleId: alarmRule.id,
            name: alarmRule.name,
            priority: getPriorityDescription(alarmRule.priority),
            conditional: getConditionalDescription(alarmRule.conditional),
            setpoint: alarmRule.setpoint,
            enableNotification: alarmRule.enableNotification,
            enableEmail: alarmRule.enableEmail,
          });
        });
      }
    });
    return equipmentParameters;
  }, [alarmRules]);

  const handleRowClick = (row: EquipmentParameterRulesViewModel) => {
    navigate(
      compositePathRoute([
        HomePath,
        AutomationPath,
        automationPaths.equipmentRulesForm.fullPath,
      ]),
      {
        state: {
          data: {
            parameters: alarmRules?.equipmentParameters,
            selectedParameter: row,
          },
          mode: "edit",
        },
      }
    );
  };

  const handleDuplicateItem = async (equipmentParameterRule: any) => {
    const item = await findAlarmRule(equipmentParameterRule.id).unwrap();
    const duplicate: AlarmRuleViewModel = {
      ...item,
      name: equipmentParameterRule.name + " - cópia",
    };

    try {
      await createAlarmRule(duplicate).unwrap();
      toast.open({ message: "Regra duplicada" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao duplicar regra", severity: "error" });
    }
  };

  return (
    <HeroContainer title="Regras de disparo">
      <AccessButton
        label="Nova regra"
        mode="regularButton"
        variant="outlined"
        onClick={() => {
          navigate(
            compositePathRoute([
              HomePath,
              AutomationPath,
              automationPaths.equipmentRulesForm.fullPath,
            ]),
            {
              state: {
                data: {
                  parameters: alarmRules?.equipmentParameters,
                  selectedParameter: null,
                },
                mode: "new",
              },
            }
          );
        }}
      />
      <DataTable
        title="Regras"
        columns={columns}
        rows={data ?? []}
        options={{
          onDeleteSelection: handleDeleteSelection,
          onRowClick: handleRowClick,
          isEditMode: false,
          onCopyItem: handleDuplicateItem,
          userPreferenceTable: "ruleTable",
        }}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "equipmentParameterName",
    label: "Parâmetro",
  },
  {
    name: "name",
    label: "Regra",
  },
  {
    name: "priority",
    label: "Prioridade",
  },
  {
    name: "conditional",
    label: "Condição",
  },
  {
    name: "setpoint",
    label: "Setpoint",
  },
  {
    name: "enableNotification",
    label: "Receber notificação",
    customFunction: (row) => (row ? "Sim" : "Não"),
  },
  {
    name: "enableEmail",
    label: "Receber e-mail",
    customFunction: (row) => (row ? "Sim" : "Não"),
  },
];
