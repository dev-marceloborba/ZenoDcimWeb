import React from "react";
import ToolBar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Loading from "app/components/Loading";
import { useGetUsersQuery } from "app/services/authentication";
import ButtonLink from "app/components/ButtonLink";
import Table from "app/hooks/useTable";

const Admin: React.FC = () => {
  const { isLoading, isError, data: users, error } = useGetUsersQuery();
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

  const handleDelete = (row: any) => (event: any) => {
    console.log(row);
  };

  return (
    <Container maxWidth="xl">
      <ToolBar />
      <Box component="div" sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonLink to="/zeno/admin/new" variant="contained">
          Criar usuário
        </ButtonLink>
      </Box>
      <Loading open={isLoading} />
      <Table columns={columns} rows={users} showActions />
    </Container>
  );
};

export default Admin;
