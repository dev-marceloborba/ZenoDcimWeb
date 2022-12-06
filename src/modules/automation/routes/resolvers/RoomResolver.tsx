import { useFindAllRoomsQuery } from "modules/datacenter/services/room-service";
import { BreadcrumbData } from "use-react-router-breadcrumbs";

const RoomResolver = ({ match }: BreadcrumbData) => {
  const { isLoading, data: rooms } = useFindAllRoomsQuery();

  if (isLoading) return null;

  if (rooms) {
    return (
      <span>{rooms.find((room) => room.id === match.params.roomId)?.name}</span>
    );
  }
};

export default RoomResolver;
