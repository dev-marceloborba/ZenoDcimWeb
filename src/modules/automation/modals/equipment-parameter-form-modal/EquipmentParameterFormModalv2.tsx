import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Form, { FormMode } from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import {
  FormProvider,
  useForm,
  useFieldArray,
  UseFieldArrayReturn,
} from "react-hook-form";
import { array, boolean, number, object, SchemaOf, string } from "yup";
import {
  EquipmentParameterEditor,
  EquipmentParameterModel,
} from "modules/automation/models/automation-model";
import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AddButton from "modules/shared/components/add-button/AddButton";
import { AlarmRuleEditor } from "modules/automation/models/alarm-rule-model";
import TriggerSetting from "modules/automation/components/trigger-setting-custom-form/TriggerSettingCustomFormv2";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import Tabs from "modules/shared/components/tabs/Tabs";

const defaultGuid = "00000000-0000-0000-0000-000000000000";

type Props = {
  mode?: FormMode;
  data?: EquipmentParameterModel;
  onConfirm(data: EquipmentParameterEditor): void;
} & ModalProps;

const EquipmentParameterFormModalv2: React.FC<Props> = ({
  mode = "new",
  data,
  onConfirm,
  ...props
}) => {
  const initialValues = {
    id: data?.id ?? defaultGuid,
    name: data?.name ?? "",
    scale: data?.scale ?? 1,
    unit: data?.unit ?? "",
    alarmRules:
      data?.alarmRules?.map<AlarmRule>((x) => ({
        ...x,
        _id: x.id ?? defaultGuid,
      })) ?? [],
  };

  const methods = useForm<FormProps>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const fieldArray = useFieldArray({
    control: methods.control,
    name: "alarmRules",
  });

  const onSubmit = (formData: FormProps) =>
    onConfirm({
      id: formData.id ?? defaultGuid,
      address: "",
      dataSource: "",
      equipmentId: "",
      name: formData.name,
      scale: formData.scale,
      unit: formData.unit,
      expression: "",
      pathname: "",
      alarmRules: formData.alarmRules.map<AlarmRuleEditor>((x) => ({
        ...x,
        id: x._id ?? defaultGuid,
      })),
    });
  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} sx={{ marginTop: 1 }}>
          <Tabs
            mode="horizontal"
            tabLabels={["Parâmetro", "Regras"]}
            tabItems={[
              {
                element: <ParameterTab />,
              },
              {
                element: <TriggersTab fieldArray={fieldArray} />,
              },
            ]}
          />
          <SubmitButton disabled={!methods.formState.isValid} sx={{ mt: 2 }} />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default EquipmentParameterFormModalv2;

type FormProps = {
  id?: string;
  name: string;
  unit: string;
  scale: number;
  alarmRules: AlarmRule[];
};

type AlarmRule = {
  _id?: string;
  setpoint: number;
  conditional: number;
  type: number;
  priority: number;
  name: string;
  enableEmail: boolean;
  enableNotification: boolean;
};

//@ts-ignore
const validationSchema: SchemaOf<FormProps> = object().shape({
  id: string().notRequired(),
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  alarmRules: array(
    object().shape({
      _id: string().notRequired(),
      setpoint: number().required("Valor é obrigatório"),
      conditional: number().required("Comparador é obrigatório"),
      type: number().required("Tipo é obrigatório"),
      priority: number().required("Severidade é obrigatório"),
      name: string().required("Mensagem é obrigatória"),
      enableEmail: boolean(),
      enableNotification: boolean(),
    })
  ),
});

const ParameterTab: React.FC = () => {
  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid item md={12}>
        <ControlledTextInput name="name" label="Parâmetro" />
      </Grid>
      <Grid item md={6}>
        <ControlledTextInput name="unit" label="Unidade" />
      </Grid>
      <Grid item md={6}>
        <ControlledTextInput name="scale" label="Escala" />
      </Grid>
    </Grid>
  );
};

type TriggersTabProps = {
  fieldArray: UseFieldArrayReturn<FormProps, "alarmRules", "id">;
};

const TriggersTab: React.FC<TriggersTabProps> = ({ fieldArray }) => {
  return (
    <>
      {fieldArray.fields.map((_r, idx) => {
        return (
          <TriggerSetting key={idx} index={idx} onRemove={fieldArray.remove} />
        );
      })}
      <Stack direction="row" alignItems="center" justifyContent="center">
        <AddButton
          onClick={() =>
            fieldArray.append({
              _id: defaultGuid,
              setpoint: 0,
              conditional: 0,
              type: 0,
              priority: 0,
              name: "",
              enableEmail: false,
              enableNotification: false,
            })
          }
        />
      </Stack>
    </>
  );
};
