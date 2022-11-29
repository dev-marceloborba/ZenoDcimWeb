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
import { useCreateWorkOrderMutation } from "modules/maintenance/services/maintenance.service";
import Loading from "modules/shared/components/Loading";
import { format } from "date-fns";
import { useFindAllSuplliersQuery } from "modules/maintenance/services/supplier.service";
import Card from "modules/shared/components/Card";
import useDataCenter from "modules/datacenter/hooks/useDataCenter";

export default function WorkOrderRegisterPage() {
  const methods = useForm<CreateWorkOrderViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const [createWorkOrder] = useCreateWorkOrderMutation();
  const { isLoading, infra, selections } = useDataCenter();
  const { data: suppliers } = useFindAllSuplliersQuery();
  const { back, navigate } = useRouter();
  const toast = useToast();
  const [responsibles, setResponsibles] = useState<string[]>([]);
  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<CreateWorkOrderViewModel> = async (data) => {
    console.log(data);
    try {
      await createWorkOrder({
        ...data,
        initialDate: format(new Date(data.initialDate), "yyyy-MM-dd"),
        finalDate: format(new Date(data.finalDate), "yyyy-MM-dd"),
      }).unwrap();
      toast
        .open({ message: "Ordem de serviço criada com sucesso" })
        .then(() => back());
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Falha ao criar ordem de serviço",
        severity: "error",
      });
    }
  };

  const changeSupplier = (type: number) => {
    if (type === 0) {
      setResponsibles(suppliers?.map((sup) => sup.responsible) ?? []);
    } else if (type === 1) {
      setResponsibles(["Matheus"]);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        siteId: "",
        buildingId: "",
        description: "",
        equipmentId: "",
        finalDate: "",
        floorId: "",
        initialDate: "",
        maintenanceType: 0,
        nature: 0,
        orderType: 0,
        responsible: "",
        responsibleType: 0,
        roomId: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

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
        <Card>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              "& .MuiFormControl-root": {
                mt: 1.2,
              },
            }}
          >
            <Grid container columnSpacing={1}>
              <Grid item md={4}>
                <ControlledTextInput label="Título" name="title" />
                <ControlledTextInput
                  label="Site"
                  name="siteId"
                  items={infra.sites ?? []}
                  onChange={(e) => selections.siteSelection(e.target.value)}
                />
                <ControlledTextInput
                  label="Prédio"
                  name="buildingId"
                  items={infra.buildings ?? []}
                  onChange={(e) => selections.buildingSelection(e.target.value)}
                />
                <ControlledTextInput
                  label="Andar"
                  name="floorId"
                  items={infra.floors ?? []}
                  onChange={(e) => selections.floorSelection(e.target.value)}
                />
                <ControlledTextInput
                  label="Sala"
                  name="roomId"
                  items={infra.rooms ?? []}
                  onChange={(e) => selections.roomSelection(e.target.value)}
                />
                <ControlledTextInput
                  label="Equipamento"
                  name="equipmentId"
                  items={infra.equipments ?? []}
                />
              </Grid>

              <Grid item md={4}>
                <ControlledTextInput
                  label="Tipo de responsável"
                  name="responsibleType"
                  items={[
                    { description: "Fornecedor", value: 0 },
                    { description: "Interno", value: 1 },
                  ]}
                  onChange={(e) => changeSupplier(Number(e.target.value))}
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

              <Grid item md={4}>
                <ControlledDateInput label="Data inicial" name="initialDate" />
                <ControlledDateInput label="Data final" name="finalDate" />
                <ControlledTextInput
                  label="Tempo de reparo previsto (h)"
                  name="estimatedRepairTime"
                />
                <ControlledTextInput
                  label="Tempo de reparo real (h)"
                  name="realRepairTime"
                />
                <ControlledTextInput label="Custo (R$)" name="cost" />
                <ControlledTextInput
                  label="Descrição"
                  name="description"
                  multiline
                  minRows={1}
                  maxRows={99}
                />
                <SubmitButton disabled={!isValid} sx={{ mt: 1 }} />
              </Grid>
            </Grid>
          </Form>
        </Card>
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
  priority: number().required("Prioridade é obrigatória"),
  estimatedRepairTime: number().required(
    "Tempo estimado de reparo é obrigatório"
  ),
  realRepairTime: number().required("Tempo real de reparo é obrigatório"),
  cost: number().required("Custo é obrigatório"),
  title: string().required("Título é obrigatório"),
});
