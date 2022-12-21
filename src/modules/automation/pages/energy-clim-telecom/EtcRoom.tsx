import Grid from "@mui/material/Grid";
import Card3ParametersSettings from "modules/automation/components/card-3-parameter-settings/Card3ParametersSettings";
import EquipmentCard from "modules/automation/components/equipment-card/EquipmentCard";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";

import {
  useLoadRoomCardsQuery,
  useUpdateRoomCardMutation,
} from "modules/automation/services/room-card-service";
import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";

const EtcRoom: React.FC = () => {
  const { data: equipments } = useFindAllEquipmentsQuery();
  const { navigate, path, params } = useRouter();
  const { data: rooms, isLoading: isLoadingFetch } = useLoadRoomCardsQuery(
    params.buildingId!
  );
  const [updateCard, { isLoading: isLoadingUpdate }] =
    useUpdateRoomCardMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const onShowSettingsModal = (
    id: string,
    name: string,
    parameter1: any,
    parameter2: any,
    parameter3: any
  ) => {
    const modal = showModal(Card3ParametersSettings, {
      id,
      name,
      equipments:
        equipments?.map((equipment) => ({
          id: equipment.id,
          label: equipment.component,
          parameters:
            equipment.equipmentParameters?.map((parameter) => ({
              id: parameter.id,
              label: parameter.name,
            })) ?? [],
        })) ?? [],
      onSave: async (state, id) => {
        modal.hide();
        try {
          await updateCard({ id, ...state }).unwrap();
          toast.open({ message: "Card atualizado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao atualizar card", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
      data: {
        parameter1: {
          parameter: parameter1,
          equipmentId: parameter1?.equipmentParameter.equipmentId,
          parameterId: parameter1?.equipmentParameter.id,
        },
        parameter2: {
          parameter: parameter2,
          equipmentId: parameter2?.equipmentParameter.equipmentId,
          parameterId: parameter2?.equipmentParameter.id,
        },
        parameter3: {
          parameter: parameter3,
          equipmentId: parameter3?.equipmentParameter.equipmentId,
          parameterId: parameter3?.equipmentParameter.id,
        },
      },
      PaperProps: {
        sx: {
          minWidth: "800px",
          minHeight: "650px",
        },
      },
    });
  };

  return (
    <HeroContainer>
      <Grid container columnSpacing={1}>
        {rooms?.map((room) => (
          <Grid key={room.id} item md={4}>
            <EquipmentCard
              title={room.name}
              system="energy"
              status="online"
              parameter1={{
                description: room.parameter1?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter2={{
                description: room.parameter2?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter3={{
                description: room.parameter3?.description ?? "",
                value: 0,
                status: "normal",
              }}
              activeAlarms={{
                status: "highHigh",
                value: 20,
              }}
              hideSettings={false}
              onSettingsClick={() => {
                onShowSettingsModal(
                  room.id,
                  room.name,
                  room.parameter1,
                  room.parameter2,
                  room.parameter3
                );
              }}
              onTitleClick={() => {
                navigate(`${path}/${room.roomId}`, {});
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Loading open={isLoadingFetch || isLoadingUpdate} />
    </HeroContainer>
  );
};

export default EtcRoom;
