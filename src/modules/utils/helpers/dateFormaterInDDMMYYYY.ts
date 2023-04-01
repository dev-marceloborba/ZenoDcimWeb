export default function dateFormaterInDDMMYYYY(date: Date): string {
  const str1 = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
  return str1;
}
