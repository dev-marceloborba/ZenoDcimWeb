import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";

export default function getPriorityEnumFromDescription(
  description: string
): EAlarmPriority {
  switch (description) {
    case "Média":
      return EAlarmPriority.MEDIUM;
    case "Alta":
      return EAlarmPriority.HIGH;
    default:
      return EAlarmPriority.LOW;
  }
}
