import React from "react";
import ToolBar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Loading from "app/components/Loading";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "app/services/authentication";
import ButtonLink from "app/components/ButtonLink";
import Table from "app/hooks/useTable";
import { useToast } from "app/components/Toast";

const Admin: React.FC = () => {
  const { isLoading, isError, data: users, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const toast = useToast();
  const columns = [
    {
      label: "Nome",
      name: "firstName",
      align: "left",
    },
    {
      label: "E-mail",
      name: "email",
      align: "right",
    },
    {
      label: "Grupo",
      name: "role",
      align: "right",
    },
    {
      label: "Status",
      name: "active",
      align: "right",
    },
  ];

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
      <Table
        columns={columns}
        rows={users}
        showActions
        editPage={"/zeno/settings/edit-user"}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default Admin;
