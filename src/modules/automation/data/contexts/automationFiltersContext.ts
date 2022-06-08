import { createContext } from "react";
import { AutomationFiltersData } from "../types/automationFilter";

const AutomationFiltersContext = createContext<AutomationFiltersData>(
  {} as AutomationFiltersData
);

export default AutomationFiltersContext;
