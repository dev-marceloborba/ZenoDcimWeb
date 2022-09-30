import DataTable from "modules/shared/components/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import { useModal } from "mui-modal-provider";
import UserGroupFormModal from "./components/user-group-form-modal/UserGroupFormModal";
import Button from "@mui/material/Button";

export default function UserGroupsPage() {
  const { showModal } = useModal();

  const handleOpenModal = () => {
    const modal = showModal(UserGroupFormModal, {
      onConfirm: (data) => {
        console.log(data);
        modal.hide();
      },
    });
  };

  return (
    <HeroContainer title="Grupos de usuário">
      <Button onClick={() => handleOpenModal()}>Novo grupo</Button>
      {/* <DataTable title="" rows={[]} columns={[]} /> */}
    </HeroContainer>
  );
}
