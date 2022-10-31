import { RackEquipmentsTableViewModel } from "modules/datacenter/models/rack-equipment.model";
import {
  useDeleteRackEquipmentMutation,
  useFindAllRackEquipmentsQuery,
  useUpdateRackEquipmentMutation,
} from "modules/datacenter/services/rack-equipment.service";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import RackEquipmentForm from "../rack-equipment-form/RackEquipmentForm";

const RackEquipmentTable: React.FC = () => {
  const { data: equipments, isLoading: loadingFetch } =
    useFindAllRackEquipmentsQuery();
  const [updateEquipment, { isLoading: loadingUpdate }] =
    useUpdateRackEquipmentMutation();
  const [deleteEquipment, { isLoading: loadingDelete }] =
    useDeleteRackEquipmentMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const handleEditRackEquipment = (
    rackEquipment: RackEquipmentsTableViewModel
  ) => {
    const modal = showModal(RackEquipmentForm, {
      title: "Editar equipamento no rack",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: async (data) => {
        modal.hide();
        // await updateEquipment({
        //   ...data,
        //   id: rackEquipment.id,
        // }).unwrap();
        toast.open({ message: "Equipamento de rack alterado com sucesso" });
      },
      mode: "edit",
      data: rackEquipment,
    });
  };

  const handleDeleteRackEquipment = async (
    rackEquipment: RackEquipmentsTableViewModel
  ) => {
    try {
      await deleteEquipment(rackEquipment.id).unwrap();
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
    <>
      <DataTable
        title="Equipamentos do rack"
        rows={equipments ?? []}
        columns={columns}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditRackEquipment,
          onDeleteRow: handleDeleteRackEquipment,
        }}
      />
      <Loading open={loadingFetch || loadingUpdate || loadingDelete} />
    </>
  );
};

export default RackEquipmentTable;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Equipamento",
  },
  {
    name: "model",
    label: "Modelo",
  },
  {
    name: "manufactor",
    label: "Fabricante",
  },
  {
    name: "initialPosition",
    label: "Posição inicial",
  },
  {
    name: "finalPosition",
    label: "Posição final",
  },
];
