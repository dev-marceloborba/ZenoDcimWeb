import { format, utcToZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export default function getDateFormat(date: string | Date): string {
  const tzDate = utcToZonedTime(date, "America/Sao_Paulo");
  return format(tzDate, "dd/MM/yyyy HH:mm:ss", {
    timeZone: "America/Sao_Paulo",
    locale: ptBR,
  });
}
