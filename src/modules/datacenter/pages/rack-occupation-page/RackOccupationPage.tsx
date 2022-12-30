import useRouter from "modules/core/hooks/useRouter";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";

export default function RackOccupationPage() {
  const { path, navigate } = useRouter();
  const handleEditRack = (rack: any) => {};

  const handleDeleteRack = (rack: any) => {};

  return (
    <HeroContainer title="Racks e ocupação">
      <DataTable
        title="Racks"
        rows={[]}
        columns={columns}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditRack,
          onDeleteRow: handleDeleteRack,
        }}
      />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "site",
    label: "Site",
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
    name: "rack",
    label: "Rack",
  },
  {
    name: "power",
    label: "Potência (kW)",
  },
  {
    name: "occupation",
    label: "RU's",
  },
  {
    name: "weight",
    label: "Peso suportável (kg)",
  },
  {
    name: "description",
    label: "Descrição",
  },
];
