import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type {
  AutomationDispatch,
  AutomationRootState,
} from "modules/automation/stores/automation-store";

export const useAutomationDispatch = () => useDispatch<AutomationDispatch>();
export const useAutomationSelector: TypedUseSelectorHook<AutomationRootState> =
  useSelector;
