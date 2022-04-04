import React, { useState } from "react";
import HeroContainer from "app/components/HeroContainer";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from "app/components/TabPanel";
import BuildingAdmin from "./BuildingAdmin";
import FloorAdmin from "./FloorAdmin";
import RoomAdmin from "./RoomAdmin";
import EquipmentAdmin from "./EquipmentAdmin";
// import ImportButton from "app/components/ImportButton";
// import {
//   BuildingsResponse,
//   EEquipmentGroup,
//   EquipmentRequest,
//   useAddMultipleEquipmentsMutation,
//   useListBuildingsQuery,
// } from "app/services/datacenter";

// type EquipmentPlain = {
//   class: string;
//   component: string;
//   componentCode: string;
//   description: string;
//   building: string;
//   floor: string;
//   room: string;
//   group: EEquipmentGroup;
// };

// const formatPlain = (data: any, buildings: BuildingsResponse | undefined) => {
//   const equipments: EquipmentRequest[] = [];
//   data.forEach((row: any, index: number) => {
//     const equipment: EquipmentPlain = {
//       class: row[0],
//       component: row[1],
//       componentCode: row[2],
//       description: row[3],
//       building: row[4],
//       floor: row[5],
//       room: row[6],
//       group: EEquipmentGroup.ENERGY,
//     };
//     // console.log(equipment);
//     if (index > 0) {
//       const currentBuilding = buildings?.find(
//         (x) => x.name === equipment.building
//       );
//       const currentFloor = currentBuilding?.floors?.find(
//         (x) => x.name === equipment.floor
//       );
//       const currentRoom = currentFloor?.rooms?.find(
//         (x) => x.name === equipment.room
//       );
//       equipments.push({
//         buildingId: currentBuilding?.id ?? "",
//         floorId: currentFloor?.id ?? "",
//         roomId: currentRoom?.id ?? "",
//         class: equipment.class,
//         component: equipment.component,
//         componentCode: equipment.componentCode,
//         description: equipment.description,
//         group: equipment.group,
//       });
//     }
//   });
//   // console.log(equipments);
//   return equipments;
// };

const DataCenterManagement: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  // const { data: buildings } = useListBuildingsQuery();
  // const [addMultipleEquipments] = useAddMultipleEquipmentsMutation();

  const onChangeTabIndex = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // const handleAddMultipleEquipments = async (data: any) => {
  //   const equipmentData = formatPlain(data, buildings);
  //   try {
  //     const result = await addMultipleEquipments({
  //       equipments: equipmentData,
  //     }).unwrap();
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <HeroContainer>
      <Tabs value={tabIndex} onChange={onChangeTabIndex} sx={{ mb: 4 }}>
        <Tab label="Prédio" />
        <Tab label="Andar" />
        <Tab label="Sala" />
        <Tab label="Equipamento" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        {/* <ImportButton callback={handleAddMultipleEquipments} /> */}
        <BuildingAdmin />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <FloorAdmin />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <RoomAdmin />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <EquipmentAdmin />
      </TabPanel>
    </HeroContainer>
  );
};

export default DataCenterManagement;
