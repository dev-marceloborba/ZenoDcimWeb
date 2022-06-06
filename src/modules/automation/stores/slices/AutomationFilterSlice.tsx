import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AutomationRootState } from "modules/automation/stores/automation-store";
import { BuildingModel } from "modules/datacenter/models/datacenter-model";

type GroupState = {
  energy: boolean;
  clim: boolean;
  telecom: boolean;
};

type AutomationFilterState = {
  group: GroupState;
  building: string;
  floor: string;
  room: string;
  zone: string;
  loop: string;
  buildings: BuildingModel[];
};

const initialState: AutomationFilterState = {
  group: {
    energy: true,
    clim: false,
    telecom: false,
  },
  building: "",
  floor: "",
  room: "",
  loop: "",
  zone: "",
  buildings: [],
};

const automationFilterSlice = createSlice({
  name: "automationFilter",
  initialState,
  reducers: {
    toggleEnergy: (state) => {
      state.group.energy = !state.group.energy;
    },
    toggleClim: (state) => {
      state.group.clim = !state.group.clim;
    },
    toggleTelecom: (state) => {
      state.group.telecom = !state.group.telecom;
    },
    setBuilding: (
      state,
      { payload: { building } }: PayloadAction<{ building: string }>
    ) => {
      state.building = building;
    },
    setFloor: (
      state,
      { payload: { floor } }: PayloadAction<{ floor: string }>
    ) => {
      state.floor = floor;
    },
    setRoom: (
      state,
      { payload: { room } }: PayloadAction<{ room: string }>
    ) => {
      state.room = room;
    },
    setBuildings: (
      state,
      { payload: { buildings } }: PayloadAction<{ buildings: any[] }>
    ) => {
      state.buildings = [...buildings];
    },
  },
});

export const {
  toggleClim,
  toggleEnergy,
  toggleTelecom,
  setBuilding,
  setFloor,
  setRoom,
} = automationFilterSlice.actions;

export default automationFilterSlice.reducer;

// selectors
export const buildingSelector = (state: AutomationRootState) =>
  state.automationFilter.building;
export const floorSelector = (state: AutomationRootState) =>
  state.automationFilter.floor;
export const roomSelector = (state: AutomationRootState) =>
  state.automationFilter.room;

export const buildingsSelector = (state: AutomationRootState) =>
  state.automationFilter.buildings;

export const groupSelector = (state: AutomationRootState) =>
  state.automationFilter.group;
