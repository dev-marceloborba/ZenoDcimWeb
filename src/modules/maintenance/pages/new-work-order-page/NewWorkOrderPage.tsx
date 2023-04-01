import HeroContainer from "modules/shared/components/HeroContainer";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import Typography from "@mui/material/Typography";
import ControlledDateInput from "modules/shared/components/ControlledDateInput";
import { number, object, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useReducer } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "modules/shared/components/card/Card";
import locationReducer, {
  locationInitialState,
  LocationReducerType,
} from "modules/core/reducers/locationReducer";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import {
  useCreateWorkOrderMutation,
  useSendWorkOrderToApprovalMutation,
} from "modules/maintenance/services/maintenance.service";
import { useAuth } from "app/hooks/useAuth";
import { useToast } from "modules/shared/components/ToastProvider";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import Loading from "modules/shared/components/Loading";
import useRouter from "modules/core/hooks/useRouter";
import { WorkOrderModel } from "modules/maintenance/models/work-order.model";

export default function NewWorkOrderPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { state: draftedWorkOrder } = useRouter();
  const { currentUser } = useAuth();
  const { data: sites } = useFindAllSitesQuery();
  const [createDraft, { isLoading: loadingDraft }] =
    useCreateWorkOrderMutation();
  const [sendToApproval] = useSendWorkOrderToApprovalMutation();

  const [state, dispatch] = useReducer(locationReducer, locationInitialState);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    // defaultValues: loadDefaultValues(draftedWorkOrder),
  });

  const onSubmit = async (formData: any) => {
    try {
      await createDraft({
        ...formData,
        initialDate: format(new Date(formData.initialDate), "yyyy-MM-dd"),
        finalDate: format(new Date(formData.finalDate), "yyyy-MM-dd"),
        user: currentUser?.name,
      }).unwrap();
      toast
        .open({ message: "Racunho criado com sucesso" })
        .then(() => navigate(-1));
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao salvar racunho", severity: "error" });
    }
  };

  const handleSendToApproval = async () => {
    const formData = methods.getValues();
    try {
      await sendToApproval({ ...formData, user: currentUser?.name }).unwrap();
      toast
        .open({ message: "Ordem de serviço enviada para aprovação" })
        .then(() => navigate(-1));
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao enviar para aprovação",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: LocationReducerType.GET_SITES,
      payload: {
        sites,
      },
    });
  }, [sites]);

  useEffect(() => {
    dispatch({
      type: LocationReducerType.GET_BUILDINGS_BY_SITE,
      payload: {
        siteId: draftedWorkOrder.siteId,
      },
    });
    dispatch({
      type: LocationReducerType.GET_FLOORS_BY_BUILDING,
      payload: {
        buildingId: draftedWorkOrder.buildingId,
      },
    });
    dispatch({
      type: LocationReducerType.GET_ROOMS_BY_FLOOR,
      payload: {
        floorId: draftedWorkOrder.floorId,
      },
    });
    dispatch({
      type: LocationReducerType.GET_EQUIPMENTS_BY_ROOM,
      payload: {
        roomId: draftedWorkOrder.roomId,
      },
    });
    methods.reset({ ...draftedWorkOrder });
  }, [
    draftedWorkOrder,
    draftedWorkOrder.buildingId,
    draftedWorkOrder.floorId,
    draftedWorkOrder.roomId,
    draftedWorkOrder.siteId,
    methods,
  ]);

  return (
    <HeroContainer title="Nova ordem de serviço">
      <FormProvider {...methods}>
        <Card title="Preencha os campos abaixo para registrar rascunho da ordem e/ou enviar para aprovação">
          <Form sx={{ p: 1 }} onSubmit={methods.handleSubmit(onSubmit)}>
            <Typography variant="subtitle1">Local</Typography>
            <Grid container rowSpacing={2} columnSpacing={1} sx={{ my: 0.2 }}>
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Site"
                  name="siteId"
                  required
                  items={
                    state?.sites?.map((site) => ({
                      description: site.name,
                      value: site.id,
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
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Prédio"
                  name="buildingId"
                  required
                  items={state.buildings.map((building) => ({
                    description: building.name,
                    value: building.id,
                  }))}
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
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Andar"
                  name="floorId"
                  required
                  items={state.floors.map((floor) => ({
                    description: floor.name,
                    value: floor.id,
                  }))}
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
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Sala"
                  name="roomId"
                  required
                  items={state.rooms.map((room) => ({
                    description: room.name,
                    value: room.id,
                  }))}
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
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Equipamento"
                  name="equipmentId"
                  required
                  items={state.equipments.map((equipment) => ({
                    description: equipment.component,
                    value: equipment.id,
                  }))}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ my: 2 }}>
              Ordem de serviço
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={2.4}>
                <ControlledTextInput label="Título" name="title" required />
              </Grid>
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Tipo de ordem"
                  name="orderType"
                  required
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
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Natureza da OS"
                  name="nature"
                  required
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
                      value: 2.4,
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Prioridade"
                  name="priority"
                  required
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
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Tipo de manuntenção"
                  name="maintenanceType"
                  required
                  items={[
                    {
                      description: "Preventiva",
                      value: 0,
                    },
                    {
                      description: "Corretiva",
                      value: 1,
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextInput
                  label="Descrição"
                  name="description"
                  required
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ my: 2 }}>
              Agenda e custeio
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={2.4}>
                <ControlledDateInput
                  label="Data inicial"
                  name="initialDate"
                  required
                />
              </Grid>
              <Grid item xs={2.4}>
                <ControlledDateInput
                  label="Data final"
                  name="finalDate"
                  required
                />
              </Grid>
              <Grid item xs={2.4}>
                <ControlledTextInput
                  label="Tempo de reparo previsto (h)"
                  name="estimatedRepairTime"
                  required
                />
              </Grid>
              <Grid item xs={2.4}>
                <ControlledTextInput label="Custo (R$)" name="cost" />
              </Grid>
            </Grid>

            <Stack direction="row" marginTop={2}>
              <SubmitButton
                disabled={!methods.formState.isValid}
                label="Salvar rascunho"
              />
              <Button
                disabled={!methods.formState.isValid}
                variant="outlined"
                sx={{ ml: 1 }}
                onClick={handleSendToApproval}
              >
                Enviar para aprovação
              </Button>
            </Stack>
          </Form>
        </Card>
      </FormProvider>
      <Loading open={loadingDraft} />
    </HeroContainer>
  );
}

const validationSchema = object().shape({
  id: string().notRequired(),
  siteId: string().required("Site é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  equipmentId: string().required("Equipamento é obrigatório"),
  title: string().required("Título é obrigatório"),
  orderType: number().required("Tipo de ordem é obrigatório"),
  nature: number().required("Natureza da OS é obrigatória"),
  priority: number().required("Prioridade é obrigatória"),
  // responsibleType: number().required("Tipo de responsável é obrigatório"),
  // responsible: string().required("Responsável é obrigatório"),
  maintenanceType: number().required("Tipo de manutenção é obrigatório"),
  initialDate: string().required("Data inicial é obrigatória"),
  finalDate: string().required("Data final é obrigatória"),
  description: string().required("Descrição é obrigatória"),
  estimatedRepairTime: number().required(
    "Tempo estimado de reparo é obrigatório"
  ),
  cost: number().notRequired(),
});
