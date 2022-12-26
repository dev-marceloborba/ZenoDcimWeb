import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./RuleFormModal";

export default {
  title: "Pop-up de regra",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const New = Template.bind({});
New.args = {
  title: "Nova regra",
  open: true,
};
