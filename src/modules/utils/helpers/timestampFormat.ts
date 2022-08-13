import ptBRLocale from "date-fns/locale/pt-BR";
// import format from "date-fns/format";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export default function getTimeStampFormat(date: string): string {
  // const str1 =
  //   date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  // const str2 =
  //   date.getHours() +
  //   ":" +
  //   date.getMinutes() +
  //   ":" +
  //   date.getSeconds() +
  //   "." +
  //   date.getMilliseconds();
  // return str1 + " " + str2;
  // return format(date, "dd/MM/yyyy HH:mm:ss.SSS", { locale: ptBRLocale });

  const parsedDate = parseISO(date);
  console.log(date);
  console.log(parsedDate);

  return formatInTimeZone(
    parsedDate,
    "America/Sao_Paulo",
    "dd/MM/yyyy HH:mm:ss.SSS",
    {
      locale: ptBRLocale,
    }
  );
}
