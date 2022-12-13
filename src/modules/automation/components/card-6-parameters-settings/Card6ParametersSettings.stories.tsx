import { ComponentStory, ComponentMeta } from "@storybook/react";

import Card6ParametersSettings from "./Card6ParametersSettings";

export default {
  title: "Configuração do card de 6 parâmetros",
  component: Card6ParametersSettings,
} as ComponentMeta<typeof Card6ParametersSettings>;

const Template: ComponentStory<typeof Card6ParametersSettings> = (args) => (
  <Card6ParametersSettings {...args} />
);

export const Configuration = Template.bind({});
Configuration.args = {
  PaperProps: {
    style: {
      width: "1200px",
      height: "600px",
    },
  },
  id: "123",
  open: true,
  equipmentName: "Facilities",
  equipments: [
    {
      id: "1",
      label: "Equipamento 1",
    },
    {
      id: "2",
      label: "Equipamento 2",
    },
  ],
  parameters: [
    {
      id: "1",
      label: "Corrente",
    },
    {
      id: "2",
      label: "Temperatura",
    },
  ],
};
