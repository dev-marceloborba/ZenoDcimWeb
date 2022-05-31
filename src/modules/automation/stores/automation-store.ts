import { configureStore } from "@reduxjs/toolkit";
import { siteApi } from "modules/automation/services/site-service";
import { buildingApi } from "modules/automation/services/building-service";
import { floorApi } from "modules/automation/services/floor-service";
import { roomApi } from "modules/automation/services/room-service";
import { equipmentApi } from "modules/automation/services/equipment-service";
import authReducer, {
  reHydrateStore,
} from "modules/user/stores/slices/AuthenticationSlice";

export const automationStore = configureStore({
  reducer: {
    [siteApi.reducerPath]: siteApi.reducer,
    [buildingApi.reducerPath]: buildingApi.reducer,
    [floorApi.reducerPath]: floorApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [equipmentApi.reducerPath]: equipmentApi.reducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: reHydrateStore(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      siteApi.middleware,
      buildingApi.middleware,
      floorApi.middleware,
      roomApi.middleware,
      equipmentApi.middleware
    ),
});

export type RootState = ReturnType<typeof automationStore.getState>;
export type AppDispatch = typeof automationStore.dispatch;
