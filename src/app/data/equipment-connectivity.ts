export enum EStatus {
  ONLINE = 0,
  OFFLINE = 1,
  NORMAL = 2, 
  ALERT = 3,
  DANGER = 4
}

export type EquipmentData = {
  status: EStatus;
  description: string;
};

export type ConnectivityData = {
  group: string;
  data: EquipmentData[];
};

export const equipmentConnectivity: ConnectivityData[] = [
  {
    group: "Energia",
    data: [
      {
        status: EStatus.NORMAL,
        description: "RPP XYZ",
      },
      {
        status: EStatus.NORMAL,
        description: "RPP XPA",
      },
      {
        status: EStatus.DANGER,
        description: "PDU A Andar 1",
      },
      {
        status: EStatus.DANGER,
        description: "PDU B Andar 1",
      },
      {
        status: EStatus.DANGER,
        description: "PDU C Andar 1",
      },
      {
        status: EStatus.DANGER,
        description: "QG Climatização A Sul Andar 1",
      },
      {
        status: EStatus.DANGER,
        description: "QG Climatização B Norte Andar 1",
      },
      {
        status: EStatus.DANGER,
        description: "QG Força e Serviço Andar 1",
      },
      {
        status: EStatus.DANGER,
        description: "PDU C Andar 3",
      },
      {
        status: EStatus.DANGER,
        description: "QG Climatização A Sul Andar 2",
      },
      {
        status: EStatus.DANGER,
        description: "QG Climatização B Norte Andar 2",
      },
      {
        status: EStatus.DANGER,
        description: "PDU C Andar 4",
      },
      {
        status: EStatus.DANGER,
        description: "QG Climatização A Sul Andar 4",
      },
    ],
  },
  {
    group: "Climatização",
    data: [
      {
        status: EStatus.NORMAL,
        description: "Válvula Esfera XYD",
      },
      {
        status: EStatus.NORMAL,
        description: "Válvula Esfera XYA",
      },
      {
        status: EStatus.DANGER,
        description: "Válvula Solenóide XYD",
      },
      {
        status: EStatus.DANGER,
        description: "Válvula Solenóide XYA",
      },
      {
        status: EStatus.DANGER,
        description: "Fan Coil ABC",
      },
      {
        status: EStatus.DANGER,
        description: "Fan Coil ABD",
      },
      {
        status: EStatus.DANGER,
        description: "Fan Coil ABE",
      },
      {
        status: EStatus.DANGER,
        description: "Fan Coil ABG",
      },
      {
        status: EStatus.DANGER,
        description: "Chiller A",
      },
      {
        status: EStatus.DANGER,
        description: "Chiller B",
      },
      {
        status: EStatus.DANGER,
        description: "Chiller C",
      },
      {
        status: EStatus.DANGER,
        description: "Chiller D",
      },
      {
        status: EStatus.DANGER,
        description: "Válvula Motorizada A",
      },
    ],
  },
  {
    group: "Telecomunicações",
    data: [
      {
        status: EStatus.NORMAL,
        description: "Switch TOR ABC",
      },
      {
        status: EStatus.NORMAL,
        description: "Switch gerenciável ABD",
      },
      {
        status: EStatus.DANGER,
        description: "Switch Core XYE",
      },
      {
        status: EStatus.DANGER,
        description: "Rack XYZ",
      },
      {
        status: EStatus.DANGER,
        description: "Rack XYW",
      },
      {
        status: EStatus.DANGER,
        description: "Rack XYY",
      },
      {
        status: EStatus.DANGER,
        description: "Rack XZZ",
      },
      {
        status: EStatus.DANGER,
        description: "Switch Core XYY",
      },
    ],
  },
];
