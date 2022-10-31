export default function isNumber(val: unknown): val is string | number {
  return (
    !isNaN(Number(Number.parseFloat(String(val)))) && isFinite(Number(val))
  );
}
