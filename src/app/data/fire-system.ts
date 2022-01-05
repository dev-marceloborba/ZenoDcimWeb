import { EParameterStatus } from "app/types/bms";

export enum ESystemStatus {
  OK = 0,
  NOK = 1,
}

export type FireSystemData = {
  description: string;
  parameterStatus: EParameterStatus;
  value?: number;
  unit?: string;
};

export type FireSystemCategory = {
  name: string;
  status: ESystemStatus;
  data: FireSystemData[];
};

export type FireSystemGroup = {
  name: string;
  categories: FireSystemCategory[];
};

export type FireSystemEvent = {
  equipment: string;
  event: string;
  date: string;
};

export type FireSystem = {
  floor: string;
  groups: FireSystemGroup[];
  events: FireSystemEvent[];
};

export const fireSystem: FireSystem = {
  floor: "floor1",
  groups: [
    {
      name: "Laços",
      categories: [
        {
          name: "Laço 1",
          status: ESystemStatus.OK,
          data: [
            {
              description: "Detector de fumaça 1",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Detector de fumaça 2",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Detector de fumaça 3",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Pressão",
              value: 3.05,
              unit: "kgf/cm²",
              parameterStatus: EParameterStatus.NORMAL,
            },
          ],
        },
        {
          name: "Laço 2",
          status: ESystemStatus.NOK,
          data: [
            {
              description: "Detector de fumaça 1",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Detector de fumaça 2",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Detector de fumaça 3",
              parameterStatus: EParameterStatus.DANGER,
            },
            {
              description: "Pressão",
              value: 3.05,
              unit: "kgf/cm²",
              parameterStatus: EParameterStatus.NORMAL,
            },
          ],
        },
      ],
    },
    {
      name: "Zonas",
      categories: [
        {
          name: "Cage 1",
          status: ESystemStatus.OK,
          data: [
            {
              description: "Detector de fumaça 1",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Detector de fumaça 2",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Temperatura C. frio",
              value: 25,
              unit: "°C",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Temperatura C. quente",
              value: 35,
              unit: "°C",
              parameterStatus: EParameterStatus.NORMAL,
            },
          ],
        },
        {
          name: "Corredor HVAC",
          status: ESystemStatus.OK,
          data: [
            {
              description: "Detector de fumaça 1",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "VESDA 1",
              parameterStatus: EParameterStatus.DANGER,
            },
            {
              description: "Detector de fumaça 1",
              parameterStatus: EParameterStatus.NORMAL,
            },
            {
              description: "Temperatura sensor 1",
              value: 32,
              unit: "°C",
              parameterStatus: EParameterStatus.NORMAL,
            },
          ],
        },
      ],
    },
  ],
  events: [
    {
      equipment: "Detector de fumaça 1",
      event: "AGDH123 - Falha de comunicação",
      date: "10:59:23  28-12-2021",
    },
    {
      equipment: "Detector de fumaça 2",
      event: "AGDH124 - Retorno de comunicação",
      date: "10:59:30  28-12-2021",
    },
    {
      equipment: "Detector de fumaça 3",
      event: "AGDH124 - Retorno de comunicação",
      date: "10:59:30  28-12-2021",
    },
    {
      equipment: "Detector de fumaça 4",
      event: "AGDH124 - Retorno de comunicação",
      date: "10:59:30  28-12-2021",
    },
  ],
};
