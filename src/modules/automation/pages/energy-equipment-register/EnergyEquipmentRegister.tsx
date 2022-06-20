import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import HeroContainer from "modules/shared/components/HeroContainer";
import TabPanel from "modules/shared/components/TabPanel";
import EquipmentForm from "./components/equipment-form/EquipmentForm";
import ParameterAdmin from "./components/parameter-admin/ParameterAdmin";

const EnergyEquipmentRegister: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChangeTabIndex = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabIndex(newValue);
  };
  return (
    <HeroContainer title="Novo equipamento de energia">
      <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
        <Tab label="Novo equipamento" />
        <Tab label="Parâmetro" />
      </Tabs>
      <Divider sx={{ mb: 3 }} />
      <TabPanel value={tabIndex} index={0}>
        <EquipmentForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <ParameterAdmin />
      </TabPanel>
    </HeroContainer>
  );
};

export default EnergyEquipmentRegister;
