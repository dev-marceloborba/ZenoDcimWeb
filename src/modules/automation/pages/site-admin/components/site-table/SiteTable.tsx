import React from "react";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import { useToast } from "modules/shared/components/ToastProvider";
import Loading from "modules/shared/components/Loading";
import Column from "modules/shared/components/Column";
import {
  useDeleteSiteMutation,
  useFindAllSitesQuery,
} from "modules/datacenter/services/site-service";
import { SiteModel } from "modules/datacenter/models/datacenter-model";

const SiteTable: React.FC = () => {
  const { data: sites, isLoading } = useFindAllSitesQuery();
  const [deleteSite] = useDeleteSiteMutation();
  const toast = useToast();

  const handleDeleteSite = (sites: SiteModel[]) => {
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
