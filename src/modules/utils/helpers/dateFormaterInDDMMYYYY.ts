export default function dateFormaterInDDMMYYYY(date: Date): string {
  return date.getDay() + "/" + date.getMonth() + date.getFullYear();
}
