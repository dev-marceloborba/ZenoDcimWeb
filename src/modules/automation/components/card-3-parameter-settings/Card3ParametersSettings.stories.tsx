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
      width: "1200px",
      height: "600px",
    },
  },
  id: "123",
  open: true,
  name: "Facilities",
  equipments: [
    {
      id: "1",
      label: "Equipamento 1",
      parameters: [
        {
          id: "1",
          label: "Corrente",
        },
        {
          id: "2",
          label: "Potência",
        },
      ],
    },
    {
      id: "2",
      label: "Equipamento 2",
      parameters: [
        {
          id: "3",
          label: "Temperatura",
        },
        {
          id: "4",
          label: "Umidade",
        },
      ],
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
  name: "Facilities",
  equipments: [
    {
      id: "1",
      label: "Equipamento 1",
      parameters: [
        {
          id: "1",
          label: "Corrente",
        },
        {
          id: "2",
          label: "Potência",
        },
      ],
    },
    {
      id: "2",
      label: "Equipamento 2",
      parameters: [
        {
          id: "3",
          label: "Temperatura",
        },
        {
          id: "4",
          label: "Umidade",
        },
      ],
    },
  ],
  data: {
    parameter1: {
      parameter: {
        description: "Corrente",
        enabled: true,
        value: 0,
        equipmentParameterId: "1",
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
      parameter: {
        description: "Temperatura",
        enabled: true,
        value: 0,
        equipmentParameterId: "2",
      },
      equipmentId: "2",
      parameterId: "2",
    },
  },
};
