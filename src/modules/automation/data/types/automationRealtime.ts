export type AutomationRealtime = {
  pathname: string;
  value: number;
  lastUpdate: Date;
};

export type AutomationRealtimeProps = {
  getRealtimeValue(key: string): any;
  alarms: any[];
  publish(topic: string, data: string): void;
  status: RealtimeStatus;
  activeAlarms: number;
};

export type RealtimeStatus = "loading" | "offline" | "connected";
