import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import useRouter from "modules/core/hooks/useRouter";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { EquipmentFormPath } from "modules/automation/routes/paths";
import Loading from "modules/shared/components/Loading";
import {
  useDeleteEquipmentMutation,
  useFindAllEquipmentsDetailedQuery,
} from "modules/automation/services/equipment-service";
import { EquipmentModel } from "modules/automation/models/automation-model";
import { useToast } from "modules/shared/components/ToastProvider";

type EquipmentTableProps = {
  handleSelectedEquipment: (equipment: any) => void;
};

export default function EquipmentTable(props: EquipmentTableProps) {
  const { handleSelectedEquipment } = props;
  const { navigate } = useRouter();
  const toast = useToast();
  const { data, isLoading } = useFindAllEquipmentsDetailedQuery();
  const [deleteEquipment] = useDeleteEquipmentMutation();

  const handleDeleteSelection = async (items: EquipmentModel[]) => {
    for (let i = 0; i < items.length; i++) {
      await deleteEquipment(items[i].id);
    }
    toast.open("Equipamentos apagados com sucesso", 2000, "success");
  };

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
          onDeleteSelection: (items) => handleDeleteSelection(items),
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
    name: "createdAt",
    label: "Data de criação",
  },
];
