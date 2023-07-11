export default function calculatePercentage(
  percentage: number,
  value: number,
  decimalPlaces: number | false = false
): number {
  const percentageRealValue = percentage * 0.01;
  let resultingValue = value * percentageRealValue;
  let decimalFix = 1;

  if (decimalPlaces) {
    decimalFix = 10 * 10 ** decimalFix;
  }

  resultingValue =
    Math.round(resultingValue * decimalFix + Number.EPSILON) / decimalFix;

  return resultingValue;
}
