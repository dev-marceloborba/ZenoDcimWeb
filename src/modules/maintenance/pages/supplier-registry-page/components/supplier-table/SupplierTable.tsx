import { SupplierModel } from "modules/maintenance/models/supplier.model";
import {
  useDeleteSupplierMutation,
  useFindAllSuplliersQuery,
} from "modules/maintenance/services/supplier.service";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import SupplierForm from "../supplier-form/SupplierForm";

export default function SupplierTable() {
  const { data: suppliers, isLoading } = useFindAllSuplliersQuery();
  const [deleteSupplier] = useDeleteSupplierMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const handleEditSupplier = (supplier: SupplierModel) => {
    const modal = showModal(SupplierForm, {
      mode: "edit",
      model: supplier,
      onConfirm: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteSupplier = (selection: SupplierModel[]) => {
    try {
      selection.forEach(async (supplier) => {
        await deleteSupplier(supplier.id).unwrap();
      });
      toast.open({ message: "Fornecedor excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir fornecedor", severity: "error" });
    }
  };

  return (
    <>
      <DataTable
        title="Fornecedores"
        columns={columns}
        rows={suppliers ?? []}
        options={{
          onRowClick: (row) => handleEditSupplier(row),
          onDeleteSelection: (rows) => handleDeleteSupplier(rows),
        }}
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
