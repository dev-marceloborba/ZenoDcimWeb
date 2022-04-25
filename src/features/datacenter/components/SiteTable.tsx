import React from "react";
import Table from "app/hooks/useTable";
import {
  useListSitesQuery,
  useDeleteSiteMutation,
} from "app/services/datacenter";
import { useToast } from "app/components/Toast";
import Loading from "app/components/Loading";
import Column from "app/components/Column";

const columns = [
  {
    name: "name",
    label: "Nome",
    align: "left",
  },
];

const SiteTable: React.FC = () => {
  const { data: sites, isLoading } = useListSitesQuery();
  const [deleteSite] = useDeleteSiteMutation();
  const toast = useToast();

  const handleDeleteSite = async (row: any) => {
    try {
      await deleteSite(row.id).unwrap();
      toast.open(`Site ${row.name} excluído com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(`Erro ao excluir o site ${row.name}`, 2000, "error");
    }
  };

  return (
    <Column sx={{ mt: 2 }}>
      <Table
        columns={columns}
        rows={sites}
        showActions
        handleDelete={handleDeleteSite}
      />
      <Loading open={isLoading} />
    </Column>
  );
};

export default SiteTable;
