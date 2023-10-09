export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  return month >= 3 && month <= 5
    ? "spring"
    : month >= 6 && month <= 8
    ? "summer"
    : month >= 9 && month <= 11
    ? "autumn"
    : "winter";
};
