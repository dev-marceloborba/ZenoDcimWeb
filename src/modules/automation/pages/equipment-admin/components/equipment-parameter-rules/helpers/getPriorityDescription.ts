import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";

export default function getPriorityDescription(
  priority: EAlarmPriority
): string {
  switch (priority) {
    case EAlarmPriority.LOW:
      return "Baixa";
    case EAlarmPriority.MEDIUM:
      return "Média";
    case EAlarmPriority.HIGH:
      return "Alta";
  }
}
