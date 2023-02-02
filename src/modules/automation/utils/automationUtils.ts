import { AlarmModel } from "../models/alarm-model";
import { EAlarmPriority } from "../models/alarm-rule-model";

export function getStatusInAlarmsByPriorities(
  alarms: AlarmModel[] | undefined
) {
  const isHighSeverity = alarms?.find(
    (x) => x.priority === EAlarmPriority.HIGH
  );
  const isMediumSeverity = alarms?.find(
    (x) => x.priority === EAlarmPriority.MEDIUM
  );
  const isLowSeverity = alarms?.find((x) => x.priority === EAlarmPriority.LOW);
  const isNormal = alarms?.length === 0;

  if (isHighSeverity) return "highHigh";
  if (isMediumSeverity) return "high";
  if (isLowSeverity) return "high";
  if (isNormal) return "normal";
  return "normal";
}
