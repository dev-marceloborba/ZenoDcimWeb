import { useState, useCallback, useEffect } from "react";
import { EquipmentModel } from "modules/automation/models/automation-model";
import {
  BuildingModel,
  FloorModel,
  RoomModel,
} from "modules/datacenter/models/datacenter-model";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";

type DatacenterLocalesFilter = {
  siteId?: string;
  buildingId?: string;
  floorId?: string;
  roomId?: string;
};

export default function useDataCenterLocales(
  filters?: DatacenterLocalesFilter
) {
  const { data: sites, isLoading } = useFindAllSitesQuery();
  const [buildings, setBuildings] = useState<BuildingModel[]>([]);
  const [floors, setFloors] = useState<FloorModel[]>([]);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [equipments, setEquipments] = useState<EquipmentModel[]>([]);

  console.log("render useDatacenterLocales hook");

  const getBuildings = (siteId: string) => {
    setBuildings(sites?.find((site) => site.id === siteId)?.buildings ?? []);
    setFloors([]);
    setRooms([]);
    setEquipments([]);
  };

  const getFloors = (buildingId: string) => {
    setFloors(
      buildings.find((building) => building.id === buildingId)?.floors ?? []
    );
    setRooms([]);
    setEquipments([]);
  };

  const getRooms = (floorId: string) => {
    setRooms(floors.find((floor) => floor.id === floorId)?.rooms ?? []);
    setEquipments([]);
  };

  const getEquipments = (roomId: string) => {
    setEquipments(rooms?.find((room) => room.id === roomId)?.equipments ?? []);
  };

  useEffect(() => {
    getBuildings(filters?.siteId!);
    getFloors(filters?.buildingId!);
    getRooms(filters?.floorId!);
  });

  // useEffect(() => {
  //   console.log("running once");
  //   let b: BuildingModel[] = [];
  //   let f: FloorModel[] = [];
  //   let r: RoomModel[] = [];
  //   let e: EquipmentModel[] = [];
  //   if (sites) {
  //     sites.forEach((site) => {
  //       site.buildings.forEach((building) => {
  //         b.push(building);
  //         building.floors?.forEach((floor) => {
  //           f.push(floor);
  //           floor.rooms?.forEach((room) => {
  //             r.push(room);
  //             room.equipments?.forEach((equipment) => {
  //               e.push(equipment);
  //             });
  //           });
  //         });
  //       });
  //     });
  //     if (filters) {
  //       console.log(filters.siteId);
  //       console.log(filters.buildingId);
  //       console.log(filters.floorId);
  //       console.log(filters.roomId);
  //     }
  //     buildings = b;
  //     floors = f;
  //     rooms = r;
  //     equipments = e;
  //     // setBuildings(b);
  //     // setFloors(f);
  //     // setRooms(r);
  //     // setEquipments(e);
  //   }
  // });

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
