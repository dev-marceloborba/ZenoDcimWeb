import React from "react";
import AutomationRoutes from "modules/automation/routes/AutomationRoutes";
import AutomationFiltersProvider from "./data/providers/AutomationFiltersProvider";

const AutomationRoot: React.FC = () => {
  return (
    <AutomationFiltersProvider>
      <AutomationRoutes />
    </AutomationFiltersProvider>
  );
};

export default AutomationRoot;
