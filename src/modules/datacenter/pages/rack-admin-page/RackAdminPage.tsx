import { Button } from "@mui/material";
import { useCreateRackMutation } from "modules/datacenter/services/rack.service";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import RackForm from "./components/rack-form/RackForm";
import RackTable from "./components/rack-table/RackTable";

export default function RackAdminPage() {
  const { showModal } = useModal();
  const [createRack, { isLoading }] = useCreateRackMutation();
  const toast = useToast();

  const handleOpenRackFormModal = () => {
    const modal = showModal(RackForm, {
      title: "Novo rack",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: async (data) => {
        modal.hide();
        await createRack(data).unwrap();
        toast.open({
          message: "Rack criado com sucesso",
          autoHideDuration: 1500,
        });
      },
    });
  };
  return (
    <HeroContainer title="Racks">
      <Button onClick={handleOpenRackFormModal}>Novo rack</Button>
      <RackTable />
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
