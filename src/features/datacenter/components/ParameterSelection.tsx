import React from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import ParametersTable from "./ParametersTable";
import { useModal } from "app/hooks/useModal";
import Button from "@mui/material/Button";

const ParameterSelection: React.FC = () => {
  const { closeModal } = useModal();

  return (
    <HeroContainer>
      <PageTitle>Seleção de parâmetros</PageTitle>
      <ParametersTable />
      <Button variant="contained" onClick={closeModal}>
        Selecionar
      </Button>
    </HeroContainer>
  );
};

export default ParameterSelection;
