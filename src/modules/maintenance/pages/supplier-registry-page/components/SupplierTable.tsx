import { useFindAllSuplliersQuery } from "modules/maintenance/services/supplier.service";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";

export default function SupplierTable() {
  const { data: suppliers, isLoading } = useFindAllSuplliersQuery();
  return (
    <>
      <DataTable
        title="Fornecedores"
        columns={columns}
        rows={suppliers ?? []}
      />
      <Loading open={isLoading} />
    </>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "responsible",
    label: "Responsável",
  },
  {
    name: "company",
    label: "Empresa",
  },
  {
    name: "email",
    label: "E-mail",
  },
  {
    name: "phone",
    label: "Telefone",
  },
];
