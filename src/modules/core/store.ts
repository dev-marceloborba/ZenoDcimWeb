import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  reHydrateStore,
} from "modules/user/stores/slices/AuthenticationSlice";
import { userApi } from "modules/user/services/authentication-service";
import { companyApi } from "modules/user/services/company-service";
import { equipmentApi } from "modules/automation/services/equipment-service";
import { equipmentParametersApi } from "modules/automation/services/equipment-parameter-service";
import { parameterGroupApi } from "modules/automation/services/parameter-group-service";
import { parameterApi } from "modules/automation/services/parameter-service";
import { siteApi } from "modules/datacenter/services/site-service";
import { buildingApi } from "modules/datacenter/services/building-service";
import { floorApi } from "modules/datacenter/services/floor-service";
import { roomApi } from "modules/datacenter/services/room-service";
import { virtualParameterApi } from "modules/automation/services/virtual-parameter-service";
import { alarmRuleApi } from "modules/automation/services/alarm-rule-service";
import { historyApi } from "modules/automation/services/history-service";
import { alarmApi } from "modules/automation/services/alarm-service";
import { supplierApi } from "modules/maintenance/services/supplier.service";
import { maintenanceApi } from "modules/maintenance/services/maintenance.service";
import { groupApi } from "modules/user/services/groups.service";
import { rackApi } from "modules/datacenter/services/rack.service";
import { rackEquipmentApi } from "modules/datacenter/services/rack-equipment.service";
import { userPreferenciesApi } from "modules/user/services/user-preferencies.service";
import { buildingCardApi } from "modules/automation/services/building-card-service";
import { siteCardApi } from "modules/automation/services/site-card-service";
import { roomCardSettingsApi } from "modules/automation/services/room-card-service";
import { equipmentCardSettingsApi } from "modules/automation/services/equipment-card-service";
import alarmFilterSlice from "modules/alarms/pages/alarm-realtime/slices/alarmFilterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alarmFilter: alarmFilterSlice,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [equipmentApi.reducerPath]: equipmentApi.reducer,
    [equipmentParametersApi.reducerPath]: equipmentParametersApi.reducer,
    [parameterGroupApi.reducerPath]: parameterGroupApi.reducer,
    [parameterApi.reducerPath]: parameterApi.reducer,
    [virtualParameterApi.reducerPath]: virtualParameterApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [buildingApi.reducerPath]: buildingApi.reducer,
    [floorApi.reducerPath]: floorApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [alarmRuleApi.reducerPath]: alarmRuleApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [alarmApi.reducerPath]: alarmApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [rackApi.reducerPath]: rackApi.reducer,
    [rackEquipmentApi.reducerPath]: rackEquipmentApi.reducer,
    [userPreferenciesApi.reducerPath]: userPreferenciesApi.reducer,
    [siteCardApi.reducerPath]: siteCardApi.reducer,
    [buildingCardApi.reducerPath]: buildingCardApi.reducer,
    [roomCardSettingsApi.reducerPath]: roomCardSettingsApi.reducer,
    [equipmentCardSettingsApi.reducerPath]: equipmentCardSettingsApi.reducer,
  },
  preloadedState: {
    auth: reHydrateStore(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      companyApi.middleware,
      equipmentApi.middleware,
      equipmentParametersApi.middleware,
      parameterGroupApi.middleware,
      parameterApi.middleware,
      virtualParameterApi.middleware,
      siteApi.middleware,
      buildingApi.middleware,
      floorApi.middleware,
      roomApi.middleware,
      alarmRuleApi.middleware,
      historyApi.middleware,
      alarmApi.middleware,
      supplierApi.middleware,
      maintenanceApi.middleware,
      groupApi.middleware,
      rackApi.middleware,
      rackEquipmentApi.middleware,
      userPreferenciesApi.middleware,
      siteCardApi.middleware,
      buildingCardApi.middleware,
      roomCardSettingsApi.middleware,
      equipmentCardSettingsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
