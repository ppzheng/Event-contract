export function formatUsd(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(value);
}

export function formatCompactUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(value);
}

export function formatProbability(value: number) {
  return `${Math.round(value)}%`;
}

export function formatPrice(value: number) {
  return `$${formatUsd(value, value >= 10000 ? 1 : 2)}`;
}
