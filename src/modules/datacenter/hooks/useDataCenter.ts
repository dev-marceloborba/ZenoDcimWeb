import { useState } from "react";
import {
  BuildingModel,
  FloorModel,
} from "modules/datacenter/models/datacenter-model";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import { ComboboxItem } from "modules/shared/components/ControlledTextInput";
import { EquipmentModel } from "modules/automation/models/automation-model";
import { RoomModel } from "../models/room.model";

export default function useDataCenter() {
  const { data: sites, isLoading } = useFindAllSitesQuery();
  const [buildings, setBuildings] = useState<BuildingModel[] | undefined>([]);
  const [floors, setFloors] = useState<FloorModel[] | undefined>([]);
  const [rooms, setRooms] = useState<RoomModel[] | undefined>([]);
  const [equipments, setEquipments] = useState<EquipmentModel[] | undefined>(
    []
  );

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

  const equipmentItems = equipments?.map<ComboboxItem>((e) => ({
    description: e.description,
    value: e.id,
  }));

  const siteSelection = (id: string) => {
    setBuildings(sites?.find((s) => s.id === id)?.buildings);
    setFloors([]);
    setRooms([]);
    setEquipments([]);
  };

  const buildingSelection = (id: string) => {
    setFloors(buildings?.find((b) => b.id === id)?.floors);
    setRooms([]);
    setEquipments([]);
  };

  const floorSelection = (id: string) => {
    setRooms(floors?.find((f) => f.id === id)?.rooms);
    setEquipments([]);
  };

  const roomSelection = (id: string) => {
    setEquipments(rooms?.find((r) => r.id === id)?.equipments);
  };

  return {
    infra: {
      sites: siteItems,
      buildings: buildingItems,
      floors: floorItems,
      rooms: roomItems,
      equipments: equipmentItems,
    },
    selections: {
      siteSelection,
      buildingSelection,
      floorSelection,
      roomSelection,
    },
    isLoading,
  };
}
