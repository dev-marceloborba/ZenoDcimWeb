import { EAlarmConditonal } from "modules/automation/models/alarm-rule-model";

export default function getConditionalEnumFromDescription(
  description: string
): EAlarmConditonal {
  switch (description) {
    case "Menor":
      return EAlarmConditonal.LOWER;
    case "Menor ou igual":
      return EAlarmConditonal.LOWER_EQUAL;
    case "Maior":
      return EAlarmConditonal.GREATER;
    case "Maior ou igual":
      return EAlarmConditonal.GREATER_EQUAL;
    default:
      return EAlarmConditonal.EQUAL;
  }
}
