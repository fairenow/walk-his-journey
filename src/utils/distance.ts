export type DistanceUnit = "mi" | "km";

export const formatDistance = (meters: number, unit: DistanceUnit, digits = 2) => {
  const value = unit === "mi" ? meters / 1609.344 : meters / 1000;
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};
