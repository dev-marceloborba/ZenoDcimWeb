import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "modules/core/store";
import { GroupModel } from "modules/user/models/group.model";
import { User } from "modules/user/models/user-model";
import { UserPreferenciesModel } from "modules/user/models/user-preferencies.model";

type AuthState = {
  user: User | null;
  token: string | null;
  userPreferencies: UserPreferenciesModel | null;
  permissions: GroupModel | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  userPreferencies: null,
  permissions: null,
};

const persistStateOnLocalStorage = (state: AuthState) => {
  localStorage.setItem("zenoAppState", JSON.stringify(state));
};

const slice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      persistStateOnLocalStorage(state);
    },
    logout: () => {
      localStorage.removeItem("zenoAppState");
      return initialState;
    },
    setPreferences: (state, action: PayloadAction<UserPreferenciesModel>) => {
      state.userPreferencies = action.payload;
      persistStateOnLocalStorage(state);
    },
    setPermissions: (state, action: PayloadAction<GroupModel>) => {
      state.permissions = action.payload;
    },
  },
});

export const { setCredentials, logout, setPreferences, setPermissions } =
  slice.actions;

export default slice.reducer;

// selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null;
export const selectPreferences = (state: RootState) =>
  state.auth.userPreferencies;
export const selectAuthState = (state: RootState) => state.auth;

export function reHydrateStore(): AuthState {
  const appState = localStorage.getItem("zenoAppState");
  if (appState) {
    return JSON.parse(appState) as AuthState;
  } else {
    return {
      user: null,
      token: null,
      userPreferencies: null,
      permissions: null,
    };
  }
}

export const localStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    console.log(getState());
    // localStorage.setItem('zenoState', JSON.stringify(getState))
    return result;
  };
