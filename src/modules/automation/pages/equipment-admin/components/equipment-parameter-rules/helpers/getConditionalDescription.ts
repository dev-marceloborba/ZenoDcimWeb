import { EAlarmConditonal } from "modules/automation/models/alarm-rule-model";

export default function getConditionalDescription(
  conditional: EAlarmConditonal
): string {
  switch (conditional) {
    case EAlarmConditonal.LOWER_EQUAL:
      return "Menor ou igual";
    case EAlarmConditonal.LOWER:
      return "Menor";
    case EAlarmConditonal.EQUAL:
      return "Igual";
    case EAlarmConditonal.GREATER:
      return "Maior";
    case EAlarmConditonal.GREATER_EQUAL:
      return "Maior ou igual";
  }
}
