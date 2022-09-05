import { format, utcToZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export default function getTimeStampFormat(date: string | null): string {
  if (date) {
    const tzDate = utcToZonedTime(date, "America/Sao_Paulo");
    return format(tzDate, "dd/MM/yyyy HH:mm:ss.SSS", {
      timeZone: "America/Sao_Paulo",
      locale: ptBR,
    });
  } else {
    return "-";
  }
}
