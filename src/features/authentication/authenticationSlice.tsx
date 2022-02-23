import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "app/services/authentication";
import type { RootState } from "app/store";

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
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
      const appState: AuthState = {
        user,
        token,
      };
      localStorage.setItem("zenoAppState", JSON.stringify(appState));
    },
    logout: () => {
      localStorage.removeItem("zenoAppState");
      return initialState;
    },
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

// selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null;

export function reHydrateStore(): AuthState {
  const appState = localStorage.getItem("zenoAppState");
  if (appState) {
    return JSON.parse(appState) as AuthState;
  } else {
    return {
      user: null,
      token: null,
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
