import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import OccupationCard from "modules/datacenter/components/occupation-card/OccupationCard";
import Loading from "modules/shared/components/Loading";
import { useLoadOccupationCardMutation } from "modules/datacenter/services/building-service";

export default function OccupationBuildingLevelPage() {
  const { params } = useRouter();

  const [findBuildings, { data: buildings, isLoading }] = useLoadOccupationCardMutation();

  useEffect(() => {
    async function fetchBuilding() {
      await findBuildings(params.siteId!).unwrap();
    }
    fetchBuilding();
  }, [findBuildings, params.siteId]);

  return (
    <HeroContainer
      title="Ocupação - Prédios
    "
    >
      <Grid container rowSpacing={1} columnSpacing={1}>
        {buildings?.map(({ id, name, occupiedPower, occupiedCapacity, powerCapacity, rackCapacity, racksQuantity, roomsQuantity }) => {
          return (
            <Grid key={id} item xs={4}>
              <OccupationCard
                title={name}
                power={{
                  current: occupiedPower,
                  total: powerCapacity,
                  unit: "MW",
                }}
                capacity={{
                  current: occupiedCapacity,
                  total: rackCapacity,
                }}
                quantity={{
                  racks: racksQuantity,
                  rooms: roomsQuantity,
                }}
                pathToNavigate={`/zeno/datacenter/occupation/${params.siteId}/${id}`}
              />
            </Grid>
          );
        })}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
