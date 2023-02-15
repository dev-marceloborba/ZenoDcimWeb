export default function convertExpressionToPathname(expression: string) {
  return expression
    .replaceAll(" ", "")
    .replaceAll(".", "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
