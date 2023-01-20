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
} from "modules/automation/models/alarm-rule-model";

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
    defaultValues: data,
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    onConfirm({
      ...data,
      enableNotification: data?.enableNotification ?? false,
      enableEmail: data?.enableEmail ?? false,
    });
  };

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
  type: number;
  equipmentParameterId: string;
  enableNotification?: boolean;
  enableEmail?: boolean;
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  name: string().required("Nome é obrigatório"),
  priority: number().required("Prioridade é obrigatória"),
  conditional: number().required("Condição é obrigatória"),
  type: number().required("Tipo é obrigatório"),
  setpoint: number().required("Set point é obrigatório"),
  equipmentParameterId: string().required("Parâmetro é obrigatório"),
  enableNotification: boolean().notRequired(),
  enableEmail: boolean().notRequired(),
});
