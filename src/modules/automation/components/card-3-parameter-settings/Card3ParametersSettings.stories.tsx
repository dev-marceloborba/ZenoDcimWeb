import { ComponentStory, ComponentMeta } from "@storybook/react";

import Card3ParametersSettings from "./Card3ParametersSettings";

export default {
  title: "Configuração do card de 3 parâmetros",
  component: Card3ParametersSettings,
} as ComponentMeta<typeof Card3ParametersSettings>;

const Template: ComponentStory<typeof Card3ParametersSettings> = (args) => (
  <Card3ParametersSettings {...args} />
);

export const Configuration = Template.bind({});
Configuration.args = {
  PaperProps: {
    style: {
      width: "800px",
      height: "600px",
    },
  },
  open: true,
  equipmentName: "MDA A",
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
