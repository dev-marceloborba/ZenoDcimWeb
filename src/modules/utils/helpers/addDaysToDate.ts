import add from "date-fns/add";

export default function addDaysToDate(date: Date, offset: number) {
  return add(date, { days: offset });
}
