import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import useRouter from "modules/core/hooks/useRouter";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { EquipmentFormPath } from "modules/automation/routes/paths";
import Loading from "modules/shared/components/Loading";
import { useFindAllEquipmentsDetailedQuery } from "modules/automation/services/equipment-service";

type EquipmentTableProps = {
  handleSelectedEquipment: (equipment: any) => void;
};

export default function EquipmentTable(props: EquipmentTableProps) {
  const { handleSelectedEquipment } = props;
  const { navigate } = useRouter();
  const { data, isLoading } = useFindAllEquipmentsDetailedQuery();

  return (
    <>
      <DataTable
        columns={columns}
        rows={data ?? []}
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
      <Loading open={isLoading} />
    </>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Componente",
  },
  {
    name: "weight",
    label: "Peso (kg)",
  },
  {
    name: "size",
    label: "Tamanho (LxAxC cm)",
  },
  {
    name: "powerLimit",
    label: "Potência limite (W)",
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
