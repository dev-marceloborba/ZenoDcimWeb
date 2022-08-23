import React from "react";
import Loading from "modules/shared/components/Loading";
import {
  useDeleteUserMutation,
  useFindAllUsersQuery,
} from "app/services/authentication";
import ButtonLink from "modules/shared/components/ButtonLink";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import { useToast } from "modules/shared/components/ToastProvider";
import { UserModelNormalized } from "modules/user/models/user-model";
import HeroContainer from "modules/shared/components/HeroContainer";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { SettingsPath } from "modules/home/routes/paths";
import { UserDetailsPath } from "modules/user/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import Row from "modules/shared/components/Row";

const UserAdmin: React.FC = () => {
  const { isLoading, data: users } = useFindAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const toast = useToast();
  const { navigate } = useRouter();

  const handleDelete = async (users: UserModelNormalized[]) => {
    try {
      for (let i = 0; i < users.length; i++) {
        await deleteUser(users[i].id).unwrap();
      }
      toast.open(`Usuário's excluído's com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(`Erro ao excluido o usuário's: ${error}`, 2000, "error");
    }
  };

  return (
    <HeroContainer>
      <Row sx={{ justifyContent: "flex-end" }}>
        <ButtonLink to="/zeno/settings/user-new" variant="contained">
          Criar usuário
        </ButtonLink>
        <ButtonLink
          sx={{ ml: 2 }}
          to="/zeno/settings/company-form"
          variant="outlined"
        >
          Criar empresa
        </ButtonLink>
      </Row>
      <DataTable
        columns={columns}
        rows={users ?? []}
        title="Usuários"
        options={{
          onRowClick: (row) => {
            const path = compositePathRoute([
              HomePath,
              SettingsPath,
              UserDetailsPath,
            ]);
            navigate(path, {
              state: {
                user: row,
                mode: "edit",
              },
            });
          },
          onDeleteSelection: handleDelete,
        }}
      />
      <Loading open={isLoading} />
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
    name: "role",
  },
  {
    label: "Status",
    name: "active",
  },
];

export default UserAdmin;
