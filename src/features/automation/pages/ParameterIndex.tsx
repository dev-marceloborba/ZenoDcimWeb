import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import ParameterTable from "../components/ParameterTable";
import { useModal } from "mui-modal-provider";
import ParameterModal from "../components/ParameterModal";

const ParameterIndex: React.FC = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();

  const handleOpenParameterModal = () => {
    const modal = showModal(ParameterModal, {
      onConfirm: () => {
        modal.hide();
      },
    });
  };

  const handleOpenGroup = () => {
    navigate("/zeno/automation/management/equipment/parameter/group/form");
  };

  return (
    <HeroContainer>
      <PageTitle>Parâmetros</PageTitle>
      <Button onClick={handleOpenParameterModal}>Novo parâmetro</Button>
      <Button onClick={handleOpenGroup}>Novo grupo</Button>
      <ParameterTable />
    </HeroContainer>
  );
};

export default ParameterIndex;
