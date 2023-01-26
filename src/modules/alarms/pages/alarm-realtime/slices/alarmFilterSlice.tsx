import { createSlice } from "@reduxjs/toolkit";
import { AlarmModel, EAlarmType } from "modules/automation/models/alarm-model";
import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "modules/core/store";

interface AlarmFilterState {
  alarmType: EAlarmType | number;
  alarmPriority: EAlarmPriority | number;
  alarmPriorityByGroup: {
    low: boolean;
    medium: boolean;
    high: boolean;
  };
  alarms: AlarmModel[];
}

const initialState: AlarmFilterState = {
  alarmPriority: 4,
  alarmType: 4,
  alarms: [],
  alarmPriorityByGroup: {
    high: true,
    medium: true,
    low: true,
  },
};

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

const alarmFilterSlice = createSlice({
  name: "runtimeFilter",
  initialState,
  reducers: {
    changeAlarmTypeAction(state, action: PayloadAction<EAlarmType | number>) {
      state.alarmType = action.payload;
    },
    changeAlarmPriorityAction(
      state,
      action: PayloadAction<EAlarmPriority | number>
    ) {
      switch (action.payload) {
        case EAlarmPriority.HIGH:
          state.alarmPriorityByGroup.high = !state.alarmPriorityByGroup.high;
          break;
        case EAlarmPriority.MEDIUM:
          state.alarmPriorityByGroup.medium =
            !state.alarmPriorityByGroup.medium;
          break;
        case EAlarmPriority.LOW:
          state.alarmPriorityByGroup.low = !state.alarmPriorityByGroup.low;
          break;
      }
      state.alarmPriority = action.payload;
    },
    setAlarms(state, action: PayloadAction<AlarmModel[]>) {
      state.alarms = action.payload;
    },
  },
});

export const { changeAlarmTypeAction, changeAlarmPriorityAction, setAlarms } =
  alarmFilterSlice.actions;

export const alarmFilterStateSelector = (state: RootState) => state.alarmFilter;

export const filteredAlarmsSelector = (state: RootState) => {
  const { alarms, alarmPriority, alarmType } = state.alarmFilter;
  return filterAlarms(alarms, alarmPriority, alarmType);
};

export default alarmFilterSlice.reducer;
