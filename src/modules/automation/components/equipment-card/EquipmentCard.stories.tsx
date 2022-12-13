import { ComponentStory, ComponentMeta } from "@storybook/react";

import EquipmentCard from "./EquipmentCard";

export default {
  title: "Card para equipamento",
  component: EquipmentCard,
} as ComponentMeta<typeof EquipmentCard>;

const Template: ComponentStory<typeof EquipmentCard> = (args) => (
  <EquipmentCard {...args} />
);

export const Energy = Template.bind({});
export const Climate = Template.bind({});
export const Telecom = Template.bind({});
Energy.args = {
  title: "Disjuntor geral 01",
  system: "energy",
  status: "online",
  parameter1: {
    description: "Potência especificada",
    status: "no-rule",
    unit: "kW",
    value: 10,
  },
  parameter2: {
    description: "Potência ativa",
    status: "high",
    unit: "kW",
    value: 1.05,
  },
  parameter3: {
    description: "Potência reativa",
    status: "normal",
    unit: "kVa",
    value: 0,
  },
  activeAlarms: {
    value: 20,
    status: "highHigh",
  },
  sx: {
    maxWidth: "300px",
  },
};

Climate.args = {
  title: "Ar condicionado 01",
  system: "climate",
  status: "online",
  parameter1: {
    description: "Potência especificada",
    status: "no-rule",
    unit: "kW",
    value: 10,
  },
  parameter2: {
    description: "Potência ativa",
    status: "high",
    unit: "kW",
    value: 1.05,
  },
  parameter3: {
    description: "Potência reativa",
    status: "normal",
    unit: "kVa",
    value: 0,
  },
  activeAlarms: {
    value: 20,
    status: "highHigh",
  },
  sx: {
    maxWidth: "340px",
  },
};

Telecom.args = {
  title: "Switch 01",
  system: "telecom",
  status: "online",
  parameter1: {
    description: "Potência especificada",
    status: "no-rule",
    unit: "kW",
    value: 10,
  },
  parameter2: {
    description: "Potência ativa",
    status: "high",
    unit: "kW",
    value: 1.05,
  },
  parameter3: {
    description: "Potência reativa",
    status: "normal",
    unit: "kVa",
    value: 0,
  },
  activeAlarms: {
    value: 20,
    status: "highHigh",
  },
  sx: {
    maxWidth: "300px",
  },
};
