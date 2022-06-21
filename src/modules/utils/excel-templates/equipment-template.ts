export type EquipmentPlain = {
  class: number;
  component: string;
  componentCode: string;
  description: string;
  building: string;
  floor: string;
  room: string;
};

export const rowToEquipment = (data: any[]) => {
  return data.map<EquipmentPlain>((row: any) => ({
    class: row[0],
    component: row[1],
    componentCode: row[2],
    description: row[3],
    building: row[4],
    floor: row[5],
    room: row[6],
  }));
};
