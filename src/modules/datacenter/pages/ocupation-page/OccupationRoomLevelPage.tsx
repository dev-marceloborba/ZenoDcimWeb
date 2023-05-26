import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import OccupationCard from "modules/datacenter/components/occupation-card/OccupationCard";
import { useEffect } from "react";
import Loading from "modules/shared/components/Loading";
import { useLoadOccupationCardMutation } from "modules/datacenter/services/room-service";

export default function OccupationRoomLevelPage() {
  const { params, path } = useRouter();
  const [findRooms, { data: rooms, isLoading }] =
    useLoadOccupationCardMutation();

  useEffect(() => {
    async function fetchRooms() {
      await findRooms(params.buildingId!).unwrap();
    }
    fetchRooms();
  }, [findRooms, params.buildingId]);

  return (
    <HeroContainer
      title="Ocupação - Salas
    "
    >
      <Grid container rowSpacing={1} columnSpacing={1}>
        {rooms?.map(
          ({
            id,
            name,
            occupiedPower,
            occupiedCapacity,
            powerCapacity,
            rackCapacity,
            racksQuantity,
            roomsQuantity,
          }) => {
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
                  pathToNavigate={`${path}/${id}`}
                  hideQuantity
                />
              </Grid>
            );
          }
        )}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
