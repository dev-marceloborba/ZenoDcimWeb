import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "@mui/material/Button";

import Component from "./Tabs";

export default {
  title: "Abas",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const NormalTabs = Template.bind({});
NormalTabs.args = {
  mode: "horizontal",
  tabLabels: ["Item 1", "Item 2", "Item 3"],
  tabItems: [
    {
      element: <h3>Item 1</h3>,
    },
    {
      element: <h3>Item 2</h3>,
    },
    {
      element: <h3>Item 3</h3>,
    },
  ],
};

export const HorizontalContent = Template.bind({});
HorizontalContent.args = {
  mode: "horizontal",
  tabLabels: ["Item 1", "Item 2", "Item 3"],
  tabItems: [
    {
      element: <h3>Item 1</h3>,
      content: <Button variant="contained">Action 1</Button>,
    },
    {
      element: <h3>Item 2</h3>,
      content: <Button variant="contained">Action 2</Button>,
    },
    {
      element: <h3>Item 3</h3>,
      content: <Button variant="contained">Action 3</Button>,
    },
  ],
};
