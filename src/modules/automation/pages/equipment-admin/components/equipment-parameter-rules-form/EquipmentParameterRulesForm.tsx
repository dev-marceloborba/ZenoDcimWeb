import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlarmRuleViewModel,
  EAlarmConditonal,
  EAlarmPriority,
} from "modules/automation/models/alarm-rule-model";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import {
  useCreateAlarmRuleMutation,
  useUpdateAlarmRuleMutation,
} from "modules/automation/services/alarm-rule-service";
import useRouter from "modules/core/hooks/useRouter";
import ControlledCheckbox from "modules/shared/components/controlled-checkbox/ControlledCheckbox";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { number, object, SchemaOf, string } from "yup";
import getConditionalEnumFromDescription from "./helpers/getConditionalEnumFromDescription";
import getPriorityEnumFromDescription from "./helpers/getPriorityEnumFromDescription";
import Typography from "@mui/material/Typography";

type EquipmentParameterRulesProps = {
  name: string;
  priority: string;
  conditional: string;
  setpoint: number;
  alarmRuleId: string;
  equipmentParameterId: string;
  enableNotification: boolean;
  enableEmail: boolean;
};

export default function EquipmentParameterRulesForm() {
  const [createAlarmRule, { isLoading: isLoadingCreate }] =
    useCreateAlarmRuleMutation();
  const [updateAlarmRule, { isLoading: isLoadingUpdate }] =
    useUpdateAlarmRuleMutation();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
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

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<AlarmRuleViewModel> = async (data) => {
    if (mode === "new") {
      await createAlarmRule(data).unwrap();
      toast.open({ message: "Regra criada com sucesso" }).then(() => back());
    } else {
      await updateAlarmRule({
        ...data,
        id: selectedParameter.alarmRuleId,
        conditional: data.conditional as EAlarmConditonal,
        priority: data.priority as EAlarmPriority,
      }).unwrap();
      toast.open({ message: "Regra alterada com sucesso" }).then(() => back());
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
      setValue("enableNotification", selectedParameter.enableNotification);
      setValue("enableEmail", selectedParameter.enableEmail);
    }
  }, [mode, selectedParameter, setValue]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        priority: 0,
        conditional: 0,
        setpoint: 0,
        equipmentParameterId: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

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
          <Typography>Configurações</Typography>
          <ControlledCheckbox
            name="enableNotification"
            label="Habilitar notificação de alarme"
          />
          <ControlledCheckbox
            name="enableEmail"
            label="Habilitar envio por e-mail"
          />
          <SubmitButton disabled={!isValid} sx={{ mt: 2 }} />
        </Form>
      </FormProvider>
      <Loading open={isLoadingCreate || isLoadingUpdate} />
    </HeroContainer>
  );
}

const validationSchema = object().shape({
  name: string().required("Nome é obrigatório"),
  priority: number().required("Prioridade é obrigatória"),
  conditional: number().required("Condição é obrigatória"),
  setpoint: number().required("Set point é obrigatório"),
  equipmentParameterId: string().required("Parâmetro é obrigatório"),
});
