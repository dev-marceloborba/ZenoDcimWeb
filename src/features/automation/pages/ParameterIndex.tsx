import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import ParameterTable from "../components/ParameterTable";
import { useModal } from "mui-modal-provider";
import ParameterModal from "../components/ParameterModal";
import { useToast } from "app/components/Toast";
import { useCreateParameterMutation } from "app/services/datacenter";
import { ParameterRequest } from "app/models/data-center.model";

const ParameterIndex: React.FC = () => {
  const { showModal } = useModal();
  const toast = useToast();
  const navigate = useNavigate();
  const [createParameter] = useCreateParameterMutation();

  const handleOpenParameterModal = () => {
    const modal = showModal(ParameterModal, {
      onConfirm: async (data) => {
        await handleCreateParameter(data);
        modal.hide();
      },
      title: "Novo parâmetro",
    });
  };

  const handleCreateParameter = async (parameter: ParameterRequest) => {
    try {
      await createParameter(parameter).unwrap();
      toast.open("Parâmetro criado com sucesso", 2000, "success");
    } catch (e) {
      toast.open(`Erro ao criar parâmetro: ${e}`, 2000, "error");
    }
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
