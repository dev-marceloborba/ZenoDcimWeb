import React from "react";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import { useToast } from "modules/shared/components/ToastProvider";
import Loading from "modules/shared/components/Loading";
import Column from "modules/shared/components/Column";
import {
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useFindAllSitesQuery,
  useFindSiteByIdMutation,
} from "modules/datacenter/services/site-service";
import {
  SiteModel,
  SiteViewModel,
} from "modules/datacenter/models/datacenter-model";
import getPreferedRowLines from "modules/utils/helpers/getPrefferedRowLines";

const SiteTable: React.FC = () => {
  const { data: sites, isLoading: isLoadingFetching } = useFindAllSitesQuery();
  const [findSite, { isLoading: isLoadingFetch }] = useFindSiteByIdMutation();
  const [createSite, { isLoading: isLoadingCreate }] = useCreateSiteMutation();
  const [deleteSite, { isLoading: isLoadingDelete }] = useDeleteSiteMutation();
  const toast = useToast();

  const handleDeleteSite = async (site: SiteModel) => {
    try {
      await deleteSite(site.id).unwrap();
      toast.open({ message: `Site excluído com sucesso` });
    } catch (error) {
      toast.open({
        message: `Erro ao excluir o site ${error}`,
        severity: "error",
      });
    }
  };

  const handleDuplicateItem = async (site: SiteModel) => {
    const item = await findSite(site.id).unwrap();
    const duplicate: SiteViewModel = {
      ...item,
      name: site.name + " - cópia",
    };

    try {
      await createSite(duplicate).unwrap();
      toast.open({ message: "Site duplicado" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao duplicar site", severity: "error" });
    }
  };

  return (
    <Column sx={{ mt: 2 }}>
      <DataTable
        title="Sites"
        columns={columns}
        rows={sites ?? []}
        options={{
          onCopyItem: handleDuplicateItem,
          showDelete: true,
          onDeleteRow: handleDeleteSite,
          rowsInPage: getPreferedRowLines("siteTable"),
        }}
      />
      <Loading
        open={
          isLoadingCreate ||
          isLoadingDelete ||
          isLoadingFetch ||
          isLoadingFetching
        }
      />
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
