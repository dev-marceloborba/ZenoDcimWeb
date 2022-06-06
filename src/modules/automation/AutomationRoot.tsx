import React from "react";
import { Provider } from "react-redux";
import { automationStore } from "modules/automation/stores/automation-store";
import AutomationRoutes from "modules/automation/routes/AutomationRoutes";
import ZenoLayout from "modules/core/layouts/ZenoLayout";

const AutomationRoot: React.FC = () => {
  return (
    <Provider store={automationStore}>
      {/* <ZenoLayout /> */}
      <AutomationRoutes />
    </Provider>
  );
};

export default AutomationRoot;
