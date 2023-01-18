import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./AlarmIndicator";

export default {
  title: "Indicador de alarme",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const HighSeverity = Template.bind({});
HighSeverity.args = {
  status: "highSeverity",
};

export const MediumSeverity = Template.bind({});
MediumSeverity.args = {
  status: "mediumSeverity",
};

export const LowSeverity = Template.bind({});
LowSeverity.args = {
  status: "lowSeverity",
};
