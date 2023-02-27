import { ComponentStory, ComponentMeta } from "@storybook/react";

import SiteBuildingCard from "./SiteBuildingCard";

export default {
  title: "Card para site ou prédio",
  component: SiteBuildingCard,
} as ComponentMeta<typeof SiteBuildingCard>;

const Template: ComponentStory<typeof SiteBuildingCard> = (args) => (
  <SiteBuildingCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  title: "Site 1",
  parameter1: {
    description: "Potência atual",
    value: 1.05,
    unit: "MW",
    status: "lowLow",
    enabled: true,
    equipmentId: "",
    equipmentParameterId: "",
    floorId: "",
    roomId: "",
    buildingId: "",
    siteId: "",
  },
  parameter2: {
    description: "PUE",
    value: 0.94,
    status: "low",
    enabled: true,
    equipmentId: "",
    equipmentParameterId: "",
    floorId: "",
    roomId: "",
    buildingId: "",
    siteId: "",
  },
  parameter3: {
    description: "Download/upload",
    value: 1.05,
    unit: "Gbps",
    status: "normal",
    enabled: true,
    equipmentId: "",
    equipmentParameterId: "",
    floorId: "",
    roomId: "",
    buildingId: "",
    siteId: "",
  },
  parameter4: {
    description: "Alarmes de energia",
    value: 0,
    status: "high",
    enabled: true,
    equipmentId: "",
    equipmentParameterId: "",
    floorId: "",
    roomId: "",
    buildingId: "",
    siteId: "",
  },
  parameter5: {
    description: "Alarmes de clima",
    value: 0,
    status: "highHigh",
    enabled: true,
    equipmentId: "",
    equipmentParameterId: "",
    floorId: "",
    roomId: "",
    buildingId: "",
    siteId: "",
  },
  parameter6: {
    description: "Alarmes de telecom",
    value: 0,
    status: "normal",
    enabled: true,
    equipmentId: "",
    equipmentParameterId: "",
    floorId: "",
    roomId: "",
    buildingId: "",
    siteId: "",
  },
  alarms: {
    energy: 2,
    climate: 3,
    telecom: 0,
  },
  hideSettings: false,
  sx: {
    maxWidth: "400px",
  },
};
