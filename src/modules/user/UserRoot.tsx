import React from "react";
import { Provider } from "react-redux";
import { userStore } from "modules/user/stores/user-store";
import UserRoutes from "modules/user/routes/UserRoutes";

const UserRoot: React.FC = () => {
  return (
    <Provider store={userStore}>
      <UserRoutes />
    </Provider>
  );
};

export default UserRoot;
