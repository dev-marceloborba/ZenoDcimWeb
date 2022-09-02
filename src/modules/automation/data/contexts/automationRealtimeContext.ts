import { createContext } from "react";
import { AutomationRealtimeProps } from "../types/automationRealtime";

const AutomationRealtimeContext = createContext<AutomationRealtimeProps>(
  {} as AutomationRealtimeProps
);

export default AutomationRealtimeContext;
