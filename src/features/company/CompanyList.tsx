import React from "react";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useFindAllCompaniesQuery } from "app/services/company";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import Loading from "app/components/Loading";

const CompanyList: React.FC = () => {
  const { data: companies, isLoading } = useFindAllCompaniesQuery();

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <DataTable title="Empresas" columns={columns} rows={companies ?? []} />
      <Loading open={isLoading} />
    </Container>
  );
};

export default CompanyList;

const columns: ColumnHeader[] = [
  {
    name: "companyName",
    label: "Razão social",
  },
  {
    name: "tradingName",
    label: "Nome fantasia",
  },
  {
    name: "registrationNumber",
    label: "CNPJ",
  },
];
