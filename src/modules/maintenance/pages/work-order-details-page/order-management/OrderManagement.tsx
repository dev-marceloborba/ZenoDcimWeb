import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDeleteWorkOrderMutation } from "modules/maintenance/services/maintenance.service";
import useRouter from "modules/core/hooks/useRouter";
import { useToast } from "modules/shared/components/ToastProvider";

type OrderManagementProps = {
  orderId: string;
};

const OrderManagement: React.FC<OrderManagementProps> = ({ orderId }) => {
  const [deleteWorkOrder] = useDeleteWorkOrderMutation();
  const toast = useToast();
  const { back } = useRouter();

  const handleOnDeleteOrder = async () => {
    if (orderId) {
      try {
        await deleteWorkOrder(orderId).unwrap();
        toast
          .open("Ordem de serviço excluída com sucesso", 2000, "success")
          .then(() => back());
      } catch {
        toast.open("Erro ao excluir ordem de serviço", 2000, "error");
      }
    }
  };

  return (
    <Card>
      <CardHeader title="Gerenciamento" />
      <Divider />
      <CardContent>
        <Button
          variant="outlined"
          color="error"
          sx={{ minWidth: 150 }}
          onClick={handleOnDeleteOrder}
        >
          Excluir ordem
        </Button>
        <Typography variant="body2" sx={{ mt: 3 }}>
          Não será possivel recuperar a ordem se ela for excluída
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderManagement;
