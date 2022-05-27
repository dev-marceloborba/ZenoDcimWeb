import { configureStore } from "@reduxjs/toolkit";
import { api } from "app/services/authentication";
import { rackApi } from "app/services/rack";
import authReducer, {
  reHydrateStore,
} from "features/authentication/authenticationSlice";
import { automationApi } from "./services/automation";
import { buldingApi } from "./services/building";
import { companyApi } from "./services/company";
import { datacenterApi } from "./services/datacenter";
import { equipmentApi } from "./services/equipment";
import { equipmentParametersApi } from "./services/equipment-parameter";
import { floorApi } from "./services/floor";
import { parameterApi } from "./services/parameter";
import { parameterGroupApi } from "./services/parameter-group";
import { roomApi } from "./services/room";
import { siteApi } from "./services/site";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [rackApi.reducerPath]: rackApi.reducer,
    [automationApi.reducerPath]: automationApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [datacenterApi.reducerPath]: datacenterApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [buldingApi.reducerPath]: buldingApi.reducer,
    [floorApi.reducerPath]: floorApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [equipmentApi.reducerPath]: equipmentApi.reducer,
    [equipmentParametersApi.reducerPath]: equipmentParametersApi.reducer,
    [parameterGroupApi.reducerPath]: parameterGroupApi.reducer,
    [parameterApi.reducerPath]: parameterApi.reducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: reHydrateStore(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      rackApi.middleware,
      automationApi.middleware,
      companyApi.middleware,
      datacenterApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
