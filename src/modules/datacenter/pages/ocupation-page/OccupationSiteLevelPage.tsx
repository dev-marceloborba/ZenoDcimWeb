import OccupationCard from "modules/datacenter/components/occupation-card/OccupationCard";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import Loading from "modules/shared/components/Loading";

export default function OccupationSiteLevelPage() {
  const { data: sites, isLoading } = useFindAllSitesQuery();

  console.log(sites);
  return (
    <HeroContainer
      title="Ocupação - Sites
    "
    >
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={4}>
          <OccupationCard
            title="Site 1"
            power={{
              current: 300,
              total: 1000,
            }}
            capacity={{
              current: 30,
              total: 600,
            }}
            quantity={{
              racks: 15,
              rooms: 4,
            }}
          />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
