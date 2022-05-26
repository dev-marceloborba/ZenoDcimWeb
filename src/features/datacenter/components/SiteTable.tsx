import React from "react";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import {
  useFindAllSitesQuery,
  useDeleteSiteMutation,
} from "app/services/datacenter";
import { useToast } from "app/components/Toast";
import Loading from "app/components/Loading";
import Column from "app/components/Column";
import { SiteResponse } from "app/models/data-center.model";

const SiteTable: React.FC = () => {
  const { data: sites, isLoading } = useFindAllSitesQuery();
  const [deleteSite] = useDeleteSiteMutation();
  const toast = useToast();

  const handleDeleteSite = (sites: SiteResponse[]) => {
    try {
      sites.forEach(async (site) => await deleteSite(site.id).unwrap());
      toast.open(`Site(s) excluído(s) com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(`Erro ao excluir o site ${error}`, 2000, "error");
    }
  };

  return (
    <Column sx={{ mt: 2 }}>
      <DataTable
        title="Sites"
        columns={columns}
        rows={sites ?? []}
        options={{
          onDeleteSelection: handleDeleteSite,
        }}
      />
      <Loading open={isLoading} />
    </Column>
  );
};

export default SiteTable;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Nome",
  },
];
