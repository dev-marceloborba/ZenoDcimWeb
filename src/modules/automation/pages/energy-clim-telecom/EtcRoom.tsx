import Grid from "@mui/material/Grid";
import Card3ParametersSettings from "modules/automation/components/card-3-parameter-settings/Card3ParametersSettings";
import RoomCard from "modules/automation/components/room-card/RoomCard";
import useAutomationRealtime from "modules/automation/data/hooks/useAutomationRealtime";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";

import {
  useLoadRoomCardsQuery,
  useUpdateRoomCardMutation,
} from "modules/automation/services/room-card-service";
import { getStatusInAlarmsByPriorities } from "modules/automation/utils/automationUtils";
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
  const { getTag, getRoomStatistics } = useAutomationRealtime();

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
      title: "Configuração do Card",
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
      <Grid container columnSpacing={1} rowSpacing={1}>
        {rooms?.map((room) => {
          const tag1 = getTag(
            room.parameter1?.equipmentParameter?.pathname ?? ""
          );
          const tag2 = getTag(
            room.parameter2?.equipmentParameter?.pathname ?? ""
          );
          const tag3 = getTag(
            room.parameter3?.equipmentParameter?.pathname ?? ""
          );
          const roomStatistics = getRoomStatistics(room.name);
          return (
            <Grid key={room.id} item md={4}>
              <RoomCard
                title={room.name}
                parameter1={{
                  description: room.parameter1?.description ?? "",
                  enabled: room.parameter1?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag1.alarms),
                  ...tag1,
                }}
                parameter2={{
                  description: room.parameter2?.description ?? "",
                  enabled: room.parameter2?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag2.alarms),
                  ...tag2,
                }}
                parameter3={{
                  description: room.parameter3?.description ?? "",
                  enabled: room.parameter3?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag3.alarms),
                  ...tag3,
                }}
                activeAlarms={{
                  status: "highHigh",
                  value: roomStatistics?.totalAlarms ?? 0,
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
          );
        })}
      </Grid>
      <Loading open={isLoadingFetch || isLoadingUpdate} />
    </HeroContainer>
  );
};

export default EtcRoom;
