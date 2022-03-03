import React from "react";
import Table from "app/hooks/useTable";
import {
  useDeleteEquipmentMutation,
  useListEquipmentsQuery,
} from "app/services/datacenter";

const columns = [
  {
    name: "id",
    label: "Id",
    align: "left",
  },
  {
    name: "class",
    label: "Classe",
    align: "right",
  },
  {
    name: "component",
    label: "Componente",
    align: "right",
  },
  {
    name: "compnentCode",
    label: "Código do componente",
    align: "right",
  },
  {
    name: "description",
    label: "Descrição",
    align: "right",
  },
];

const EquipmentTable: React.FC = () => {
  const { data: equipments, isLoading } = useListEquipmentsQuery();
  const [deleteEquipment] = useDeleteEquipmentMutation();
  return (
    <Table
      columns={columns}
      rows={equipments}
      showActions
      handleDelete={async (row: any) => await deleteEquipment(row.id).unwrap()}
    />
  );
};

export default EquipmentTable;
