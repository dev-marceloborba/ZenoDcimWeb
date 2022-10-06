import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import { useModal } from "mui-modal-provider";
import UserGroupFormModal from "./components/user-group-form-modal/UserGroupFormModal";
import Button from "@mui/material/Button";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useFindAllGroupsQuery,
  useUpdateGroupMutation,
} from "modules/user/services/groups.service";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { GroupModel } from "modules/user/models/group.model";

export default function UserGroupsPage() {
  const toast = useToast();
  const { showModal } = useModal();
  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const { data: groups, isLoading } = useFindAllGroupsQuery();

  const handleOpenModal = () => {
    const modal = showModal(UserGroupFormModal, {
      onConfirm: async (formData, permissions) => {
        try {
          await createGroup({
            ...permissions,
            ...formData,
          }).unwrap();
          toast.open("Grupo criado com sucesso", 2000, "success");
        } catch (error) {
          console.log(error);
          toast.open("Erro ao criar grupo", 2000, "error");
        } finally {
          modal.hide();
        }
      },
      title: "Novo grupo de usuário",
      onCancel: () => {
        modal.hide();
      },
    });
  };

  const handleOpenEditModal = (group: GroupModel) => {
    const modal = showModal(UserGroupFormModal, {
      onConfirmEdit: async (id, formData, permissions) => {
        try {
          await updateGroup({
            id,
            ...permissions,
            ...formData,
          }).unwrap();
          toast.open("Grupo alterado com sucesso", 2000, "success");
        } catch (error) {
          console.log(error);
          toast.open("Erro ao editar grupo", 2000, "error");
        } finally {
          modal.hide();
        }
      },
      title: "Editar grupo de usuário",
      mode: "edit",
      data: {
        id: group.id,
        formData: {
          name: group.name,
          description: group.description,
        },
        permissions: {
          actions: group.actions,
          registers: group.registers,
          views: group.views,
        },
      },
      onCancel: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteSelection = (groups: GroupModel[]) => {
    try {
      groups.forEach(async (group) => {
        await deleteGroup(group.id).unwrap();
      });
      toast.open("Grupo(s) excluído(s) com sucesso", 2000, "success");
    } catch {
      toast.open("Erro ao excluir grupo(s)", 2000, "error");
    }
  };

  const handleDelete = async (group: GroupModel) => {
    try {
      await deleteGroup(group.id).unwrap();
      toast.open("Grupo excluído com sucesso", 2000, "success");
    } catch (error) {
      console.log(error);
      toast.open("Erro ao excluir grupo", 2000, "error");
    }
  };

  return (
    <HeroContainer title="Grupos de usuário">
      <Button onClick={() => handleOpenModal()}>Novo grupo</Button>
      <DataTable
        title=""
        rows={groups ?? []}
        columns={columns}
        options={{
          onDeleteSelection: (rows) => handleDeleteSelection(rows),
          showEdit: true,
          showDelete: true,
          onEditRow: handleOpenEditModal,
          onDeleteRow: handleDelete,
        }}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Grupo",
  },
  {
    name: "description",
    label: "Descrição",
  },
];
