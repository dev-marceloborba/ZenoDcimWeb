import Grid from "@mui/material/Grid";
import SiteBuildingCard from "modules/automation/components/site-building-card/SiteBuildingCard";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import { useModal } from "mui-modal-provider";
import Card6ParametersSettings from "modules/automation/components/card-6-parameters-settings/Card6ParametersSettings";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";
import {
  useUpdateSiteBuildingCardMutation,
  useLoadCardsQuery,
} from "modules/automation/services/site-building-card-service";
import { useToast } from "modules/shared/components/ToastProvider";
import useRouter from "modules/core/hooks/useRouter";

export default function EtcBuilding() {
  const { data: sites, isLoading: isLoadingFetch } = useLoadCardsQuery();
  const { data: equipments } = useFindAllEquipmentsQuery();
  const [updateCard, { isLoading: isLoadingUpdate }] =
    useUpdateSiteBuildingCardMutation();
  const { showModal } = useModal();
  const toast = useToast();
  const { navigate } = useRouter();

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
        console.log(state);
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
      <Grid
        container
        alignItems="center"
        columnSpacing={6}
        rowSpacing={2}
        sx={{ mt: 2 }}
      >
        {sites?.map((site) => (
          <Grid key={site.siteId} item md={6}>
            <SiteBuildingCard
              title={site.name}
              siteId={site.siteId}
              parameter1={{
                description: site.parameter1?.description ?? "",
                enabled: site.parameter1?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter2={{
                description: site.parameter2?.description ?? "",
                enabled: site.parameter2?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter3={{
                description: site.parameter3?.description ?? "",
                enabled: site.parameter3?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter4={{
                description: site.parameter4?.description ?? "",
                enabled: site.parameter4?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter5={{
                description: site.parameter5?.description ?? "",
                enabled: site.parameter5?.enabled ?? false,
                value: 0,
                status: "normal",
              }}
              parameter6={{
                description: site.parameter6?.description ?? "",
                enabled: site.parameter6?.enabled ?? false,
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
                  site.id,
                  site.name,
                  site.parameter1,
                  site.parameter2,
                  site.parameter3,
                  site.parameter4,
                  site.parameter5,
                  site.parameter6
                )
              }
              onTitleClick={() =>
                navigate(`/zeno/automation/etc/${site.siteId}`, {})
              }
            />
          </Grid>
        ))}
      </Grid>
      <Loading open={isLoadingFetch || isLoadingUpdate} />
    </HeroContainer>
  );
}
