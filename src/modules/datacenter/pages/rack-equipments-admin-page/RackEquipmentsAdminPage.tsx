import Button from "@mui/material/Button";
import { useCreateRackEquipmentMutation } from "modules/datacenter/services/rack-equipment.service";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import RackEquipmentForm from "./components/rack-equipment-form/RackEquipmentForm";
import RackEquipmentTable from "./components/rack-equipment-table/RackEquipmentTable";

export default function RackEquipmentsAdminPage() {
  const [createEquipment, { isLoading }] = useCreateRackEquipmentMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const handleInsertEquipment = () => {
    const modal = showModal(RackEquipmentForm, {
      title: "Cadastro de equipamento",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: async (data) => {
        modal.hide();
        await createEquipment({
          ...data,
          initialPosition: 0,
          finalPosition: 0,
        }).unwrap();
        toast.open({ message: "Equipamento cadastrado com sucesso" });
      },
    });
  };

  return (
    <HeroContainer title="Equipamentos do rack">
      <Button onClick={handleInsertEquipment}>Inserir equipamento</Button>
      <RackEquipmentTable />
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
