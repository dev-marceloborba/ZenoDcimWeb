import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import {
  useDeleteParameterMutation,
  useFindAllParametersQuery,
} from "modules/automation/services/parameter-service";
import useRouter from "modules/core/hooks/useRouter";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { ParameterFormPath } from "modules/automation/routes/paths";

export default function ParametersTable() {
  const { data: parameters, isLoading } = useFindAllParametersQuery();
  const [deleteParameter] = useDeleteParameterMutation();
  const { navigate } = useRouter();

  const handleSelectedParameter = (parameter: any) => {
    navigate(
      compositePathRoute([HomePath, AutomationPath, ParameterFormPath]),
      {
        state: {
          data: parameter,
          mode: "edit",
        },
      }
    );
  };

  const handleDeleteParameters = async (items: any[]) => {
    for (let i = 0; i < items.length; i++) {
      await deleteParameter(items[i].id).unwrap();
    }
  };

  return (
    <>
      <DataTable
        title="Parâmetros"
        columns={columns}
        rows={parameters ?? []}
        options={{
          onRowClick: handleSelectedParameter,
          onDeleteSelection: handleDeleteParameters,
        }}
      />
      <Loading open={isLoading} />
    </>
  );
}

const columns: ColumnHeader[] = [
  // {
  //   name: "building",
  //   label: "Prédio",
  // },
  // {
  //   name: "floor",
  //   label: "Andar",
  // },
  // {
  //   name: "room",
  //   label: "Sala",
  // },
  // {
  //   name: "equipment",
  //   label: "Equipamento",
  // },
  {
    name: "name",
    label: "Parâmetro",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "lowLimit",
    label: "Limite baixo",
  },
  {
    name: "highLimit",
    label: "Limite alto",
  },
  {
    name: "scale",
    label: "Escala",
  },
  // {
  //   name: "group",
  //   label: "Grupo",
  // },
  // {
  //   name: "system",
  //   label: "Sistema",
  // },
  // {
  //   name: "type",
  //   label: "Tipo",
  // },
  // {
  //   name: "address",
  //   label: "Endereço",
  // },
];