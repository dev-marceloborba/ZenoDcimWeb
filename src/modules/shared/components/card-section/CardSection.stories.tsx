import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./CardSectionv2";

export default {
  title: "Card de seção",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const CardSection = Template.bind({});
