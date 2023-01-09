import useRouter from "modules/core/hooks/useRouter";
import {
  useDeleteRackMutation,
  useFindAllRacksQuery,
  useUpdateRackMutation,
} from "modules/datacenter/services/rack.service";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Button from "@mui/material/Button";
import { RackModel } from "modules/datacenter/models/rack.model";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import RackFormModal from "modules/datacenter/modals/rack-form-modal/RackFormModal";

export default function RackOccupationPage() {
  const toast = useToast();
  const { showModal } = useModal();
  const { path, navigate } = useRouter();

  const { data: racks, isLoading: loadingFetch } = useFindAllRacksQuery();
  const [updateRack, { isLoading: loadingUpdate }] = useUpdateRackMutation();
  const [deleteRack, { isLoading: loadingDelete }] = useDeleteRackMutation();

  const handleOpenRackModal = () => {
    const modal = showModal(RackFormModal, {
      title: "Novo rack",
      onConfirm: (formData) => {
        modal.hide();
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleEditRack = (rack: any) => {
    const modal = showModal(RackFormModal, {
      title: "Novo rack",
      mode: "edit",
      data: rack,
      onConfirm: async (formData) => {
        modal.hide();
        await updateRack({
          ...formData,
          id: rack.id,
        }).unwrap();
        toast.open({ message: "Rack criado com sucesso" });
        try {
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar rack", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteRack = async ({ id }: RackModel) => {
    try {
      await deleteRack(id).unwrap();
      toast.open({ message: "Rack excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir rack", severity: "error" });
    }
  };

  const handleRowClick = ({ id }: RackModel) => {
    navigate(`${path}/${id}`, {});
  };

  return (
    <HeroContainer title="Racks e ocupação">
      <Button variant="contained" onClick={handleOpenRackModal}>
        Novo rack
      </Button>
      <DataTable
        title="Racks"
        rows={racks ?? []}
        columns={columns}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditRack,
          onDeleteRow: handleDeleteRack,
          selectionMode: "hide",
          onRowClick: handleRowClick,
        }}
      />
      <Loading open={loadingFetch || loadingUpdate || loadingDelete} />
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
