import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Form, { FormMode } from "modules/shared/components/Form";
import ControlledCheckbox from "modules/shared/components/controlled-checkbox/ControlledCheckbox";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Typography from "@mui/material/Typography";
import SubmitButton from "modules/shared/components/SubmitButton";
import { boolean, number, object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import {
  AlarmRuleModel,
  AlarmRuleViewModel,
  EAlarmConditonal,
  EAlarmPriority,
} from "modules/automation/models/alarm-rule-model";
import { useEffect } from "react";

type RuleFormModalProps = {
  mode?: FormMode;
  parameters: EquipmentParameterModel[];
  onConfirm(form: AlarmRuleViewModel): void;
  data?: AlarmRuleModel;
} & ModalProps;

const RuleFormModal: React.FC<RuleFormModalProps> = ({
  mode = "new",
  data,
  parameters,
  onConfirm,
  ...props
}) => {
  const methods = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    onConfirm({
      ...data,
      enableNotification: data?.enableNotification ?? false,
      enableEmail: data?.enableEmail ?? false,
    });
  };

  useEffect(() => {
    if (mode === "edit") {
      console.log(data);
      reset({
        ...data,
        conditional: getConditionalEnumFromDescription(
          data?.conditional as string
        ),
        priority: getPriorityEnumFromDescription(data?.priority as string),
      });
    }
  }, [data, mode, reset]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            "& .MuiFormControl-root": {
              mt: 1,
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
    </Modal>
  );
};

export default RuleFormModal;

type FormProps = {
  name: string;
  priority: number;
  conditional: number;
  setpoint: number;
  equipmentParameterId: string;
  enableNotification?: boolean;
  enableEmail?: boolean;
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  name: string().required("Nome é obrigatório"),
  priority: number().required("Prioridade é obrigatória"),
  conditional: number().required("Condição é obrigatória"),
  setpoint: number().required("Set point é obrigatório"),
  equipmentParameterId: string().required("Parâmetro é obrigatório"),
  enableNotification: boolean().notRequired(),
  enableEmail: boolean().notRequired(),
});

function getConditionalEnumFromDescription(
  description: string
): EAlarmConditonal {
  switch (description) {
    case "Menor":
      return EAlarmConditonal.LOWER;
    case "Menor ou igual":
      return EAlarmConditonal.LOWER_EQUAL;
    case "Maior":
      return EAlarmConditonal.GREATER;
    case "Maior ou igual":
      return EAlarmConditonal.GREATER_EQUAL;
    default:
      return EAlarmConditonal.EQUAL;
  }
}

function getPriorityEnumFromDescription(description: string): EAlarmPriority {
  switch (description) {
    case "Média":
      return EAlarmPriority.MEDIUM;
    case "Alta":
      return EAlarmPriority.HIGH;
    default:
      return EAlarmPriority.LOW;
  }
}
