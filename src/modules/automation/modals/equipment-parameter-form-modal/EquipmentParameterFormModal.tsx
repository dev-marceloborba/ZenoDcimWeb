import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { FormMode } from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { array, boolean, number, object, SchemaOf, string } from "yup";
import {
  EquipmentParameterEditor,
  EquipmentParameterModel,
} from "modules/automation/models/automation-model";
import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddButton from "modules/shared/components/add-button/AddButton";
import { AlarmRuleEditor } from "modules/automation/models/alarm-rule-model";
import { Formik, Form, FieldArray } from "formik";
import TextInput from "modules/shared/components/form-wrapper/text-input/TextInput";
import TriggerSetting from "modules/automation/components/trigger-setting-custom-form/TriggerSettingCustomForm";

const defaultGuid = "00000000-0000-0000-0000-000000000000";

type Props = {
  mode?: FormMode;
  data?: EquipmentParameterModel;
  onConfirm(data: EquipmentParameterEditor): void;
} & ModalProps;

const EquipmentParameterFormModal: React.FC<Props> = ({
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
        id: x.id ?? defaultGuid,
      })) ?? [],
  };
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
        id: x.id ?? defaultGuid,
      })),
    });
  return (
    <Modal {...props}>
      <Formik
        validateOnMount
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ values, isValid }) => (
          <Form autoComplete="off" noValidate style={{ marginTop: "1rem" }}>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item md={12}>
                <TextInput name="name" label="Parâmetro" />
              </Grid>
              <Grid item md={6}>
                <TextInput name="unit" label="Unidade" />
              </Grid>
              <Grid item md={6}>
                <TextInput name="scale" label="Escala" />
              </Grid>
            </Grid>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Triggers
            </Typography>
            <FieldArray name="alarmRules">
              {({ push, remove }) => (
                <>
                  {values.alarmRules.map((_r, idx) => {
                    return (
                      <TriggerSetting key={idx} index={idx} onRemove={remove} />
                    );
                  })}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <AddButton
                      onClick={() =>
                        push({
                          id: defaultGuid,
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
              )}
            </FieldArray>
            <SubmitButton disabled={!isValid} sx={{ mt: 2 }} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EquipmentParameterFormModal;

type FormProps = {
  id?: string;
  name: string;
  unit: string;
  scale: number;
  alarmRules: AlarmRule[];
};

type AlarmRule = {
  id?: string;
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
      id: string().notRequired(),
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
