import { useFindEquipmentsWithoutRackMutation } from "modules/datacenter/services/rack-equipment.service";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import Loading from "modules/shared/components/Loading";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { useEffect } from "react";

type RackEquipmentSelectionProps = {
  onConfirm(data: any): void;
} & ModalProps;

const RackEquipmentSelection: React.FC<RackEquipmentSelectionProps> = ({
  onConfirm,
  ...props
}) => {
  const [findEquipments, { data: equipments, isLoading }] =
    useFindEquipmentsWithoutRackMutation();

  useEffect(() => {
    async function fetchEquipments() {
      await findEquipments().unwrap();
    }
    fetchEquipments();
  }, [findEquipments]);

  const handleEquipmentSelection = (equipment: any) => onConfirm(equipment);

  return (
    <Modal {...props}>
      <DataTable
        title="Selecionar equipamento"
        columns={columns}
        rows={equipments ?? []}
        options={{
          onRowClick: handleEquipmentSelection,
        }}
      />
      <Loading open={isLoading} />
    </Modal>
  );
};

export default RackEquipmentSelection;

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
    name: "size",
    label: "Tamanho(U)",
  },
];
