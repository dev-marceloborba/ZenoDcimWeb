import React from "react";
import Table from "app/hooks/useTable";
import { useListEquipmentsQuery } from "app/services/datacenter";

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
  return <Table columns={columns} rows={equipments} showActions />;
};

export default EquipmentTable;
