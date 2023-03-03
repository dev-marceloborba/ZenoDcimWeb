import Button from "@mui/material/Button";
import Loading from "modules/shared/components/Loading";
import ButtonLink from "modules/shared/components/ButtonLink";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import { useToast } from "modules/shared/components/ToastProvider";
import { UserModel } from "modules/user/models/user-model";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import { useAppDispatch } from "app/hooks";
import { setPermissions } from "modules/user/stores/slices/AuthenticationSlice";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useFindAllUsersQuery,
} from "modules/user/services/authentication-service";
import { useModal } from "mui-modal-provider";
import UserFormModal from "modules/user/modals/user-form-modal/UserFormModal";
import { useFindAllGroupsQuery } from "modules/user/services/groups.service";
import { useFindAllCompaniesQuery } from "modules/user/services/company-service";
import { useAuth } from "app/hooks/useAuth";
import useRouter from "modules/core/hooks/useRouter";

const UserAdmin: React.FC = () => {
  const { currentUser, signout } = useAuth();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { navigate } = useRouter();
  const { showModal } = useModal();
  const { isLoading, data: users } = useFindAllUsersQuery();
  const { data: groups } = useFindAllGroupsQuery();
  const { data: companies } = useFindAllCompaniesQuery();

  const [createUser, { isLoading: loadingCreate }] = useCreateUserMutation();
  const [editUser, { isLoading: loadingUpdate }] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleCreateUser = () => {
    const modal = showModal(UserFormModal, {
      title: "Criar usuário",
      data: {
        groups: groups ?? [],
        companies: companies ?? [],
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await createUser(formData).unwrap();
          toast.open({ message: "Usuário criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar usuário", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleEditUser = (user: UserModel) => {
    const modal = showModal(UserFormModal, {
      title: "Alterar usuário",
      mode: "edit",
      data: {
        model: user,
        groups: groups ?? [],
        companies: companies ?? [],
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          const editedUser = await editUser(formData).unwrap();
          if (editedUser.data.id === currentUser?.id) {
            dispatch(setPermissions(editedUser.data.group));
            signout();
            navigate("/", { replace: true });
            return;
          }
          toast.open({ message: "Usuário alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar usuário", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteUser = async ({ id }: UserModel) => {
    try {
      await deleteUser(id).unwrap();
      toast.open({ message: `Usuário's excluído's com sucesso` });
    } catch (error) {
      toast.open({
        message: `Erro ao excluido o usuário's: ${error}`,
        severity: "error",
      });
    }
  };

  return (
    <HeroContainer>
      <Row sx={{ justifyContent: "flex-end" }}>
        <Button onClick={handleCreateUser} variant="contained">
          Criar usuário
        </Button>
        <ButtonLink
          to="/zeno/settings/user-groups"
          variant="contained"
          sx={{ mx: 2 }}
        >
          Grupos de usuário
        </ButtonLink>
        <ButtonLink to="/zeno/settings/company-form" variant="outlined">
          Criar empresa
        </ButtonLink>
      </Row>
      <DataTable
        columns={columns}
        rows={
          users?.map((user) => ({
            ...user,
            active_description: user.active ? "Ativo" : "Inativo",
          })) ?? []
        }
        title="Usuários"
        options={{
          selectionMode: "hide",
          userPreferenceTable: "userTable",
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditUser,
          onDeleteRow: handleDeleteUser,
        }}
      />
      <Loading open={isLoading || loadingCreate || loadingUpdate} />
    </HeroContainer>
  );
};

const columns: ColumnHeader[] = [
  {
    label: "Nome",
    name: "firstName",
  },
  {
    label: "E-mail",
    name: "email",
  },
  {
    label: "Grupo",
    name: "group.name",
  },
  {
    label: "Status",
    name: "active_description",
  },
];

export default UserAdmin;
