import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import { useFindAllParametersQuery } from "modules/automation/services/parameter-service";

export default function ParametersTable() {
  const { data: parameters, isLoading } = useFindAllParametersQuery();
  const handleSelectedParameter = (parameter: any) => {
    console.log(parameter);
  };
  return (
    <>
      <DataTable
        title="Parâmetros"
        columns={columns}
        rows={parameters ?? []}
        options={{
          onRowClick: handleSelectedParameter,
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
