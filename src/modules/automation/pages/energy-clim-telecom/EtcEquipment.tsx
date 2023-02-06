import Grid from "@mui/material/Grid";
import {
  TabContextProvider,
  useTabContext,
} from "modules/shared/components/TabContext";
import LabelTabs from "modules/shared/components/LabelTabs";
import EquipmentCard from "modules/automation/components/equipment-card/EquipmentCard";
import {
  useLoadEquipmentCardsQuery,
  useUpdateEquipmentCardMutation,
} from "modules/automation/services/equipment-card-service";
import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import { EquipmentCardModel } from "modules/automation/models/equipment-card-model";
import TabPanel from "modules/shared/components/TabPanel";
import Card3ParameterEquipmentSettings from "modules/automation/components/card-3-parameter-equipment-settings/Card3ParameterEquipmentSettings";
import { useFindEquipmentParametersByEquipmentIdMutation } from "modules/automation/services/equipment-parameter-service";
import useAutomationRealtime from "modules/automation/data/hooks/useAutomationRealtime";
import { getStatusInAlarmsByPriorities } from "modules/automation/utils/automationUtils";

const EtcEquipment: React.FC = () => {
  const { params, navigate, path } = useRouter();
  const [findParameters, { isLoading: loadingFetchParameters }] =
    useFindEquipmentParametersByEquipmentIdMutation();
  const { data: equipmentsCards, isLoading: isLoadingFetch } =
    useLoadEquipmentCardsQuery(params.roomId!);
  const [updateCard, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentCardMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const onShowSettingsModal = async (
    id: string,
    equipmentId: string,
    name: string,
    parameter1: any,
    parameter2: any,
    parameter3: any
  ) => {
    const parameters = await findParameters(equipmentId).unwrap();
    const modal = showModal(Card3ParameterEquipmentSettings, {
      id,
      name,
      title: "Configuração do Card",
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
        parameters:
          parameters.map((parameter) => ({
            id: parameter.id,
            label: parameter.name,
          })) ?? [],
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
      <Loading
        open={isLoadingFetch || isLoadingUpdate || loadingFetchParameters}
      />
    </HeroContainer>
  );
};

export default EtcEquipment;

type EquipmentData = {
  equipments: EquipmentCardModel[];
  handleOnSettingsClick(
    id: string,
    equipmentId: string,
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
  const { getTag, getEquipmentStatistics } = useAutomationRealtime();
  return (
    <TabPanel index={0} value={tabIndex}>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {equipments.map((equipment) => {
          const tag1 = getTag(
            equipment.parameter1?.equipmentParameter?.pathname ?? ""
          );
          const tag2 = getTag(
            equipment.parameter2?.equipmentParameter?.pathname ?? ""
          );
          const tag3 = getTag(
            equipment.parameter3?.equipmentParameter?.pathname ?? ""
          );
          const equipmentStatistics = getEquipmentStatistics(equipment.name);
          return (
            <Grid key={equipment.id} item md={4}>
              <EquipmentCard
                title={equipment.name}
                system="energy"
                status="online"
                parameter1={{
                  description: equipment.parameter1?.description ?? "",
                  enabled: equipment.parameter1?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag1.alarms),
                  ...tag1,
                }}
                parameter2={{
                  description: equipment.parameter2?.description ?? "",
                  enabled: equipment.parameter2?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag2.alarms),
                  ...tag2,
                }}
                parameter3={{
                  description: equipment.parameter3?.description ?? "",
                  enabled: equipment.parameter3?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag3.alarms),
                  ...tag3,
                }}
                activeAlarms={{
                  status: "highHigh",
                  value: equipmentStatistics?.totalAlarms ?? 0,
                }}
                hideSettings={false}
                onSettingsClick={() => {
                  handleOnSettingsClick(
                    equipment.id,
                    equipment.equipmentId,
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
          );
        })}
      </Grid>
    </TabPanel>
  );
};

const ClimateEquipments: React.FC<EquipmentData> = ({
  equipments,
  handleOnSettingsClick,
}) => {
  const { tabIndex } = useTabContext();
  const { getTag, getEquipmentStatistics } = useAutomationRealtime();
  return (
    <TabPanel index={1} value={tabIndex}>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {equipments.map((equipment) => {
          const tag1 = getTag(
            equipment.parameter1?.equipmentParameter?.pathname ?? ""
          );
          const tag2 = getTag(
            equipment.parameter2?.equipmentParameter?.pathname ?? ""
          );
          const tag3 = getTag(
            equipment.parameter3?.equipmentParameter?.pathname ?? ""
          );
          const equipmentStatistics = getEquipmentStatistics(equipment.name);
          return (
            <Grid key={equipment.id} item md={4}>
              <EquipmentCard
                title={equipment.name}
                system="climate"
                status="online"
                parameter1={{
                  description: equipment.parameter1?.description ?? "",
                  enabled: equipment.parameter1?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag1.alarms),
                  ...tag1,
                }}
                parameter2={{
                  description: equipment.parameter2?.description ?? "",
                  enabled: equipment.parameter2?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag2.alarms),
                  ...tag2,
                }}
                parameter3={{
                  description: equipment.parameter3?.description ?? "",
                  enabled: equipment.parameter3?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag3.alarms),
                  ...tag3,
                }}
                activeAlarms={{
                  status: "highHigh",
                  value: equipmentStatistics?.totalAlarms ?? 0,
                }}
                hideSettings={false}
                onSettingsClick={() => {
                  handleOnSettingsClick(
                    equipment.id,
                    equipment.equipmentId,
                    equipment.name,
                    equipment.parameter1,
                    equipment.parameter2,
                    equipment.parameter3
                  );
                }}
                onTitleClick={() => {}}
              />
            </Grid>
          );
        })}
      </Grid>
    </TabPanel>
  );
};

const TelecomEquipments: React.FC<EquipmentData> = ({
  equipments,
  handleOnSettingsClick,
}) => {
  const { tabIndex } = useTabContext();
  const { getTag, getEquipmentStatistics } = useAutomationRealtime();
  return (
    <TabPanel index={2} value={tabIndex}>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {equipments.map((equipment) => {
          const tag1 = getTag(
            equipment.parameter1?.equipmentParameter?.pathname ?? ""
          );
          const tag2 = getTag(
            equipment.parameter2?.equipmentParameter?.pathname ?? ""
          );
          const tag3 = getTag(
            equipment.parameter3?.equipmentParameter?.pathname ?? ""
          );
          const equipmentStatistics = getEquipmentStatistics(equipment.name);
          return (
            <Grid key={equipment.id} item md={4}>
              <EquipmentCard
                title={equipment.name}
                system="telecom"
                status="online"
                parameter1={{
                  description: equipment.parameter1?.description ?? "",
                  enabled: equipment.parameter1?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag1.alarms),
                  ...tag1,
                }}
                parameter2={{
                  description: equipment.parameter2?.description ?? "",
                  enabled: equipment.parameter2?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag2.alarms),
                  ...tag2,
                }}
                parameter3={{
                  description: equipment.parameter3?.description ?? "",
                  enabled: equipment.parameter3?.enabled ?? false,
                  status: getStatusInAlarmsByPriorities(tag3.alarms),
                  ...tag3,
                }}
                activeAlarms={{
                  status: "highHigh",
                  value: equipmentStatistics?.totalAlarms ?? 0,
                }}
                hideSettings={false}
                onSettingsClick={() => {
                  handleOnSettingsClick(
                    equipment.id,
                    equipment.equipmentId,
                    equipment.name,
                    equipment.parameter1,
                    equipment.parameter2,
                    equipment.parameter3
                  );
                }}
                onTitleClick={() => {}}
              />
            </Grid>
          );
        })}
      </Grid>
    </TabPanel>
  );
};
