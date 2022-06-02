import { configureStore } from "@reduxjs/toolkit";
import { siteApi } from "modules/datacenter/services/site-service";
import { buildingApi } from "modules/datacenter/services/building-service";
import { floorApi } from "modules/datacenter/services/floor-service";
import { roomApi } from "modules/datacenter/services/room-service";
import authReducer, {
  reHydrateStore,
} from "modules/user/stores/slices/AuthenticationSlice";

export const datacenterStore = configureStore({
  reducer: {
    [siteApi.reducerPath]: siteApi.reducer,
    [buildingApi.reducerPath]: buildingApi.reducer,
    [floorApi.reducerPath]: floorApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
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
      roomApi.middleware
    ),
});

export type RootState = ReturnType<typeof datacenterStore.getState>;
export type AppDispatch = typeof datacenterStore.dispatch;
