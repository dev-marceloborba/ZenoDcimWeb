import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import useRouter from "modules/core/hooks/useRouter";
import { WorkEventsTableViewModel } from "modules/maintenance/models/work-order.model";
import { useEffect } from "react";
import { useFindWorkOrderByIdMutation } from "modules/maintenance/services/maintenance.service";
import Loading from "modules/shared/components/Loading";
import OrderInfo from "./order-info/OrderInfo";
import CardHeader from "@mui/material/CardHeader";
import OrderManagement from "./order-management/OrderManagement";

export default function WorkOrderDetailsPage() {
  const {
    state: { data },
  }: {
    state: {
      data: WorkEventsTableViewModel;
    };
  } = useRouter();
  const [findWorkOrder, { data: workOrder, isLoading }] =
    useFindWorkOrderByIdMutation();

  useEffect(() => {
    async function fetchWorkOrder() {
      if (data) {
        await findWorkOrder(data.id).unwrap();
      }
    }
    fetchWorkOrder();
  }, [data, findWorkOrder]);

  return (
    <HeroContainer title="Detalhes da ordem de serviço">
      <Grid container direction="column">
        <Grid item>
          <Card>
            <CardHeader title="Informações básicas" />
            <Divider />
            <CardContent>
              <OrderInfo name="Código OS" description={workOrder?.id ?? ""} />
              <Divider />
              <OrderInfo name="Título" description={workOrder?.title ?? ""} />
              <OrderInfo name="Site" description={workOrder?.site ?? ""} />
              <Divider />
              <OrderInfo
                name="Prédio"
                description={workOrder?.building ?? ""}
              />
              <Divider />
              <OrderInfo name="Andar" description={workOrder?.floor ?? ""} />
              <Divider />
              <OrderInfo name="Sala" description={workOrder?.room ?? ""} />
              <Divider />
              <OrderInfo
                name="Equipamento"
                description={workOrder?.equipment ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Data inicial"
                description={workOrder?.initialDate ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Data final"
                description={workOrder?.finalDate ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Tipo de manutenção"
                description={workOrder?.maintenanceType ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Tipo de ordem"
                description={workOrder?.orderType ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Natureza da ordem"
                description={workOrder?.nature ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Responsável"
                description={workOrder?.responsible ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Prioridade"
                description={workOrder?.priority ?? ""}
              />
              <Divider />
              <OrderInfo
                name="Tempo estimado de reparo"
                description={workOrder?.estimatedRepairTime?.toString() ?? ""}
                suffix="h"
              />
              <Divider />
              <OrderInfo
                name="Tempo real de reparo"
                description={workOrder?.realRepairTime?.toString() ?? ""}
                suffix="h"
              />
              <Divider />
              <OrderInfo
                name="Custo"
                description={workOrder?.cost?.toString() ?? ""}
                prefix="R$"
              />
              <Divider />
              <OrderInfo
                name="Descrição"
                description={workOrder?.description ?? ""}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <OrderManagement orderId={workOrder?.id ?? ""} />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
