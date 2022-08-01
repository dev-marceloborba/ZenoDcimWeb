import { yupResolver } from "@hookform/resolvers/yup";
import { AlarmRuleViewModel } from "modules/automation/models/alarm-rule-model";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import {
  useCreateAlarmRuleMutation,
  useUpdateAlarmRuleMutation,
} from "modules/automation/services/alarm-rule-service";
import useRouter from "modules/core/hooks/useRouter";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";
import getConditionalEnumFromDescription from "./helpers/getConditionalEnumFromDescription";
import getPriorityEnumFromDescription from "./helpers/getPriorityEnumFromDescription";

type EquipmentParameterRulesProps = {
  name: string;
  priority: string;
  conditional: string;
  setpoint: number;
  alarmRuleId: string;
  equipmentParameterId: string;
};

export default function EquipmentParameterRulesForm() {
  const [createAlarmRule, { isLoading: isLoadingCreate }] =
    useCreateAlarmRuleMutation();
  const [updateAlarmRule, { isLoading: isLoadingUpdate }] =
    useUpdateAlarmRuleMutation();
  const methods = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { back } = useRouter();
  const {
    state: {
      data: { parameters, selectedParameter },
      mode,
    },
  }: {
    state: {
      data: {
        parameters: EquipmentParameterModel[];
        selectedParameter: EquipmentParameterRulesProps;
      };
      mode: "new" | "edit";
    };
  } = useRouter();

  const { handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<AlarmRuleViewModel> = async (data) => {
    if (mode === "new") {
      await createAlarmRule(data).unwrap();
      toast
        .open("Regra criada com sucesso", 2000, "success")
        .then(() => back());
    } else {
      await updateAlarmRule({
        id: selectedParameter.alarmRuleId,
        ...data,
      }).unwrap();
      toast
        .open("Regra alterada com sucesso", 2000, "success")
        .then(() => back());
    }
  };

  useEffect(() => {
    if (selectedParameter && mode === "edit") {
      setValue("equipmentParameterId", selectedParameter.equipmentParameterId);
      setValue("name", selectedParameter.name);
      setValue(
        "priority",
        getPriorityEnumFromDescription(selectedParameter.priority)
      );
      setValue(
        "conditional",
        getConditionalEnumFromDescription(selectedParameter.conditional)
      );
      setValue("setpoint", selectedParameter.setpoint);
    }
  }, [mode, selectedParameter, setValue]);

  return (
    <HeroContainer title="Criar/editar regra">
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            "& .MuiFormControl-root": {
              mt: 2,
            },
          }}
        >
          <ControlledTextInput
            name="equipmentParameterId"
            label="Parâmetro"
            items={parameters.map((parameter) => ({
              description: parameter.name,
              value: parameter.id,
            }))}
          />
          <ControlledTextInput name="name" label="Regra" />
          <ControlledTextInput
            name="priority"
            label="Prioridade"
            items={[
              {
                description: "Baixa",
                value: 0,
              },
              {
                description: "Média",
                value: 1,
              },
              {
                description: "Alta",
                value: 2,
              },
            ]}
          />
          <ControlledTextInput
            name="conditional"
            label="Condição"
            items={[
              {
                description: "Igual",
                value: 0,
              },
              {
                description: "Maior",
                value: 1,
              },
              {
                description: "Maior ou igual",
                value: 2,
              },
              {
                description: "Menor",
                value: 3,
              },
              {
                description: "Menor ou igual",
                value: 4,
              },
            ]}
          />
          <ControlledTextInput name="setpoint" label="Setpoint" />
          <SubmitButton label="Salvar" sx={{ mt: 2 }} />
        </Form>
      </FormProvider>
      <Loading open={isLoadingCreate || isLoadingUpdate} />
    </HeroContainer>
  );
}

const validationSchema: SchemaOf<AlarmRuleViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  priority: number().required("Prioridade é obrigatória"),
  conditional: number().required("Condição é obrigatória"),
  setpoint: number().required("Set point é obrigatório"),
  equipmentParameterId: string().required("Parâmetro é obrigatório"),
});
