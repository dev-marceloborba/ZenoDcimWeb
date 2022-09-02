import { useContext } from "react";
import AutomationRealtimeContext from "../contexts/automationRealtimeContext";

const useAutomationRealtime = () => useContext(AutomationRealtimeContext);

export default useAutomationRealtime;
