export enum ConnectionType {
  PARALEL = 0,
  SERIES = 1,
}

export type ConnectionData = {
  connectionType: ConnectionType;
  subsystemComponents: string[];
  system: string;
};

export const connectionData: ConnectionData[] = [
  {
    connectionType: ConnectionType.PARALEL,
    subsystemComponents: ["PDU XYZ", "RPP XYZ"],
    system: "Subsistema 3",
  },
  {
    connectionType: ConnectionType.PARALEL,
    subsystemComponents: ["THRD125"],
    system: "Subsistema 2",
  },
  {
    connectionType: ConnectionType.SERIES,
    subsystemComponents: ["THRD125"],
    system: "Subsistema 3",
  },
];
