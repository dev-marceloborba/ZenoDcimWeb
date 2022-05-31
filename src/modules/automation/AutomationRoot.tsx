import React from "react";
import { Provider } from "react-redux";
import { automationStore } from "modules/automation/stores/automation-store";
import { Outlet } from "react-router-dom";

const AutomationRoot: React.FC = () => {
  return (
    <Provider store={automationStore}>
      <Outlet />
    </Provider>
  );
};

export default AutomationRoot;
