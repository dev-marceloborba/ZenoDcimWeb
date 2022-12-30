import { ComponentStory, ComponentMeta } from "@storybook/react";

import RoomCard from "./RoomCard";

export default {
  title: "Card para sala",
  component: RoomCard,
} as ComponentMeta<typeof RoomCard>;

const Template: ComponentStory<typeof RoomCard> = (args) => (
  <RoomCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  title: "MDA A",
  parameter1: {
    description: "Potência ativa",
    enabled: true,
    status: "normal",
    unit: "MW",
    value: 12.4,
  },
  parameter2: {
    description: "Temperatura",
    enabled: true,
    status: "highHigh",
    unit: "C",
    value: 33.5,
  },
  parameter3: {
    description: "N de equipamentos",
    enabled: true,
    status: "no-rule",
    value: 10,
  },
  activeAlarms: {
    value: 20,
    status: "highHigh",
  },
  hideSettings: false,
  sx: {
    maxWidth: "300px",
  },
};
