import { useFindEquipmentsWithoutRackQuery } from "modules/datacenter/services/rack-equipment.service";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";

type RackEquipmentSelectionProps = {
  onConfirm(data: any): void;
} & ModalProps;

const RackEquipmentSelection: React.FC<RackEquipmentSelectionProps> = ({
  onConfirm,
  ...props
}) => {
  const { data: equipments, isLoading } = useFindEquipmentsWithoutRackQuery();

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
