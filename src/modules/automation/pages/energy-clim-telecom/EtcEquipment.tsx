import Grid from "@mui/material/Grid";
import {
  TabContextProvider,
  useTabContext,
} from "modules/shared/components/TabContext";
import LabelTabs from "modules/shared/components/LabelTabs";
import Card3ParametersSettings from "modules/automation/components/card-3-parameter-settings/Card3ParametersSettings";
import EquipmentCard from "modules/automation/components/equipment-card/EquipmentCard";
import {
  useLoadEquipmentCardsQuery,
  useUpdateEquipmentCardMutation,
} from "modules/automation/services/equipment-card-service";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";
import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import { EquipmentCardModel } from "modules/automation/models/equipment-card-model";
import TabPanel from "modules/shared/components/TabPanel";

const EtcEquipment: React.FC = () => {
  const { data: equipments } = useFindAllEquipmentsQuery();
  const { params, navigate, path } = useRouter();
  const { data: equipmentsCards, isLoading: isLoadingFetch } =
    useLoadEquipmentCardsQuery(params.roomId!);
  const [updateCard, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentCardMutation();
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
      <TabContextProvider>
        <LabelTabs items={["Energia", "Clima", "Telecom"]} />
        <EnergyEquipments
          equipments={equipmentsCards ?? []}
          handleOnSettingsClick={onShowSettingsModal}
          handleOnTitleClick={(equipmentId) =>
            navigate(`${path}/${equipmentId}`, {})
          }
        />
        <ClimateEquipments
          equipments={equipmentsCards ?? []}
          handleOnSettingsClick={onShowSettingsModal}
          handleOnTitleClick={(equipmentId) =>
            navigate(`${path}/${equipmentId}`, {})
          }
        />
        <TelecomEquipments
          equipments={equipmentsCards ?? []}
          handleOnSettingsClick={onShowSettingsModal}
          handleOnTitleClick={(equipmentId) =>
            navigate(`${path}/${equipmentId}`, {})
          }
        />
      </TabContextProvider>
      <Loading open={isLoadingFetch || isLoadingUpdate} />
    </HeroContainer>
  );
};

export default EtcEquipment;

type EquipmentData = {
  equipments: EquipmentCardModel[];
  handleOnSettingsClick(
    id: string,
    name: string,
    parameter1: any,
    parameter2: any,
    parameter3: any
  ): void;
  handleOnTitleClick(equipmentId: string): void;
};

const EnergyEquipments: React.FC<EquipmentData> = ({
  equipments,
  handleOnSettingsClick,
  handleOnTitleClick,
}) => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel index={0} value={tabIndex}>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {equipments.map((equipment) => (
          <Grid key={equipment.id} item md={4}>
            <EquipmentCard
              title={equipment.name}
              system="energy"
              status="online"
              parameter1={{
                description: equipment.parameter1?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter2={{
                description: equipment.parameter2?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter3={{
                description: equipment.parameter3?.description ?? "",
                value: 0,
                status: "normal",
              }}
              activeAlarms={{
                status: "highHigh",
                value: 20,
              }}
              hideSettings={false}
              onSettingsClick={() => {
                handleOnSettingsClick(
                  equipment.id,
                  equipment.name,
                  equipment.parameter1,
                  equipment.parameter2,
                  equipment.parameter3
                );
              }}
              onTitleClick={() => {
                handleOnTitleClick(equipment.equipmentId);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
  );
};

const ClimateEquipments: React.FC<EquipmentData> = ({
  equipments,
  handleOnSettingsClick,
}) => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel index={1} value={tabIndex}>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {equipments.map((equipment) => (
          <Grid key={equipment.id} item md={4}>
            <EquipmentCard
              title={equipment.name}
              system="climate"
              status="online"
              parameter1={{
                description: equipment.parameter1?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter2={{
                description: equipment.parameter2?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter3={{
                description: equipment.parameter3?.description ?? "",
                value: 0,
                status: "normal",
              }}
              activeAlarms={{
                status: "highHigh",
                value: 20,
              }}
              hideSettings={false}
              onSettingsClick={() => {
                handleOnSettingsClick(
                  equipment.id,
                  equipment.name,
                  equipment.parameter1,
                  equipment.parameter2,
                  equipment.parameter3
                );
              }}
              onTitleClick={() => {}}
            />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
  );
};

const TelecomEquipments: React.FC<EquipmentData> = ({
  equipments,
  handleOnSettingsClick,
}) => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel index={2} value={tabIndex}>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {equipments.map((equipment) => (
          <Grid key={equipment.id} item md={4}>
            <EquipmentCard
              title={equipment.name}
              system="telecom"
              status="online"
              parameter1={{
                description: equipment.parameter1?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter2={{
                description: equipment.parameter2?.description ?? "",
                value: 0,
                status: "normal",
              }}
              parameter3={{
                description: equipment.parameter3?.description ?? "",
                value: 0,
                status: "normal",
              }}
              activeAlarms={{
                status: "highHigh",
                value: 20,
              }}
              hideSettings={false}
              onSettingsClick={() => {
                handleOnSettingsClick(
                  equipment.id,
                  equipment.name,
                  equipment.parameter1,
                  equipment.parameter2,
                  equipment.parameter3
                );
              }}
              onTitleClick={() => {}}
            />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
  );
};
