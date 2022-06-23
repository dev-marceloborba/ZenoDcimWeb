import React from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import DataCenterEquipmentsTable from "./components/DataCenterEquipmentsTable";
import ImportButton from "app/components/ImportButton";
import BuildingForm from "./components/BuilldingForm";
import FloorForm from "../../modules/automation/pages/floor-admin/components/floor-form/FloorForm";
import RoomForm from "./components/RoomForm";
import EquipmentForm from "./components/EquipmentForm";

const DataCenterManagement: React.FC = () => {
  type EquipmentPlain = {
    class: number;
    component: string;
    componentCode: string;
    description: string;
    building: string;
    floor: string;
    room: string;
  };

  const formatPlain = (data: any) => {
    data.forEach((row: any) => {
      const equipment: EquipmentPlain = {
        class: row[0],
        component: row[1],
        componentCode: row[2],
        description: row[3],
        building: row[4],
        floor: row[5],
        room: row[6],
      };
      console.log(equipment);
    });
  };

  return (
    <HeroContainer>
      <PageTitle>Gerenciamento do Data Center</PageTitle>

      <ImportButton callback={formatPlain} />

      <BuildingForm />
      <FloorForm />
      <RoomForm />
      <EquipmentForm />

      <DataCenterEquipmentsTable />
    </HeroContainer>
  );
};

export default DataCenterManagement;
