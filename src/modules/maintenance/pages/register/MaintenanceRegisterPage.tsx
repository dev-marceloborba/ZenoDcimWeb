import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import Button from "@mui/material/Button";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "modules/shared/components/ToastProvider";
import useRouter from "modules/core/hooks/useRouter";
import { object, SchemaOf, string, number } from "yup";
import { CreateWorkOrderViewModel } from "modules/maintenance/models/work-order.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import ControlledDateInput from "modules/shared/components/ControlledDateInput";
import useDataCenterLocales from "./hooks/data-center-locales.hook";
import { useCreateWorkOrderMutation } from "modules/maintenance/services/maintenance.service";
import Loading from "modules/shared/components/Loading";
import { format } from "date-fns";
import { useFindAllSuplliersQuery } from "modules/maintenance/services/supplier.service";

export default function WorkOrderRegisterPage() {
  const methods = useForm<CreateWorkOrderViewModel>({
    resolver: yupResolver(validationSchema),
  });
  const [createWorkOrder] = useCreateWorkOrderMutation();
  const { sites, buildings, floors, equipments, rooms, isLoading, actions } =
    useDataCenterLocales();
  const { data: suppliers } = useFindAllSuplliersQuery();
  const { back, navigate } = useRouter();
  const toast = useToast();
  const [responsibles, setResponsibles] = useState<string[]>([]);
  const { handleSubmit, watch } = methods;

  const responsibleTypeWatcher = watch("responsibleType");
  const siteWacher = watch("siteId");
  const buildingWatcher = watch("buildingId");
  const floorWatcher = watch("floorId");
  const roomWatcher = watch("roomId");

  useEffect(() => {
    if (responsibleTypeWatcher === 0) {
      setResponsibles(suppliers?.map((sup) => sup.responsible) ?? []);
    } else if (responsibleTypeWatcher === 1) {
      setResponsibles(["Matheus"]);
    }
  }, [responsibleTypeWatcher, suppliers]);

  useEffect(() => {
    if (siteWacher) {
      actions.getBuildings(siteWacher);
    }
  }, [actions, siteWacher]);

  useEffect(() => {
    if (buildingWatcher) {
      actions.getFloors(buildingWatcher);
    }
  }, [actions, buildingWatcher]);

  useEffect(() => {
    if (floorWatcher) {
      actions.getRooms(floorWatcher);
    }
  }, [actions, floorWatcher]);

  useEffect(() => {
    if (roomWatcher) {
      actions.getEquipments(roomWatcher);
    }
  }, [actions, roomWatcher]);

  const onSubmit: SubmitHandler<CreateWorkOrderViewModel> = async (data) => {
    try {
      await createWorkOrder({
        ...data,
        initialDate: format(new Date(data.initialDate), "yyyy-MM-dd"),
        finalDate: format(new Date(data.finalDate), "yyyy-MM-dd"),
      }).unwrap();
      toast
        .open("Ordem de serviço criada com sucesso", 2000, "success")
        .then(() => back());
    } catch (error) {
      console.log(error);
      toast.open("Falha ao criar ordem de serviço", 2000, "error");
    }
  };

  return (
    <HeroContainer title="Abrir ordem de serviço">
      <Button
        onClick={() =>
          navigate("/zeno/maintenance/suppliers", {
            state: null,
          })
        }
      >
        Fornecedores
      </Button>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            "& .MuiFormControl-root": {
              mt: 1.2,
            },
          }}
        >
          <Grid container columnSpacing={1}>
            <Grid item md={6}>
              <ControlledTextInput
                label="Tipo de responsável"
                name="responsibleType"
                items={[
                  { description: "Fornecedor", value: 0 },
                  { description: "Interno", value: 1 },
                ]}
              />
              <ControlledTextInput
                label="Responsável"
                name="responsible"
                items={responsibles.map((resp) => ({
                  description: resp,
                  value: resp,
                }))}
              />
              <ControlledTextInput
                label="Site"
                name="siteId"
                items={sites?.map((s) => ({
                  description: s.name,
                  value: s.id,
                }))}
              />
              <ControlledTextInput
                label="Prédio"
                name="buildingId"
                items={buildings?.map((b) => ({
                  description: b.name,
                  value: b.id,
                }))}
              />
              <ControlledTextInput
                label="Andar"
                name="floorId"
                items={floors.map((f) => ({
                  description: f.name,
                  value: f.id,
                }))}
              />
              <ControlledTextInput
                label="Sala"
                name="roomId"
                items={rooms.map((r) => ({
                  description: r.name,
                  value: r.id,
                }))}
              />
              <ControlledTextInput
                label="Equipamento"
                name="equipmentId"
                items={equipments.map((e) => ({
                  description: e.component,
                  value: e.id,
                }))}
              />
            </Grid>

            <Grid item md={6}>
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
              <ControlledTextInput
                label="Tipo de manutenção"
                name="maintenanceType"
                items={[
                  { description: "Preventiva", value: 0 },
                  { description: "Corretiva", value: 1 },
                ]}
              />
              <ControlledDateInput label="Data inicial" name="initialDate" />
              <ControlledDateInput label="Data final" name="finalDate" />
              <ControlledTextInput
                label="Descrição"
                name="description"
                multiline
                minRows={1}
                maxRows={99}
              />
              <SubmitButton sx={{ mt: 1 }} />
            </Grid>
          </Grid>
        </Form>
      </FormProvider>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const validationSchema = object().shape({
  siteId: string().required("Site é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  equipmentId: string().required("Equipamento é obrigatório"),
  nature: number().required("Natureza da OS é obrigatória"),
  responsibleType: number().required("Tipo de responsável é obrigatório"),
  responsible: string().required("Responsável é obrigatório"),
  maintenanceType: number().required("Tipo de manutenção é obrigatório"),
  orderType: number().required("Tipo de ordem é obrigatório"),
  initialDate: string().required("Data inicial é obrigatória"),
  finalDate: string().required("Data final é obrigatória"),
  description: string().required("Descrição é obrigatória"),
});
