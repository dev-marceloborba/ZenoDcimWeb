import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  logout,
  selectAuthState,
  selectCurrentUser,
  selectIsAuthenticated,
  setCredentials,
} from "modules/user/stores/slices/AuthenticationSlice";

export const useAuth = () => {
  const signed = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const userState = useAppSelector(selectAuthState);

  const signout = () => dispatch(logout());

  return {
    signed,
    signout,
    setCredentials,
    currentUser,
    userState,
  };
};
