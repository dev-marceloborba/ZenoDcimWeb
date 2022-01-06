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
      place: "Andar",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Marcelo Borba",
      registerNumber: "AGDH123",
      building: "Prédio de Suporte",
      place: "Andar",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Marcelo Borba",
      registerNumber: "AGDH123",
      building: "Prédio de Suporte",
      place: "Andar",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Marcelo Borba",
      registerNumber: "AGDH123",
      building: "Prédio de Suporte",
      place: "Andar",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Marcelo Borba",
      registerNumber: "AGDH123",
      building: "Prédio de Suporte",
      place: "Andar",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
    },
    {
      name: "Marcelo Borba",
      registerNumber: "AGDH123",
      building: "Prédio de Suporte",
      place: "Andar",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
    },
  ],
  doorControlEvents: [
    {
      building: "Prédio de Suporte",
      place: "Andar",
      room: "Sala de Clientes",
      door: "THRD123",
      ackedDate: "10:59:30  28-12-2021",
      status: EDoorStatus.OPEN,
    },
  ],
};
