import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import Loading from "modules/shared/components/Loading";
import { useLoadOccupationCardMutation } from "modules/datacenter/services/rack.service";
import OccupationCard from "modules/datacenter/components/occupation-card/OccupationCard";

export default function OccupationRackLevelPage() {
  const { params } = useRouter();

  const [findRacks, { data: racks, isLoading }] = useLoadOccupationCardMutation();

  useEffect(() => {
    async function fetchRacks() {
      await findRacks(params.roomId!).unwrap()
    }
    fetchRacks()
  }, [])


  return (
    <HeroContainer
      title="Ocupação - Racks
    "
    >
      <Grid container rowSpacing={1} columnSpacing={1}>
        {racks?.map(({ id, name, occupiedPower, occupiedCapacity, powerCapacity, rackCapacity }) => {
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
                  racks: 0,
                  rooms: 0,
                }}
                hideQuantity
                pathToNavigate={`/zeno/datacenter/infastructure-settings/racks/${id}`}
              />
            </Grid>
          );
        })}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
