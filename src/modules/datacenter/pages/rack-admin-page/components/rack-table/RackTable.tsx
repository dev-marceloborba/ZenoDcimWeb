import useRouter from "modules/core/hooks/useRouter";
import { RackModel } from "modules/datacenter/models/rack.model";
import { datacenterPaths } from "modules/datacenter/routes/paths";
import {
  useDeleteRackMutation,
  useFindAllRacksQuery,
  useUpdateRackMutation,
} from "modules/datacenter/services/rack.service";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import RackForm from "../rack-form/RackForm";

const RackTable: React.FC = () => {
  const { navigate } = useRouter();
  const { data: racks, isLoading: loadingFetch } = useFindAllRacksQuery();
  const [updateRack, { isLoading: loadingUpdate }] = useUpdateRackMutation();
  const [deleteRack, { isLoading: loadingDelete }] = useDeleteRackMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const handleOpenRackDetails = (rack: any) => {
    navigate(datacenterPaths.rackDetails.shortPath, {
      state: {
        data: rack,
      },
    });
  };

  const handleEditRack = (rack: RackModel) => {
    const modal = showModal(RackForm, {
      title: "Editar rack",
      onConfirm: async (data) => {
        modal.hide();
        await updateRack({ ...data, id: rack.id }).unwrap();
        toast.open({
          message: "Rack alterado com sucesso",
          autoHideDuration: 1500,
        });
      },
      onCancel: () => {
        modal.hide();
      },
      data: rack,
      mode: "edit",
    });
  };

  const handleDeleteRack = async (rack: RackModel) => {
    try {
      await deleteRack(rack.id).unwrap();
      toast.open({ message: "Rack excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir rack", severity: "error" });
    }
  };

  return (
    <>
      <DataTable
        title=""
        rows={racks ?? []}
        columns={columns}
        options={{
          showEdit: true,
          showDelete: true,
          onRowClick: handleOpenRackDetails,
          onEditRow: handleEditRack,
          onDeleteRow: handleDeleteRack,
        }}
      />
      <Loading open={loadingFetch || loadingUpdate || loadingDelete} />
    </>
  );
};

const columns: ColumnHeader[] = [
  {
    name: "localization",
    label: "Localização",
  },
  {
    name: "size",
    label: "Tamanho(U)",
  },
];

export default RackTable;
