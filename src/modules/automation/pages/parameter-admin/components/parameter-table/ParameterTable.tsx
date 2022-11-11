import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import Loading from "modules/shared/components/Loading";
import {
  useCreateParameterMutation,
  useDeleteParameterMutation,
  useFindAllParametersQuery,
  useFindParameterByIdMutation,
} from "modules/automation/services/parameter-service";
import useRouter from "modules/core/hooks/useRouter";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { automationPaths } from "modules/automation/routes/paths";
import {
  ParameterModel,
  ParameterViewModel,
} from "modules/automation/models/automation-model";
import { useToast } from "modules/shared/components/ToastProvider";

export default function ParametersTable() {
  const { data: parameters, isLoading } = useFindAllParametersQuery();
  const [createParameter, { isLoading: isLoadingCreate }] =
    useCreateParameterMutation();
  const [findParameter, { isLoading: isLoadingFetch }] =
    useFindParameterByIdMutation();
  const [deleteParameter, { isLoading: isLoadingDelete }] =
    useDeleteParameterMutation();
  const { navigate } = useRouter();
  const toast = useToast();

  const handleSelectedParameter = (parameter: ParameterModel) => {
    navigate(
      compositePathRoute([
        HomePath,
        AutomationPath,
        parameter.discriminator === "Parâmetro físico"
          ? automationPaths.parameterForm.shortPath
          : automationPaths.virtualParameterForm.shortPath,
      ]),
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
    toast.open({ message: "Parâmetro(s) excluídos com sucesso" });
  };

  const handleDuplicateItem = async (parameter: ParameterModel) => {
    const item = await findParameter(parameter.id).unwrap();
    const duplicate: ParameterViewModel = {
      ...item,
      name: item.name + " - cópia",
    };

    try {
      await createParameter(duplicate).unwrap();
      toast.open({ message: "Parâmetro duplicado" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao duplicar parâmetro", severity: "error" });
    }
  };

  return (
    <>
      <DataTable
        title="Parâmetros"
        columns={columns}
        rows={
          parameters?.map((parameter) => ({
            ...parameter,
            discriminator:
              parameter.discriminator === "VirtualParameter"
                ? "Parâmetro virtual"
                : "Parâmetro físico",
          })) ?? []
        }
        options={{
          onRowClick: handleSelectedParameter,
          onDeleteSelection: handleDeleteParameters,
          onCopyItem: handleDuplicateItem,
          userPreferenceTable: "parameterTable",
        }}
      />
      <Loading
        open={isLoading || isLoadingCreate || isLoadingDelete || isLoadingFetch}
      />
    </>
  );
}

const columns: ColumnHeader[] = [
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
  {
    name: "discriminator",
    label: "Tipo",
  },
];
