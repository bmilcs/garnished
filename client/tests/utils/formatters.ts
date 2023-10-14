export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });
};
