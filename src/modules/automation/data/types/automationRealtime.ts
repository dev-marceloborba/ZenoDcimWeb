export type AutomationRealtime = {
  pathname: string;
  value: number;
  lastUpdate: Date;
};

export type AutomationRealtimeProps = {
  getRealtimeValue(key: string): any;
  isLoading: boolean;
};
