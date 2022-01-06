export type AccessEvent = {
  name: string;
  registerNumber: string;
  building: string;
  place: string;
  room: string;
  door: string;
  ackedDate: string;
};

export enum EDoorStatus {
  OPEN = 0,
  CLOSE = 1,
}

export type DoorControlEvent = {
  building: string;
  place: string;
  room: string;
  door: string;
  ackedDate: string;
  status: EDoorStatus;
};

export type AccessControl = {
  accessEvents: AccessEvent[];
  doorControlEvents: DoorControlEvent[];
};

export const accessControl: AccessControl = {
  accessEvents: [
    {
      name: "Marcelo Borba",
      registerNumber: "AGDH123",
      building: "Prédio de Suporte",
      place: "Andar 1",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Linus Schuster",
      registerNumber: "AGDH124",
      building: "Data Hall",
      place: "Andar 2",
      room: "Cage 1",
      door: "THRD125",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Gustavo Dal Molin",
      registerNumber: "AGDH125",
      building: "Data Hall",
      place: "Andar 3",
      room: "Cage 12",
      door: "THRD127",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Benhur Branco",
      registerNumber: "AGDH126",
      building: "Data Hall",
      place: "Andar 4",
      room: "Cage HDA",
      door: "THRD129",
      ackedDate: "10:59:30  28-12-2021",
    },
  ],
  doorControlEvents: [
    {
      building: "Prédio de Suporte",
      place: "Andar 1",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
      status: EDoorStatus.OPEN,
    },
    {
      building: "Data Hall",
      place: "Andar 2",
      room: "Cage 1",
      door: "THRD125",
      ackedDate: "10:59:30  28-12-2021",
      status: EDoorStatus.CLOSE,
    },
  ],
};
