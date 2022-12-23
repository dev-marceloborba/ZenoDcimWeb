import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./ParameterAssociationModal";

export default {
  title: "Pop-up de associação",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const Popup = Template.bind({});
Popup.args = {
  title: "Associar parâmetro",
  equipment: "Disjuntor 52.G1",
  PaperProps: {
    sx: {
      minWidth: "600px",
      minHeight: "400px",
    },
  },
  open: true,
  sites: [
    {
      id: "1",
      name: "TDK",
      buildings: [
        {
          id: "2",
          name: "DC1",
          floors: [
            {
              id: "3",
              name: "Data Hall",
              rooms: [
                {
                  id: "4",
                  name: "Data Hall",
                  equipments: [
                    {
                      id: "5",
                      name: "Equipamento 1",
                      parameters: [
                        {
                          id: "6",
                          name: "Parâmetro 1",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
