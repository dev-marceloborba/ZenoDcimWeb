import {
  BuildingModel,
  FloorModel,
  RoomModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";
import useAutomationRealtime from "../data/hooks/useAutomationRealtime";
import { EquipmentModel } from "../models/automation-model";

export default function usePue() {
  const { getRealtimeValue } = useAutomationRealtime();

  const calculatePue = (
    totalPowerMeasured: number,
    totalPowerAvailable: number
  ) => totalPowerMeasured / totalPowerAvailable;

  const calculateTotalPowerByEquipment = (equipment: EquipmentModel) => {
    let total = 0;
    equipment.equipmentParameters?.forEach((equipmentParameter) => {
      if (equipmentParameter.unit.toLowerCase().includes("w")) {
        total += getRealtimeValue(equipmentParameter.pathname!) as number;
      }
    });
    return total;
  };

  const calculateTotalPowerByRoom = (room: RoomModel) => {
    let total = 0;
    room.equipments?.forEach((equipment) => {
      equipment.equipmentParameters?.forEach((equipmentParameter) => {
        total += getRealtimeValue(equipmentParameter.pathname!) as number;
      });
    });
    return total;
  };

  const calculateTotalPowerByFloor = (floor: FloorModel) => {
    let total = 0;
    floor.rooms?.forEach((room) => {
      room.equipments?.forEach((equipment) => {
        equipment.equipmentParameters?.forEach((equipmentParameter) => {
          total += getRealtimeValue(equipmentParameter.pathname!) as number;
        });
      });
    });
    return total;
  };

  const calculateTotalPowerByBuilding = (building: BuildingModel) => {
    let total = 0;
    building.floors?.forEach((floor) =>
      floor.rooms?.forEach((room) =>
        room.equipments?.forEach((equipment) =>
          equipment.equipmentParameters?.forEach((equipmentParameter) => {
            total += getRealtimeValue(equipmentParameter.pathname!) as number;
          })
        )
      )
    );
    return total;
  };

  const calculateTotalPowerBySite = (site: SiteModel) => {
    let total = 0;
    site.buildings.forEach((building) =>
      building.floors?.forEach((floor) =>
        floor.rooms?.forEach((room) =>
          room.equipments?.forEach((equipment) =>
            equipment.equipmentParameters?.forEach((equipmentParameter) => {
              total += getRealtimeValue(equipmentParameter.pathname!) as number;
            })
          )
        )
      )
    );
    return total;
  };

  return {
    pue: calculatePue,
    powerByEquipment: calculateTotalPowerByEquipment,
    powerByRoom: calculateTotalPowerByRoom,
    powerByFloor: calculateTotalPowerByFloor,
    powerByBuilding: calculateTotalPowerByBuilding,
    powerBySite: calculateTotalPowerBySite,
  };
}
