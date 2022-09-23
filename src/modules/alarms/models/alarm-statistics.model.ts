export interface AlarmStatisticsModel {
  maxAckTime: number;
  minAckTime: number;
  averageAckTime: number;
  alarmsNotAcked: number;
  categories: AlarmCategory[];
}

type AlarmCategory = {
  pathname: string;
  total: number;
};

export interface AlarmStatisticsViewModel {
  initialDate: Date;
  finalDate: Date;
}
