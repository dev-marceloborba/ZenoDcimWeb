import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "modules/user/services/authentication-service";
import authReducer, {
  reHydrateStore,
} from "features/authentication/authenticationSlice";

export const userStore = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: reHydrateStore(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
