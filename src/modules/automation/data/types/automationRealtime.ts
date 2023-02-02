import { AlarmTotalizerStatisticsModel } from "modules/automation/models/alam-totalizer-statistics.model";
import { AlarmGroupStatistics } from "modules/automation/models/alarm-group-statistics.model";
import { AlarmModel } from "modules/automation/models/alarm-model";
import { TagModel } from "modules/automation/models/tag.model";

export type AutomationRealtime = {
  pathname: string;
  value: number;
  lastUpdate: Date;
};

export type AutomationRealtimeProps = {
  getRealtimeValue(key: string): any;
  getRealtimeAlarm(key: string): AlarmModel;
  getTag(key: string): TagModel;
  getSiteStatistics(key: string): AlarmGroupStatistics;
  getBuildingStatistics(key: string): AlarmGroupStatistics;
  getRoomStatistics(key: string): AlarmTotalizerStatisticsModel;
  getEquipmentStatistics(key: string): AlarmTotalizerStatisticsModel;
  alarms: any[];
  publish(topic: string, data: string): void;
  status: RealtimeStatus;
  activeAlarms: number;
};

export type RealtimeStatus = "loading" | "offline" | "connected";
