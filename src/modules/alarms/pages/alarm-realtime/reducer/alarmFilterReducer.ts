import { AlarmModel } from "modules/automation/models/alarm-model";
import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";

export const alarmFilterInitialState: AlarmFilterReducerState = {
  alarmPriority: {
    high: true,
    low: true,
    medium: true,
  },
  alarmType: {
    alarms: false,
    events: false,
    alarms_events: true,
  },
  computedPriority: 4,
  computedType: 4,
  filteredAlarms: [],
  date: {
    initial: addDaysToDate(new Date(), -7),
    final: new Date(),
  },
};

type AlarmPriority = {
  high: boolean;
  medium: boolean;
  low: boolean;
};

type AlarmType = {
  alarms: boolean;
  events: boolean;
  alarms_events: boolean;
};

export enum AlarmFilterReducerType {
  TOGGLE_HIGH_PRIORITY,
  TOGGLE_MEDIUM_PRIORITY,
  TOGGLE_LOW_PRIORITY,
  COMPUTE_PRIORITY,
  COMPUTE_TYPE,
  ACK,
  FILTER_ALARMS,
  SET_ALARMS,
  TOGGLE_ALARM_TYPE,
  TOGGLE_EVENT_TYPE,
  TOGGLE_ALARM_EVENT_TYPE,
  INITIAL_DATE,
  FINAL_DATE,
}

export type AlarmFilterReducerState = {
  alarmType: AlarmType;
  alarmPriority: AlarmPriority;
  computedPriority: EAlarmPriority | number;
  computedType: number;
  filteredAlarms: AlarmModel[];
  date?: {
    initial: Date;
    final: Date;
  };
};

export type LocationReducerAction = {
  type: AlarmFilterReducerType;
  payload?: any;
};

export default function alarmFilterReducer(
  state: AlarmFilterReducerState,
  action: LocationReducerAction
): AlarmFilterReducerState {
  const { type, payload } = action;
  switch (type) {
    case AlarmFilterReducerType.TOGGLE_ALARM_TYPE:
      return {
        ...state,
        alarmType: {
          alarms: true,
          alarms_events: false,
          events: false,
        },
      };
    case AlarmFilterReducerType.TOGGLE_EVENT_TYPE:
      return {
        ...state,
        alarmType: {
          alarms: false,
          alarms_events: false,
          events: true,
        },
      };
    case AlarmFilterReducerType.TOGGLE_ALARM_EVENT_TYPE:
      return {
        ...state,
        alarmType: {
          alarms: false,
          alarms_events: true,
          events: false,
        },
      };
    case AlarmFilterReducerType.TOGGLE_HIGH_PRIORITY:
      return {
        ...state,
        alarmPriority: {
          ...state.alarmPriority,
          high: !state.alarmPriority.high,
        },
      };
    case AlarmFilterReducerType.TOGGLE_MEDIUM_PRIORITY:
      return {
        ...state,
        alarmPriority: {
          ...state.alarmPriority,
          medium: !state.alarmPriority.medium,
        },
      };
    case AlarmFilterReducerType.TOGGLE_LOW_PRIORITY:
      return {
        ...state,
        alarmPriority: {
          ...state.alarmPriority,
          low: !state.alarmPriority.low,
        },
      };
    case AlarmFilterReducerType.COMPUTE_PRIORITY:
      const { computedPriority } = payload;
      return {
        ...state,
        computedPriority,
      };
    case AlarmFilterReducerType.COMPUTE_TYPE:
      const { computedType } = payload;
      return {
        ...state,
        computedType,
      };
    case AlarmFilterReducerType.FILTER_ALARMS:
      const { filteredAlarms } = payload;
      return {
        ...state,
        filteredAlarms,
      };
    case AlarmFilterReducerType.INITIAL_DATE:
      const { initialDate } = payload;
      return {
        ...state,
        date: {
          initial: initialDate,
          final: state.date?.final!,
        },
      };
    case AlarmFilterReducerType.FINAL_DATE:
      const { finalDate } = payload;
      return {
        ...state,
        date: {
          initial: state.date?.initial!,
          final: finalDate,
        },
      };
    default:
      return state;
  }
}
