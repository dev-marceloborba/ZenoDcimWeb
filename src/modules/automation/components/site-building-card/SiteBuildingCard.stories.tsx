import { ComponentStory, ComponentMeta } from "@storybook/react";
import PercentIcon from "@mui/icons-material/Percent";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import PowerIcon from "@mui/icons-material/Power";
import FunctionsIcon from "@mui/icons-material/Functions";
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

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
  items: [
    {
      description: "Potência atual",
      value: 1.05,
      unit: "MW",
      status: "lowLow",
      icon: <PowerIcon />,
    },
    {
      description: "PUE",
      value: 0.94,
      status: "low",
      icon: <FunctionsIcon />,
    },
    {
      description: "Download/upload",
      value: 1.05,
      unit: "Gbps",
      status: "normal",
      icon: <PercentIcon />,
    },
    {
      description: "Alarmes de energia",
      value: 0,
      status: "high",
      icon: <PercentIcon />,
    },
    {
      description: "Alarmes de clima",
      value: 0,
      status: "highHigh",
      icon: <DeviceThermostatIcon />,
    },
    {
      description: "Alarmes de telecom",
      value: 0,
      status: "normal",
      icon: <PercentIcon />,
    },
  ],
  sx: {
    maxWidth: "400px",
  },
};
