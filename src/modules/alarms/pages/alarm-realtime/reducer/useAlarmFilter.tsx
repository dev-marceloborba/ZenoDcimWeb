import { AlarmModel, EAlarmType } from "modules/automation/models/alarm-model";
import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";
import { useEffect, useReducer } from "react";
import alarmFilterReducer, {
  alarmFilterInitialState,
  AlarmFilterReducerType,
} from "./alarmFilterReducer";

function filterAlarms(
  alarms: AlarmModel[],
  priority: EAlarmPriority | number,
  type: EAlarmType | number
) {
  let filteredAlarms: AlarmModel[] = [];
  if (priority === 4 && type === 4) {
    filteredAlarms = alarms;
  } else if (priority === 4 && type !== 4) {
    filteredAlarms = alarms.filter((x) => x.type === type);
  } else if (priority !== 4 && type === 4) {
    filteredAlarms = alarms.filter((x) => x.priority === priority);
  } else {
    filteredAlarms = alarms.filter(
      (x) => x.type === type && x.priority === priority
    );
  }
  return filteredAlarms;
}

export default function useAlarmFilter(alarms: AlarmModel[]) {
  const [state, dispatch] = useReducer(
    alarmFilterReducer,
    alarmFilterInitialState
  );

  const changeAlarmType = (type: EAlarmType | number) =>
    dispatch({
      type: AlarmFilterReducerType.ALARM,
      payload: {
        alarmType: type,
      },
    });

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

  useEffect(() => {
    if (
      state.alarmPriority.high &&
      state.alarmPriority.medium &&
      state.alarmPriority.low
    ) {
      dispatch({
        type: AlarmFilterReducerType.COMPUTE_PRIORITY,
        payload: {
          computedPriority: 4,
        },
      });
    } else if (
      state.alarmPriority.high &&
      !state.alarmPriority.medium &&
      !state.alarmPriority.low
    ) {
      dispatch({
        type: AlarmFilterReducerType.COMPUTE_PRIORITY,
        payload: {
          computedPriority: EAlarmPriority.HIGH,
        },
      });
    } else if (
      !state.alarmPriority.high &&
      state.alarmPriority.medium &&
      !state.alarmPriority.low
    ) {
      dispatch({
        type: AlarmFilterReducerType.COMPUTE_PRIORITY,
        payload: {
          computedPriority: EAlarmPriority.MEDIUM,
        },
      });
    } else if (
      !state.alarmPriority.high &&
      !state.alarmPriority.medium &&
      state.alarmPriority.low
    ) {
      dispatch({
        type: AlarmFilterReducerType.COMPUTE_PRIORITY,
        payload: {
          computedPriority: EAlarmPriority.LOW,
        },
      });
    }
    dispatch({
      type: AlarmFilterReducerType.FILTER_ALARMS,
      payload: {
        filteredAlarms: filterAlarms(
          alarms,
          state.computedPriority,
          state.alarmType
        ),
      },
    });
  }, [
    alarms,
    state.alarmPriority.high,
    state.alarmPriority.low,
    state.alarmPriority.medium,
    state.alarmType,
    state.computedPriority,
  ]);

  return {
    filters: state,
    changeAlarmType,
    priorities: {
      toggleHighPriority,
      toggleMediumPriority,
      toggleLowPriority,
    },
  };
}
