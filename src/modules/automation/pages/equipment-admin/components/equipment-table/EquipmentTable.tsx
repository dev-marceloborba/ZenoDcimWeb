import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import useRouter from "modules/core/hooks/useRouter";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { EquipmentFormPath } from "modules/automation/routes/paths";
import Loading from "modules/shared/components/Loading";
import {
  useCreateEquipmentMutation,
  useDeleteEquipmentMutation,
  useFindAllEquipmentsDetailedQuery,
  useFindEquipmentByIdMutation,
} from "modules/automation/services/equipment-service";
import {
  EquipmentModel,
  EquipmentViewModel,
} from "modules/automation/models/automation-model";
import { useToast } from "modules/shared/components/ToastProvider";
import getDateFormat from "modules/utils/helpers/getDateFormat";
import getPreferedRowLines from "modules/utils/helpers/getPrefferedRowLines";

type EquipmentTableProps = {
  handleSelectedEquipment: (equipment: any) => void;
};

export default function EquipmentTable(props: EquipmentTableProps) {
  const { handleSelectedEquipment } = props;
  const { navigate } = useRouter();
  const toast = useToast();
  const { data, isLoading } = useFindAllEquipmentsDetailedQuery();
  const [findEquipment] = useFindEquipmentByIdMutation();
  const [deleteEquipment] = useDeleteEquipmentMutation();
  const [createEquipment] = useCreateEquipmentMutation();

  const handleDeleteSelection = async (items: EquipmentModel[]) => {
    for (let i = 0; i < items.length; i++) {
      await deleteEquipment(items[i].id);
    }
    toast.open({ message: "Equipamentos apagados com sucesso" });
  };

  const handleDuplicateItem = async (item: EquipmentModel) => {
    let equipment = await findEquipment(item.id).unwrap();
    const duplicate: EquipmentViewModel = {
      ...equipment,
      component: equipment.component + " - cópia",
    };

    try {
      await createEquipment(duplicate).unwrap();
      toast.open({ message: "Equipamento duplicado" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao duplicar equipamento",
        severity: "error",
      });
    }
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
          onCopyItem: handleDuplicateItem,
          rowsInPage: getPreferedRowLines("equipmentTable"),
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
    customFunction: (row) => {
      return getDateFormat(row);
    },
  },
];
