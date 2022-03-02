import React, { useState } from "react";
import HeroContainer from "app/components/HeroContainer";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from "app/components/TabPanel";
import BuildingAdmin from "./BuildingAdmin";
import FloorAdmin from "./FloorAdmin";
import RoomAdmin from "./RoomAdmin";
import EquipmentAdmin from "./EquipmentAdmin";

const DataCenterManagement: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const onChangeTabIndex = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <HeroContainer>
      <Tabs value={tabIndex} onChange={onChangeTabIndex} sx={{ mb: 4 }}>
        <Tab label="Prédio" />
        <Tab label="Andar" />
        <Tab label="Sala" />
        <Tab label="Equipamento" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
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
