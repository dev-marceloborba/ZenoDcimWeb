import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form, { FormMode } from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import {
  FormProvider,
  useForm,
  useFieldArray,
  UseFormReturn,
  UseFieldArrayReturn,
} from "react-hook-form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { array, boolean, number, object, SchemaOf, string } from "yup";
import {
  EquipmentParameterEditor,
  EquipmentParameterModel,
} from "modules/automation/models/automation-model";
import { useState } from "react";
import SearchButton from "modules/shared/components/search-button/SearchButton";
import { SiteModel } from "modules/datacenter/models/datacenter-model";
import DatacenterTreeviewExplorer from "modules/datacenter/components/datacenter-treeview-explorer/DatacenterTreeviewExplorer";
import Tabs from "modules/shared/components/tabs/Tabs";
import TriggerSetting from "modules/automation/components/trigger-setting-custom-form/TriggerSettingCustomFormv2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddButton from "modules/shared/components/add-button/AddButton";
import { AlarmRuleEditor } from "modules/automation/models/alarm-rule-model";

type VirtualParameterFormModalProps = {
  onConfirm(formData: EquipmentParameterEditor): void;
  mode?: FormMode;
  data?: {
    model?: EquipmentParameterModel;
    sites?: SiteModel[];
  };
} & ModalProps;

type ParameterSelection = {
  site: string;
  building: string;
  room: string;
  floor: string;
  equipment: string;
  parameter: string;
};

const VirtualParameterFormModal: React.FC<VirtualParameterFormModalProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded((prevState) => !prevState);

  const methods = useForm<FormProps>({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
    defaultValues: {
      ...data?.model,
      alarmRules: data?.model?.alarmRules?.map((x) => ({ ...x, _id: x.id })),
    },
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
      alarmRules: formData.alarmRules.map<AlarmRuleEditor>((x) => ({
        ...x,
        id: x._id ?? defaultGuid,
      })),
    });

  return (
    <Modal
      {...props}
      PaperProps={{
        sx: {
          minWidth: expanded ? "900px" : "600px",
          transition: "all 200ms linear",
        },
      }}
    >
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Tabs
            mode="horizontal"
            tabLabels={["Parâmetro", "Regras"]}
            tabItems={[
              {
                element: (
                  <ParameterTab
                    expanded={expanded}
                    onExpand={handleExpand}
                    model={data?.model}
                    sites={data?.sites}
                    methods={methods}
                  />
                ),
              },
              {
                element: <TriggersTab fieldArray={fieldArray} />,
              },
            ]}
          />
          <SubmitButton disabled={!methods.formState.isValid} sx={{ mt: 1 }} />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default VirtualParameterFormModal;

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

type FormProps = {
  id?: string;
  name: string;
  unit: string;
  scale: number;
  expression: string;
  alarmRules: AlarmRule[];
};

const schemaValidation = object().shape({
  name: string().required("Nome é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  expression: string().required("Expressão é obrigatória"),
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

type ParameterTabProps = {
  model?: EquipmentParameterModel;
  sites?: SiteModel[];
  onExpand(): void;
  expanded: boolean;
  methods: UseFormReturn<FormProps, object>;
};

const ParameterTab: React.FC<ParameterTabProps> = ({
  model,
  sites,
  onExpand,
  expanded,
  methods,
  ...props
}) => {
  const handleParameterClick = (selection: ParameterSelection) => {
    const pathname = Object.values(selection).join(".");
    methods.setValue("expression", currentExpression + pathname);
  };

  const currentExpression = methods.watch("expression");

  return (
    <Grid container columnSpacing={1}>
      <Grid item md={expanded ? 6 : 12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ControlledTextInput label="Parâmetro" name="name" />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextInput label="Unidade" name="unit" />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextInput label="Escala" name="scale" defaultValue={1} />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextInput
              label="Expressão"
              name="expression"
              multiline
              rows={6}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchButton onClick={onExpand} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {expanded ? (
        <Grid item md={6}>
          <DatacenterTreeviewExplorer
            sites={sites ?? []}
            onParameterClick={handleParameterClick}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

type TriggersTabProps = {
  fieldArray: UseFieldArrayReturn<FormProps, "alarmRules", "id">;
};

const TriggersTab: React.FC<TriggersTabProps> = ({ fieldArray, ...props }) => {
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

const defaultGuid = "00000000-0000-0000-0000-000000000000";
