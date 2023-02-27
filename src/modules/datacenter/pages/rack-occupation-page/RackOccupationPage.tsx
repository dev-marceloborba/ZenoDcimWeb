import useRouter from "modules/core/hooks/useRouter";
import {
  useCreateRackMutation,
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
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";

export default function RackOccupationPage() {
  const toast = useToast();
  const { showModal } = useModal();
  const { path, navigate } = useRouter();

  const { data: sites, isLoading: loadingSites } = useFindAllSitesQuery();
  const { data: racks, isLoading: loadingFetch } = useFindAllRacksQuery();
  const [createRack, { isLoading: isLoadingCreate }] = useCreateRackMutation();
  const [updateRack, { isLoading: loadingUpdate }] = useUpdateRackMutation();
  const [deleteRack, { isLoading: loadingDelete }] = useDeleteRackMutation();

  const handleOpenRackModal = () => {
    const modal = showModal(RackFormModal, {
      title: "Novo rack",
      data: {
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await createRack(formData).unwrap();
          toast.open({ message: "Rack criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar rack", severity: "error" });
        }
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
      data: {
        model: rack,
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateRack({
            ...formData,
            id: rack.id,
          }).unwrap();
          toast.open({ message: "Rack alterado com sucesso" });
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
    name: "site.name",
    label: "Site",
  },
  {
    name: "building.name",
    label: "Prédio",
  },
  {
    name: "floor.name",
    label: "Andar",
  },
  {
    name: "room.name",
    label: "Sala",
  },
  {
    name: "name",
    label: "Rack",
  },
  {
    name: "power",
    label: "Potência (kW)",
  },
  {
    name: "capacity",
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
