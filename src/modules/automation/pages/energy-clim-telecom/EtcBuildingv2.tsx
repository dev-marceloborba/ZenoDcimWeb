import Grid from "@mui/material/Grid";
import SiteBuildingCard from "modules/automation/components/site-building-card/SiteBuildingCard";
import { useLoadCardsQuery } from "modules/datacenter/services/building-service";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import PowerIcon from "@mui/icons-material/Power";
import { useModal } from "mui-modal-provider";
import Card6ParametersSettings from "modules/automation/components/card-6-parameters-settings/Card6ParametersSettings";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";
import { useFindAllParametersQuery } from "modules/automation/services/parameter-service";

export default function EtcBuilding() {
  const { data: buildings, isLoading } = useLoadCardsQuery();
  const { data: equipments } = useFindAllEquipmentsQuery();
  const { data: parameters } = useFindAllParametersQuery();
  const { showModal } = useModal();

  console.log(buildings);
  const onShowSettingsModal = (buildingId: string, buildingName: string) => {
    const modal = showModal(Card6ParametersSettings, {
      id: buildingId,
      equipmentName: buildingName,
      parameters:
        parameters?.map((parameter) => ({
          id: parameter.id,
          label: parameter.name,
        })) ?? [],
      equipments:
        equipments?.map((equipment) => ({
          id: equipment.id,
          label: equipment.component,
        })) ?? [],
      onSave: (state, id) => {
        console.log(state, id);
        modal.hide();
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
          parameter: null,
          equipmentId: null,
          parameterId: null,
        },
        parameter2: {
          parameter: null,
          equipmentId: null,
          parameterId: null,
        },
        parameter3: {
          parameter: null,
          equipmentId: null,
          parameterId: null,
        },
        parameter4: {
          parameter: null,
          equipmentId: null,
          parameterId: null,
        },
        parameter5: {
          parameter: null,
          equipmentId: null,
          parameterId: null,
        },
        parameter6: {
          parameter: null,
          equipmentId: null,
          parameterId: null,
        },
      },
    });
  };

  return (
    <HeroContainer title="Energia, clima e telecom">
      <Grid
        container
        // justifyContent="center"
        alignItems="center"
        columnSpacing={6}
        rowSpacing={2}
        sx={{ mt: 2 }}
      >
        {buildings?.map((building) => (
          <Grid key={building.buildingId} item md={6}>
            <SiteBuildingCard
              title={building.name}
              parameter1={{
                description: building.parameter1?.description ?? "",
                icon: <PowerIcon />,
                value: 0,
                status: "normal",
              }}
              parameter2={{
                description: building.parameter2?.description ?? "",
                icon: <PowerIcon />,
                value: 0,
                status: "normal",
              }}
              parameter3={{
                description: building.parameter3?.description ?? "",
                icon: <PowerIcon />,
                value: 0,
                status: "normal",
              }}
              parameter4={{
                description: building.parameter4?.description ?? "",
                icon: <PowerIcon />,
                value: 0,
                status: "normal",
              }}
              parameter5={{
                description: building.parameter5?.description ?? "",
                icon: <PowerIcon />,
                value: 0,
                status: "normal",
              }}
              parameter6={{
                description: building.parameter6?.description ?? "",
                icon: <PowerIcon />,
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
                onShowSettingsModal(building.buildingId, building.name)
              }
              onTitleClick={() => console.log("navigate to details")}
            />
          </Grid>
        ))}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
