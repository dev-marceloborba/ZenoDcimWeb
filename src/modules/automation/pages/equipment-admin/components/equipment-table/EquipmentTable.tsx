import { useState } from "react";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";

export default function EquipmentTable() {
  const [tableData, setTableData] = useState<any>();
  return (
    <DataTable
      columns={columns}
      rows={tableData}
      title="Equipamentos de Energia"
    />
  );
}

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Componente",
  },
  {
    name: "building",
    label: "Prédio",
  },
  {
    name: "floor",
    label: "Andar",
  },
  {
    name: "room",
    label: "Sala",
  },
  {
    name: "createdAt",
    label: "Data de criação",
  },
];
