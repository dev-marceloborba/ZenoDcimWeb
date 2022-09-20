import HeroContainer from "modules/shared/components/HeroContainer";
import SupplierTable from "./components/supplier-table/SupplierTable";
import Button from "@mui/material/Button";
import { useModal } from "mui-modal-provider";
import SupplierForm from "./components/supplier-form/SupplierForm";

export default function SupplierRegistryPage() {
  const { showModal } = useModal();

  const handleOpenSupplierModal = () => {
    const modal = showModal(SupplierForm, {
      onConfirm: () => {
        modal.hide();
      },
    });
  };

  return (
    <HeroContainer title="Fornecedores">
      <Button onClick={handleOpenSupplierModal}>Criar fornecedor</Button>
      <SupplierTable />
    </HeroContainer>
  );
}
