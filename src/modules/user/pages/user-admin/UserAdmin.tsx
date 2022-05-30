import React from "react";
import { useNavigate } from "react-router-dom";
import ToolBar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Loading from "app/components/Loading";
import {
  useDeleteUserMutation,
  useFindAllUsersQuery,
} from "app/services/authentication";
import ButtonLink from "app/components/ButtonLink";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import { useToast } from "app/components/Toast";
import { UserResponseNormalized } from "app/models/authentication.model";

const UserAdmin: React.FC = () => {
  const { isLoading, data: users } = useFindAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const toast = useToast();
  const navigate = useNavigate();

  const handleDelete = async (users: UserResponseNormalized[]) => {
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
    <Container maxWidth="xl">
      <ToolBar />
      <Box component="div" sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonLink to="/zeno/settings/new-user" variant="contained">
          Criar usuário
        </ButtonLink>
      </Box>
      <DataTable
        columns={columns}
        rows={users ?? []}
        title="Usuários"
        options={{
          onRowClick: (row) => {
            navigate(`/zeno/settings/user/${row.id}`);
          },
          onDeleteSelection: handleDelete,
        }}
      />
      <Loading open={isLoading} />
    </Container>
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
