import { AlarmModel, EAlarmType } from "modules/automation/models/alarm-model";
import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";
import { useEffect, useReducer } from "react";
import alarmFilterReducer, {
  alarmFilterInitialState,
  AlarmFilterReducerType,
} from "./alarmFilterReducer";

function filterAlarmsByPriority(
  alarms: AlarmModel[],
  priority: EAlarmPriority | number
) {
  switch (priority) {
    case 0:
      return [];
    case 1:
      return alarms.filter((x) => x.priority === EAlarmPriority.LOW);
    case 2:
      return alarms.filter((x) => x.priority === EAlarmPriority.MEDIUM);
    case 3:
      return alarms.filter(
        (x) =>
          x.priority === EAlarmPriority.LOW ||
          x.priority === EAlarmPriority.MEDIUM
      );
    case 4:
      return alarms.filter((x) => x.priority === EAlarmPriority.HIGH);
    case 5:
      return alarms.filter(
        (x) =>
          x.priority === EAlarmPriority.LOW ||
          x.priority === EAlarmPriority.HIGH
      );
    case 6:
      return alarms.filter(
        (x) =>
          x.priority === EAlarmPriority.MEDIUM ||
          x.priority === EAlarmPriority.HIGH
      );
    case 7:
      return alarms;
    default:
      return alarms;
  }
}

function filterAlarmsByType(alarms: AlarmModel[], type: EAlarmType | number) {
  switch (type) {
    case 0:
      return [];
    case 1:
      return alarms.filter((x) => x.type === EAlarmType.ALARM);
    case 2:
      return alarms.filter((x) => x.type === EAlarmType.EVENT);
    case 3:
      return alarms;
    default:
      return alarms;
  }
}

export default function useAlarmFilter(alarms?: AlarmModel[]) {
  const [state, dispatch] = useReducer(
    alarmFilterReducer,
    alarmFilterInitialState
  );

  const toggleAlarmType = () => {
    dispatch({
      type: AlarmFilterReducerType.TOGGLE_ALARM_TYPE,
    });
  };

  const toggleEventType = () => {
    dispatch({
      type: AlarmFilterReducerType.TOGGLE_EVENT_TYPE,
    });
  };

  const toggleAlarmEventType = () => {
    dispatch({
      type: AlarmFilterReducerType.TOGGLE_ALARM_EVENT_TYPE,
    });
  };

  const toggleHighPriority = () => {
    dispatch({
      type: AlarmFilterReducerType.TOGGLE_HIGH_PRIORITY,
    });
  };

  const toggleMediumPriority = () => {
    dispatch({
      type: AlarmFilterReducerType.TOGGLE_MEDIUM_PRIORITY,
    });
  };

  const toggleLowPriority = () => {
    dispatch({
      type: AlarmFilterReducerType.TOGGLE_LOW_PRIORITY,
    });
  };

  const setInitialDate = (date: Date | null | undefined) => {
    dispatch({
      type: AlarmFilterReducerType.INITIAL_DATE,
      payload: { initialDate: date },
    });
  };

  const setFinalDate = (date: Date | null | undefined) => {
    dispatch({
      type: AlarmFilterReducerType.FINAL_DATE,
      payload: { finalDate: date },
    });
  };

  useEffect(() => {
    dispatch({
      type: AlarmFilterReducerType.COMPUTE_PRIORITY,
      payload: {
        computedPriority:
          Number(state.alarmPriority.low) * 1 +
          Number(state.alarmPriority.medium) * 2 +
          Number(state.alarmPriority.high) * 4,
      },
    });

    dispatch({
      type: AlarmFilterReducerType.COMPUTE_TYPE,
      payload: {
        computedType:
          Number(state.alarmType.alarms) * 1 +
          Number(state.alarmType.events) * 2 +
          Number(state.alarmType.alarms_events) * 3,
      },
    });
  }, [
    state.alarmPriority.high,
    state.alarmPriority.low,
    state.alarmPriority.medium,
    state.alarmType.alarms,
    state.alarmType.alarms_events,
    state.alarmType.events,
  ]);

  useEffect(() => {
    if (alarms) {
      dispatch({
        type: AlarmFilterReducerType.FILTER_ALARMS,
        payload: {
          filteredAlarms: filterAlarmsByType(
            filterAlarmsByPriority(alarms, state.computedPriority),
            state.computedType
          ),
        },
      });
    }
  }, [alarms, state.computedPriority, state.computedType]);

  return {
    filters: state,
    alarmFilters: {
      toggleAlarmType,
      toggleEventType,
      toggleAlarmEventType,
    },
    priorities: {
      toggleHighPriority,
      toggleMediumPriority,
      toggleLowPriority,
    },
    dates: {
      setInitialDate,
      setFinalDate,
    },
  };
}
