import Form, { FormMode } from "modules/shared/components/Form";
import Grid from "@mui/material/Grid";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { number, object, string } from "yup";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SiteModel } from "modules/datacenter/models/datacenter-model";
import { useEffect, useReducer } from "react";
import locationReducer, {
  locationInitialState,
  LocationReducerType,
} from "modules/core/reducers/locationReducer";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ControlledDateInput from "modules/shared/components/ControlledDateInput";

type WorkOrderFormProps = {
  mode?: FormMode;
  data?: {
    sites: SiteModel[];
  };
  onSaveDraft(formData: any): void;
  onSendToAproval(formData: any): void;
} & ModalProps;

const WorkOrderFormModal: React.FC<WorkOrderFormProps> = ({
  mode = "new",
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(locationReducer, locationInitialState);
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch({
      type: LocationReducerType.GET_SITES,
      payload: {
        sites: data?.sites,
      },
    });
  }, [data?.sites]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form sx={{ mt: 1 }}>
          <Grid container columnSpacing={1} rowSpacing={1}>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Site"
                name="siteId"
                items={
                  state.sites.map(({ name, id }) => ({
                    description: name,
                    value: id,
                  })) ?? []
                }
                onChange={(e) =>
                  dispatch({
                    type: LocationReducerType.GET_BUILDINGS_BY_SITE,
                    payload: {
                      siteId: e.target.value,
                    },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Prédio"
                name="buildingId"
                items={
                  state.buildings.map(({ name, id }) => ({
                    description: name,
                    value: id,
                  })) ?? []
                }
                onChange={(e) =>
                  dispatch({
                    type: LocationReducerType.GET_FLOORS_BY_BUILDING,
                    payload: {
                      buildingId: e.target.value,
                    },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Andar"
                name="floorId"
                items={
                  state.floors.map(({ name, id }) => ({
                    description: name,
                    value: id,
                  })) ?? []
                }
                onChange={(e) =>
                  dispatch({
                    type: LocationReducerType.GET_ROOMS_BY_FLOOR,
                    payload: {
                      floorId: e.target.value,
                    },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Sala"
                name="roomId"
                items={
                  state.rooms.map(({ name, id }) => ({
                    description: name,
                    value: id,
                  })) ?? []
                }
                onChange={(e) =>
                  dispatch({
                    type: LocationReducerType.GET_EQUIPMENTS_BY_ROOM,
                    payload: {
                      roomId: e.target.value,
                    },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Equipamento"
                name="equipmentId"
                items={state.equipments.map(({ id, component }) => ({
                  value: id,
                  description: component,
                }))}
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                name="orderType"
                label="Tipo de ordem"
                items={[
                  {
                    description: "Elétrica",
                    value: 0,
                  },
                  {
                    description: "Rede",
                    value: 1,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Natureza da OS"
                name="nature"
                items={[
                  {
                    description: "Acompanhamento",
                    value: 0,
                  },
                  {
                    description: "Atendimento",
                    value: 1,
                  },
                  {
                    description: "Emergencial",
                    value: 2,
                  },
                  {
                    description: "Planejada",
                    value: 3,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Prioridade"
                name="priority"
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
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Tipo de manutenção"
                name="maintenanceType"
                items={[
                  { description: "Preventiva", value: 0 },
                  { description: "Corretiva", value: 1 },
                ]}
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Tipo de responsável"
                name="responsibleType"
                items={[
                  { description: "Fornecedor", value: 0 },
                  { description: "Interno", value: 1 },
                ]}
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput label="Custo (R$)" name="cost" />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput label="Título" name="title" />
            </Grid>
            <Grid item xs={4}>
              <ControlledDateInput label="Data inicial" name="initialDate" />
            </Grid>
            <Grid item xs={4}>
              <ControlledDateInput label="Data final" name="finalDate" />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                label="Tempo de reparo previsto (h)"
                name="estimatedRepairTime"
              />
            </Grid>
            <Grid item xs={8}>
              <ControlledTextInput
                label="Descrição"
                name="description"
                multiline
                minRows={1}
                maxRows={99}
              />
            </Grid>
          </Grid>
          <Stack direction="row" marginTop={1} justifyContent="space-between">
            <SubmitButton
              disabled={!methods.formState.isValid}
              label="Salvar rascunho"
            />
            <Button disabled={!methods.formState.isValid} variant="outlined">
              Enviar para aprovação
            </Button>
          </Stack>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default WorkOrderFormModal;

const validationSchema = object().shape({
  siteId: string().required("Site é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  equipmentId: string().required("Equipamento é obrigatório"),
  nature: number().required("Natureza da OS é obrigatória"),
  responsibleType: number().required("Tipo de responsável é obrigatório"),
  maintenanceType: number().required("Tipo de manutenção é obrigatório"),
  orderType: number().required("Tipo de ordem é obrigatório"),
  initialDate: string().required("Data inicial é obrigatória"),
  finalDate: string().required("Data final é obrigatória"),
  description: string().required("Descrição é obrigatória"),
  priority: number().required("Prioridade é obrigatória"),
  estimatedRepairTime: number().required(
    "Tempo estimado de reparo é obrigatório"
  ),
  cost: number().required("Custo é obrigatório"),
  title: string().required("Título é obrigatório"),
});
