import { useState } from "react";
import {
  BuildingModel,
  FloorModel,
  RoomModel,
} from "modules/datacenter/models/datacenter-model";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import { ComboboxItem } from "modules/shared/components/ControlledTextInput";

export default function useDataCenter() {
  const { data: sites, isLoading } = useFindAllSitesQuery();
  const [buildings, setBuildings] = useState<BuildingModel[] | undefined>([]);
  const [floors, setFloors] = useState<FloorModel[] | undefined>([]);
  const [rooms, setRooms] = useState<RoomModel[] | undefined>([]);

  const siteItems = sites?.map<ComboboxItem>((s) => ({
    description: s.name,
    value: s.id,
  }));

  const buildingItems = buildings?.map<ComboboxItem>((b) => ({
    description: b.name,
    value: b.id,
  }));

  const floorItems = floors?.map<ComboboxItem>((f) => ({
    description: f.name,
    value: f.id,
  }));

  const roomItems = rooms?.map<ComboboxItem>((r) => ({
    description: r.name,
    value: r.id,
  }));

  const siteSelection = (id: string) => {
    setBuildings(sites?.find((s) => s.id === id)?.buildings);
    setFloors([]);
    setRooms([]);
  };

  const buildingSelection = (id: string) => {
    setFloors(buildings?.find((b) => b.id === id)?.floors);
    setRooms([]);
  };

  const floorSelection = (id: string) => {
    setRooms(floors?.find((f) => f.id === id)?.rooms);
  };

  return {
    infra: {
      sites: siteItems,
      buildings: buildingItems,
      floors: floorItems,
      rooms: roomItems,
    },
    selections: {
      siteSelection,
      buildingSelection,
      floorSelection,
    },
    isLoading,
  };
}
