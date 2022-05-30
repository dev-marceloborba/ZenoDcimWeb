import React from "react";
import { Provider } from "react-redux";
import { userStore } from "modules/user/stores/user-store";
import { Outlet } from "react-router-dom";

const UserRoot: React.FC = () => {
  return (
    <Provider store={userStore}>
      <Outlet />
    </Provider>
  );
};

export default UserRoot;
