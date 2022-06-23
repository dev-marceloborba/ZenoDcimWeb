import HeroContainer from "modules/shared/components/HeroContainer";
import RoomTable from "./components/room-table/RoomTable";

export default function RoomAdmin() {
  return (
    <HeroContainer title="Gestão de salas">
      <RoomTable />
    </HeroContainer>
  );
}
