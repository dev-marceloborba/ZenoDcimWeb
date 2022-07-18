import { useState, useEffect } from "react";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import useAutomationFilters from "modules/automation/data/hooks/useAutomationFilters";
import useRouter from "modules/core/hooks/useRouter";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { EquipmentFormPath } from "modules/automation/routes/paths";

type EquipmentTableProps = {
  handleSelectedEquipment: (equipment: any) => void;
};

export default function EquipmentTable(props: EquipmentTableProps) {
  const { handleSelectedEquipment } = props;
  const [tableData, setTableData] = useState<any>();
  const { buildings } = useAutomationFilters();
  const { navigate } = useRouter();

  useEffect(() => {
    const vet: any = [];
    buildings?.forEach((b) =>
      b.floors?.forEach((f) =>
        f.rooms?.forEach((r) =>
          r.equipments?.forEach((e) => {
            vet.push({
              building: b.name,
              floor: f.name,
              alarms: e.alarms,
              createdAt: new Date().toLocaleDateString(),
              room: r.name,
              status: e.status.toString(),
              name: e.component,
              id: e.id,
            });
          })
        )
      )
    );
    setTableData(vet);
  }, [buildings, setTableData]);

  return (
    <DataTable
      columns={columns}
      rows={tableData ?? []}
      title="Equipamentos de Energia"
      options={{
        onRowClick(row) {
          navigate(
            compositePathRoute([HomePath, AutomationPath, EquipmentFormPath]),
            {
              state: {
                form: "edit",
                data: {
                  equipmentId: row.id,
                },
              },
            }
          );
        },
        onSelectedItems: (items) => {
          if (items.length === 1) handleSelectedEquipment(items[0]);
        },
      }}
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
