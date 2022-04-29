import React from "react";
import { useNavigate } from "react-router-dom";
import ToolBar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Loading from "app/components/Loading";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "app/services/authentication";
import ButtonLink from "app/components/ButtonLink";
import DataTable, { Column } from "app/components/DataTable";
import { useToast } from "app/components/Toast";

const Admin: React.FC = () => {
  const { isLoading, isError, data: users, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const toast = useToast();
  const navigate = useNavigate();

  const handleDelete = async (row: any) => {
    try {
      await deleteUser(row.id).unwrap();
      toast.open(
        `Usuário ${row.firstName} excluído com sucesso`,
        2000,
        "success"
      );
    } catch (error) {
      toast.open(
        `Erro ao excluido o usuário ${row.firstName}: ${error}`,
        2000,
        "error"
      );
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
      <Loading open={isLoading} />
      <DataTable
        columns={columns}
        rows={users ?? []}
        title="Usuários"
        options={{
          onRowClick: (row) => {
            navigate(`/zeno/settings/user/${row.id}`);
          },
        }}
        // editPage={"/zeno/settings/edit-user"}
        // handleDelete={handleDelete}
      />
    </Container>
  );
};

const columns: Column[] = [
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

export default Admin;
