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
  data: {
    parameter1: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter2: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter3: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter4: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter5: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter6: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
  },
};

export const PreFilledData = Template.bind({});
PreFilledData.args = {
  PaperProps: {
    sx: {
      minWidth: "1200px",
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
  data: {
    parameter1: {
      parameter: {
        description: "Corrente",
        enabled: true,
        id: "1",
        value: 0,
      },
      equipmentId: "1",
      parameterId: "1",
    },
    parameter2: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter3: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter4: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter5: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
    parameter6: {
      parameter: null,
      equipmentId: null,
      parameterId: null,
    },
  },
};
