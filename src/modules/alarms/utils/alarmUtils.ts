import {
  EAlarmStatus,
  EAlarmType,
} from "modules/automation/models/alarm-model";
import {
  EAlarmConditonal,
  EAlarmPriority,
} from "modules/automation/models/alarm-rule-model";

export function getAlarmConditionalFromEnum(e: EAlarmConditonal) {
  switch (e) {
    case EAlarmConditonal.EQUAL:
      return "=";
    case EAlarmConditonal.GREATER:
      return ">";
    case EAlarmConditonal.GREATER_EQUAL:
      return ">=";
    case EAlarmConditonal.LOWER:
      return "<";
    case EAlarmConditonal.LOWER_EQUAL:
      return "<=";
  }
}

export function getAlarmPriorityFromEnum(e: EAlarmPriority) {
  switch (e) {
    case EAlarmPriority.MEDIUM:
      return "Média";
    case EAlarmPriority.HIGH:
      return "Alta";
    case EAlarmPriority.LOW:
      return "Baixa";
  }
}

export function getAlarmTypeFromEnum(e: EAlarmType) {
  switch (e) {
    case EAlarmType.ALARM:
      return "Alarme";
    case EAlarmType.EVENT:
      return "Evento";
  }
}

export function getAlarmStatusFromEnum(e: EAlarmStatus) {
  switch (e) {
    case EAlarmStatus.ACKED:
      return "Reconhecido";
    case EAlarmStatus.ACTIVE:
      return "Ativo";
    case EAlarmStatus.INACTIVE:
      return "Inativo";
  }
}
