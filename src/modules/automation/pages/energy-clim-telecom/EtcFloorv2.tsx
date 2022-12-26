import React from "react";
import Grid from "@mui/material/Grid";
import HeroContainer from "modules/shared/components/HeroContainer";
import {
  useLoadBuildingCardsQuery,
  useUpdateSiteBuildingCardMutation,
} from "modules/automation/services/site-building-card-service";
import useRouter from "modules/core/hooks/useRouter";
import SiteBuildingCard from "modules/automation/components/site-building-card/SiteBuildingCard";
import Loading from "modules/shared/components/Loading";
import { useModal } from "mui-modal-provider";
import { useToast } from "modules/shared/components/ToastProvider";
import Card6ParametersSettings from "modules/automation/components/card-6-parameters-settings/Card6ParametersSettings";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";

const EtcFloor: React.FC = () => {
  const { data: equipments } = useFindAllEquipmentsQuery();
  const { params, navigate, path } = useRouter();
  const { data: buildings, isLoading: isLoadingFetch } =
    useLoadBuildingCardsQuery(params.siteId!);
  const [updateCard, { isLoading: isLoadingUpdate }] =
    useUpdateSiteBuildingCardMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const onShowSettingsModal = (
    id: string,
    siteName: string,
    parameter1: any,
    parameter2: any,
    parameter3: any,
    parameter4: any,
    parameter5: any,
    parameter6: any
  ) => {
    const modal = showModal(Card6ParametersSettings, {
      id,
      name: siteName,
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
          await updateCard({
            id,
            ...state,
          }).unwrap();
          toast.open({ message: "Card atualizado com suceso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao atualizar card", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        sx: {
          minWidth: "1000px",
        },
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
        parameter4: {
          parameter: parameter4,
          equipmentId: parameter4?.equipmentParameter.equipmentId,
          parameterId: parameter4?.equipmentParameter.id,
        },
        parameter5: {
          parameter: parameter5,
          equipmentId: parameter5?.equipmentParameter.equipmentId,
          parameterId: parameter5?.equipmentParameter.id,
        },
        parameter6: {
          parameter: parameter6,
          equipmentId: parameter6?.equipmentParameter.equipmentId,
          parameterId: parameter6?.equipmentParameter.id,
        },
      },
    });
  };

  return (
    <HeroContainer title="Energia, clima e telecom">
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {buildings?.map((building) => (
          <Grid key={building.buildingId} item md={6}>
            <SiteBuildingCard
              title={building.name}
              buildingId={building.buildingId}
              parameter1={{
                description: building.parameter1?.description ?? "",
                enabled: building.parameter1?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter2={{
                description: building.parameter2?.description ?? "",
                enabled: building.parameter2?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter3={{
                description: building.parameter3?.description ?? "",
                enabled: building.parameter3?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter4={{
                description: building.parameter4?.description ?? "",
                enabled: building.parameter4?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter5={{
                description: building.parameter5?.description ?? "",
                enabled: building.parameter5?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter6={{
                description: building.parameter6?.description ?? "",
                enabled: building.parameter6?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              alarms={{
                energy: 0,
                climate: 0,
                telecom: 0,
              }}
              hideSettings={false}
              onSettingsClick={() =>
                onShowSettingsModal(
                  building.id,
                  building.name,
                  building.parameter1,
                  building.parameter2,
                  building.parameter3,
                  building.parameter4,
                  building.parameter5,
                  building.parameter6
                )
              }
              onTitleClick={() => {
                navigate(`${path}/${building.buildingId}`, {});
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Loading open={isLoadingFetch || isLoadingUpdate} />
    </HeroContainer>
  );
};

export default EtcFloor;
