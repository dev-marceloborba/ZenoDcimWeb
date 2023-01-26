import { useAppSelector, useAppDispatch } from "app/hooks";
import { AlarmModel, EAlarmType } from "modules/automation/models/alarm-model";
import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";
import { useEffect } from "react";
import {
  alarmFilterStateSelector,
  changeAlarmTypeAction,
  changeAlarmPriorityAction,
  filteredAlarmsSelector,
  setAlarms,
} from "./alarmFilterSlice";

export default function useAlarmFilter(alarms: AlarmModel[]) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(alarmFilterStateSelector);
  const filteredAlarms = useAppSelector(filteredAlarmsSelector);

  const changeAlarmType = (type: EAlarmType | number) => {
    dispatch(changeAlarmTypeAction(type));
    // dispatch(setAlarms(alarms));
  };

  const changeAlarmPriority = (priority: EAlarmPriority | number) => {
    dispatch(changeAlarmPriorityAction(priority));
    // dispatch(setAlarms(alarms));
  };

  useEffect(() => {
    dispatch(setAlarms(alarms));
  }, [alarms, dispatch]);

  return {
    filters,
    filteredAlarms,
    changeAlarmType,
    changeAlarmPriority,
  };
}
