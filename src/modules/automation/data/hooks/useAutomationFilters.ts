import { useContext } from "react";
import AutomationFiltersContext from "../contexts/automationFiltersContext";

const useAutomationFilters = () => useContext(AutomationFiltersContext);

export default useAutomationFilters;
