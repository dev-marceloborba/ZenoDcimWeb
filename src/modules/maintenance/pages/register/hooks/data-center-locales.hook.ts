import { useState } from "react";
import { EquipmentModel } from "modules/automation/models/automation-model";
import {
  BuildingModel,
  FloorModel,
  RoomModel,
} from "modules/datacenter/models/datacenter-model";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";

export default function useDataCenterLocales() {
  //   const { data: buildings, isLoading } = useFindAllBuildingsQuery();
  const { data: sites, isLoading } = useFindAllSitesQuery();
  const [buildings, setBuildings] = useState<BuildingModel[]>([]);
  const [floors, setFloors] = useState<FloorModel[]>([]);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [equipments, setEquipments] = useState<EquipmentModel[]>([]);

  const getBuildings = (siteId: string) => {
    setBuildings(sites?.find((s) => s.id === siteId)?.buildings ?? []);
  };

  const getFloors = (buildingId: string) => {
    setFloors(buildings?.find((b) => b.id === buildingId)?.floors ?? []);
  };

  const getRooms = (floorId: string) => {
    setRooms(floors.find((f) => f.id === floorId)?.rooms ?? []);
  };

  const getEquipments = (roomId: string) => {
    setEquipments(rooms.find((r) => r.id === roomId)?.equipments ?? []);
  };

  return {
    sites,
    buildings,
    floors,
    rooms,
    equipments,
    isLoading,
    actions: {
      getBuildings,
      getFloors,
      getRooms,
      getEquipments,
    },
  };
}
