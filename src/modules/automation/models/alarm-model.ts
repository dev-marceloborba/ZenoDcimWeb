export interface AlarmModel {
  value: number;
  status: number;
  enabled: boolean;
  id: string;
  createdDate: string;
  alarmRule: {
    name: string;
    setpoint: number;
    priority: number;
    equipmentParameter: {
      name: string;
      equipment: {
        name: string;
        room: {
          name: string;
          floor: {
            name: string;
            building: {
              name: string;
            };
          };
        };
      };
    };
  };
}

export interface AlarmViewModel {
  initialDate?: Date | null;
  finalDate?: Date | null;
}
