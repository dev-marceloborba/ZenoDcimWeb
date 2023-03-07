import OccupationCard from "modules/datacenter/components/occupation-card/OccupationCard";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import { useLoadOccupationCardQuery } from "modules/datacenter/services/site-service";
import Loading from "modules/shared/components/Loading";

export default function OccupationSiteLevelPage() {
  const { data: sites, isLoading } = useLoadOccupationCardQuery();

  return (
    <HeroContainer
      title="Ocupação - Sites
    "
    >
      <Grid container rowSpacing={1} columnSpacing={1}>
        {sites?.map(({ id, name, occupiedPower, occupiedCapacity, powerCapacity, rackCapacity, racksQuantity, roomsQuantity }) => {
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
                pathToNavigate={`/zeno/datacenter/occupation/${id}`}
              />
            </Grid>
          );
        })}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
