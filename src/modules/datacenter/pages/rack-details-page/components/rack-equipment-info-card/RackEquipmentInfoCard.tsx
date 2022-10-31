import Card, { CardProps } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import BasicInfo from "modules/shared/components/basic-info/BasicInfo";
import EditButton from "modules/shared/components/edit-button/EditButton";
import DeleteButton from "modules/shared/components/DeleteButton";
import { useModal } from "mui-modal-provider";
import { useToast } from "modules/shared/components/ToastProvider";
import {
  useDeleteRackEquipmentMutation,
  useUpdateRackEquipmentMutation,
} from "modules/datacenter/services/rack-equipment.service";
import RackEquipmentPlacementForm from "../rack-equipment-placement-form/RackEquipmentPlacementForm";

type RackEquipmentInfoCardProps = {
  equipment: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  rackPosition: number;
  size: number;
  showActions?: boolean;
  onEdit?(data: any): void;
  onDelete?(data: any): void;
} & CardProps;

const RackEquipmentInfoCard: React.FC<RackEquipmentInfoCardProps> = ({
  showActions,
  onEdit,
  onDelete,
  ...props
}) => {
  const [updateEquipment, { isLoading: loadingUpdate }] =
    useUpdateRackEquipmentMutation();
  const [deleteEquipment, { isLoading: loadingDelete }] =
    useDeleteRackEquipmentMutation();

  const { showModal } = useModal();
  const toast = useToast();

  // const handleEditRackEquipment = (
  //   rackEquipment: RackEquipmentsTableViewModel
  // ) => {
  //   const modal = showModal(RackEquipmentPlacementForm, {
  //     title: "Editar equipamento no rack",
  //     onCancel: () => {
  //       modal.hide();
  //     },
  //     onConfirm: async (data) => {
  //       modal.hide();
  //       await updateEquipment({
  //         ...data,
  //         id: rackEquipment.id,
  //       }).unwrap();
  //       toast.open({ message: "Equipamento de rack alterado com sucesso" });
  //     },
  //     mode: "edit",
  //     data: rackEquipment,
  //   });
  // };

  const handleDeleteRackEquipment = async (rackEquipmentId: string) => {
    try {
      await deleteEquipment(rackEquipmentId).unwrap();
      toast.open({ message: "Equipamento de rack excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao excluir equipamento de rack",
        severity: "error",
      });
    }
  };

  return (
    <Card {...props}>
      <CardHeader title={props.title} />
      <CardContent>
        <BasicInfo name="Equipamento" description={props.equipment} />
        <Divider />
        <BasicInfo name="Modelo" description={props.model} />
        <Divider />
        <BasicInfo name="Fabricante" description={props.manufactor} />
        <Divider />
        <BasicInfo name="Número de série" description={props.serialNumber} />
        <Divider />
        <BasicInfo name="Posição no rack" description={props.rackPosition} />
        <Divider />
        <BasicInfo name="Tamanho" description={props.size} />
      </CardContent>
      {showActions && (
        <CardActions>
          <EditButton />
          <DeleteButton onDeleteConfirmation={() => {}} />
        </CardActions>
      )}
    </Card>
  );
};

export default RackEquipmentInfoCard;
