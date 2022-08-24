import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  logout,
  selectIsAuthenticated,
  setCredentials,
} from "modules/user/stores/slices/AuthenticationSlice";

export const useAuth = () => {
  const signed = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const signout = () => dispatch(logout());

  return {
    signed,
    signout,
    setCredentials,
  };
};
