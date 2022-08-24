import { selectIsAuthenticated } from "modules/user/stores/slices/AuthenticationSlice";
import React, { ComponentType } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function withAuthentication(Component: ComponentType): React.FC {
  const Authenticated = () => {
    const location = useLocation();
    const signed = useAppSelector(selectIsAuthenticated);

    return (
      <>
        {signed && <Component />}
        {!signed && <Navigate to="/" state={location.state} />}
      </>
    );
  };

  return Authenticated;
}
